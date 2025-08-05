pipeline {
  agent none

  stages {
    stage('Run Playwright Tests in Docker') {
      agent {
        node {
          label 'master' // or any agent label you're using
        }
      }

      steps {
        script {
          def workspaceDir = pwd()

          docker.image('mcr.microsoft.com/playwright:v1.44.1-jammy').inside("-v ${workspaceDir}:/app -w /app") {
            sh 'npm ci'

            parallel chromium: {
              sh 'npx playwright test --project=chromium'
            },
            firefox: {
              sh 'npx playwright test --project=firefox'
            },
            webkit: {
              sh 'npx playwright test --project=webkit'
            }
          }
        }
      }
    }
  }
}
