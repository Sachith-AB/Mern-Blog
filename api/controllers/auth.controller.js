import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utiles/error.js';
import jwt from 'jsonwebtoken';

export const signup = async(req,res,next) => {
    const { username,email,password} = req.body;


if(!username || !email || !password || username === '' || email=== '' || password === ''){
   next(errorHandler(400,'All fields are required'));
}

const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    });

    try{
    await newUser.save();
    res.json('Signup sucessful');
    }
    catch(error){
next(error);
    }
};

export const signin = async(req,res,next) => {
   const  {email,password} = req.body;

   if(!email || !password|| email===''||password===''){
    next(errorHandler(400,'All field are required'))
   }

   try{
const vaildUser = await User.findOne({email});
if (!vaildUser){
    return next(errorHandler(404,'User not found'))
}
const validPassword = bcryptjs.compareSync(password,vaildUser.password);
if(!validPassword){
    return next(errorHandler(400,'Invalid password'));
}
const token = jwt.sign(
    {
        id:vaildUser._id
    },
    process.env.JWT_SECRET
);
const{password:pass, ...rest} = vaildUser._doc;

res
.status(200).cookie('access_token',token,{
    httpOnly:true,
})
.json(rest);

   }
   catch(error){
    next(error)
   }
};