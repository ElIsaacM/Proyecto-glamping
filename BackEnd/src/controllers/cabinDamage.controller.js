import pool from "../config/db.js";
import { cabinDamage } from '../models/cabinDamage.model.js';
import { notification } from "../models/notification.model.js";

export const getCabinsDamage = async (req, res) => {
    try {
        const result = await pool.query(cabinDamage.getCabinsDamage);

        if (result.rows.length === 0) {
            throw new Error("Cabin damage data not found")
        };

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const getCabinDamageByName = async (req, res) => {
    try {
        const { name } = req.body;

        const result = await pool.query(
            cabinDamage.getCabinDamageByName,
            [name.trim()]
        )

        res.json(result.rows)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const createCabinDamage = async (req, res) => {
    try {
        const {
            cabanaid,
            descripcion,
            estado,
            fechaRegistro,
            fechaarreglo,
            responsable,

            userName
        } = req.body;

        await pool.query("BEGIN");

        const result = await pool.query(cabinDamage.createCabinDamage, [
            cabanaid,
            descripcion,
            estado,
            fechaRegistro,
            fechaarreglo,
            responsable
        ]);

        await pool.query(notification.createNotification, [
            userName,
            "Daño cabaña",
            `El daño a la cabaña #${cabanaid} ha sido creado`
        ]);

        await pool.query("COMMIT");

        res.status(201).json(result.rows[0]);
    } catch (error) {
        await pool.query("ROLLBACK");
        res.status(500).json({message: error.message});
    }
};

export const updateCabinDamage = async (req, res) => {
    try {
        const {
            descripcion,
            estado,
            fechaarreglo,
            responsable,
            cabanaid,

            userName
        } = req.body;

        await pool.query("BEGIN");

        const result = await pool.query(cabinDamage.updateCabinDamage, [
            descripcion,
            estado,
            fechaarreglo,
            responsable,
            cabanaid
        ]);

        await pool.query(notification.createNotification, [
            userName,
            "Daño cabaña",
            `El daño a la cabaña ${cabanaid} ha sido actualizado`
        ]);

        await pool.query("COMMIT");

        res.json(result.rows[0]);
    } catch (error) {
        await pool.query("ROLLBACK");
        res.status(500).json({message: error.message})
    }
};