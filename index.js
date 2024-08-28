const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const app=express()
const connection=require("./Connection/connection")
dotenv.config({path:"./.env"})
const path=require("./Routers/userRouters")
const dashboardRouters=require("./Routers/dashboardRotuers")
const addtocart=require("./Routers/addtocartRouters")

connection()
app.use(express.json())
app.use(cors())

app.use("/",path)
app.use("/",dashboardRouters)
app.use("/",addtocart)

app.get("/",(req,res)=>{
    res.send("Hello World")
})


app.listen(4000,()=>{
    console.log("Server Running")
})