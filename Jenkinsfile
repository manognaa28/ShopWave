pipeline {
    agent any

    tools {
        nodejs "NodeJS"  // Make sure NodeJS is configured in Jenkins global tools
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/manognaa28/ShopWave.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Integration Tests') {
            steps {
                sh 'npm test'  // Fails the build if tests fail
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx jest --passWithNoTests'
            }
        }
    }
}
