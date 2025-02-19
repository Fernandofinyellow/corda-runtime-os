package net.corda.gradle.plugin.configuration

import org.gradle.api.Project
import org.gradle.api.logging.Logger

/**
 * Class which holds all the context properties for the gradle build. This is split between:
 * - Properties which are obtained from the cordaRuntimeGradlePlugin block in the build.gradle file
 * - The network config
 * - Properties which are non-configurable by the user
 * A version of this class will typically be passed to each of the helper classes.
 */
class ProjectContext(val project: Project, pluginConfig: PluginConfiguration) {

    // Capture values of user configurable context properties items from pluginConfig
    val cordaClusterURL: String = pluginConfig.cordaClusterURL.get()
    val cordaRestUser: String = pluginConfig.cordaRestUser.get()
    val cordaRestPassword: String = pluginConfig.cordaRestPasswd.get()
    val workspaceDir: String = pluginConfig.cordaRuntimePluginWorkspaceDir.get()
    val composeFilePath: String = pluginConfig.composeFilePath.get()
    val composeNetworkName: String = pluginConfig.composeNetworkName.get()
    val notaryVersion: String = pluginConfig.notaryVersion.get()
    val cordaBinDir: String = pluginConfig.cordaBinDir.get()
    val cordaCliBinDir: String = pluginConfig.cordaCliBinDir.get()
    val artifactoryUsername: String = pluginConfig.artifactoryUsername.get()
    val artifactoryPassword: String = pluginConfig.artifactoryPassword.get()
    val notaryCpiName: String = pluginConfig.notaryCpiName.get()
    val corDappCpiName: String = pluginConfig.corDappCpiName.get()
    val cpiUploadTimeout: Long = pluginConfig.cpiUploadTimeout.get().toLong()
    val vnodeRegistrationTimeout: Long = pluginConfig.vnodeRegistrationTimeout.get().toLong()
    val cordaProcessorTimeout: Long = pluginConfig.cordaProcessorTimeout.get().toLong()
    val workflowsModuleName: String = pluginConfig.workflowsModuleName.get()
    val networkConfigFile: String = pluginConfig.networkConfigFile.get()
    val r3RootCertFile: String = "${project.rootDir}/${pluginConfig.r3RootCertFile.get()}"

    // Set Non user configurable context properties
    val javaBinDir: String = "${System.getProperty("java.home")}/bin"
    val cordaPidCache: String = "${project.rootDir}/$workspaceDir/CordaPIDCache.dat"
    val jdbcDir: String = "$cordaBinDir/jdbcDrivers"
    val notaryServiceDir: String = "$cordaBinDir/notaryServer"
    val workflowBuildDir: String = "${project.rootDir}/${workflowsModuleName}/build"

    val cordaClusterHost: String = cordaClusterURL.split("://").last().split(":").first()
    val cordaClusterPort: Int = cordaClusterURL.split("://").last().split(":").last().toInt()

    val notaryCpbFilePath: String = "$notaryServiceDir/notary-plugin-non-validating-server-$notaryVersion-package.cpb"
    val notaryCpiFilePath: String = "$workflowBuildDir/$notaryCpiName-${project.version}.cpi"
    val corDappCpbFilePath: String = "$workflowBuildDir/libs/${workflowsModuleName}-${project.version}-package.cpb"
    val corDappCpiFilePath: String = "$workflowBuildDir/$corDappCpiName-${project.version}.cpi"
    val corDappCpiUploadStatusFilePath: String = "$workspaceDir/corDappCpiUploadStatus.json"
    val notaryCpiUploadStatusFilePath: String = "$workspaceDir/notaryCpiUploadStatus.json"

    val networkConfig: NetworkConfig = NetworkConfig("${project.rootDir}/${networkConfigFile}")
    val groupPolicyFilePath: String = "${project.rootDir}/$workspaceDir/GroupPolicy.json"
    val gradleDefaultCertAlias: String = "gradle-plugin-default-key"
    val gradleDefaultCertFilePath: String = "${project.rootDir}/config/gradle-plugin-default-key.pem"
    val keystoreAlias: String = "my-signing-key"
    val keystorePassword: String = "keystore password"
    val keystoreFilePath: String = "${project.rootDir}/$workspaceDir/signingkeys.pfx"
    val keystoreCertFilePath: String = "${project.rootDir}/$workspaceDir/signingkey1.pem"
    val r3RootCertKeyAlias: String = "digicert-ca"

    val logger: Logger = project.logger
}