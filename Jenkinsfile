pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nikhilabba12/secure-mobile-os-ui'
        IMAGE_TAG = 'latest'
        CONTAINER_NAME = 'secure-mobile-os-ui'
    }

    stages {
        stage('Check Files') {
            steps {
                bat 'dir'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('Build Report') {
            steps {
                bat 'echo Build Success > build-report.txt'
                archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
            }
        }

        stage('Docker Logout Old Session') {
            steps {
                bat 'docker logout'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Docker Pull') {
            steps {
                bat 'docker pull %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Remove Old Container') {
            steps {
                bat 'docker rm -f %CONTAINER_NAME% || exit 0'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 8082:80 --name %CONTAINER_NAME% %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Use Render Deploy Hook here'
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