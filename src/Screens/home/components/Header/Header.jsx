import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useNavigate } from "react-router-dom";

import useStyles from './styles';


const Header = ({ setCoordinates }) => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('currentuser'));
    const classes = useStyles();
    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng })
    }
    const handleClick1 = () => {
        navigate('/Profile');
    };
    const handleClick = () => {
        navigate('/home');
    }
    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' className={classes.title} onClick={handleClick}>
                    Dhriti Travel Guide
                </Typography>
                <Box display="flex">
                    <Typography variant='h6' className={classes.title}>
                        Explore
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search...' classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </div>
                    </Autocomplete>
                </Box>
                {user ?
                    <button type="button" class="btn btn-success" onClick={handleClick1} style={{ width: '55px', height: '44px', alignItems: 'center', marginBottom: '15px' }}>
                        <AccountCircleIcon />
                    </button>
                    : <></>}
            </Toolbar>
        </AppBar>
    )
}

export default Header;