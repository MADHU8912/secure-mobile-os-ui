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
                (
                  echo ==========================
                  echo BUILD REPORT
                  echo ==========================
                  echo Job Name: %JOB_NAME%
                  echo Build Number: %BUILD_NUMBER%
                  echo Image Name: %IMAGE_NAME%:%IMAGE_TAG%
                  echo Date: %DATE%
                  echo Time: %TIME%
                ) > build-report.txt
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
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
                bat '''
                docker ps -a --format "{{.Names}}" | findstr /R "^%CONTAINER_NAME%$" >nul
                if %ERRORLEVEL%==0 (
                    docker rm -f %CONTAINER_NAME%
                ) else (
                    echo No old container found
                )
                '''
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p %HOST_PORT%:%CONTAINER_PORT% --name %CONTAINER_NAME% %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Add render deploy hook later'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
            echo 'Pipeline finished'
        }
        success {
            echo 'Build successful'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
