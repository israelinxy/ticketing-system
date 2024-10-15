import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required(), 
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

export default userSchema;