/**
 * Joi Validation Schemas
 *
 * Defines validation rules for application data.
 * Ensures incoming requests are properly structured and secure.
 */
import Joi from "joi";

// Define a reusable schema for validating unique identifiers 
export const IdSpec = Joi.string().description("a valid id");

// User validation schemas
export const UserSpec = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean().optional(),
}).label("UserSpec");

// Extended user schema that includes the unique identifier for API responses
export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
}).label("UserSpecPlus");

// Array schema for validating responses that return multiple users
export const UserArraySpec = Joi.array().items(UserSpecPlus.unknown(true)).label("UserArraySpec");

// Credentials schema for validating user login requests
export const UserCredentialsSpec = Joi.object({
  // Email field must be a valid email address and is required for authentication
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).label("UserCredentialsSpec");

// Salon validation schemas
export const SalonSpec = Joi.object({
  // User ID field is optional and can be included to associate a salon with a specific user (e.g., the salon owner)
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
}).label("SalonSpec"); // Extended salon schema that includes the unique identifier for API responses

// Extended salon schema that includes the unique identifier for API responses
export const SalonSpecPlus = SalonSpec.keys({
  _id: IdSpec,
}).label("SalonSpecPlus");

// Array schema for validating responses that return multiple salons
export const SalonArraySpec = Joi.array().items(SalonSpecPlus).label("SalonArraySpec");

// Service validation schemas
export const ServiceSpec = Joi.object({
  salonid: IdSpec.optional(),
  title: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
}).label("ServiceSpec");

// Extended service schema that includes the unique identifier for API responses
export const ServiceSpecPlus = ServiceSpec.keys({
  _id: IdSpec,
}).label("ServiceSpecPlus");

// Array schema for validating responses that return multiple services
export const ServiceArraySpec = Joi.array().items(ServiceSpecPlus).label("ServiceArraySpec");