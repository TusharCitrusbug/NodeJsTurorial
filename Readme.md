# NODE LEARNING

- https://youtube.com/playlist?list=PLbGui_ZYuhijy1SpwtIS9IwL6OJdbr4kE

- https://youtube.com/playlist?list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM

# basic import and export in nodejs

# Created a first http request using http module

    - Learned to make a package using -- npm init

# Core modules of NodeJs
    - Http module
        - create a basic server.     
    - URL module.
        - The URL module splits up a web address into readable parts.
    - QueryString module.
        - get query string parameters in GET method and directly convert it into an obj.
    - Path module.
        - path joining with current directory.
    - Util module.
        - The Util module provides access to some utility functions.
    - File System.
        - Basic file handling creating files.
        - Getting Directory-path.
        - Getting input from console.
    - Buffer module.
    - Os module
        - used to get the information of our os.
    - Nodemon
        - used to continuous refreshing the server.

********************* Installation of mongo db in ubuntu 22.04 LTS ***********************

    - apt update

    - apt install dirmngr gnupg apt-transport-https ca-certificates software-properties-common

    - wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

    - echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

    - apt-get update

    - echo "deb http://security.ubuntu.com/ubuntu focal-security main" | sudo tee /etc/apt/sources.list.d/focal-security.list

    - sudo apt-get update

    - sudo apt-get install libssl1.1

    - apt-get install -y mongodb-org

    - systemctl start mongod

    - systemctl enable mongod

    - systemctl status mongod

    - mongosh --eval 'db.runCommand({ connectionStatus: 1 })'


********************* Install mongodb compass ***************
 - https://www.mongodb.com/docs/compass/current/install/


# Express JS.

*********************Topics of express js*********************

    - Routing and HTTP Methods
        - get,put,post,patch,delete methods
        - routing using express.Route method.
    - Middleware
        - Globle level Middleware
        - single route level Middleware
    - Cookies(cookie-parser module)
         - set-cookie
         - get-cookie
         - remove a perticular cookie

    - Scaffolding
    - Database Connectivity (MONGO DB)
    - Templating EJS
    - SERVING STATIC FILES
    - FORM DATA handling
    - AUTHENTICATION
    - Error Handling
    - REST API
    - Celery
    - Socket IO


***************** INTRO***********************
    - Introduction to express JS.
    - Created simple get requests using the express js.
    - Rendered html pages/static files using express js with custom path.
    - Passing dynamic data using ejs and rendered on page using ejs for loops and used conditions also.

    Middleware in express js:
        - Middlewere used for checking some conditions while laoding the pagge for ex. login required or login validation.
        - using with app.use() method


        Route-level-middleware
            - applied on single route
            
        Application level middleware
            - apply with app.use() on entire application

********************* Task manager app with mongoose ***************

    - Set-up mongoose and creating a model.
    - Data validation and data senetization.
    - Created two models tasks and users.
    - Created endpoints for create and read for tasks and users.
    - Update and delete end-points created for tasks and users.
    - implimented async await request in all end-points.
    - Seperated routes from index file to another folder.
    - Seperated controllers to another folder and enbaded it to the routes.
    - Added a middle wear to encrypt password in model of user.
    - Password encryption and login user with bcrypt.
    - Generated a jwt token and stored it to the user model.
    - Created an auth middleware and checked that if a token is valid or not.
    - Logout functionality using log-out end point.
    - Added auth middleware to all end-points.
    - Created relationship between user and tasks.
    - Created a script and custom command to create super user and added a isAdmin field.
    - Added created_at and updated_at fields in all models.