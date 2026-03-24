require("dotenv").config()

const app=require("./src/app.js")
const connectTOdb=require("./src/config/db.js")

connectTOdb()
app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})