# Hiring To-Do List Application

## Description
A dynamic, full-stack to-do list app designed to showcase the integration of frontend and backend technologies. This application features task management, user authentication, and seamless data persistence with MySQL. The goal is to demonstrate how React (frontend) and Node.js (backend) can work together in a modern web application.


## Features
- **Add, Edit, and Delete Tasks**: Easily manage tasks within the app.
- **Mark as Completed**: Track completed tasks with the ability to filter them.
- **Data Persistence**: All tasks are stored in a MySQL database, ensuring they persist across sessions.
- **User Authentication**: Secure login and registration using JWT and Bcrypt.
- **API Integration**: A backend API handles CRUD operations for tasks.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Light/Dark Mode**: Smart support for light and dark themes.


## Tech Stack
- ### Frontend:
    - **Framework**: React(v18.x)
    - **Styling**: CSS, Styled Components/Material-UI
    - **State Management**: Redux

- ### Backend:
    - **Runtime**: Node.js(v16.0.0 or higher)
    - **Framework**: Express.js
    - **Database**: MySQL(v8.0.0 or higher)
    - **Authentication**: JWT/Bcrypt


## Prerequisites
Before you start, make sure you have the following installed:
- **Node.js**: Version 16.0.0 or higher.
- **MySql**: Version 8.0.0 or higer.


## Installation
Follow the steps below to set up and run the application locally.

1. **Clone the repository**:

    Clone the repository to your local machine:

    ```bash
    git clone https://github.com/rizzolib/hiring-todo-list-app
    cd hiring-todo-list-app
    ```
2. **Install dependencies**:
    - **Backend**:
        Navigate to the backend directory and install the dependencies:
        ```bash
        cd backend
        npm install
        ```
    - **Frontend**:
        Navigate to the frontend directory and install the dependencies:
        ```bash
        cd frontend
        npm install --force
        ```
3. **Set Up Environment Variables**:
    Create a ```.env``` file in the backend directory. You can refer to the ```.env.example``` file for a template.
    ```.env``` Configuration Example:
    ```env
    DB_TYPE = "mysql"
    DB_HOST = "localhost"
    DB_USERNAME = "root"
    DB_PASSWORD = ""
    DB_PORT = 3306
    DB_NAME = "todo_list"
    PORT = 8000
    SECRET_KEY = "todo_list"
    EXPIRE_TIME = 3600
    ```
    - ```DB_PASSWORD```: Set your MySQL root password if applicable.
    - ```DB_NAME```: The name of the database (you can create a database named ```todo_list``` in MySQL).
4. **Set Up MySQL**:
    If you're using XAMPP:
    - Install **XAMPP v3.3.0** (or the latest version).
    - Open **XAMPP Control Panel** and start the **MySQL** service.
    Alternatively, if you're using a standalone MySQL installation, make sure the MySQL service is running.


## Usage

1. **Start the backend server**:
    Navigate to the ```backend``` directory and run the following commands:

    ```bash
    cd backend
    npm run db
    npm run dev
    ```

    This will start the backend server at ```http://localhost:8000```.

2. **Start the frontend**:
    Navigate to the ```frontend``` directory and run:

    ```bash   
    cd frontend
    npm start
    ```

    This will start the frontend React application, and you can access it at:

    ```bash
    http://localhost:3000
    ```

3. **Test the Application**:
    Once both the frontend and backend are running, you can interact with the app through your browser:

    - Create new tasks, edit them, and delete them.
    - Register an account or log in to access task management features.
    - Switch between light and dark modes.