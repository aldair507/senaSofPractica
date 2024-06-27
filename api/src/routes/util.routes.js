import express from 'express'
import { asignarUtil, estaUtil, getTodosutiles, getUtiles, registerUtil } from '../controllers/utiles.controllers.js';
import { get } from 'react-hook-form';
import { validateToken } from "../midlewares/validateToken.js";
const router= express()


router.post('/registerutil', registerUtil)
router.get('/utiles',getUtiles)
router.get('/estado',estaUtil)
router.post('/asignar-util',validateToken,asignarUtil)
router.get('/get-util',getTodosutiles)

export default router;