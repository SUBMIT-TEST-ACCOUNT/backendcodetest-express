import * as express from "express";
import { initXlsxToJson } from "./utils/xlsx";
import * as dotenv from "dotenv";
import apiRouter from "./api/index";
import * as swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";

dotenv.config();

export const app: express.Application = express();

const main = (): void => {
  if (!process.env.API_KEY) throw new Error("empty API_KEY");
  initXlsxToJson();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  if (process.env.NODE_ENV === "dev") {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  app.use("/api", apiRouter);

  if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  }
};

main();
