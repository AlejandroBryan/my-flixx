import { validationResult } from 'express-validator';

export default (schemas) => {
  return async (req, res, next) => {
    await Promise.all(schemas.map((schema) => schema.run(req)));
    const errors = validationResult(req);

    const extractedErrors = [];

    if (!errors.isEmpty()) {
      errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
      return res.status(422).json({ errors: extractedErrors });
    }
    return next();
  };
};
