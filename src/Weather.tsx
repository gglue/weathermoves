import React, {useEffect, useState} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid, Typography} from "@mui/material";
function Weather(props: any) {

    const [fontColor, setFont] = useState<string>('black');
    const [background, setBackground] = useState<string>('day');
    const [cityName, setCity] = useState<string>('Placeholder');
    const [weather, setWeather] = useState<string>('Placeholder');
    const [temp, setTemp] = useState<number>(0);
    const [high, setHigh] = useState<number>(0);
    const [low, setLow] = useState<number>(0);
    const [windSpeed, setWind] = useState<number>(0);
    const [precipitation, setPrec] = useState<number>(0);
    const [humidity, setHumid] = useState<number>(0);
    const [cloudiness, setCloud] = useState<number>(0);

    useEffect(() => {
        if (props.popupInfo) {
            if(props.popupInfo.locatInfo.current.weather[0].icon.includes('d')){
                setBackground('day');
                setFont('black');
            }
            else{
                setBackground('night');
                setFont('white');
            }
            setCity(props.popupInfo.cityName);
            setWeather(props.popupInfo.locatInfo.current.weather[0].description);
            setTemp(props.popupInfo.locatInfo.current.temp);
            setHigh(props.popupInfo.locatInfo.daily[0].temp.max);
            setLow(props.popupInfo.locatInfo.daily[0].temp.min);
            setWind(props.popupInfo.locatInfo.current.wind_speed);
            setPrec(props.popupInfo.locatInfo.minutely.precipitation);
            setHumid(props.popupInfo.locatInfo.current.humidity);
            setCloud(props.popupInfo.locatInfo.current.clouds);
        }
    }, [props.popupInfo])
    return(
        props.trigger ?
                <Grid container sx={{color: fontColor}} alignItems="center" direction="column" className='popup' style={{backgroundImage:`url(${process.env.PUBLIC_URL}/images/${background}.svg)`}}>

                    <Grid item xs={1}>
                        <ArrowBackIcon onClick={() => {props.setTrigger(false)}} fontSize="large"/>
                    </Grid>

                    <Grid item xs>
                        <Typography align="center" variant="h4">{cityName}</Typography>
                        <Typography align="center" variant="h3">&nbsp;{Math.round(temp)}°</Typography>
                        <Typography align="center" variant="subtitle1">{weather}</Typography>
                        <Typography align="center" variant="subtitle1">H:{Math.round(high)}° L:{Math.round(low)}°</Typography>
                    </Grid>

                    <Grid item xs={7}>
                        <Typography align="center" variant="subtitle1">Wind: {windSpeed} m/s</Typography>
                        <Typography align="center" variant="subtitle1">Precipitation: {precipitation}mm</Typography>
                        <Typography align="center" variant="subtitle1">Humidity: {humidity}%</Typography>
                        <Typography align="center" variant="subtitle1">Cloudiness: {cloudiness}%</Typography>
                    </Grid>
                </Grid>
                : null
    );
}
export default Weather;