package net.corda.ledger.persistence.utxo.impl

import net.corda.crypto.core.parseSecureHash
import net.corda.data.crypto.wire.CryptoSignatureSpec
import net.corda.data.crypto.wire.CryptoSignatureWithKey
import net.corda.data.membership.SignedGroupParameters
import net.corda.ledger.common.data.transaction.PrivacySaltImpl
import net.corda.ledger.common.data.transaction.SignedTransactionContainer
import net.corda.ledger.common.data.transaction.TransactionStatus
import net.corda.ledger.common.data.transaction.factory.WireTransactionFactory
import net.corda.ledger.persistence.common.mapToComponentGroups
import net.corda.ledger.persistence.utxo.CustomRepresentation
import net.corda.ledger.persistence.utxo.UtxoRepository
import net.corda.ledger.utxo.data.transaction.MerkleProofDto
import net.corda.ledger.utxo.data.transaction.UtxoFilteredTransactionDto
import net.corda.ledger.utxo.data.transaction.UtxoVisibleTransactionOutputDto
import net.corda.sandbox.type.SandboxConstants.CORDA_MARKER_ONLY_SERVICE
import net.corda.sandbox.type.UsedByPersistence
import net.corda.utilities.debug
import net.corda.utilities.serialization.deserialize
import net.corda.v5.application.crypto.DigitalSignatureAndMetadata
import net.corda.v5.application.serialization.SerializationService
import net.corda.v5.crypto.SecureHash
import net.corda.v5.ledger.utxo.StateRef
import org.osgi.service.component.annotations.Activate
import org.osgi.service.component.annotations.Component
import org.osgi.service.component.annotations.Reference
import org.osgi.service.component.annotations.ServiceScope.PROTOTYPE
import org.slf4j.LoggerFactory
import java.math.BigDecimal
import java.nio.ByteBuffer
import java.time.Instant
import javax.persistence.EntityManager
import javax.persistence.Query
import javax.persistence.Tuple

/**
 * Reads and writes ledger transaction data to and from the virtual node vault database.
 * The component only exists to be created inside a PERSISTENCE sandbox. We denote it
 * as "corda.marker.only" to force the sandbox to create it, despite it implementing
 * only the [UsedByPersistence] marker interface.
 */
@Suppress("TooManyFunctions")
@Component(
    service = [ UtxoRepository::class, UsedByPersistence::class ],
    property = [ CORDA_MARKER_ONLY_SERVICE ],
    scope = PROTOTYPE
)
class UtxoRepositoryImpl @Activate constructor(
    @Reference
    private val serializationService: SerializationService,
    @Reference
    private val wireTransactionFactory: WireTransactionFactory,
    @Reference
    private val queryProvider: UtxoQueryProvider
) : UtxoRepository, UsedByPersistence {
    private companion object {
        private val logger = LoggerFactory.getLogger(this::class.java.enclosingClass)

        const val TOP_LEVEL_MERKLE_PROOF_INDEX = -1
    }

    override fun findTransaction(
        entityManager: EntityManager,
        id: String
    ): SignedTransactionContainer? {
        val (privacySalt, metadataBytes) = findTransactionsPrivacySaltAndMetadata(entityManager, listOf(id))[id]
            ?: return null
        val wireTransaction = wireTransactionFactory.create(
            mapOf(0 to listOf(metadataBytes)) + findTransactionComponentLeafs(entityManager, id),
            privacySalt
        )
        return SignedTransactionContainer(
            wireTransaction,
            findTransactionSignatures(entityManager, id)
        )
    }

    override fun findTransactionIdsAndStatuses(
        entityManager: EntityManager,
        transactionIds: List<String>
    ): Map<SecureHash, String> {
        return entityManager.createNativeQuery(queryProvider.findTransactionIdsAndStatuses, Tuple::class.java)
            .setParameter("transactionIds", transactionIds)
            .resultListAsTuples()
            .associate { r -> parseSecureHash(r.get(0) as String) to r.get(1) as String }
    }

    private fun findTransactionsPrivacySaltAndMetadata(
        entityManager: EntityManager,
        transactionIds: List<String>
    ): Map<String, Pair<PrivacySaltImpl, ByteArray>?> {
        return entityManager.createNativeQuery(queryProvider.findTransactionsPrivacySaltAndMetadata, Tuple::class.java)
            .setParameter("transactionIds", transactionIds)
            .resultListAsTuples().associate { r ->
                r.get(0) as String to Pair(PrivacySaltImpl(r.get(1) as ByteArray), r.get(2) as ByteArray)
            }
    }

    override fun findTransactionComponentLeafs(
        entityManager: EntityManager,
        transactionId: String
    ): Map<Int, List<ByteArray>> {
        return entityManager.createNativeQuery(queryProvider.findTransactionComponentLeafs, Tuple::class.java)
            .setParameter("transactionId", transactionId)
            .resultListAsTuples()
            .mapToComponentGroups(UtxoComponentGroupMapper(transactionId))
    }

    private fun findUnconsumedVisibleStates(
        entityManager: EntityManager,
        query: String,
        stateClassType: String?
    ): List<UtxoVisibleTransactionOutputDto> {
        val queryObj = entityManager.createNativeQuery(query, Tuple::class.java)
            .setParameter("verified", TransactionStatus.VERIFIED.value)

        if (stateClassType != null) {
            queryObj.setParameter("type", stateClassType)
        }

        return queryObj.mapToUtxoVisibleTransactionOutputDto()
    }

    override fun findUnconsumedVisibleStatesByType(
        entityManager: EntityManager
    ): List<UtxoVisibleTransactionOutputDto> {
        return findUnconsumedVisibleStates(entityManager, queryProvider.findUnconsumedVisibleStatesByType, null)
    }

    override fun resolveStateRefs(
        entityManager: EntityManager,
        stateRefs: List<StateRef>
    ): List<UtxoVisibleTransactionOutputDto> {
        return entityManager.createNativeQuery(queryProvider.resolveStateRefs, Tuple::class.java)
            .setParameter("transactionIds", stateRefs.map { it.transactionId.toString() })
            .setParameter("stateRefs", stateRefs.map { it.toString() })
            .setParameter("verified", TransactionStatus.VERIFIED.value)
            .mapToUtxoVisibleTransactionOutputDto()
    }

    override fun findTransactionSignatures(
        entityManager: EntityManager,
        transactionId: String
    ): List<DigitalSignatureAndMetadata> {
        return entityManager.createNativeQuery(queryProvider.findTransactionSignatures, Tuple::class.java)
            .setParameter("transactionId", transactionId)
            .resultListAsTuples()
            .map { r -> serializationService.deserialize(r.get(0) as ByteArray) }
    }

    override fun findTransactionStatus(entityManager: EntityManager, id: String): String? {
        return entityManager.createNativeQuery(queryProvider.findTransactionStatus, Tuple::class.java)
            .setParameter("transactionId", id)
            .resultListAsTuples()
            .map { r -> r.get(0) as String }
            .singleOrNull()
    }

    override fun markTransactionVisibleStatesConsumed(
        entityManager: EntityManager,
        stateRefs: List<StateRef>,
        timestamp: Instant
    ) {
        entityManager.createNativeQuery(queryProvider.markTransactionVisibleStatesConsumed)
            .setParameter("consumed", timestamp)
            .setParameter("transactionIds", stateRefs.map { it.transactionId.toString() })
            .setParameter("stateRefs", stateRefs.map(StateRef::toString))
            .executeUpdate()
    }

    override fun persistTransaction(
        entityManager: EntityManager,
        id: String,
        privacySalt: ByteArray,
        account: String,
        timestamp: Instant,
        status: TransactionStatus,
        metadataHash: String,
        isFiltered: Boolean
    ) {
        entityManager.createNativeQuery(queryProvider.persistTransaction)
            .setParameter("id", id)
            .setParameter("privacySalt", privacySalt)
            .setParameter("accountId", account)
            .setParameter("createdAt", timestamp)
            .setParameter("status", status.value)
            .setParameter("updatedAt", timestamp)
            .setParameter("metadataHash", metadataHash)
            .setParameter("isFiltered", isFiltered)
            .executeUpdate()
            .logResult("transaction [$id]")
    }

    override fun persistTransactionMetadata(
        entityManager: EntityManager,
        hash: String,
        metadataBytes: ByteArray,
        groupParametersHash: String,
        cpiFileChecksum: String
    ) {
        entityManager.createNativeQuery(queryProvider.persistTransactionMetadata)
            .setParameter("hash", hash)
            .setParameter("canonicalData", metadataBytes)
            .setParameter("groupParametersHash", groupParametersHash)
            .setParameter("cpiFileChecksum", cpiFileChecksum)
            .executeUpdate()
            .logResult("transaction metadata [$hash]")
    }

    override fun persistTransactionSource(
        entityManager: EntityManager,
        transactionId: String,
        groupIndex: Int,
        leafIndex: Int,
        sourceStateTransactionId: String,
        sourceStateIndex: Int
    ) {
        entityManager.createNativeQuery(queryProvider.persistTransactionSource)
            .setParameter("transactionId", transactionId)
            .setParameter("groupIndex", groupIndex)
            .setParameter("leafIndex", leafIndex)
            .setParameter("sourceStateTransactionId", sourceStateTransactionId)
            .setParameter("sourceStateIndex", sourceStateIndex)
            .executeUpdate()
            .logResult("transaction source [$transactionId, $groupIndex, $leafIndex]")
    }

    override fun persistTransactionComponentLeaf(
        entityManager: EntityManager,
        transactionId: String,
        groupIndex: Int,
        leafIndex: Int,
        data: ByteArray,
        hash: String
    ) {
        // Metadata is not stored with the other components. See persistTransactionMetadata().
        if (groupIndex == 0 && leafIndex == 0) {
            return
        }
        entityManager.createNativeQuery(queryProvider.persistTransactionComponentLeaf)
            .setParameter("transactionId", transactionId)
            .setParameter("groupIndex", groupIndex)
            .setParameter("leafIndex", leafIndex)
            .setParameter("data", data)
            .setParameter("hash", hash)
            .executeUpdate()
            .logResult("transaction component [$transactionId, $groupIndex, $leafIndex]")
    }

    override fun persistVisibleTransactionOutput(
        entityManager: EntityManager,
        transactionId: String,
        groupIndex: Int,
        leafIndex: Int,
        type: String,
        timestamp: Instant,
        consumed: Boolean,
        customRepresentation: CustomRepresentation,
        tokenType: String?,
        tokenIssuerHash: String?,
        tokenNotaryX500Name: String?,
        tokenSymbol: String?,
        tokenTag: String?,
        tokenOwnerHash: String?,
        tokenAmount: BigDecimal?
    ) {
        entityManager.createNativeQuery(queryProvider.persistVisibleTransactionOutput(consumed))
            .setParameter("transactionId", transactionId)
            .setParameter("groupIndex", groupIndex)
            .setParameter("leafIndex", leafIndex)
            .setParameter("type", type)
            .setParameter("tokenType", tokenType)
            .setParameter("tokenIssuerHash", tokenIssuerHash)
            .setParameter("tokenNotaryX500Name", tokenNotaryX500Name)
            .setParameter("tokenSymbol", tokenSymbol)
            .setParameter("tokenTag", tokenTag)
            .setParameter("tokenOwnerHash", tokenOwnerHash)
            // This is a workaround for avoiding error when tokenAmount is null, see:
            // https://stackoverflow.com/questions/53648865/postgresql-spring-data-jpa-integer-null-interpreted-as-bytea
            .setParameter("tokenAmount", BigDecimal.ZERO)
            .setParameter("tokenAmount", tokenAmount)
            .setParameter("createdAt", timestamp)
            .setParameter("customRepresentation", customRepresentation.json)
            .run { if (consumed) setParameter("consumedAt", timestamp) else this }
            .executeUpdate()
            .logResult("transaction output [$transactionId, $leafIndex]")
    }

    override fun persistTransactionSignature(
        entityManager: EntityManager,
        transactionId: String,
        index: Int,
        signature: DigitalSignatureAndMetadata,
        timestamp: Instant
    ) {
        entityManager.createNativeQuery(queryProvider.persistTransactionSignature)
            .setParameter("transactionId", transactionId)
            .setParameter("signatureIdx", index)
            .setParameter("signature", serializationService.serialize(signature).bytes)
            .setParameter("publicKeyHash", signature.by.toString())
            .setParameter("createdAt", timestamp)
            .executeUpdate()
            .logResult("transaction signature [$transactionId, $index]")
    }

    override fun updateTransactionStatus(
        entityManager: EntityManager,
        transactionId: String,
        transactionStatus: TransactionStatus,
        timestamp: Instant
    ) {
        // Update status. Update ignored unless: UNVERIFIED -> * | VERIFIED -> VERIFIED | INVALID -> INVALID
        val rowsUpdated = entityManager.createNativeQuery(queryProvider.updateTransactionStatus)
            .setParameter("transactionId", transactionId)
            .setParameter("newStatus", transactionStatus.value)
            .setParameter("updatedAt", timestamp)
            .executeUpdate()

        check(rowsUpdated == 1 || transactionStatus == TransactionStatus.UNVERIFIED) {
            // VERIFIED -> INVALID or INVALID -> VERIFIED is a system error as verify should always be consistent and deterministic
            "Existing status for transaction with ID $transactionId can't be updated to $transactionStatus"
        }
    }

    override fun findSignedGroupParameters(entityManager: EntityManager, hash: String): SignedGroupParameters? {
        return entityManager.createNativeQuery(queryProvider.findSignedGroupParameters, Tuple::class.java)
            .setParameter("hash", hash)
            .resultListAsTuples()
            .map { r ->
                SignedGroupParameters(
                    ByteBuffer.wrap(r.get(0) as ByteArray),
                    CryptoSignatureWithKey(
                        ByteBuffer.wrap(r.get(1) as ByteArray),
                        ByteBuffer.wrap(r.get(2) as ByteArray)
                    ),
                    CryptoSignatureSpec((r.get(3) as String), null, null)
                )
            }
            .singleOrNull()
    }

    override fun persistSignedGroupParameters(
        entityManager: EntityManager,
        hash: String,
        signedGroupParameters: SignedGroupParameters,
        timestamp: Instant
    ) {
        entityManager.createNativeQuery(queryProvider.persistSignedGroupParameters)
            .setParameter("hash", hash)
            .setParameter("parameters", signedGroupParameters.groupParameters.array())
            .setParameter("signature_public_key", signedGroupParameters.mgmSignature.publicKey.array())
            .setParameter("signature_content", signedGroupParameters.mgmSignature.bytes.array())
            .setParameter("signature_spec", signedGroupParameters.mgmSignatureSpec.signatureName)
            .setParameter("createdAt", timestamp)
            .executeUpdate()
            .logResult("signed group parameters [$hash]")
    }

    override fun persistMerkleProof(
        entityManager: EntityManager,
        transactionId: String,
        groupIndex: Int,
        treeSize: Int,
        leaves: List<Int>,
        hashes: List<String>
    ): String {
        // Generate an ID by concatenating transaction ID - group index - leaves
        val merkleProofId = "$transactionId;$groupIndex;${leaves.joinToString(separator = ",")}"

        entityManager.createNativeQuery(queryProvider.persistMerkleProof)
            .setParameter("merkleProofId", merkleProofId)
            .setParameter("transactionId", transactionId)
            .setParameter("groupIndex", groupIndex)
            .setParameter("treeSize", treeSize)
            .setParameter("hashes", hashes.joinToString(","))
            .executeUpdate()
            .logResult("merkle proof for transaction: $transactionId")

        return merkleProofId
    }

    override fun persistMerkleProofLeaf(entityManager: EntityManager, merkleProofId: String, leafIndex: Int) {
        entityManager.createNativeQuery(queryProvider.persistMerkleProofLeaf)
            .setParameter("merkleProofId", merkleProofId)
            .setParameter("leafIndex", leafIndex)
            .executeUpdate()
            .logResult("merkle proof leaf for merkle proof: $merkleProofId")
    }

    override fun findMerkleProofs(
        entityManager: EntityManager,
        transactionIds: List<String>
    ): Map<String, List<MerkleProofDto>> {
        return entityManager.createNativeQuery(queryProvider.findMerkleProofs, Tuple::class.java)
            .setParameter("transactionIds", transactionIds)
            .resultListAsTuples()
            .groupBy { tuple ->
                // We'll have multiple rows for the same Merkle proof if it revealed more than one leaf
                // We group the rows by the Merkle proof ID to see which are the ones that belong together
                tuple.get(0) as String // Merkle Proof ID
            }.map { (merkleProofId, rows) ->
                // We can retrieve most of the properties from the first row because they will be the same for each row
                val firstRow = rows.first()

                MerkleProofDto(
                    firstRow.get(1) as String, // Transaction ID
                    firstRow.get(2) as Int, // Group index
                    firstRow.get(3) as Int, // Tree size

                    // We store the hashes as a comma separated string, so we need to split it and parse into SecureHash
                    // we filter out the blank ones just in case
                    (firstRow.get(4) as String).split(",")
                        .filter { it.isNotBlank() }.map { parseSecureHash(it) },

                    firstRow.get(5) as ByteArray, // Privacy salt

                    // Each leaf will have its own row, so we need to go through each row that belongs to the Merkle proof
                    rows.mapNotNull {
                        // Map the leaf index to the data we fetched from the component table
                        val leafIndex = it.get(6) as? Int
                        val leafData = it.get(7) as? ByteArray

                        if (leafIndex != null && leafData != null) {
                            leafIndex to leafData
                        } else {
                            null
                        }
                    }.toMap(),
                    // Extract the visible leaf indices from the merkle proof ID
                    merkleProofId.substringAfterLast(";").split(",").map { it.toInt() }
                )
            }.groupBy {
                // Group by transaction ID
                it.transactionId
            }
    }

    override fun findFilteredTransactions(
        entityManager: EntityManager,
        ids: List<String>
    ): Map<String, UtxoFilteredTransactionDto> {
        val privacySaltAndMetadataMap = findTransactionsPrivacySaltAndMetadata(entityManager, ids)
        val merkleProofs = findMerkleProofs(entityManager, ids)
        val signaturesMap = ids.associateWith { findTransactionSignatures(entityManager, it) }

        return ids.associateWith { transactionId ->

            val transactionMerkleProofs = merkleProofs[transactionId]
            requireNotNull(transactionMerkleProofs) {
                "Couldn't find any Merkle proofs for transaction with ID: $transactionId."
            }

            val (topLevelMerkleProofs, componentGroupMerkleProofs) = transactionMerkleProofs.partition {
                it.groupIndex == TOP_LEVEL_MERKLE_PROOF_INDEX
            }

            require(topLevelMerkleProofs.isNotEmpty()) {
                "Couldn't find a top level Merkle proof for transaction with ID: $transactionId."
            }
            require(componentGroupMerkleProofs.isNotEmpty()) {
                "Couldn't find any component group Merkle proof for transaction with ID: $transactionId."
            }

            requireNotNull(privacySaltAndMetadataMap[transactionId]) {
                "Couldn't find metadata for transaction with ID: $transactionId."
            }

            val transactionPrivacySaltAndMetadata = privacySaltAndMetadataMap[transactionId]
            requireNotNull(transactionPrivacySaltAndMetadata) {
                "Couldn't find metadata/privacy salt for transaction with ID: $transactionId"
            }

            val transactionSignatures = signaturesMap[transactionId]
            requireNotNull(transactionSignatures) {
                "Couldn't find signatures for transaction with ID: $transactionId"
            }

            UtxoFilteredTransactionDto(
                transactionId = transactionId,
                topLevelMerkleProofs = topLevelMerkleProofs,
                componentMerkleProofMap = componentGroupMerkleProofs.groupBy { it.groupIndex },
                privacySalt = transactionPrivacySaltAndMetadata.first,
                metadataBytes = transactionPrivacySaltAndMetadata.second,
                signatures = transactionSignatures
            )
        }
    }

    private fun Int.logResult(entity: String): Int {
        if (this == 0) {
            logger.debug {
                "UTXO ledger entity not persisted due to existing row in database. Entity: $entity"
            }
        }
        return this
    }

    @Suppress("UNCHECKED_CAST")
    private fun Query.resultListAsTuples() = resultList as List<Tuple>

    private fun Query.mapToUtxoVisibleTransactionOutputDto(): List<UtxoVisibleTransactionOutputDto> {
        return resultListAsTuples()
            .map { t ->
                UtxoVisibleTransactionOutputDto(
                    t[0] as String, // transactionId
                    t[1] as Int, // leaf ID
                    t[2] as ByteArray, // outputs info data
                    t[3] as ByteArray // outputs data
                )
            }
    }
}
