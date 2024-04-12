import styles from './Footer.module.css';
import { Grid } from '@mui/material';

function Footer() {
    return (
        <div className={styles.footer}>
            <hr/>
            <Grid container spacing={0} className={styles.text}>
                <Grid item xs={6} className={styles.footerText} >Privacy Policy &nbsp; &nbsp; &nbsp; &nbsp; Terms and Conditions</Grid>
                <Grid item xs={6} className={styles.footerText2}>© 2024 All Copyrights Reservered - Stockflix </Grid>
            </Grid>
        </div>
    );
};

export default Footer;