pipeline{
    agent any
    stages{
        stage("Get Pull"){
            steps{
                bat '''
                cd C:/Users/khaleel safin shaik/Desktop/PlayWright
                git pull
                '''
                }
            }
        }

        stage("Test"){
            steps{
                bat '''
            npx test playwright
            '''
            }
        }
    }
