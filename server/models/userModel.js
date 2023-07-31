import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "please provide your first name"],
    },
    lastName:{
        type:String,
        required:[true, "please provide your last name"],
    },
    email:{
        type:String,
        required:[true,"please provide an Email"],
        unique:[true,"Mail Alrady exists"]
    },
    password:{
        type:String,
        required:[true,"please provide a password"]
    },
    role:{
        type:String,
        default:'visitor'
    }
})

export default mongoose.model.users || mongoose.model('user',UserSchema)