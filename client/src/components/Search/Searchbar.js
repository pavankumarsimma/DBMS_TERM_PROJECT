import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './Searchbar.module.css';

function Searchbar() {
  return (
    <div className={styles.searchcontainer}>
        <TextField label="Enter Your Query" focused className={styles.searchsearchinput}/>
        <Button variant="contained" className={styles.searchbutton}>
            Search
        </Button>
    </div>
      
  );
};

export default Searchbar;