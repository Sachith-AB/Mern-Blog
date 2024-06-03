import mongoose from "mongoose";

const addSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
<<<<<<< HEAD
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
            default:'https://hbr.org/resources/images/article_assets/2021/02/Feb21_19_1218814245.jpg'
=======
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
>>>>>>> d2c6f2f79b7fa69cc9136d1260fc91ab80838533
        },
        slug:{
            type:String,
            required:true,
            unique:true,
        },
<<<<<<< HEAD
        
    },{timestamps:true}

);

const Add = mongoose.model('Add',addSchema);
=======
    },{timestamps:true}

    
)

const Add=mongoose.model('Add',addSchema)

>>>>>>> d2c6f2f79b7fa69cc9136d1260fc91ab80838533
export default Add;