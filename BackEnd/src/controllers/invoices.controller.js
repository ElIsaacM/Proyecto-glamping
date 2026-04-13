import pool from "../config/db.js";
import { invoice } from '../models/invoice.model.js'

export const getInvoices = async (req, res) => {
    try {
        const result = await pool.query(invoice.getInvoices);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getInvoicesByID = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(invoice.getInvoicesByID, [id]);

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}