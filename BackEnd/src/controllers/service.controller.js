import * as serviceService from '../services/service.service.js';

export const getservices = async (req, res) => {
  try {
    const data = await serviceService.getservices();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getserviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await serviceService.getserviceById(id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
