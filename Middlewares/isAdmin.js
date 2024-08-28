const ApiResponse = require("../utils/ApiResponse")

const isAdmin=(req,res,next)=>{
    if(req.user.role==="admin"){
        return next()
    }else{
        res.send(new ApiResponse("error","You are not authorized"))
    }
}

module.exports=isAdmin