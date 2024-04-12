import styles from './Infocard3.module.css';
import { Grid } from '@mui/material';

function Infocard3() {
    return(
        <div className={styles.card}>
            <Grid container spacing={0}>
                <Grid item xs={12} className={styles.company}>APPLE</Grid>
                <Grid item xs={12} className={styles.data}><span>Price:</span>$150</Grid>
                <Grid item xs={12} className={styles.data}><span>High:</span>$162</Grid>
                <Grid item xs={12} className={styles.data}><span>Low:</span>$104</Grid>
                <Grid item xs={12} className={styles.data}><span>Open:</span>$132</Grid>
                <Grid item xs={12} className={styles.data}><span>Close:</span>$150</Grid>
            </Grid>
        </div>
    )
};

export default Infocard3;
