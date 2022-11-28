import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card, Grid, Typography} from "@mui/material";

function LocationRow(props : WeatherLocation){
    const [locatInfo, setInfo] = useState<CityWeather>();
    const API_KEY = process.env.REACT_APP_API_KEY;
    const DARK_MODE = props.darkMode;
    const [loading, setLoading] = useState<boolean>(true);
    const cityName = props.name;
    const country = props.country;
    const time = localTime(locatInfo?.current.dt as number, locatInfo?.timezone_offset as number);
    // At startup
    useEffect(() => {
        axios.get<CityWeather>(`https://api.openweathermap.org/data/3.0/onecall?lat=${props.lat}&lon=${props.lon}&units=metric&exclude=hourly,alerts&appid=${API_KEY}`)
            .then(res => {
                setInfo({
                    current: res.data.current,
                    daily: res.data.daily,
                    minutely: res.data.minutely,
                    timezone_offset: res.data.timezone_offset
                });
                setLoading(false);
            })
    }, [props.name]);

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
                        <img style={{float: 'right'}} src={`${process.env.PUBLIC_URL}/images/${locatInfo?.current.weather[0].icon}.png`}/>
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