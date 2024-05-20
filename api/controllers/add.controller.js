import Add from "../models/add.model.js";
import { errorHandler } from "../utiles/error.js"

export const create=async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create a post'));
    }
    if(!req.body.title || req.body.content){
        return next(errorHandler(400,'Pleasse provide all required field'))
    }
    const newAdd = new Add ({
        ...req.body,
        userId:req.user.id
    });

    try{
        const savedAdd = await newAdd.save();
        res.status(201).json(savedAdd);
    }
    catch(error){
        next(error);
    }
};