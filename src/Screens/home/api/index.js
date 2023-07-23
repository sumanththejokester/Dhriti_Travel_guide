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
                    'X-RapidAPI-Key': '002755e61bmsh44cbefccb05f107p1ca7c6jsn2a55a03dc337',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            });

        return data;
    } catch (error) {
        console.log(error);
    }
}

/*002755e61bmsh44cbefccb05f107p1ca7c6jsn2a55a03dc337*/