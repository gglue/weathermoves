import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card} from "@mui/material";


function LocationRow(props : WeatherLocation){
    const [locatInfo, setInfo] = useState<CityWeather>();
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [loading, setLoading] = useState<boolean>(true);

    // At startup
    useEffect(() => {
        axios.get<CityWeather>(`https://api.openweathermap.org/data/3.0/onecall?lat=${props.lat}&lon=${props.lon}&exclude=hourly,alerts&appid=${API_KEY}`)
            .then(res => {
                setInfo({
                    current: res.data.current,
                    daily: res.data.daily,
                    minutely: res.data.minutely
                });
                setLoading(false);
            })
    }, []);

    return (
        loading ?
            <Card variant="outlined" sx={{ minWidth: 374, pb: 1, pt: 1}}>
                <h1></h1>
            </Card>
            : null
    )
}

export default LocationRow;