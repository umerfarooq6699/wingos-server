const ordersSchema = require("../Models/ordersSchema")
const productSchema = require("../Models/productSchema")
const userSchema=require("../Models/userSchema")
const ApiResponse = require("../utils/ApiResponse")

const addProducts=async(req,res)=>{
    console.log(req.body,"product controller")
    await productSchema.create(req.body)
}

const getProducts=async(req,res)=>{
    const products=await productSchema.find({})
    return res.send(new ApiResponse("success","Product deleted successfully",{array:products}))
}

const getAllUsers=async(req,res)=>{
    const Users=await userSchema.find({})
    return res.send(new ApiResponse("success","User deleted successfully",{array:Users}))
}

const getallOrders=async(req,res)=>{
    const Orders=await ordersSchema.find({})
    return res.send(new ApiResponse("success","Order deleted successfully",{array:Orders}))
}
 
const dashboardData=async(req,res)=>{
    const products=await productSchema.find()
    const users=await userSchema.find()
    const orders=await ordersSchema.find()
    res.send(new ApiResponse("success","Dashboard data fetched successfully",{totalProducts:products.length,totalUsers:users.length,totalOrders:orders.length}))
}

const dashboardProductDelete=async(req,res)=>{
    console.log(req.body,"Delte== body")
    const remove=await productSchema.findOneAndDelete({_id:req.body._id})
    const products=await productSchema.find()
    res.send(new ApiResponse("success","Product deleted successfully",{array:products}))
}

const singleProductUpdate=async(req,res)=>{
    const singleObject= await productSchema.find({_id:req.body.id})
    res.send(new ApiResponse("success","Product fetched successfully",{singleObject}))
}

const updateProduct=async(req,res)=>{
    console.log(req.body,"KKKKKKKKKKKKK")
    const updatedData=await productSchema.findOneAndUpdate({_id:req.body.singleObj._id},{$set:req.body.obj},{new:true})
    res.send(new ApiResponse("success","Product updated successfully",{array:updatedData}))
}

const removeUser=async(req,res)=>{
    console.log(req.body,"Users")
    const users=await userSchema.findOneAndDelete({_id:req.body.id})
    const userData=await userSchema.find()
    res.send(new ApiResponse("success","User deleted successfully",{array:userData}))
}

const removeOrder=async(req,res)=>{
    console.log(req.params.id,"PParams")
    await ordersSchema.findOneAndDelete({_id:req.params.id})
    const orderData=await ordersSchema.find()
    res.send(new ApiResponse("success","Order deleted successfully",{array:orderData}))
}

module.exports={addProducts,getProducts,getAllUsers,getallOrders,dashboardData,dashboardProductDelete,singleProductUpdate,updateProduct,removeUser,removeOrder}