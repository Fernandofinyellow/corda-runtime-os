package net.corda.ledger.persistence.utxo.impl

import net.corda.data.flow.event.FlowEvent
import net.corda.data.flow.event.external.ExternalEventContext
import net.corda.data.ledger.utxo.token.selection.event.TokenPoolCacheEvent
import net.corda.data.ledger.utxo.token.selection.key.TokenPoolCacheKey
import net.corda.ledger.persistence.utxo.UtxoOutputRecordFactory
import net.corda.messaging.api.records.Record
import net.corda.v5.ledger.utxo.observer.UtxoToken
import org.osgi.service.component.annotations.Component

@Suppress("Unused")
@Component(service = [UtxoOutputRecordFactory::class])
class UtxoOutputRecordFactoryImpl : UtxoOutputRecordFactory {

    override fun getTokenCacheChangeEventRecords(
        producedTokens: List<UtxoToken>,
        consumedTokens: List<UtxoToken>
    ): List<Record<TokenPoolCacheKey, TokenPoolCacheEvent>> {
        TODO("Not yet implemented")
    }

    override fun getPersistTransactionSuccessRecord(
        externalEventContext: ExternalEventContext
    ): Record<String, FlowEvent> {
        TODO("Not yet implemented")
    }
}
