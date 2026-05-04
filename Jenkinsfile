pipeline {
    agent any

    stages {

        stage('Check Docker') {
            steps {
                bat 'docker version'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t nikhilabba12/secure-mobile-os-ui:latest .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat 'docker login -u %USER% -p %PASS%'
                }
            }
        }

        stage('Push Image') {
            steps {
                bat 'docker push nikhilabba12/secure-mobile-os-ui:latest'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker rm -f secure-container || echo no container'
                bat 'docker run -d -p 5000:80 --name secure-container nikhilabba12/secure-mobile-os-ui:latest'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        success {
            echo 'Pipeline success'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}