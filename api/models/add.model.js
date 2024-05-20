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
            unique:true
        },
        content:{
            type:String,
            
        },
        
    },{timestamps:true}

);

const Add = mongoose.model('Add',addSchema);
export default Add;