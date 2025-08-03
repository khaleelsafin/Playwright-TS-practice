pipeline{
    agent any
    stages{
        stage("Get Pull"){
            steps{
                dir('C:/Users/khaleel safin shaik/Desktop/PlayWright'){
                git pull
                }
            }
        }

        stage("Test"){
            steps{
            npx test playwright
            }
        }
    }
}