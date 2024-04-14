import styles from './Homepage.module.css';
import { Grid } from '@mui/material';

import Hero from '../../components/Hero/Hero';
import Infocard from '../../components/Cards/Infocard';
import Stockcard from '../../components/Cards/Stockcard';
import Candlebars from '../../components/Plots/Candlebars';
import Linegraph from '../../components/Plots/Linegraph';
import Donut from '../../components/Plots/donut';
import Infocard2 from '../../components/Cards/Infocard2';
import Footer from '../../components/Footer/Footer';

import image1 from '../../assets/images/stockdata.png';
import image2 from '../../assets/images/infograph.png';
import image3 from '../../assets/images/timescale.jpg';
import image4 from '../../assets/images/twelvedata.png';
import { useEffect, useState } from 'react';
import { getCurrPrice, getDayData } from '../../api_helpers';


const infoData = [
    {
        "title": "View & Search Stock Data",
        "description": "Access real-time stock information and search for specific stocks easily.",
        "image": image1
    },
    {
        "title": "Interactive Infographics",
        "description": "Visualize complex stock data through interactive infographics for better understanding.",
        "image": image2
    },
    {
        "title": "Managing Temporal Data",
        "description": "Utilize TimescaleDB to efficiently manage and analyze temporal stock data.",
        "image": image3
    },
    {
        "title": "Resource from Twelve Data",
        "description": "Integrate resources from Twelve Data for comprehensive stock market analysis.",
        "image": image4
    }
];

let stockData = [
    {
        "symbol": "AMZN",
        "price": 400,
        "percent": "+0.5%",
        "selected": false
    },
    {
        "symbol": "TSLA",
        "price": 400,
        "percent": "-0.5%",
        "selected": false
    },
    {
        "symbol": "AAPL",
        "price": 150,
        "percent": "+0.4%",
        "selected": true
    }
];
let selected = {
    "symbol":"AAPL",
    "price": 150,
    "percent": "+0.4%",
    "selected": true,
    "high": 200,
    "low": 0,
    "open": 0,
    "close": 180,
    "interval": '1 day',
    "start": '2024-04-01',
    "end": '2024-04-02'
}

function Homepage() {
    const [stockData, setStockData] = useState([
        {
            "symbol": "AMZN",
            "price": 400,
            "percent": "+0.5%",
            "selected": false
        },
        {
            "symbol": "TSLA",
            "price": 400,
            "percent": "-0.5%",
            "selected": false
        },
        {
            "symbol": "AAPL",
            "price": 150,
            "percent": "+0.4%",
            "selected": true
        }
    ]);
    const [info, setInfo] = useState([{}]);

    useEffect(() => {
        // Fetch current prices for each stock
        const fetchCurrentPrices = async () => {
            const updatedStockData = await Promise.all(stockData.map(async (stock) => {
                try {
                    const data = await getCurrPrice(stock.symbol);
                    const updatedStock = { ...stock, price: data[0].price };
                    if (selected.symbol == data[0].symbol){
                        selected.price  = data[0].price;
                    }
                    return updatedStock;
                } catch (error) {
                    console.log(error);
                    return stock; // Return original stock data if there's an error
                }
            }));
            // Update the stockData state with the fetched current prices
            setStockData(updatedStockData);
        };

        // Fetch day data for the selected symbol
        const fetchDayData = async () => {
            try {
                const data = await getDayData(selected.symbol);
                setInfo(data);
                console.log(info);
                selected.open = data[0].open ;
                selected.close = data[0].close;
                selected.high = data[0].high;
                selected.low = data[0].low;
                selected.open = parseFloat(selected.open.toFixed(2));
                selected.close = parseFloat(selected.close.toFixed(2));
                selected.high = parseFloat(selected.high.toFixed(2));
                selected.low = parseFloat(selected.low.toFixed(2));
            } catch (error) {
                console.log(error);
            }
        };

        // Call the fetch functions
        fetchCurrentPrices();
        fetchDayData();
    }, []);
    const handleClick = (data)=>{
        selected.percent = data.percent;
        selected.price = data.price;
        selected.selected = true;
        selected.symbol = data.symbol;
    }
    
    return (
        <div className={styles.homepage}>
            <Hero/>
            <Grid container spacing={0} className={styles.infocard}>
                {infoData.map((data, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Infocard title={data.title} description={data.description} image={data.image} />
                    </Grid>
                ))}
            </Grid>
            <div className={styles.topStocks}>
                <p><span>Top Priced</span>{'\u00A0'}Stocks</p>
                <hr className={styles.line}/>
                <Grid container spacing={0}>
                    {stockData.map((data, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Stockcard symbol={data.symbol} price={data.price} percent={data.percent} selected={data.selected}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <div className={styles.candlebars}>
                <p><span>{selected.symbol}</span>{'\u00A0'}Stock Data</p>
                <hr className={styles.line}/>
                {/* <Candlebars symbol="AAPL"/> */}
                <Grid container spacing={0} className={styles.stockData}>
                    <Grid item xs={12} md={8} className={styles.Linegraph}>
                        <Linegraph/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                {selected.open!=0 && <Grid container spacing={0} className={styles.donutBox}>
                                    <Grid item xs={6} className={styles.donutContainer}><Donut price={selected.high} percent={85}/></Grid>
                                    <Grid item xs={6} className={styles.donutContainer}><Donut price={selected.low} percent={60}/></Grid>
                                    <Grid item xs={6} className={styles.donutContainer}><Donut price={selected.open} percent={75}/></Grid>
                                    <Grid item xs={6} className={styles.donutContainer}><Donut price={selected.close} percent={70}/></Grid>
                                </Grid>}
                            </Grid>
                            <Grid item xs={12} className={styles.infoCard2}><Infocard2 high={selected.high} low={selected.low} open={selected.open} close={selected.close} symbol={selected.symbol} price={selected.price}/></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </div>
    );
}

export default Homepage;