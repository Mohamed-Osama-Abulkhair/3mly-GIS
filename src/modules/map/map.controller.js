import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import NodeGeocoder from "node-geocoder";
import { createClient } from "@google/maps";
import axios from "axios";
import { facultyModel } from "../../../databases/models/faculty.model.js";

const options = {
  provider: "google",
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
};
const geocoder = NodeGeocoder(options);

//

const googleMapsClient = createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
});

//

// 1- ge-coding
const geCoding = catchAsyncError(async (req, res, next) => {
  const { address } = req.body;
  googleMapsClient.geocode({ address }, function (err, response) {
    if (!err) {
      const result = response.json.results;
      res.status(200).json({ message: "success", result });
    }
  });
});

// 2- Use Places API - Text Search (fetch)
const textSearch = catchAsyncError(async (req, res, next) => {
  const { nearTo, category, city } = req.body;

  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${nearTo}+${category}+${city}&type=${category}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  res.status(200).json({ message: "success", result: data }); 
});

// 3- add faculty
const addFaculty = catchAsyncError(async (req, res, next) => {
  const result = new facultyModel(req.body);
  await result.save();

  res.status(201).json({ message: "success", result });
});

// 4- get faculties
const getFaculty = catchAsyncError(async (req, res, next) => {
  const { long, lat } = req.query;
  let distance = req.query.distance || 5000;
  const result = await facultyModel.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [long, lat],
        },
        $maxDistance: distance,
      },
    },
  });

  res.status(200).json({ message: "success", result });
});

export { geCoding, textSearch, addFaculty, getFaculty };
