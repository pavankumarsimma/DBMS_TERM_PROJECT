import styles from './Infocard2.module.css';
import { Grid } from '@mui/material';

function Infocard2() {
    return (
        <div className={styles.card}>
            <Grid container spacing={0}>
                <Grid item xs={12} className={styles.company}>APPLE</Grid>
                <Grid item xs={12} className={styles.price}><span>Stock Price:</span><div>$150</div></Grid>
                <Grid item xs={12} className={styles.stockData}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} className={styles.data}><span>High:</span><div>$172</div></Grid>
                        <Grid item xs={6} className={styles.data2}><span>Low:</span><div>$172</div></Grid>
                        <Grid item xs={6} className={styles.data}><span>Open:</span><div>$172</div></Grid>
                        <Grid item xs={6} className={styles.data2}><span>Close:</span><div>$172</div></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Infocard2;