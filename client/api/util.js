import axios from "./axios";


export const registroUtil= util=> axios.post('/api/registerutil',util)

export const getUtiles= ()=> axios.get('/api/utiles')

export const estado= ()=> axios.get('/api/estado')

export const asigUtil= user=> axios.post('/api/asignar-util',user)

export const getAsigUtil= ()=> axios.get('/api/get-util')

export const verifyFront= ()=> axios.get ('/api/verify')