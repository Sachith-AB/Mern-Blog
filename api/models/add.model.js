import mongoose from "mongoose";

const addSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required: true
        },
        title:{
            type:String,
            required:true,
            unique:true,
            
        },
        content:{
            type:String,
            required:true,
            
        },
        slug:{
            type:String,
            required:true,
            unique:true,
        },
        
    },{timestamps:true}

);

const Add = mongoose.model('Add',addSchema);
export default Add;