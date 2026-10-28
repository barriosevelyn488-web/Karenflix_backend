
export const listarPeliculas = async (req, res, next) => { res.status(200).json({ status: "success", data: [] }); };
export const proponerPelicula = async (req, res, next) => { res.status(201).json({ status: "success", message: "Película propuesta" }); };
export const listarPendientes = async (req, res, next) => { res.status(200).json({ status: "success", data: [] }); };
export const cambiarEstadoPelicula = async (req, res, next) => { res.status(200).json({ status: "success", message: "Estado actualizado" }); };
