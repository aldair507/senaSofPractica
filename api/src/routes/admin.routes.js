

import { Router } from "express";
import { getUsuarios, login, logout, registerUsuario } from "../controllers/admin.controllers.js";

const router= Router()


router.post('/register',registerUsuario)
router.post('/login',login)
router.post('/logout',logout)
router.get('/users',getUsuarios)

export default router;