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

const stockData = [
    {
        "symbol": "AMZN",
        "price": "$400.00",
        "percent": "-0.5%",
        "selected": false
    },
    {
        "symbol": "TSLA",
        "price": "$300.00",
        "percent": "+0.5%",
        "selected": false
    },
    {
        "symbol": "AAPL",
        "price": "$150.00",
        "percent": "+0.5%",
        "selected": true
    }
];

function Homepage() {
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
                <p><span>AAPL</span>{'\u00A0'}Stock Data</p>
                <hr className={styles.line}/>
                {/* <Candlebars symbol="AAPL"/> */}
                <Grid container spacing={0} className={styles.stockData}>
                    <Grid item xs={12} md={8} className={styles.Linegraph}>
                        <Linegraph/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <Grid container spacing={0} className={styles.donutBox}>
                                    <Grid item xs={6} className={styles.donutContainer}><Donut price={172} percent={85}/></Grid>
                                    <Grid item xs={6} className={styles.donutContainer}><Donut price={102} percent={60}/></Grid>
                                    <Grid item xs={6} className={styles.donutContainer}><Donut price={132} percent={75}/></Grid>
                                    <Grid item xs={6} className={styles.donutContainer}><Donut price={150} percent={70}/></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={styles.infoCard2}><Infocard2/></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </div>
    );
}

export default Homepage;