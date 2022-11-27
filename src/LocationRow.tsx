import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card} from "@mui/material";

function LocationRow(props : WeatherLocation){
    const [locatInfo, setInfo] = useState<CityWeather>();
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [loading, setLoading] = useState<boolean>(true);
    const cityName = props.name;
    const country = props.country;
    let date;
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
    }, []);

    function localTime(UTCtime : number, offset : number){
        const sum = UTCtime + offset;
        let tempDate = new Date(0,0,0,0,0, sum);
        return tempDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    return (
        loading ?
                null
            :
            <Card variant="outlined" sx={{ minWidth: 374, pb: 1, pt: 1}}>
                <h1>{cityName}, {country}</h1>
                <h1>{locatInfo?.current.weather[0].description}</h1>
                <h1>{Math.round(locatInfo?.current.temp as number)}°C</h1>
                <h1>{locatInfo?.current.weather[0].icon}</h1>
                <h1>{localTime(locatInfo?.current.dt as number, locatInfo?.timezone_offset as number)}</h1>
                <h1>H:{Math.round(locatInfo?.daily[0].temp.max as number)}°C L:{Math.round(locatInfo?.daily[0].temp.min as number)}°C</h1>
            </Card>
    )
}

export default LocationRow;