
export const listarResenasPelicula = async (req, res, next) => { res.status(200).json({ status: "success", data: [] }); };
export const crearResena = async (req, res, next) => { res.status(201).json({ status: "success", message: "Reseña creada" }); };
export const eliminarResena = async (req, res, next) => { res.status(200).json({ status: "success", message: "Reseña eliminada" }); };
export const reaccionarResena = async (req, res, next) => { res.status(200).json({ status: "success", message: "Reacción registrada" }); };
