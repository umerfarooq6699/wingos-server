const jwt=require("jsonwebtoken")

const createToken=(id)=>{
    const res=jwt.sign({id:id},process.env.KEY,{expiresIn:"2d"})
    return res
}

module.exports=createToken