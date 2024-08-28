const bcrypt=require("bcrypt")

const comparePassword=async(dbPassword,password)=>{
    // console.log(dbPassword,"dbPassword")
    // console.log(password,"Password")
    const res=await bcrypt.compare(password,dbPassword)
    return res
}

module.exports=comparePassword