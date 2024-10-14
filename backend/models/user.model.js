import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    verificationToken:{
        type:String,
        required: true,
    },
    profileImg:{
        type:String,
        default:"https://i.ibb.co/BTG6sJ9/user-removebg-preview.png",
    },
    coverImg:{
        type:String,
        default:"https://i.ibb.co/hdV1NwF/web-banner.png",
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
    },
    isSuperAdmin:{
        type:Boolean,
        default:false,
    },
<<<<<<< HEAD
=======
    verified:{
        type:Boolean,
        default:false,
    }
>>>>>>> f2257920a8c85e48012ecf29861321f8fa113194
    
},{timestamps:true});


const User = mongoose.model("User",userSchema);

export default User;