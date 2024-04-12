import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api_router from './routes/api_routes';
import stock_router from './routes/stock_routes';
import { fetchDataAndUpdateDatabase } from './controls/stock_controls';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", (req, res, next)=>{
	res.status(200).send("Hello Wrold!! Checking my error :)");
});

// routes
app.use("/api", api_router);
app.use("/stock", stock_router);
// running sever
const port = process.env.PORT || 5001;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
fetchDataAndUpdateDatabase();
const intervalTime = 21600000; // Interval time in milliseconds (e.g., 60000 ms = 1 minute)

setInterval(fetchDataAndUpdateDatabase, intervalTime);