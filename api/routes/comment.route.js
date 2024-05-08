import express from 'express'
import { verifyToken } from '../utiles/varifyUser.js';
import { createComment } from '../controllers/comment.controller.js';
import { getPostComments } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create',verifyToken,createComment)
router.get('/getPostComments/:postId',getPostComments)

export default router;