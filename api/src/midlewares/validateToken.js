import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../../config/config.js';

export const validateToken = async (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded =  jwt.verify(token, TOKEN_SECRET, (err,user )=>{

        if(err){
            return res.status(401).json({ message: 'Unauthorized: token provided' });


        }

        req.user = user; 

        next();
    });
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};
