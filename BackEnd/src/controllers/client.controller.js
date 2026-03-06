import * as clientService from '../services/client.service.js';

export const getclients = async (req, res) => {
  try {
    const data = await clientService.getclients();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getclientById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await clientService.getclientById(id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
