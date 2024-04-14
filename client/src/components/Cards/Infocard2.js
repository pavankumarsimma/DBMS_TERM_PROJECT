import { useEffect, useState } from 'react';
import styles from './Infocard2.module.css';
import { Grid } from '@mui/material';
import { getDayData } from '../../api_helpers';

function Infocard2({high, low, open, close, symbol, price}) {
    const [info, setinfo] = useState([{high, low, open, close}]);
    useEffect(()=>{
        getDayData(symbol).then((data)=>{
            console.log(data);
            setinfo(data);
            console.log(info);
        }).catch((err)=>console.log(err));
    }, [info]);
    return (
        <div className={styles.card}>
            <Grid container spacing={0}>
                <Grid item xs={12} className={styles.company}>{symbol}</Grid>
                <Grid item xs={12} className={styles.price}><span>Stock Price:</span><div>{"$"+price}</div></Grid>
                <Grid item xs={12} className={styles.stockData}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} className={styles.data}><span>High:</span><div>{"$"+info[0].high}</div></Grid>
                        <Grid item xs={6} className={styles.data2}><span>Low:</span><div>{"$"+info[0].low}</div></Grid>
                        <Grid item xs={6} className={styles.data}><span>Open:</span><div>{"$"+info[0].open}</div></Grid>
                        <Grid item xs={6} className={styles.data2}><span>Close:</span><div>{"$"+info[0].close}</div></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Infocard2;