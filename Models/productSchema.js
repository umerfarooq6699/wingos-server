const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    path:{
        type:String
    },
    name:{
        type:String
    },
    price:{
        type:Number
    },
    category:{
        type:String
    }
})

module.exports=mongoose.model("productSchema",productSchema)