# ToDo App
Table of Contents
Introduction
Features
Technologies Used
Installation
Usage
API Endpoints
Project Structure
Contributing
License

# Introduction
- Adding new tasks
- Viewing All Tasks
- Updating existing tasks
- Deleting tasks

# Features
- Create, Read, Update, and Delete Tasks
- Mark tasks as completed or Incomplete
- Search tasks by title and description
- MongoDB integration for data persistance
- Environment variable support using dotenv
- Nodemon for live server reload using development
- Frontend built with React and React Router

# Technology Used
- MongoDB - NoSQL database for storing user data and tasks
- Express - Backend web framework for building REST APIs
- React - Frontend library for creating user interface
- Node.js - JavaScript runtime environment
- Mongoose - ODM for MongoDB
- dotenv - Environment variables
- Axios - HTTP client for API requests

# Installation

<span style="font-size: 20px; font-weight: bold;">Prerequisites</span>
Ensure you have the following installed:

- Node.js (v18 or later)
- MongoDB (Local instance or MongoDB Atlas)

<span style="font-size: 20px; font-weight: bold;">Step 1: Clone the Repository</span>
1. **Clone the repository**:
    ```bash
    git clone https://github.com/sawants3194/ToDo-App.git
    ```

2. **Navigate to the server project directory**:
    ```bash
    cd zedblock-task/server
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Navigate to the client project directory in new terminal**:
    ```bash
    cd zedblock-task/client
    ```

5. **Install dependencies**:
    ```bash
    npm install
    ```

### Accessing the Application

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

<span style="font-size: 20px; font-weight: bold;">Usage</span>
Ensure you have the following installed:

<span style="font-size: 20px; font-weight: bold;">Prerequisites</span>
Ensure you have the following installed:

- Sign up with your email and password.
- Log in to access your tasks.
- Create, update, delete, and search tasks.

## API Endpoints

### Task Management

| Method  | Endpoint                                | Description                      |
|---------|-----------------------------------------|----------------------------------|
| POST    | `/task/create/:userId`                  | Create a new task for a user    |
| GET     | `/task/search`                          | Search tasks                    |
| PUT     | `/task/state/update/:taskId`           | Update task state               |
| PUT     | `/task/update/:taskId`                 | Update task details             |
| DELETE  | `/task/delete/:taskId`                 | Delete a task                   |
| GET     | `/task/getAll/:userId`                 | Get all tasks for a user        |
| GET     | `/task/getById/:taskId`                | Get task details by task ID     |

### Authentication

| Method  | Endpoint                                | Description                      |
|---------|-----------------------------------------|----------------------------------|
| POST    | `/user/create`                         | Create a new user               |
| POST    | `/user/login`                          | User login                      |


## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature-branch
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add feature
   ```
4. **Push to the branch**
   ```bash
   git push origin feature-branch
   ```
5. **Open a pull request**


   

  
