const jwt = require("jsonwebtoken")
const ApiResponse = require("../utils/ApiResponse")
const userSchema = require("../Models/userSchema")

const isLogged=async(req,res,next)=>{
    // console.log(req.headers.authorization,"kkkkkkkkkkkkkk")
    const token=req.headers.authorization?.split(" ")[1]
    // console.log(token,"authorization")

    if(!token){
        return res.send(new ApiResponse("error","Please login first"))
    }

    const verifyToken=jwt.verify(token,process.env.KEY)
    // console.log(verifyToken,"verifyToken")

    const user=await userSchema.findOne({_id:verifyToken.id})
    // console.log(user,"user")
    if(!user){
        res.send(new ApiResponse("error","User not found"))
    }else{
        req.user=user
        next()
    }
}

module.exports=isLogged