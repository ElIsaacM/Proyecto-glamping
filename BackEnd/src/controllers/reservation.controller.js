import { reservation, reservationFilters as reservationFiltersModel, reservationStats } from "../models/reservation.model.js";
import { invoice } from "../models/invoice.model.js";
import { refounds } from "../models/refound.model.js";

import pool from "../config/db.js";

export const getreservations = async (req, res) => {
  try {
    const result = await pool.query(
      reservation.getReservations
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReservationByInvoice = async (req, res) => {
  try {
    const { id } = req.body;

    const result = await pool.query(
      reservation.getReservationByInvoice,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const activateReservation = async (req, res) => {
  try {
    const { id } = req.params; // reserva_id

    await pool.query("BEGIN");

    // 1. Activar la reserva y obtener datos necesarios (como factura_id)
    // Asegúrate que tu consulta SQL devuelva la fila activada: RETURNING *
    const result = await pool.query(
      reservationModels.activateReservation,
      [id]
    );

    if (result.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: 'La reserva no existe.' });
    }

    const factura_id = result.rows[0].factura_id;

    // 2. Anular el reembolso asociado a esa factura
    // Es "Cancelado" porque el dinero ya no se debe devolver, se queda en la empresa
    await pool.query(
      refounds.updateRefound,
      ["Cancelado", factura_id] 
    );

    await pool.query("COMMIT");
    res.json({ message: "Reserva reactivada y reembolso anulado", data: result.rows[0] });

  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("BEGIN");

    // Usamos nombres de variables distintos a los modelos (resRow, invRow)
    const [resData, invData] = await Promise.all([
      pool.query(reservationModels.getReservationByInvoice, [id]),
      pool.query(invoiceModels.getInvoiceByReservation, [id])
    ]);

    // Validamos existencia correctamente
    if (resData.rows.length === 0 || invData.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: 'Reserva o factura no encontrada' });
    }

    const resRow = resData.rows[0];
    const invRow = invData.rows[0];

    // Cancelar la reserva usando el modelo original
    const result = await pool.query(reservationModels.cancelReservation, [id]);

    // Lógica de Reembolso: (Total - Deuda actual) = Lo que el cliente ya pagó
    const montoAPagar = invRow.total - resRow["pago restante"];

    if (montoAPagar > 0) {
      await pool.query(refounds.createRefound, [
        invRow.factura_id,
        "Reserva cancelada",
        montoAPagar
      ]);
    }

    await pool.query("COMMIT");
    res.json({ message: "Cancelada con éxito", reembolso: montoAPagar });

  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error en cancelReservation:", error);
    res.status(500).json({ error: error.message });
  }
};

export const reservationFilters = async (req, res) => {
  try {
    const [incomingReservations, paidReservations, confirmedReservations, canceledReservations] = await Promise.all([
      pool.query(reservationFiltersModel.incomingReservations),
      pool.query(reservationFiltersModel.paidReservations),
      pool.query(reservationFiltersModel.confirmedReservations),
      pool.query(reservationFiltersModel.canceledReservations)
    ]);

    res.json({
      incomingReservations: incomingReservations.rows,
      paidReservations: paidReservations.rows,
      confirmedReservations: confirmedReservations.rows,
      canceledReservations: canceledReservations.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const getReservationStats = async (req, res) => {
  try {
    const revenue_graph = await pool.query(reservationStats.getRevenueGraph);
    res.json({
      revenue_graph: revenue_graph.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};