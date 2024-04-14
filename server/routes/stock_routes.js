import express from 'express';
import { getAllSymbols, getCurrPrice, getDayData, getTimeseriesdata } from '../controls/stock_controls';

const stock_router = express.Router();

stock_router.get("/symbols", getAllSymbols);
stock_router.get("/price/:symbol", getCurrPrice);
stock_router.get("/day/:symbol", getDayData);
stock_router.put("/timeseries", getTimeseriesdata);

export default stock_router;