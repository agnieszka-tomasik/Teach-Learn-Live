# Setup
The project requires the following technologies to run:

- [Node v12.+](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [A paypal developer account](https://developer.paypal.com/classic-home/)

It is recommended to use a [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/signup) to manage your database instance.

Additionally, PayPal API keys and credentials will be required for payment and store processing to work.


## Available Scripts

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run-script server`

Runs just the server in development mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

## Config File
`client/public/index.html`

Once you have a PayPal API account, you will be provided with an SDK link. The link should be copy pasted 

Find the following line:
```<script src = ""></script>```
and paste your SDK link inside the double quotes.

`server/config/config.js`

Contains all the configuration for the application to run. Use config.example.js as an example to copy and paste.

The following keys are used for local development:
```
    db: {
        uri: 'mongodb://127.0.0.1:27017', // Holds the MongoDB connection string
    },
    secret: 'test', // Holds the secret for session storage.
```


In order to run in production, one must set the following environment variables in order for the application to run. Heroku provides easy access to modification of the environment variables through their dashboard UI by accessing the settings page of the application

- `DB_URI` - The MongoDB connection string
- `SESSION_SECRET` - The secret to use for storing user sessions. This can be any arbitrary value but *must* not be revealed to others.

## Creating an Administrator

The first administrator of the site will need to be manually updated in the database. This will require modifying your MongoDB instance and setting the `isAdmin` key to true for the desired user. Afterwards, it will be possible to create administrators through the website.

If MongoDB Atlas was used, a database viewer is provided by the service that you can use to modify the MongoDB database.


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!

## Learn More
To learn how to setup a local MongoDB instance for testing, check out how to [connect to MongoDB](https://docs.mongodb.com/guides/server/drivers/).

To learn how to deploy a full-stack web app to heroku, check out [this great guide](https://daveceddia.com/deploy-react-express-app-heroku/).

To learn React, check out the [React documentation](https://reactjs.org/).