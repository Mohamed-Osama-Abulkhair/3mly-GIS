import Joi from "joi";

const addressSchema = Joi.object({
  address: Joi.string().required(),
});

const textSearchSchema = Joi.object({
  category: Joi.string().required(),
  nearTo: Joi.string().required(),
  city: Joi.string().required(),
});

const types = ["Point", "LineString", "Polygon"];
const typeSchema = (validTypes) =>
  Joi.string()
    .required()
    .valid(...validTypes);

const facultySchema = Joi.object({
  name: Joi.string().required(),
  population: Joi.number().required(),
  area: Joi.number().required(),
  money: Joi.string(),
  location: Joi.object({
    type: typeSchema(types),
    coordinates: Joi.array().items(Joi.number().required()),
  }),
});

const getFacultySchema = Joi.object({
  long: Joi.number().required(),
  lat: Joi.number().required(),
  distance: Joi.number(),
});



export {
  addressSchema,
  textSearchSchema,
  facultySchema,
  getFacultySchema,
};
