const express = require("express");
const user_route = express();
const bodyPraser = require("body-parser");
const multer = require("multer");
const nocache = require('nocache')
const path = require("path");
const session = require("express-session");
const config = require("../Configurations/config");
const auth = require("../middleware/auth");

//for view engine
user_route.set("view engine", "ejs");
user_route.set("views", "./View/users");

user_route.use(bodyPraser.json());
user_route.use(bodyPraser.urlencoded({ extended: true }));

//for session save
user_route.use(nocache());
user_route.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 10 },
  })
);

//for image save
user_route.use(express.static('public'))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/userImages"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

const userCotroller = require("../Controllers/userController");

//for register page
user_route.get("/register", auth.isLogout, userCotroller.loadRegister);
user_route.post("/register", upload.single("image"), userCotroller.insertUser);

//for mailverify
user_route.get("/verify", userCotroller.verifyMail);

//for login page
user_route.get("/login", auth.isLogout, userCotroller.loginLoad);
user_route.get("/",auth.isLogout, userCotroller.loginLoad);
user_route.post("/login", userCotroller.verifyLogin);

//for home page
user_route.get("/home", auth.isLogin, userCotroller.loadHome);

//for logout page
user_route.get("/logout", auth.isLogin, userCotroller.userLogout);

//for forget page
user_route.get("/forget", auth.isLogout, userCotroller.forgetLoad);
user_route.post("/forget", userCotroller.forgetVerify);

//for forgetPassword page 
user_route.get("/forget-password",auth.isLogout, userCotroller.forgetPasswordLoad);
user_route.post("/forget-password", userCotroller.resetPassword);

//for verification mail page
user_route.get("/verification", userCotroller.verificationLoad);
user_route.post("/verification", userCotroller.sentVerificationLink);

//for edit page
user_route.get("/edit",auth.isLogin, userCotroller.editLoad);
user_route.post("/edit",upload.single("image"), userCotroller.updateProfile);

module.exports = user_route;
