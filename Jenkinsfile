pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/PrajaktaJMohite/GreenStore_Website.git'
      }
    }
    stage('Build') {
      steps {
        echo 'Building the project...'
      }
    }
    stage('Test') {
      steps {
        echo 'Running tests...'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying application...'
      }
    }
  }
}
