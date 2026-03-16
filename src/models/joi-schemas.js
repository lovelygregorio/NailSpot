import Joi from "joi";

export const IdSpec = Joi.string().description("a valid id");

export const UserSpec = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean().optional(),
}).label("UserSpec");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
}).label("UserSpecPlus");

export const UserArraySpec = Joi.array().items(UserSpecPlus.unknown(true)).label("UserArraySpec");

export const UserCredentialsSpec = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).label("UserCredentialsSpec");

export const SalonSpec = Joi.object({
  userid: IdSpec.optional(),
  name: Joi.string().required(),
  area: Joi.string().required(),
  address: Joi.string().required(),
  services: Joi.string().allow("").optional(),
  rating: Joi.number().min(1).max(5).optional(),
  notes: Joi.string().allow("").optional(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longitude: Joi.number().min(-180).max(180).optional(),
  image: Joi.string().allow("").optional(),
}).label("SalonSpec");

export const SalonSpecPlus = SalonSpec.keys({
  _id: IdSpec,
}).label("SalonSpecPlus");

export const SalonArraySpec = Joi.array().items(SalonSpecPlus).label("SalonArraySpec");

export const ServiceSpec = Joi.object({
  salonid: IdSpec.optional(),
  title: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
}).label("ServiceSpec");

export const ServiceSpecPlus = ServiceSpec.keys({
  _id: IdSpec,
}).label("ServiceSpecPlus");

export const ServiceArraySpec = Joi.array().items(ServiceSpecPlus).label("ServiceArraySpec");