import { AuthService } from "../services/auth.service.js";
export const registrar = async (req, res, next) => {
  try {
    const resultado = await AuthService.registrar(req.body);
    res.status(201).json({ status: "success", data: resultado });
  } catch (error) { next(error); }
};
export const login = async (req, res, next) => {
  try {
    const resultado = await AuthService.login(req.body);
    res.status(200).json({ status: "success", data: resultado });
  } catch (error) { next(error); }
};
export const me = async (req, res, next) => {
  try { res.status(200).json({ status: "success", data: req.user }); } catch (error) { next(error); }
};
