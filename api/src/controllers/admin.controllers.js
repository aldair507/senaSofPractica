import pool from "../db.js";
import bcrypt from "bcrypt";
import { createToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../../config/config.js";

import  jwt  from "jsonwebtoken";


export const registerUsuario = async (req, res) => {
  const { nombreUsuario, apellidoUsuario, correoUsuario, rol_idrol, contrasena } =
    req.body;
  try {
    const contrasenaHash = await bcrypt.hash(contrasena, 10);

    const [rolRows] = await pool.query(
      "SELECT nombre_rol FROM rol WHERE idrol = ?",
      [rol_idrol]
    );
    const [rows] = await pool.query(
      "INSERT INTO usuario (nombre_usuario, apellido_usuario,correo_usuario,contrasena,rol_idrol) values(?,?,?,?,?)",
      [nombreUsuario, apellidoUsuario, correoUsuario, contrasenaHash, rol_idrol]
    );
    let responsData = {
      id: rows.insertId,
      nombre: nombreUsuario,
      apellido: apellidoUsuario,
      correo: correoUsuario,
      contrasena: contrasenaHash,
      rol_idrol:rol_idrol
    };
    console.log(responsData);
    return res.status(200).json(responsData);
  } catch (error) {
    res.status(500).json({ message: "error en el servidor ", error: error });
  }
};

export const login = async (req, res) => {
  const { correoUsuario, contrasena } = req.body;
  try {
    const [rows] = await pool.query(
      "select * from usuario where correo_usuario=?",
      [correoUsuario]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }
    const usuario = rows[0];
    const math = await bcrypt.compare(contrasena, usuario.contrasena);

    if (math) {
      const token = await createToken({
        id: usuario.idusuario,
      });
      res.cookie("token", token);
      res.status(200).json({ message: "login succesfull", token: token });
    } else {
      res.status(401).json({ message: "credenciales invalidas" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "error en el servidor",
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT usuario.*, rol.nombre_rol AS nombre_rol
FROM usuario
LEFT JOIN rol ON usuario.rol_idrol = rol.idrol;
`
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const verify = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    const userId = decoded.id;

    const [userRows] = await pool.query(
      "SELECT * FROM usuario WHERE idusuario = ?",
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userRows[0];
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
