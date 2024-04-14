import { useEffect, useState } from 'react';
import styles from './Infocard3.module.css';
import { Grid } from '@mui/material';
import { getDayData } from '../../api_helpers';

function Infocard3({symbol}) {
    const [info, setinfo] = useState([{high:0, low:0, open:0, close:0}]);
    useEffect(()=>{
        getDayData(symbol).then((data)=>{
            console.log(data);
            setinfo(data);
        }).catch((err)=>console.log(err));
    }, [info]);
    return(
        <div className={styles.card}>
            <Grid container spacing={0}>
                <Grid item xs={12} className={styles.company}>{symbol}</Grid>
                <Grid item xs={12} className={styles.data}><span>Price:</span>{"$"+160}</Grid>
                <Grid item xs={12} className={styles.data}><span>High:</span>{"$"+info[0].high}</Grid>
                <Grid item xs={12} className={styles.data}><span>Low:</span>{"$"+info[0].low}</Grid>
                <Grid item xs={12} className={styles.data}><span>Open:</span>{"$"+info[0].open}</Grid>
                <Grid item xs={12} className={styles.data}><span>Close:</span>{"$"+info[0].close}</Grid>
            </Grid>
        </div>
    )
};

export default Infocard3;
