// load environment variables from .env
require("dotenv").config();

const isDevelopment = process.env.NODE_ENV === "development";

const config = {
    app:{
        port: process.env.PORT,
        secret: process.env.SECRET || 'defaultsecret'
    },
    database:{
        uri_test: process.env.MONGO_URI_TEST,
        uri_dev:isDevelopment
        ? process.env.MONGO_URI  // Local DB for development
        : process.env.MONGO_URI,  // Cloud DB for production  MONGO_URI=production
    }, 
    email:{
        from: process.env.FROM_EMAIL,
        sendgridApiKey: process.env.SENDGRID_API_KEY
    },
}
 
module.exports = config; 