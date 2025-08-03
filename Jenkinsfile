pipeline{
    agent any
    stages{
        stage("Get Pull"){
            steps{
                bat '''
                cd C:/Users/khaleel safin shaik/Desktop/PlayWright
                '''
                }
            }
        

        stage("Test"){
            steps{
                bat '''
                 cd C:/Users/khaleel safin shaik/Desktop/PlayWright
            npx playwright test
            '''
            }
        }
    }
     post {
                always {
                    // Archive all test artifacts (including screenshots)
                    archiveArtifacts artifacts: 'screenshots/**/*.png, playwright-report/**/*.png', allowEmptyArchive: true
                    
                    // Publish HTML report (requires HTML Publisher plugin)
                    publishHTML target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Report'
                    ]
                }
                }
}