import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card, Grid, Typography} from "@mui/material";

/*
    This class takes the lat and lon as a prop and displays it as a row
*/
function LocationRow(props : WeatherLocation){
    // This state sets the weather information
    const [locatInfo, setInfo] = useState<CityWeather>();

    // This variable holds the API key
    const API_KEY = process.env.REACT_APP_API_KEY;

    // This variable used to switch between dark/light theme
    const DARK_MODE = props.darkMode;

    // This state is used to place a placeholder element while Application is retrieving information
    const [loading, setLoading] = useState<boolean>(true);

    // This variable holds the city name
    const cityName = props.name;

    // This variable holds the country name
    const country = props.country;

    // This variable calls a function to calculate time
    const time = localTime(locatInfo?.current.dt as number, locatInfo?.timezone_offset as number);

    // Renders when the name is given
    useEffect(() => {
        // Calls a get request using the lat and lon
        axios.get<CityWeather>(`https://api.openweathermap.org/data/3.0/onecall?lat=${props.lat}&lon=${props.lon}&units=metric&exclude=hourly,alerts&appid=${API_KEY}`)
            .then(res => {
                setInfo({
                    // Sets the information in the state
                    lat: res.data.lat,
                    lon: res.data.lon,
                    current: res.data.current,
                    daily: res.data.daily,
                    timezone_offset: res.data.timezone_offset
                });
                // Begin displaying the information in the row when ready
                setLoading(false);
            })
    }, [props.lat, props.lon, API_KEY]);

    // This helper function takes the current UTC time and the offset by timezone to get the time at that city
    function localTime(UTCtime : number, offset : number){
        const sum = UTCtime + offset;
        let tempDate = new Date(0,0,0,0,0, sum);
        return tempDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    return (
        loading ?
                null
            :
            <Card variant="outlined" sx={{color: DARK_MODE ? 'white': 'black', backgroundColor: DARK_MODE ? 'grey' : 'white'}} onClick={() => {props.setPopup({locatInfo, cityName, country, time}); props.setTrigger(true)}} >
                <Grid container direction="row" alignItems="center" sx={{ pl : 2}}>
                    <Grid item xs>
                        <h1>{cityName}, {country}</h1>
                        <h1>&nbsp;</h1>
                        <h1>{time}</h1>
                        <h1>{locatInfo?.current.weather[0].description}</h1>
                    </Grid>
                    <Grid item xs>
                        <img alt={locatInfo?.current.weather[0].description} style={{float: 'right'}} src={`${process.env.PUBLIC_URL}/images/${locatInfo?.current.weather[0].icon}.png`}/>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" align="center">{Math.round(locatInfo?.current.temp as number)}°C</Typography>
                        <Typography variant="body2" textAlign="center">H:{Math.round(locatInfo?.daily[0].temp.max as number)}°C L:{Math.round(locatInfo?.daily[0].temp.min as number)}°C</Typography>
                    </Grid>
                </Grid>
            </Card>
    )
}

export default LocationRow;