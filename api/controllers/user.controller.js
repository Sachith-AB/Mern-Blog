import { errorHandler } from "../utiles/error.js";
import bycryptsjs from 'bcryptjs'
import User from '../models/user.model.js';


export const test= (req,res) => {
  res.json({message: 'API is working..!'});
   };

   export const updateUser = async (req,res,next) =>{
      if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to update this user'));
      }
      if(req.body.password){
        if(req.body.password.length<6){
          return next(errorHandler(400,'Password must be at least 6 characters'));
        }
        req.body.password = bycryptsjs.hashSync(req.body.password,10);

      }
      if(req.body.username){
        if(req.body.username.lenght<7 || req.body.username>20){
          return next(errorHandler(400,'Username must be between 7 and 20 characters'));
        }
        if(req.body.username.includes(' ')){
          return next(errorHandler(400,'Username cannot contain space'))
        }
        if(req.body.username !==req.body.username.toLowerCase()){
          return next(errorHandler(400,'Username must be lowecase'))
        }
        if(!req.body.username.match(/^[a-z-Z0-9]+$/)){
          return next(errorHandler(400,'Username can only contain letter and number'))
        }
      }
        try{
          const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
              username:req.body.username,
              email:req.body.email,
              profilePicture:req.body.profilePicture,
              password:req.body.password
            }
          },{new:true});
          const {password, ...rest} = updatedUser._doc;
          res.status(200).json(rest);
        }
        catch(error){
          next(error)
        }
      
   }

   export const deleteUser = async (req,res,next) =>{
    if(req.user.id !== req.params.userId){
      return next(errorHandler(403,'You are not allowed to delete this user'));
    }
      try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({message:'User has been deleted'}
      )
      }catch(error){
        next(error)
      }
    

   }

   export const signout=(req,res,next) =>{
    try{
      res.clearCookie('access_token').status(200).json("User has been signed out");
    }
    catch(error){
      next(error);
    }


   }