import axios from 'axios';






export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
            , {
                params: {
                    bl_latitude: sw.lat,
                    bl_longitude: sw.lng,
                    tr_longitude: ne.lng,
                    tr_latitude: ne.lat,
                },
                headers: {
                    'X-RapidAPI-Key': 'e3a8af983dmshc47b9c1ec82a254p1537e2jsnfc34dd2ac517',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            });

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getWeatherData = async (lat, lng) => {
    try {
        if (lat && lng) {
            const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
                params: { lat, lon: lng },
                headers: {
                    'x-rapidapi-key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vkjsnK4bkzuUzVLzA',
                    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                },
            });

            return data;
        }
    } catch (error) {
        console.log(error);
    }
};