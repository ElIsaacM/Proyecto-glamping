import * as cabinService from '../services/cabin.service.js'

export const getCabins = async (req, res) => {
  const cabins = await cabinService.getCabins();

  res.json(cabins);
}