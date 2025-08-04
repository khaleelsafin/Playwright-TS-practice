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
                    archiveArtifacts artifacts: 'screenshot/**/*.png, playwright-report/**/*.png', allowEmptyArchive: true
                }
                }
}