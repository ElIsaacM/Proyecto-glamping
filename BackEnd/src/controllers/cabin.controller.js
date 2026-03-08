import * as cabinService from '../services/cabin.service.js'

export const getCabins = async (req, res) => {
  try {
    const cabins = await cabinService.getCabins();
    res.json(cabins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
