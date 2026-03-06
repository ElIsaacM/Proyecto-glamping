import * as reservationService from '../services/reservation.service.js';

export const getreservations = async (req, res) => {
  try {
    const data = await reservationService.getreservations();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getreservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await reservationService.getreservationById(id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
