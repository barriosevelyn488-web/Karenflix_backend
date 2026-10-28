export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.rol !== "admin") {
    return res.status(403).json({ status: "fail", message: "Acceso denegado. Se requieren permisos de administrador." });
  }
  next();
};
