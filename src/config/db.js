const mongoose=require("mongoose")

function connectTOdb(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Database connected")
    })

    .catch(err =>{
        console.log("error in connecting DB", err.message)
        process.exit(1)
    })
}

module.exports=connectTOdb;