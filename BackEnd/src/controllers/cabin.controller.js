import { cabin, cabinStats, cabinFilters } from "../models/cabin.model.js";
import pool from "../config/db.js";
import { notification } from "../models/notification.model.js";

export const getCabinFilters = async (req, res) => {
  try {
    const inactiveCabins = await pool.query(cabinFilters.inactiveCabins);
    res.json({
      inactiveCabins: inactiveCabins.rows
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCabins = async (req, res) => {
  try {
    const cabins = await pool.query(cabin.getCabins);
    res.json(cabins.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getCabinByName = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      cabin.getCabinByName,
      [name]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createCabin = async (req, res) => {
  try {
    const { nombre, precio_noche, capacidad_personas, descripcion, userName } = req.body;

    await pool.query("BEGIN");

    const result = await pool.query(
      cabin.createCabin, 
      [nombre, precio_noche, capacidad_personas, descripcion]
    );

    const newCabinId = result.rows[0].cabana_id;

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await pool.query(cabin.addCabinImage, [newCabinId, file.path]);
      }
    }

    await pool.query(notification.createNotification, [
      userName,
      "Cabaña",
      `La cabaña ${nombre} ha sido creada`
    ]);

    await pool.query("COMMIT");

    res.json(result.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ message: error.message });
  }
}

export const updateCabin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio_noche, capacidad_personas, descripcion, userName } = req.body;

    await pool.query("BEGIN");

    const result = await pool.query(
      cabin.updateCabin,
      [nombre, precio_noche, capacidad_personas, descripcion, id]
    );

    if (result.rowCount === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "La cabaña no existe." });
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await pool.query(cabin.addCabinImage, [id, file.path]);
      }
    }

    await pool.query(notification.createNotification, [
      userName,
      "Cabaña",
      `La cabaña #${id} - ${nombre} ha sido actualizada`
    ]);

    await pool.query("COMMIT");

    res.json(result.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ message: error.message });
  }
}

export const deleteCabin = async (req, res) => {
  try {
    const { id } = req.params;
    const userName = req.body.userName;

    await pool.query("BEGIN");

    const result = await pool.query(
      cabin.deleteCabin,
      [id]
    );

    if (result.rowCount === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "La cabaña no existe." });
    }

    await pool.query(notification.createNotification, [
      userName,
      "Cabaña",
      `La cabaña #${id} ha sido eliminada`
    ]);

    await pool.query("COMMIT");

    res.json(result.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ message: error.message });
  }
}

export const activateCabin = async (req, res) => {
  try {
    const { id } = req.params;
    const userName = req.body.userName;

    await pool.query("BEGIN");

    const result = await pool.query(
      cabin.activateCabin,
      [id]
    );

    if (result.rowCount === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "La cabaña no existe." });
    }

    await pool.query(notification.createNotification, [
      userName,
      "Cabaña",
      `La cabaña #${id} ha sido activada`
    ])

    await pool.query("COMMIT");
  
    res.json(result.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({error: error.message})
  }
};

export const getCabinStats = async (req, res) => {
  try {
    const [stats, total, graph] = await Promise.all([
      pool.query(cabinStats.get_stats),
      pool.query(cabinStats.total_cabins),
      pool.query(cabinStats.get_graph_revenue),
    ]);

    res.json({
      most_reserved: stats.rows[0] || null,
      total_cabins: total.rows[0] || null,
      revenue_graph: graph.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCabinImages = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(cabin.getCabinImages, [id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addImagesToCabin = async (req, res) => {
  try {
    const { id } = req.params;
    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await pool.query(cabin.addCabinImage, [id, file.path]);
        uploadedImages.push(result.rows[0]);
      }
    }

    res.json(uploadedImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCabinImage = async (req, res) => {
  try {
    const { imgId } = req.params;
    const result = await pool.query(cabin.deleteCabinImage, [imgId]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};