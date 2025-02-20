# Corda-Runtime-Gradle-Plugin

A Gradle plugin that wraps a subset of the SDK functions to facilitate their use in developer and CI scenarios.  
This supersedes the CSDE Gradle plugin.

Add the following extension properties

```groovy
    cordaRuntimeGradlePlugin {
        notaryVersion = "5.2.0.0"
        notaryCpiName = "NotaryServer"
        corDappCpiName = "MyCorDapp"
        cpiUploadTimeout = "30000"
        vnodeRegistrationTimeout = "60000"
        cordaProcessorTimeout = "300000"
        workflowsModuleName = "workflows"
        cordaClusterURL = "https://localhost:8888"
        cordaRestUser = "admin"
        cordaRestPasswd ="admin"
        composeFilePath = "config/combined-worker-compose.yml"
        networkConfigFile = "config/static-network-config.json"
        r3RootCertFile = "config/r3-ca-key.pem"
        skipTestsDuringBuildCpis = "false"
        // Only need to supply these if you want to use an unpublished version
        artifactoryUsername = findProperty('cordaArtifactoryUsername') ?: System.getenv('CORDA_ARTIFACTORY_USERNAME')
        artifactoryPassword = findProperty('cordaArtifactoryPassword') ?: System.getenv('CORDA_ARTIFACTORY_PASSWORD')
    }
```

In order to use the vNodesSetup functionality, you will have to provide the following files:

1. A docker compose yaml file, with the contents similar to

```yaml
version: '2'
services:
  postgresql:
    image: postgres:14.10
    restart: unless-stopped
    tty: true
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=cordacluster
    ports:
      - 5432:5432

  corda:
    image: corda-os-docker.software.r3.com/corda-os-combined-worker:5.2.0.0
    depends_on:
      - postgresql
    command: [ "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005",
               "-mbus.busType=DATABASE",
               "-spassphrase=password",
               "-ssalt=salt",
               "-ddatabase.user=user",
               "-ddatabase.pass=password",
               "-ddatabase.jdbc.url=jdbc:postgresql://postgresql:5432/cordacluster",
               "-ddatabase.jdbc.directory=/opt/jdbc-driver/"
    ]
    ports:
      - 8888:8888
      - 7004:7004
      - 5005:5005
```
Ensure the port given in the compose file matches the cordaClusterURL setting in the cordaRuntimeGradlePlugin extension properties; default is 8888.

2. [Gradle plugin default signing key](https://github.com/corda/corda-runtime-os/wiki/CorDapp-Packaging#trust-the-gradle-plugin-default-signing-key)

3. [R3 signing key](https://github.com/corda/corda-runtime-os/wiki/CorDapp-Packaging#trust-the-r3-signing-key)

4. A config json file representing the nodes on the network, with the contents similar to

```json
[
  {
    "x500Name" : "CN=Alice, OU=Test Dept, O=R3, L=London, C=GB",
    "cpi" : "MyCorDapp"
  },
  {
    "x500Name" : "CN=Bob, OU=Test Dept, O=R3, L=London, C=GB",
    "cpi" : "MyCorDapp"
  },
  {
    "x500Name" : "CN=Charlie, OU=Test Dept, O=R3, L=London, C=GB",
    "cpi" : "MyCorDapp"
  },
  {
    "x500Name" : "CN=NotaryRep1, OU=Test Dept, O=R3, L=London, C=GB",
    "cpi" : "NotaryServer",
    "serviceX500Name": "CN=NotaryService, OU=Test Dept, O=R3, L=London, C=GB"
  }
]

```