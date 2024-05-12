import mongoose from "mongoose";

const facultySchema = mongoose.Schema(
  {
    name: { type: String },
    population: { type: Number },
    area: { type: Number },
    money: { type: String },
    location: {
      type: { 
        type: String,
        enum: ["Point","LineString","Polygon"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
  },

  { timestamps: true }
);

facultySchema.index({ location: "2dsphere" });

export const facultyModel = mongoose.model("faculty", facultySchema);
