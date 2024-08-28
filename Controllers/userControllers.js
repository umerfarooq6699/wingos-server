const userSchema = require("../Models/userSchema")
const ApiResponse = require("../utils/ApiResponse")
const comparePassword = require("../utils/comparePassword")
const createToken = require("../utils/createToken")
const hashPassword = require("../utils/hashPassword")
const nodemailer = require("nodemailer")

const signup = async (req, res) => {
    try {
        const existingObject=await userSchema.findOne({email:req.body.email})
        console.log(existingObject,"existingObject")

        if(existingObject){
                res.send(new ApiResponse("error","Email already in use"))

        }else{
            console.log(req.body, "signup")
            const bcryptedPassword = await hashPassword(req.body.password)
            console.log(bcryptedPassword, "bcryptedPassword")
            req.body.password = bcryptedPassword
            await userSchema.create(req.body)
            res.send(new ApiResponse("success", "Account created successfully"))
        }

    } catch (error) {
        res.status(500).send({ error: "Failed to create account" })
    }
}

const signin = async (req, res) => {
    // console.log(req.body, "signin")

    const loginObject = await userSchema.findOne({ email: req.body.email })
    // console.log(loginObject, "loginObject")

    if (!loginObject) {
        return res.send(new ApiResponse("error", "Invalid Email"))
    }

    const matchedPassword = await comparePassword(loginObject.password, req.body.password)
    // console.log(matchedPassword, "matchedPassword")

    if (matchedPassword) {
        const Token = createToken(loginObject._id)
        // console.log(Token, "token")
        return res.send(new ApiResponse("success", "Login", { user: loginObject, token: Token }))
    } else {
        res.send(new ApiResponse("error", "Wrong Password"))
    }


}

const logged = (req, res) => {
    res.send({
        name: "ali",
        age: 20
    })
}

const changingPassword = async (req, res) => {
    const matchingPassword = await comparePassword(req.user.password, req.body.oldPassword)
    if (!matchingPassword) {
        return res.send(new ApiResponse("error", "Old password not matched"))
    }
    const encodedPassword = await hashPassword(req.body.newPassword)
    const success = await userSchema.findOneAndUpdate({ _id: req.user._id }, { $set: { password: encodedPassword } }, { new: true })
    if (success) {
        return res.send(new ApiResponse("success", "Password changed successfully"))
    } else {
        res.send(new ApiResponse("error", "Password not changed"))
    }

}

const mailSending = async (req, res) => {
    console.log(req.body, "mail")
    const verifyEmail = await userSchema.findOne({ email: req.body.email })
    console.log(verifyEmail, 'verifyEmail')

    if (!verifyEmail) {
        return res.send(new ApiResponse("error", "Email not matched"))
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Outlook SMTP server
        port: 587, // Outlook SMTP port
        secure: false, // false for TLS - as a boolean not string - if you don't have a certificate
        auth: {
            user: 'umer66997@gmail.com',
            pass: 'qged sqrw vynl ghrj'
        }
    });

    var token = createToken(verifyEmail._id)

    var text = `click here to Add new password http://localhost:5173/setpassword/${token} `

    try {
        await transporter.sendMail({
            from: "umer66997@gmail.com",
            to: verifyEmail.email,
            subject: "Forget Password",
            text
        });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }

}

const setPass = async (req, res) => {
    console.log(req.body, "Body")
    console.log(req.headers.authorization, "Authorization")

    const pass = await hashPassword(req.body.newpassword)
    console.log(pass)

    console.log(req.user, "UUUUUser")

    const response = await userSchema.findOneAndUpdate({ email: req.user.email }, { $set: { password: pass }, new: true })
    if (response) {
        res.send({ notification: "Password Changed Successfully" })
    }
    else {
        res.send({ notification: "Error" })
    }
}

module.exports = { signup, signin, logged, changingPassword, mailSending,setPass}