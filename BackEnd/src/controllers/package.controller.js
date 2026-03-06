import * as packageService from '../services/package.service.js';

export const getpackages = async (req, res) => {
  try {
    const data = await packageService.getpackages();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getpackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await packageService.getpackageById(id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
