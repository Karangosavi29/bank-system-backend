const express =require("express")
const cookieParser =require("cookie-parser")

const app=express()


app.use(express.json())
app.use(cookieParser())


//routes required
const authRouter=require("./routes/auth.routes.js")
const accountRouter=require("./routes/account.routes.js")
const transactionRoutes=require("./routes/transaction.routes.js")
//use Routes
app.use("/api/auth",authRouter)
app.use("/api/accounts",accountRouter)
app.use("/api/transactions",transactionRoutes)


module.exports =app