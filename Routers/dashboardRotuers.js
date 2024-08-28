const express=require("express")
const { addProducts, getProducts, getAllUsers, getallOrders, dashboardData, dashboardProductDelete, singleProductUpdate, updateProduct, removeUser, removeOrder, } = require("../Controllers/dashboardControllers")
const router=express.Router()

router.post("/addProduct",addProducts)
router.get("/getProduct",getProducts)
router.get("/getUser",getAllUsers)
router.get("/getallOrders",getallOrders)
router.get("/getDashboardData",dashboardData)
router.post("/deleteDashboardProduct",dashboardProductDelete)
router.post("/getsingleproduct",singleProductUpdate)
router.post("/updatedProduct",updateProduct)
router.post("/deleteUser",removeUser)
router.delete("/DeleteOrder/:id",removeOrder)

module.exports=router