import expess from 'express'
import { create } from '../controllers/add.controller.js'
import { verifyToken } from '../utiles/varifyUser.js'

const router = expess.Router();

router.post('/create',verifyToken,create);


export default router;