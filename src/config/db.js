const mongoose=require("mongoose")

function connectTOdb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected")
    })

    .catch(err =>{
        console.log("error in connecting DB")
        process.exit(1)
    })
}

module.exports=connectTOdb;