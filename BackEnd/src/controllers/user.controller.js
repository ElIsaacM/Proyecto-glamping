import * as userService from '../services/user.service.js';

export const getusers = async (req, res) => {
  try {
    const data = await userService.getusers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getuserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userService.getuserById(id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
