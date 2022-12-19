import * as express from "express";
import routesRouter from "./routes/index";

const apiRouter = express.Router();

apiRouter.use("/routes", routesRouter);

export default apiRouter;
