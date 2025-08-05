pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.44.1-jammy'
      args "-v ${pwd()}:/app -w /app"
    }
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Playwright Tests') {
      parallel {
        stage('Chromium') {
          steps {
            sh 'npx playwright test --project=chromium'
          }
        }
        stage('Firefox') {
          steps {
            sh 'npx playwright test --project=firefox'
          }
        }
        stage('WebKit') {
          steps {
            sh 'npx playwright test --project=webkit'
          }
        }
      }
    }
  }
}
