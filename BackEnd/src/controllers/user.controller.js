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

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await userService.createUser(data)

    res.status(201).json({
      message: 'Usuario creado exitosamente.',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear usuario',
      error: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await userService.updateUser(id, data);

    res.status(201).json({
      message: 'Usuario actualizado',
      userID: id,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar usuario',
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id)

    res.status(200).json({
      message: 'Usuario eliminado',
      userID: id
  });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar usuario',
      error: error.message
    });
  }
};