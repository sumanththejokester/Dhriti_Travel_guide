import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';


const App = () => {
    const [places, setPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);

    const [filteredPlaces, setfilteredPlaces] = useState([]);

    const [isLoding, setisLoding] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {

        if (bounds) {
            setisLoding(true);

            getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
                console.log(data);
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setfilteredPlaces([]);
                setisLoding(false);
            });
        }

    }, [type, bounds]);

    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating);

        setfilteredPlaces(filtered);
    }, [rating]);

    return (
        <>
            <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}>
                <CssBaseline />
                <Header setCoordinates={setCoordinates} />
                <br />
                <Grid container spacing={3} style={{ width: '100%', marginLeft: '0.5px' }} >
                    <Grid item xs={12} md={4} >
                        <List places={filteredPlaces.length ? filteredPlaces : places} childClicked={childClicked} isLoding={isLoding} type={type} setType={setType} rating={rating} setRating={setRating} />
                    </Grid>
                    <Grid item xs={12} md={8} style={{ border: '0.5px solid white' }}>
                        <Map setCoordinates={setCoordinates}
                            setBounds={setBounds}
                            coordinates={coordinates}
                            places={filteredPlaces.length ? filteredPlaces : places}
                            setChildClicked={setChildClicked}
                        />
                    </Grid>
                </Grid>
            </div>

        </>

    )
}

export default App;