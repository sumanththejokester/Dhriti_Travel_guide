import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating'
import axios from 'axios';
import useStyles from './styles';


const PlaceDetails = ({ place, selected, refProp }) => {
  async function addcart() {
    const user = JSON.parse(localStorage.getItem('currentuser'));
    const data = {
      name: place.name,
      address: place.address,
      price: place.price_level,
      userid: user.data._id,
    };

    try {
      // Send a POST request to the server to add the place to the cart
      const response = await axios.post('/Bookings/Bookings', data);
      // Handle the response if needed
      console.log('Place added to cart:', response.data);
      // You can show a success message to the user if needed
    } catch (error) {
      console.error('Error adding place to cart:', error);
      // You can show an error message to the user if needed
    }
  };
  const classes = useStyles();
  if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <Card elevation={6}>
      <CardMedia style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : "https://www.petpooja.com/assets/images/fine-dine/fine-dine.webp"}
        title={place.name} />
      <CardContent>
        <Typography gutterBottom variant='h5'>
          {place.name}
          <Box display="flex" justifyContent="space-between" my={2}>
            <Rating name="read-only" value={Number(place.rating)} readOnly />
            <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
          </Box>
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} alt='' />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size='small' label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}

      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="sm all" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
        <Button size="sm all" color="primary" onClick={addcart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default PlaceDetails;