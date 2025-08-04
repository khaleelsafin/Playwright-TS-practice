pipeline {
    agent any

    environment {
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/browsers" 
        TMPDIR = "${WORKSPACE}/tmp"  
    }

    stages {
        stage('Setup') {
            steps {
                // Clean workspace before starting
                cleanWs()

                // Install Node.js (skip if using Docker)
                sh '''
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
                    . ~/.nvm/nvm.sh && nvm install 18
                    npm install -g yarn
                '''

                // Install dependencies with cache cleanup
                sh '''
                    yarn install --frozen-lockfile
                    npx playwright install --with-deps
                '''
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests with limited workers to reduce memory/temp files
                sh 'npx playwright test --workers=2'
            }
            post {
                always {
                    junit 'playwright-report/test-results/*.xml'
                    archiveArtifacts 'playwright-report/*.html'
                }
            }
        }
    }

    post {
        always {
            // Aggressive cleanup
            sh '''
                rm -rf \
                    node_modules \
                    browsers \
                    ~/.cache \
                    ~/.npm \
                    /tmp/* \
                    ${WORKSPACE}/tmp/*
            '''
            cleanWs() 
        }
    }
}