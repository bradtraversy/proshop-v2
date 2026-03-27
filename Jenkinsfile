pipeline {
    agent any

    stages {
        stage('Pull Code from Github') {
            steps {
                git branch: 'testing', url: 'https://github.com/artamias/proshop-testing.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}
