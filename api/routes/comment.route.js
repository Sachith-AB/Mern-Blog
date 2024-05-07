import express from 'express'
import { verifyToken } from '../utiles/varifyUser.js';
import { createComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create',verifyToken,createComment)

export default router;