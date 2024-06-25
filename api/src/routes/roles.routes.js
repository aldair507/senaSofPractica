import express from 'express'
import { getRoles } from '../controllers/roles.controlllers.js'

const router= express()


router.get('/roles',getRoles)

export default router;