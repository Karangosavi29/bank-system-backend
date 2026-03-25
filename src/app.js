const express =require("express")

const authRouter=require("./routes/auth.routes.js")


const app=express()

app.use(express.json())
//post/api/auth/register
app.use("api/auth",authRouter)
module.exports =app