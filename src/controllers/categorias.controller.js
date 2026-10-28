
export const listarCategorias = async (req, res, next) => { res.status(200).json({ status: "success", data: [] }); };
export const crearCategoria = async (req, res, next) => { res.status(201).json({ status: "success", message: "Categoría creada" }); };
export const eliminarCategoria = async (req, res, next) => { res.status(200).json({ status: "success", message: "Categoría eliminada" }); };
