const express = require("express");


const { createUser, loginUser } = require("../controller/userController");
var router = express.Router();



router.post("/user/create", createUser);



router.post('/user/login', loginUser)


module.exports = router;
   