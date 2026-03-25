const mongoose =require("mongoose")
const bcrypt =require("bcrypt")
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for creating a user"],
        trim:true,
        lowercase:true,
        match:[/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,"Invalid email address"],
        unique:[true,"Email Already exists"]
    },

    name:{
        type:String,
        required:[true,"Name is required"],
    },
    password:{
        type:String,
        require:[true,"password is required"],
        minlength:[6,"password should be more than 6 character "],
        select:false
    }
},{timestamps:true})

// Hash password before saving
userSchema.pre("save",async function (next) {
    
    if(!this.isModified("password")){
        return next();
    }
    const hash= await bcrypt.hash(this.password,10)
    this.password=hash
    return next()
})

//compare password
userSchema.methods.comparepassword=async function (password) {
    return await bcrypt.compare(password,this.password)
}

const userModel =mongoose.model("user",userSchema)

module.exports =userModel