import express from "express";
import { c_createUser, c_getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', c_getUsers )
router.post('/create', c_createUser )

export default router