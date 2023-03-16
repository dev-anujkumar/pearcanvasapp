@Library(['paf_shared_lib', 'dgt_shared_lib']) _
import com.pearson.paf.AwsAccountCredentialsId
import com.pearson.paf.DockerImages
import com.pearson.paf.SnykOrgs

reactBuildPush(artifactPath: "cypress-canvas/cypress-canvas",
        accountBucketName: "paf-static-content-artifact-nonprd-us-east-1-928847",
        buildDir: "dist",
        projectName: "cypress-canvas_ui",
        appName: "zip",
        jenkinsPath: "PACE-Cypress",
        failOnIssues: false,
        failOnError: false,
)
