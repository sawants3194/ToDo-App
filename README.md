# ToDo App
## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [API Endpoints](#api-endpoints)
6. [Contributing](#contributing)
7. [License](#license)


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

# Technologies Used
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
    cd ToDo-App/server
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Navigate to the client project directory in new terminal**:
    ```bash
    cd ToDo-App/client
    ```

5. **Install dependencies**:
    ```bash
    npm install
    ```

6. Set up environment variables:
    - Create a `.env` file in both the root and client directories.
    - Add necessary configurations like:
        - **DATABASE**: "mongodb://127.0.0.1:27017/database_name"
        - **PORT**: Port for the backend server
     
    - **Client-side (.env)**: Add the following configuration:
        - `REACT_APP_BACKEND=http://127.0.0.1:PORT/api/v1` (URL of the backend server)
     


### Accessing the Application

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:PORT/api/v1`

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


   

  
