import pool from '../config/db.js'
import { 
  packages, 
  packageStats, 
  packageFilters as packageFiltersModel, 
  packageProducts, 
  packageServices 
} from '../models/package.model.js'

export const getPackages = async (req, res) => {
  try {
    const result = await pool.query(packages.getPackages);

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(packages.getPackageById, [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const getPackageByName = async (req, res) => {
  try {
    const { name } = req.body;
    
    const result = await pool.query(
      packages.getPackageByName, 
      [name.trim()]
    );

    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const createPackage = async (req, res) => {
  try {
    const { tipo_id, registrado_por_id, nombre, dias_estadia, descripcion } = req.body;
    const result = await pool.query(packages.createPackage,
      [tipo_id, registrado_por_id, nombre, dias_estadia, descripcion]
    );
    
    res.status(200).json({
      message: 'Paquete creado',
      data: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear paquete',
      error: error.message
    });
  }
}

export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const { 
      tipo_id, 
      nombre, 
      dias_estadia, 
      descripcion 
    } = req.body;
    
    const result = await pool.query(
      packages.updatePackage,
      [tipo_id, nombre, dias_estadia, descripcion, id]
    );

    res.status(200).json({
      message: 'Paquete actualizado',
      paqueteId: id,
      data: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar paquete',
      error: error.message
    });
  }
}

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      packages.deletePackage, 
      [id]
    );

    res.status(200).json({
      message: 'Paquete eliminado',
      paqueteId: id,
      data: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar paquete',
      error: error.message
    });
  }
};

export const activatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      packages.activatePackage,
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const getPackageStats = async (req, res) => {
  try {
    const [most_frecuent_package, least_frecuent_package, top_packages] = await Promise.all([
      pool.query(packageStats.most_frecuent_package),
      pool.query(packageStats.least_frecuent_package),
      pool.query(packageStats.top_packages),
    ])

    res.json({
      most_frecuent_package: most_frecuent_package.rows,
      least_frecuent_package: least_frecuent_package.rows,
      top_packages: top_packages.rows,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

export const packageFilters = async (req, res) => {
  try {
    const [idle_packages, type_packages_ASC, longer_stay_packages, shorter_stay_packages] = await Promise.all([
      pool.query(packageFiltersModel.idle_packages),
      pool.query(packageFiltersModel.type_packages_ASC),
      pool.query(packageFiltersModel.longer_stay_packages),
      pool.query(packageFiltersModel.shorter_stay_packages),
    ]);

    res.json({
      idle_packages: idle_packages.rows,
      type_packages_ASC: type_packages_ASC.rows,
      longer_stay_packages: longer_stay_packages.rows,
      shorter_stay_packages: shorter_stay_packages.rows,
    })
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

export const getPackageProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(packageProducts.getProducts, [id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

export const getPackageServices = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(packageServices.getServices, [id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}