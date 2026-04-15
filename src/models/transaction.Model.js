const mongoose =require ("mongoose")


const transactionSchema =new mongoose.Schema({

    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:  [true, "transaction must be associated with a from account"],
        index: true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true, "transaction must be asscociated with a to account"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values: ["PENDING","COMPLETED","FAILED","REVERSED"],
            message:"status can be either COMPLETED FAILED or REVERSED",
        },
        default:"PENDING"
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for a creating a transaction"],
        min:[0, "Amount must be a positive number"]
    },
    idempotencyKey:{
        type:String,
        required: [true,"Idempotency Key is reuired for creating a transaction"],
        index:true,
        unique:true
    }


},{   timestamps:true
})



const trancationModel = mongoose.model("transaction",transactionSchema)

module.exports = trancationModel