import pool from '../config/db.js';
import nodemailer from 'nodemailer';
import { getEmails } from '../models/notification.model.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendSystemOnlineEmail = async (urlPublica) => {
  try {
    const res = await pool.query(
      getEmails
    );
    const empleados = res.rows;

    if (empleados.length === 0) return;

    const promises = empleados.map(empleado => {
      return transporter.sendMail({
        from: '"Sistema Glamping" <glampinglosbosques9@gmail.com> ',
        to: empleado.email,
        subject: '🚀 Sistema en línea - Acceso disponible',
        html: `
          <h1>¡Hola!</h1>
          <p>El sistema ya está encendido. Usa el siguiente link para entrar hoy:</p>
          <a href="${urlPublica}" style="display:inline-block; padding:12px; background:#3498db; color:white; text-decoration:none; border-radius:5px;">
            Entrar al Panel
          </a>
          <p>Ruta: ${urlPublica}</p>
        `
      });
    });

    await Promise.all(promises); // Más rápido: envía todos en paralelo
    console.log('✅ Notificaciones enviadas correctamente');
  } catch (error) {
    console.error('❌ Error en EmailService:', error);
  }
};