import * as paymentService from '../services/payment.service.js';

export const getpayments = async (req, res) => {
  try {
    const data = await paymentService.getpayments();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getpaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await paymentService.getpaymentById(id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
