import Add from "../models/add.model.js";
import { errorHandler } from "../utiles/error.js"

export const create = async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create a post'));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,'Please provide all required field'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'-');
    const newAdd = new Add ({
        ...req.body,
        slug,
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

export const getAdds=async(req,res,next)=>{
    try{
        const startIndex=parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.startIndex) || 9;
        const sortDirection = req.query.order === 'asc'?1:-1;
        const adds = await Add.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.addId&& {_id:req.query.addId}),
            ...(req.query.searchTerm && {
                $or:[
                    {title:{$regex:req.query.searchTerm,$option:'i'}},
                    {content:{$regex:req.query.searchTerm,$option:'i'}},
                ],
            })

        }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);

        const totalAdds = await Add.countDocuments();
        const now = new Date();

        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth() -1,
            now.getDate()
        );
        const lastMonthAdds= await Add.countDocuments({
            createdAt:{$gte:oneMonthAgo},

        });
        res.status(200).json({
            adds,
            totalAdds,
            lastMonthAdds
        })

    }
    catch(error){
        next(error);
    }
};

export const deleteAdd = async(req,res,next)=>{
   if(!req.user.isAdmin){
    next(errorHandler(403,'You are not allowed to delete this content'))
   }
   try{
    await Add.findByIdAndDelete(req.params.addId);
    res.status(200).json('This post has been deleted');
   }
   catch(error){
    next(error);
   }
}

export const updateadd=async(req,res,next)=>{
    if(!req.user.isAdmin || req.user.id !==req.params.userId){
        return next(errorHandler(403,'You are not allowed to update this add'))
    }
    try{
        const updateadd= await Add.findByIdAndUpdate(
            req.params.addId,
            {
                $set:{
                    title:req.body.title,
                    content:req.body.content,
                    image:req.body.image,
                }
            },{new:true})
               res.status(200).json(updateadd)
        
    }
    catch(error){
        console.log(error);
    }
}