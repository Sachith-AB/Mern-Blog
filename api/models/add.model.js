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
        image:{
            type:String,
            default:'https://hbr.org/resources/images/article_assets/2021/02/Feb21_19_1218814245.jpg',
            required:true
        },
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        image:{
            type:String,
            default: 'https://www.mindmeister.com/blog/wp-content/uploads/2019/03/Document-Writing.png'

        },
        slug:{
            type:String,
            required:true,
            unique:true,
        },

        
    },{timestamps:true}

);

const Add=mongoose.model('Add',addSchema)


export default Add;