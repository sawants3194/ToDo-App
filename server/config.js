// load environment variables from .env
require("dotenv").config();

const isDevelopment = process.env.NODE_ENV === "development";

const config = {
    app:{
        port: process.env.PORT || 5000,
        secret: process.env.SECRET || 'defaultsecret'
    },
    database:{
        uri_test: process.env.uri_test,
        uri_dev:isDevelopment
        ? "mongodb://localhost:27017/todo-app"  // Local DB for development
        : process.env.MONGO_URI,  // Cloud DB for production
    },
    email:{
        from: process.env.FROM_EMAIL,
        sendgridApiKey: process.env.SENDGRID_API_KEY
    },
}
 
module.exports = config; 