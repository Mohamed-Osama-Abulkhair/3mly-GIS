import express from "express";
import * as mapController from "./map.controller.js";
import { validation } from "../../middleware/validation.js";
import {
  addressSchema,
  facultySchema,
  getFacultySchema,
  textSearchSchema,
} from "./map.validation.js";
const mapRouter = express.Router();

mapRouter
  .route("/")
  .post(validation(addressSchema), mapController.geCoding)
  .get(validation(textSearchSchema), mapController.textSearch);

mapRouter
  .route("/faculties")
  .post(validation(facultySchema), mapController.addFaculty)
  .get(validation(getFacultySchema), mapController.getFaculty);

export default mapRouter;
