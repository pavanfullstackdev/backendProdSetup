<!-- PAVAN BIRARI  -->

This is the PRODUCTION level setup for the backend to start with.

[Model Link](#)

# Project Setup

Steps to follow to create this setup:

1. Create an empty folder and open it in VS Code or any code editor you like.

2. Run `npm init` to set up the initial `package.json`. There are two ways to create `package.json` after this command:
    1. You can accept all settings by pressing enter.
    2. You can provide your inputs and press enter.

3. Create a `Readme.md` file and write something in it.

4. Run `git init` to initialize the git repository.

5. Run `git add .`

6. Run `git commit -m 'first commit'`

7. Create a new repository on GitHub.

8. Change the branch to main by using the git command:
    ```sh
    git branch -M main
    ```

9. Set the remote branch as origin:
    ```sh
    git remote add origin <your-repo-url>
    ```

10. Push the code:
    ```sh
    git push -u origin main
    ```

## Folder Structure

### 1. Public Folder
- **Path**: `public/temp/.gitkeep`
- **Purpose**: The `temp` folder is created to temporarily save files uploaded by users.
- **Note**: A `.gitkeep` file is added to track the empty `temp` folder in the Git repository.

### 2. Source Code Folder
- **Path**: `src/`
- **Subfolders**:
  - `models/`: Contains database models.
  - `controllers/`: Contains logic for handling requests and responses.
  - `utils/`: Contains utility functions and helpers.
  - `db/`: Contains database connection and configuration files.
  - `middleware/`: Contains middleware functions.
  - `routes/`: Contains route definitions for the application.

### 3. Application Files
- **`app.js`**: The main application file responsible for initializing the server, setting up middleware, and defining the base configurations.
- **`index.js`**: The entry point of the application that starts the server.
- **`constant.js`**: Contains global constants used throughout the application.

### 4. Environment and Git Ignore
- **Files**:
  - `.env`: For storing environment-specific variables such as database connection strings and API keys.
  - `.gitignore`: To exclude specific files and folders from being tracked by Git (e.g., `node_modules`, `.env`, and temporary files).

## Setup Nodemon, Prettier, and Type Module

### 1.To use the import and export statements in your Express and Mongoose setup, add "type": "module" to your package.json file:

    {
     "type": "module"
    }

### 2. Install nodemon and prettier as development dependencies:

    npm install --save-dev nodemon
    npm install --save-dev prettier

### 3. Add a dev script in your package.json to run the app with nodemon, automatically loading environment variables using dotenv and enabling JSON modules:

    "scripts": {
            "dev": "nodemon -r dotenv/config  --experimental-json-modules src/index.js"=
    }

### 4. Configure Prettier

.prettierrc: Contains Prettier configuration rules. Example:

            {
                "semi": true,
                "singleQuote": true,
                "trailingComma": "all"
            }

`.prettierignore`: 
Specifies which files or directories to ignore when formatting. 

`.prettierignore`: 
Specifies which files or directories to ignore when formatting. 
# Database Connection Steps

1. Open [mongodb.com](https://www.mongodb.com/)
2. Log in
3. Create a new project
4. Name your new project
5. Click on "Next" and then click "Create Project"
6. Click on "Create Cluster"
7. Choose the free cluster
8. Choose the nearest AWS region (e.g., Mumbai)
9. Click on "Create Deployment"
10. Add the current IP address or allow access from anywhere
11. Type a username and password (do not use any special characters in the password)
12. Click on "Create DB User"
13. Click on "Choose a Connection Method"
14. Choose any one connection method
15. Copy the connection string

This is how we create a MongoDB database so that we can now connect it from our codebase.

# Steps to Integrate the MongoDB URL and Run Our Server

1. In the `.env` file, define our `PORT` and `MONGODB_URI`:
    ```env
    PORT=3000
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    ```
2. Create a constant in `constant.js` file for the database name:
    ```javascript
    export const DB_NAME = 'your_database_name';
    ```
3. Install necessary packages:
    ```sh
    npm install dotenv mongoose express
    ```
4. Connect to the database in `index.js` and `dbindex.js`:
   
5. Use Express in `app.js`:
6. Install additional packages:
    ```sh
    npm install cors cookie-parser
    ```

7. Run the server:
    ```sh
    npm run dev
    ```
    

### now creating a user model to register a user 
### now creating a user controller to write the user realted functinality like register login logout.
### create routes for the api  . for example /user/register
### now test the api in postman


