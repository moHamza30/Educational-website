const Joi = require("joi");

const AppError = require("./AppError");
const User = require("../models/userModel");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    "string.empty": "هذا الحقل مطلوب",
    "string.min": "الاسم الاول يجب الا يقل عن 2 حرف",
    "string.max": "الاسم الاول يجب الا يتعدى 30 حرف",
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    "string.empty":"هذا الحقل مطلوب",
    "string.min": "هذا الحقل يجب الا يقل عن 2 حرف",
    "string.max": "هذا الحقل يجب الا يتعدى 30 حرف",
  }),
  city: Joi.string().min(2).max(30).required().messages({
    "string.empty": "هذا الحقل مطلوب",
    "string.min": " هذا الحقل يجب الا يقل عن 2 حرف",
    "string.max": "هذا الحقل يجب الا يتعدى 30 حرف",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(11)
    .required()
    .messages({
      "string.empty": "هذا الحقل مطلوب",
      "string.pattern.base": "ادخل رقم هاتف صحيح",
      "string.length": "ادخل رقم مكون من 11 رقم ",
    }),

  grade: Joi.string().required().messages({
    "string.empty": "هذا الحقل مطلوب",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "هذا الحقل مطلوب",
    "string.email": "ادخل بريد صالح",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "هذا الحقل مطلوب",
    "string.min": "كلمة السر يجب الا تقل عن 6 ارقام",
  }),
  repassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "كلمة السر غير مطابقه",
    "any.required": "هذا الحقل مطلوب",
  }),
});

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError("validation error", 400));
  next();
};

const registerValidation = async(req, res, next) => {

  const existingUser = await User.findOne({ email: req.body.email });
    
    if (existingUser) {
      return res.status(400).json({ errors: { email: "Email already exists" } });
    }

  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    // Create an object to map each field to its respective error message
    const validationErrors = {};
    error.details.forEach((err) => {
      validationErrors[err.path[0]] = err.message;
    });
    // return next(new AppError(JSON.stringify(validationErrors), 400));

    return res.status(400).json({ errors: validationErrors });
  }
  next();
};

module.exports = { loginValidation, registerValidation };
