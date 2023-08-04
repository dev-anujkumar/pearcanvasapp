@Library(['paf_shared_lib', 'dgt_shared_lib']) _
import com.pearson.paf.AwsAccountCredentialsId
import com.pearson.paf.DockerImages
import com.pearson.paf.SnykOrgs

reactBuildPush(artifactPath: "cypress-canvas/cypress-canvas",
        accountBucketName: "paf-static-content-artifact-nonprd-us-east-1-928847",
        buildDir: "dist",
        buildImage: DockerImages.NODE_DEPRECATED,
        projectName: "cypress-canvas",
        appName: "zip",
        jenkinsPath: "PACE-Cypress",
        snykEnabled: true,
        snykDockerImage: DockerImages.NODE_14_ALPINE_SNYK,
        snykOrganization: SnykOrgs.CYPRESS,
        snykTokenId: "cypressSnykTokenID",
        failOnIssues: false,
        failOnError: false,
        semgrepEnabled: true,
        semgrepTokenId: "paceSemgrepToken",
        checkmarxProjectName: "canvas-stabilization",
        checkmarxTeamPath: "CxServer\\SP\\Pearson\\Global\\Corporate\\PACE_DevOps\\Cypress",
        sastEnabled: true,
)
