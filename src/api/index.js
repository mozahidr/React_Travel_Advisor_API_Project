import axios from 'axios';

//const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat, // bottom left coordinate
                tr_latitude: ne.lat, // top right coordinate
                bl_longitude: sw.lng, //bottom left lng
                tr_longitude: ne.lng,
              },
              headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
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
        const { data } = await axios.get('https://open-weather-map27.p.rapidapi.com/weather', {
            params: { lon: lng, lat: lat },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
                'X-RapidAPI-Host': 'open-weather-map27.p.rapidapi.com'
              }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}