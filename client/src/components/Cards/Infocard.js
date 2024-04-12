import style from './Infocard.module.css';
import { Grid } from '@mui/material';

function Infocard({ title, description, image }) {
    return(
        <div className={style.card}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <p className={style.title}>{title}</p>
                    <p className={style.desc}>{description}</p>
                </Grid>
                <Grid item xs={4} className={style.imagebox}>
                    <img src={image} alt="vector image" className={style.image}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Infocard;
