import mongoose from "mongoose";

const studentschema = new mongoose.Schema({

    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    gender : {
        type:String,
        required:true
    },
    phonenumber : {
        type:Number,
        required:true
    },
    
}

)

const studentmodel = mongoose.model("studentmodel",studentschema);
export default studentmodel;