pipeline{
    agent any
    stages{
        stage("Get Pull"){
            cd C:/Users/khaleel safin shaik/Desktop/PlayWright
            git pull
        }

        stage("Test"){
            npx test playwright
        }
    }
}