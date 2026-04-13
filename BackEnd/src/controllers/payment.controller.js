import { payment, paymentFilters, paymentStats } from "../models/payments.model.js";
import pool from "../config/db.js";

export const getPayments = async (req, res) => {
  try {
    const result = await pool.query(payment.getPayments);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPaymentByInvoice = async (req, res) => {
  try {
    const { invoice } = req.body;

    const result = await pool.query(payment.getPaymentByInvoice, [invoice]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createPaymentManually = async (req, res) => {
  try {
    const { factura_id, email, metodo_id, total_pagado } = req.body;

    const estado = 'Aceptado';

    const result = await pool.query(
      payment.createPaymentManually,
      [factura_id, metodo_id, estado, total_pagado, email]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Factura o correo del cliente no encontrado, o no coinciden." });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const PaymentFilters = async (req, res) => {
  try {
    const [recent_payments, sucefull_payments, rejected_payments] = await Promise.all([
      pool.query(paymentFilters.getRecentPayments),
      pool.query(paymentFilters.getSucefullPayments),
      pool.query(paymentFilters.getRejectedPayments),
    ]);
    res.json({
      recent_payments: recent_payments.rows,
      sucefull_payments: sucefull_payments.rows,
      rejected_payments: rejected_payments.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPaymentStats = async (req, res) => {
  try {
    const [successful_payments, rejected_payments, pending_refunds, revenue] = await Promise.all([
      pool.query(paymentStats.getSuccessfulPayments),
      pool.query(paymentStats.getRejectedPayments),
      pool.query(paymentStats.getPendingRefunds),
      pool.query(paymentStats.getRevenue),
    ]);
    res.json({
      successful_payments: successful_payments.rows,
      rejected_payments: rejected_payments.rows,
      pending_refunds: pending_refunds.rows,
      revenue: revenue.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}