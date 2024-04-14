import styles from './Explore.module.css';
import { Grid } from '@mui/material';

import StickyTable from '../../components/Table/Table';
import Footer from '../../components/Footer/Footer';
import Candlebars from '../../components/Plots/Candlebars';
import Infocard3 from '../../components/Cards/Infocard3';

function Explore(){
    return (
        <div className={styles.explore}>
            <div className={styles.table}>
                <StickyTable/>
            </div>
            <p className={styles.Heading}><span>AAPL</span>{'\u00A0'}Stocks</p>
            <hr className={styles.line}/>
            <Grid container spacing={0}>
                <Grid item xs={12} md={8}>
                    <Candlebars symbol="AAPL"/>
                </Grid>
                <Grid item xs={12} md={4} className={styles.card}>
                    <Infocard3 symbol={"AAPL"}/>
                </Grid>
            </Grid>
            <Footer/>
        </div>
    );
}

export default Explore;