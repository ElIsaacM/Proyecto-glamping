import pool from "../config/db.js";
import { login as loginModel, selectUser } from "../models/login.model.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    const result = await pool.query(loginModel.login, 
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = result.rows[0];
    const coinciden = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!coinciden) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        usuario_id: usuario.usuario_id, 
        email: usuario.email,
        nombre: usuario.usuario_nombre,
        rol: usuario.rol_nombre
      },
      process.env.JWT_SECRET,
      {expiresIn: '8h'}
    );

    res.json({
      message: "Login exitoso",
      token,
      user: { 
        id: usuario.usuario_id, 
        email: usuario.email,
        nombre: usuario.usuario_nombre,
        rol: usuario.rol_nombre
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

export const createLogin = async (req, res) => {
  try {
    const { email, contrasena, tipo_identificacion, numero_identificacion } = req.body;

    await pool.query('BEGIN');

    // 1. Buscar el usuario
    const userResult = await pool.query(
      selectUser.selectUser, 
      [tipo_identificacion, numero_identificacion]
    );

    // Validar si existe antes de acceder a rows[0]
    if (userResult.rows.length === 0) {
      await pool.query('ROLLBACK'); // ¡Importante!
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario_id = userResult.rows[0].usuario_id;

    // 2. Encriptar contraseña correctamente
    const encriptedPassword = await bcrypt.hash(contrasena, 10);

    // 3. Crear el login
    const response = await pool.query(
      loginModel.createLogin, 
      [usuario_id, email, encriptedPassword]
    );

    await pool.query('COMMIT');
    res.json(response.rows[0]);

  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error al crear el login:', error);
    res.status(500).json({ message: 'Error al crear el login' });
  }
}
