import express from 'express'
import { create } from "../controllers/add.contoller.js";
import { verifyToken } from "../utiles/varifyUser.js";

const router = express.Router();

router.post('/create',verifyToken,create);

export default router;