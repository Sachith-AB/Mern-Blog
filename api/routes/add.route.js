import expess from 'express'
import { create,deleteAdd,getAdds, updateadd } from '../controllers/add.controller.js'
import { verifyToken } from '../utiles/varifyUser.js'


const router = expess.Router();

router.post('/create',verifyToken,create);
router.get('/getadds',getAdds);
router.delete('/deleteadd/:addId',verifyToken,deleteAdd);
router.put('/updateadd/:addId/:userId',verifyToken,updateadd)



export default router;

