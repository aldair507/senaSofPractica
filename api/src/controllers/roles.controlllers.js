import { query } from "express";
import pool from "../db.js";

export const getRoles = async (req, res) => {
  try {
    const [rows] = await pool.query(" select * from rol;");
    res.json(rows);
    return rows.data;
  } catch (error) {
    console.log(error);
  }
};


