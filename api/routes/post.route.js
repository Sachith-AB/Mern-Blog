import express from 'express'
import {verifyToken} from '../utiles/varifyUser.js'
import  {create} from '../controllers/post.controller.js'

const router = express.Router();

router.post('/create',verifyToken,create)

export default router;
