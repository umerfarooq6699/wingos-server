const express=require("express")
const {signup, signin, logged, changingPassword, mailSending, setPass} = require("../Controllers/userControllers")
const isLogged = require("../Middlewares/isLogged")
const router=express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/",isLogged,logged)
router.post("/changePassword",isLogged,changingPassword)
router.post("/sendmail",mailSending)
router.post("/setpassword",isLogged,setPass)

module.exports=router