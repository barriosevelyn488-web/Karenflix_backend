import { validationResult } from 'express-validator';
export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).json({
      status: 'fail',
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Revisa los datos enviados.',
        details: result.array().map(({ path, msg }) => ({ field: path, message: msg }))
      }
    });
  next();
};
