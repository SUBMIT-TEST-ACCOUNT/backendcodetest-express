import * as express from "express";
import { getRandomNumberArray } from "../../utils/random";
import {
  getXlsxJsonDataByExactIdx,
  getXlsxJsonDataLength,
} from "../../utils/xlsx";
import { parser } from "../../utils/parser";
import { HTTP_STATUS } from "../../constants/index";
import {
  fetchData,
  getFastestBusArray,
  mapToArray,
  pushStationsInfomation,
  sortArrayByCountAndEta,
} from "./routes.module";

export async function getFastestRoutes(
  req: express.Request,
  res: express.Response
) {
  try {
    const randomNumberArray = getRandomNumberArray(getXlsxJsonDataLength());
    const routeInfoData = randomNumberArray.map((num) =>
      getXlsxJsonDataByExactIdx(num)
    );

    const stationsMap = {};
    const now = Date.now();
    for (let routeInfo of routeInfoData) {
      const data = await fetchData(routeInfo.ROUTE_ID);

      const parseMsgBody = parser.parse(data).ServiceResult.msgBody.itemList;

      pushStationsInfomation(stationsMap, parseMsgBody, now);
    }

    if (Object.keys(stationsMap).length < Number(process.env.ROUTE_VALUE)) {
      res.status(HTTP_STATUS.NO_CONTENT);
      res.send();
      return;
    }

    const stationsArray = mapToArray(stationsMap);
    sortArrayByCountAndEta(stationsArray);

    const result = getFastestBusArray(
      stationsArray.slice(0, Number(process.env.ROUTE_VALUE))
    );

    res.status(HTTP_STATUS.OK);
    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(HTTP_STATUS.SERVER_ERROR);
    res.send("SERVER ERROR");
  }
}
