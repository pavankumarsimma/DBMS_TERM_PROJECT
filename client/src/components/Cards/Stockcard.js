import styles from './Stockcard.module.css';
import { Grid } from '@mui/material';

import postive from '../../assets/images/greenTri.png';
import negative from '../../assets/images/redTri.png';

function Stockcard({symbol, price, percent,selected}) {
    return(
        <div className={`${selected ? styles.selectcard : styles.stockcard}`}>
            <Grid container spacing={0} className={styles.stockGrid}>
                <Grid item xs={12} className={`${selected ? styles.selectsymbol : styles.symbol}`}>
                    {symbol}
                </Grid>
                <Grid item xs={6} className={`${selected ? styles.selectprice : styles.price}`}>{price}</Grid>
                <Grid item xs={6} className={styles.percent} style={{color: percent.includes('+') ? 'green' : 'red'}}>
                    {percent}
                    <img src={percent.includes('+') ? postive : negative} alt="percent" className={styles.triangle}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Stockcard;