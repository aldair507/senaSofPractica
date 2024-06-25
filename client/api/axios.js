import axios from 'axios'

const instace= axios.create({
    baseURL:'http://localhost:3000',
    withCredentials: true
})

export default instace; 