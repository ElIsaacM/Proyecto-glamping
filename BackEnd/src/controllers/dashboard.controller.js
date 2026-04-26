import pool from "../config/db.js";
import { reservationDashboardStats } from "../models/reservation.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [totalReservations, mostPopularPackage, mostPopularDay, getRevenueByMonth] = await Promise.all([
      pool.query(reservationDashboardStats.totalReservations),
      pool.query(reservationDashboardStats.mostPopularPackage),
      pool.query(reservationDashboardStats.mostPopularDay),
      pool.query(reservationDashboardStats.getRevenueByMonth),
    ]);
    
    res.json({
      totalReservations: totalReservations.rows,
      mostPopularPackage: mostPopularPackage.rows,
      mostPopularDay: mostPopularDay.rows,
      getRevenueByMonth: getRevenueByMonth.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}