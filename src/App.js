import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'; // CssBaseline is material-ui components that normalize the style of margin and padding

import { getPlacesData, getWeatherData } from './api';
import { Header } from './components/Header/Header';
import { List } from './components/List/List';
import { Map } from './components/Map/Map';
//import { PlaceDetails } from './components/PlaceDetails/PlaceDetails';

const App = () => {
    const [places, setPlaces] = useState([]); // new useState field, at the start places is empty []
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]); // new useState field
    const [childClicked, setChildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({}); // new useState
    const [bounds, setBounds] = useState({}); // new useState
    const [type, setType] = useState('restaurants'); //first para is state and second one modify the steta
    const [rating, setRating] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);

    // this useEffect only run at the beginning to get the user current geolocation
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    // filteredPlaces
    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);

    }, [rating]);
    
    useEffect(() => {
        if(bounds.sw && bounds.ne) {
            setIsLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherData(data));
                console.log({weatherData});

            getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                //console.log(data);
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                setIsLoading(false);
            })
        }
    }, [type, bounds]);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%'}}>
            {/* xs={12} it will take full screen in mobile devices - md={4} medium and large devices 12/4*/}
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                     />
                </Grid>
            </Grid>
        </>
    );
}

export default App;