pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nikhilabba12/secure-mobile-os-ui'
        IMAGE_TAG = 'latest'
        CONTAINER_NAME = 'secure-mobile-container'
        HOST_PORT = '8082'
        CONTAINER_PORT = '80'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

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
                bat '''
                @echo off
                (
                  echo ==========================
                  echo BUILD REPORT
                  echo ==========================
                  echo Job Name: %JOB_NAME%
                  echo Build Number: %BUILD_NUMBER%
                  echo Image Name: %IMAGE_NAME%:%IMAGE_TAG%
                  echo Container Name: %CONTAINER_NAME%
                  echo Date: %DATE%
                  echo Time: %TIME%
                ) > build-report.txt
                '''
            }
        }

        stage('Docker Logout Old Session') {
            steps {
                bat 'docker logout || exit 0'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '@echo off && echo %DOCKER_PASS%| docker login -u %DOCKER_USER% --password-stdin'
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
                bat '''
                @echo off
                docker rm -f %CONTAINER_NAME% 2>nul
                exit /b 0
                '''
            }
        }

        stage('Run Container') {
            steps {
                bat '''
                @echo off
                docker run -d -p %HOST_PORT%:%CONTAINER_PORT% --name %CONTAINER_NAME% %IMAGE_NAME%:%IMAGE_TAG%
                '''
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Add Render deploy hook here'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
            echo 'Pipeline finished'
        }
        success {
            echo 'Build, push, pull, run and deploy completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
