import axios from './axios'


export const login= (user)=> axios.post('/api/login',user)
export const logoutBack= ()=>axios.post('/api/logout')
export const registerUsuario= usuario=>axios.post('/api/register',usuario)
export const getUsers= ()=> axios.get('/api/users')