# CI/CD with Azure Pipelines

## Overview
This is a React project that implements a CI/CD pipeline using **Azure Pipelines**. The pipeline automates the build, test, and deployment process, ensuring a smooth workflow for continuous integration and delivery.

## Features
- **Continuous Integration (CI)**:
  - Installs dependencies
  - Runs tests
  - Builds the project
  - Stores artifacts
- **Continuous Deployment (CD)**:
  - Downloads build artifacts
  - Builds a Docker image
  - Pushes the image to Docker Hub

## Azure CI/CD Pipeline Breakdown

### ** Build Stage**
- Installs Node.js and dependencies
- Runs tests
- Builds the React application
- Publishes build artifacts

### ** Docker Build & Push Stage**
- Downloads build artifacts
- Builds a Docker image
- Pushes the image to Docker Hub

### **Pipeline Configuration (`azure-pipelines.yml`)**
```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

stages:
- stage: Build
  jobs:
  - job: BuildAndTest
    steps:
    - task: NodeTool@0
      inputs:
        versionSpec: '14.x'
      displayName: 'Install Node.js'

    - script: |
        npm install
        npm run build
        mkdir -p $(Build.ArtifactStagingDirectory)
        cp -R build/* $(Build.ArtifactStagingDirectory)
      displayName: 'Build Application'

    - script: |
        CI=true npm test
      displayName: 'Run Tests'

    - task: PublishBuildArtifacts@1
      inputs:
        PathtoPublish: '$(Build.ArtifactStagingDirectory)'
        ArtifactName: 'drop'
```

## 📦 Docker Deployment

### **Dockerfile**
```dockerfile
FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3000
```

### **Push to Docker Hub**
```yaml
    - script: |
        docker build -t $(DOCKER_USERNAME)/myapp:$(Build.BuildId) .
        docker push $(DOCKER_USERNAME)/myapp:$(Build.BuildId)
      displayName: 'Build and Push Docker Image'
```
