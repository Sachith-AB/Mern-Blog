<<<<<<< HEAD
import expess from 'express'
import { create,deleteAdd,getAdds, updateadd } from '../controllers/add.controller.js'
import { verifyToken } from '../utiles/varifyUser.js'


const router = expess.Router();

router.post('/create',verifyToken,create);
router.get('/getadds',getAdds);
router.delete('/deleteadd/:addId',verifyToken,deleteAdd);
router.put('/updateadd/:addId/:userId',verifyToken,updateadd)

=======
import express from 'express'
import { create } from "../controllers/add.contoller.js";
import { verifyToken } from "../utiles/varifyUser.js";

const router = express.Router();

router.post('/create',verifyToken,create);
>>>>>>> d2c6f2f79b7fa69cc9136d1260fc91ab80838533

export default router;