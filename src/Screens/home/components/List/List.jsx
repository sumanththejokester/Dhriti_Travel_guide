import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'

import useStyles from './styles';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, childClicked, isLoding, type, setType, rating, setRating, weatherData }) => {
  const classes = useStyles();


  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places])

  return (
    <div style={{ border: '1px solid white' }} className={classes.container}>
      <Typography variant='h4' style={{ color: 'white' }}>
        Restaurants, Hotels, Attractions
      </Typography>
      {isLoding ? (<div className={classes.loading}><CircularProgress size="5rem" /></div>) : (<>
        <FormControl className={classes.formControl}>
          <InputLabel style={{ color: 'white' }}>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)} style={{ color: 'white' }}>
            <MenuItem value="restaurants" >Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} style={{ color: 'white' }}>
          <InputLabel style={{ color: 'white' }}>Rating</InputLabel>
          <Select value={rating} onChange={(e) => setRating(e.target.value)} style={{ color: 'white' }}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3</MenuItem>
            <MenuItem value={4}>Above 4</MenuItem>
            <MenuItem value={4.5}>Above 4.5</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={3} className={classes.list}>
          {places?.map((place, i) => (
            <Grid ref={elRefs[i]} key={i} item xs={12}>
              <PlaceDetails
                place={place}
                selected={Number(childClicked) === i}
                refProp={elRefs[i]} />
            </Grid>
          ))}
        </Grid>
      </>)}
    </div>
  )
}

export default List