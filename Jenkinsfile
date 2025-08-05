pipeline {
  agent any

  stages {
    stage('Run Playwright Tests in Docker') {
      steps {
        script {
          def winPath = pwd()
          def dockerPath = winPath.replace('C:', '').replace('\\', '/')

          docker.image('mcr.microsoft.com/playwright:v1.44.1-jammy').inside("-v ${winPath}:${dockerPath} -w ${dockerPath}") {
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
