process.on("uncaughtException", (err) => console.log("error in coding", err));

import { globalErrorMiddleware } from "./middleware/globalErrorMiddleware.js";
import { appError } from "./utils/appError.js";
import mapRouter from "./modules/map/map.router.js";

export const init = (app) => {
  app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Welcome ..." });
  });
  app.use("/api/v1/map",mapRouter);

  app.all("*", (req, res, next) => {
    next(new appError("invalid url" + req.originalUrl, 404));
  });

  // global error handling middleware
  app.use(globalErrorMiddleware);
};

process.on("unhandledRejection", (err) =>
  console.log("error outside express", err)
);
