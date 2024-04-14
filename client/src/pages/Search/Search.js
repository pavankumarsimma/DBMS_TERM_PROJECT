import styles from './Search.module.css';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../../components/Footer/Footer';
import Candlebars from '../../components/Plots/Candlebars';
import Infocard3 from '../../components/Cards/Infocard3';
import { useState } from 'react';
import image from '../../assets/images/search.png';

function Search() {
    const [symbol, setSymbol] = useState('AAPL'); // Initial symbol value

    const handleSearch = (inputSymbol) => {
        setSymbol(inputSymbol);
    };

    const handleSubmit = () => {
        // Retrieve the input value from the TextField
        const inputSymbol = document.getElementById('search-input').value;
        // Call the handleSearch function with the input value
        handleSearch(inputSymbol);
    };

    return (
        <div className={styles.search}>
            <Grid container spacing={0}>
                <Grid item xs={4} className={styles.image}>
                    <img src={image} alt="search" className={styles.img} />
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={0} className={styles.searchHero}>
                        <Grid item xs={12} className={styles.searchBar}>
                            <div className={styles.searchcontainer}>
                                <TextField
                                    id="search-input"
                                    label="Enter Your Query"
                                    focused
                                    className={styles.searchsearchinput}
                                />
                                <Button
                                    onClick={handleSubmit} // Call handleSubmit function when the button is clicked
                                    variant="contained"
                                    className={styles.searchbutton}
                                >
                                    Search
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={styles.desc}>
                            Discover stocks like never before with our powerful search functionality! 
                            Find the perfect investment opportunities tailored to your preferences, whether it's by company name, 
                            ticker symbol, sector, or performance. Start exploring today and unlock the potential of the stock market 
                            at your fingertips!
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <p className={styles.Heading}><span>{symbol}</span>{'\u00A0'}Stocks</p>
            <hr className={styles.line} />
            <Grid container spacing={0}>
                <Grid item xs={12} md={8}>
                    <Candlebars symbol={symbol} />
                </Grid>
                <Grid item xs={12} md={4} className={styles.card}>
                    <Infocard3 symbol={symbol} />
                </Grid>
            </Grid>
            <Footer />
        </div>
    );
}

export default Search;
