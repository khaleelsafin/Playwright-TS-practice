pipeline {
    agent any

    environment {
        // For Playwright browsers (if not using Docker)
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/ms-playwright"
    }

    stages {
        // Stage 1: Install Node.js and dependencies
        stage('Setup') {
            steps {
                // Install Node.js using nvm (Amazon Linux/Ubuntu)
                sh '''
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    nvm install ${NODE_VERSION}
                    node --version
                '''

                // Install dependencies and Playwright
                sh '''
                    npm install -g yarn
                    yarn install
                    npx playwright install
                    npx playwright install-deps
                '''
            }
        }

        // Stage 2: Run Playwright tests
        stage('Run Tests') {
            steps {
                sh 'npx playwright test --workers=2' // Runs all tests
                
                // Alternative for specific projects/reporters:
                // sh 'npx playwright test --project=chromium --reporter=html'
            }
            
            post {
                always {
                    // Archive test results (JUnit format)
                    junit 'playwright-report/test-results/*.xml'
                    
                    // Archive HTML report (optional)
                    archiveArtifacts artifacts: 'playwright-report/*', allowEmptyArchive: true
                }
            }
        }

        // Stage 3: Publish HTML report (optional)
        stage('Publish Report') {
            when {
                expression { currentBuild.currentResult == 'UNSTABLE' || currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                // Requires "HTML Publisher" Jenkins plugin
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report',
                    reportTitles: ''
                ])
            }
        }
    }

    post {
        always {
            // Clean up to save disk space
            sh 'rm -rf node_modules ms-playwright'
            
            // Slack/Email notification (optional)
            // emailext body: "Playwright tests completed: ${currentBuild.currentResult}\n\n${BUILD_URL}",
            //     subject: "Playwright Test Results - ${JOB_NAME}",
            //     to: 'team@example.com'
        }
    }
}