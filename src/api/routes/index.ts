import * as express from "express";
import { getFastestRoutes } from "./routes.api";

const routesRouter = express.Router();

/* GET sign in page. */
/**
 * @swagger
 * paths:
 *  /api/routes/fastest:
 *   get:
 *     tags: [Routes]
 *     summary: 5분 내로 도착하는 버스가 가장 많은 정류장에 대한 버스정보
 *     responses:
 *       "200":
 *         description: 로드 성공 (정렬은 도착예상 시간순)
 *       "204":
 *         description: 제공할 데이터가 요청 기준인 3개에 부합할 경우
 *       "500":
 *         description: API 횟수가 초과되었거나 다른 경우에 의한 실패
 */
routesRouter.get("/fastest", getFastestRoutes);

export default routesRouter;
