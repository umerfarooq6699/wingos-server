const bcrypt=require("bcrypt")

const hashPassword=async(password)=>{
    // console.log(password," hashed")
    const res=await bcrypt.hash(password,10)
    return res
}

module.exports=hashPassword