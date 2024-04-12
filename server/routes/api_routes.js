import express from 'express';
import { api_getASymbol, api_getAllSymbols, api_getRealTimePrice, api_getTimeseriesdata } from '../controls/api_controls';

const api_router = express.Router();

api_router.get("/symbols", api_getAllSymbols);
api_router.get("/symbols/:symbol", api_getASymbol);
api_router.put("/timeseries/:symbol", api_getTimeseriesdata);
api_router.get("/realtime/:symbol", api_getRealTimePrice);
export default api_router;
