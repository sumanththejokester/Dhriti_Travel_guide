import React from 'react'
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';

import useStyles from '../components/MainHeaderstyles2'
import { useNavigate } from "react-router-dom";
const MainHeader2 = () => {
    const navigate = useNavigate();

    const handleClick1 = () => {
        navigate('/Bookings');
    };

    const handleClick = () => {
        navigate('/home');
    };

    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('currentuser'));
    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' className={classes.title} onClick={handleClick}>
                    Dhriti Travel Guide
                </Typography>
                {user ? <button type="button" class="btn btn-success" onClick={handleClick1} style={{ width: '55px', height: '54px', alignItems: 'center', marginBottom: '15px' }}>
                    <LocalMallIcon />
                </button> : <></>}
            </Toolbar>

        </AppBar>
    )
}

export default MainHeader2