import { query } from "express";
import pool from "../db.js";

export const registerUtil = async (req, res) => {
  const { nombre_material, estado } = req.body;

  try {
    const [rows] = await pool.query(
      `INSERT INTO materiales (nombre_material, estado) values (?,?) `,
      [nombre_material, estado]
    );

    let responsData = {
      id: rows.insertId,
      nombre: nombre_material,
      estado: estado,
    };
    console.log(responsData);
    return res.status(200).json(responsData);
  } catch (error) {
    console.log(error, " error al registar material");
  }
};

export const getUtiles = async (req, res) => {
  try {
    const [rows] = await pool.query(`select * from materiales`);
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const estaUtil = async (req, res) => {
  try {
    const [rows] = await pool.query(`
        SELECT COLUMN_TYPE
        FROM information_schema.COLUMNS
        WHERE TABLE_NAME = 'materiales'
        AND COLUMN_NAME = 'estado';
      `);

    const enumStr = rows[0].COLUMN_TYPE;
    const enumValues = enumStr
      .match(/'([^']+)'/g)
      .map((val) => val.replace(/'/g, ""));
    return res.json(enumValues);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching enum values", error });
  }
};

export const asignarUtil = async (req, res) => {


    const {id}= req.user;

    console.log(id)
  const {
    idmaterial,
    usuario_idusuario,
    idrepartidor,
    fecha,
    idestudiante,
    descripcion,
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO gestion (idmaterial, idrepartidor, usuario_idusuario, idestudiante, fecha, descripcion)
         VALUES (?, ?, ?, ?, ?, ?)`,
      [
        idmaterial,
        idrepartidor,
        usuario_idusuario,
        idestudiante,
        fecha,
        descripcion,
      ]
    );

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Util asignado correctamente." });
    } else {
      return res.status(400).json({ message: "No se pudo asignar el util." });
    }
  } catch (error) {
    console.error("Error al asignar util:", error);
    return res
      .status(500)
      .json({ message: "Error en el servidor.", error: error });
  }


};

export const getTodosutiles = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT
    g.fecha,
    g.descripcion,
    u_entrega.nombre_usuario AS nombre_usuario_entrega,
    u_recibe.nombre_usuario AS nombre_usuario_recibe,
    m.nombre_material
FROM
    gestion g
JOIN
    usuario u_entrega ON g.idrepartidor = u_entrega.idusuario
JOIN
    usuario u_recibe ON g.idestudiante = u_recibe.idusuario
JOIN
    materiales m ON g.idmaterial = m.idmateriales;
`);
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
};
