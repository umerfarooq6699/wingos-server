const express=require("express")
const {placeOrders, checkoutOrder} = require("../Controllers/addtoCart")
const isLogged = require("../Middlewares/isLogged")
const router=express.Router()

router.post("/create-checkout-session",isLogged,placeOrders)
router.post("/orders",checkoutOrder)

module.exports=router