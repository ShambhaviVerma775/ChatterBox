# Contributing to ChatterBox

First off, thank you for considering contributing to ChatterBox! It's people like you that make open source such a great community.

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js**: (v18 or higher recommended) for the Next.js `client`.
- **Go**: (v1.20 or higher recommended) for the `server`.
- **Docker & Docker Compose**: For containerized local development.

## Local Setup

### Option 1: Using Docker (Recommended)
You can run the entire application stack using Docker Compose.
1. Make sure Docker is running.
2. Run the following command from the root of the project:
   ```bash
   docker-compose up --build
   ```
3. The client will be available at `http://localhost:3000` and the server at the configured port.

### Option 2: Manual Local Setup

**1. Client (Next.js)**
```bash
cd client
npm install
npm run dev
```

**2. Server (Go)**
```bash
cd server
Create a .env file similar to .env.example
go mod download
go run cmd/api/main.go
```

## Contribution Workflow

### 1. Fork the Repository
Click the "Fork" button at the top right of this repository to create your own copy.

### 2. Clone your Fork
Clone the repository to your local machine:
```bash
git clone https://github.com/YOUR_USERNAME/ChatterBox.git
cd ChatterBox
```

### 3. Add Upstream Remote
Keep your fork synced with the original repository:
```bash
git remote add upstream https://github.com/iiitl/ChatterBox.git
```

### 4. Create a Branch
Always create a new branch for your feature or bugfix. Do not work directly on the `main` or `master` branch.
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bugfix-name
```

### 5. Make Changes
Make your changes in the codebase. Ensure your code follows the existing style, and make sure any tests pass. For the frontend, check for linting errors in the `client` directory:
```bash
npm run lint
```

### 6. Commit your Changes
Use clear, descriptive commit messages. We recommend following [Conventional Commits](https://www.conventionalcommits.org/):
```bash
git add .
git commit -m "feat: add user profile picture upload"
```

### 7. Push to your Fork
```bash
git push origin your-branch-name
```

### 8. Submit a Pull Request
1. Go to the original repository.
2. Click on "Compare & pull request".
3. Fill out the Pull Request template provided.
4. Submit the PR for review!

## Reporting Bugs and Requesting Features
If you find a bug or have a feature request, please use the issue templates provided in the repository to file an issue.

Thanks again for your contribution!
