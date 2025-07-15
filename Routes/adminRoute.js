const express = require('express')
const admin_route = express()
const bodyPraser = require('body-parser')
const session = require('express-session')
const multer = require("multer");
const path = require("path");
const config = require('../Configurations/config')
const adminController = require('../Controllers/adminController')
const auth = require('../middleware/adminAuth')

//for view engine
admin_route.set('view engine','ejs')
admin_route.set("views", "./View/admin");


admin_route.use(bodyPraser.json())
admin_route.use(bodyPraser.urlencoded({extended:true}))

//for image save
admin_route.use(express.static('public'))

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

//for session save
admin_route.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 10 },
  })
);


//for login page
admin_route.get('/', auth.isLogout, adminController.loginLoad)
admin_route.post('/', adminController.verifyLogin)

//for home page
admin_route.get('/home', auth.isLogin, adminController.loadDashboard)

//for logout page
admin_route.get('/logout', auth.isLogin, adminController.logoutLoad)

//for forget page
admin_route.get('/forget', auth.isLogout, adminController.forgetLoad)
admin_route.post('/forget', adminController.forgetVerify)

//for forgetPassword page
admin_route.get('/forget-password', adminController.forgetPasswordLoad)
admin_route.post('/forget-password', adminController.forgetPasswordVerify)

//for dashboard page
admin_route.get('/dasboard',auth.isLogin, adminController.dasboardLoad)

//for addUsers page
admin_route.get('/add',auth.isLogin, adminController.addUserLoad)
admin_route.post('/add', upload.single("image"), adminController.addUserVerify)

//for edit page
admin_route.get('/edit-user',auth.isLogin, adminController.editUserLoad)
admin_route.post('/edit-user', adminController.updateProfile)

//for delete page
admin_route.get('/delete-user', adminController.deleteUser)


module.exports = admin_route;