pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.44.1-jammy'
      args '-v $HOME/.cache:/root/.cache'  // to cache browsers/plugins
    }
  }

  options {
    timeout(time: 20, unit: 'MINUTES')
    disableConcurrentBuilds()
  }

  environment {
    HOME = "${env.WORKSPACE}"  // fixes some path issues in Linux
  }

  stages {
    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Parallel Browser Tests') {
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

  post {
    always {
      echo 'Pipeline finished.'
    }
    failure {
      echo 'Tests failed!'
    }
  }
}
