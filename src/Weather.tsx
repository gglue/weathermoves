import React, {useEffect, useState} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
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

    function favourite(){
        const favouritePlace = {
          lat: props.popupInfo.locatInfo.lat,
          lon: props.popupInfo.locatInfo.lon,
          country: props.popupInfo.country,
          name: props.popupInfo.cityName,
        };
        if (!localStorage.fav){
            let favs = [];
            favs.push(favouritePlace);
            localStorage.setItem('fav', JSON.stringify(favs));
        }
        else{
            let stored = JSON.parse(localStorage.fav);
            if(stored.some((location: { lat: any; lon: any; }) => location.lat === favouritePlace.lat && location.lon === favouritePlace.lon)){
                console.log("Already in your favourites!");
            }
            else{
                stored.push(favouritePlace);
                localStorage.setItem('fav', JSON.stringify(stored));
            }
        }
        //console.log(localStorage.fav);
    }
    return(
        props.trigger ?
                <Grid container sx={{color: fontColor}} alignItems="center" direction="column" className='popup' style={{backgroundImage:`url(${process.env.PUBLIC_URL}/images/${background}.svg)`,
                    width: window.innerWidth, height: window.innerHeight-127}}>

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
                        <Button onClick={() => {favourite()}} variant="contained">Add to favourites</Button>
                    </Grid>


                </Grid>
                : null
    );
}
export default Weather;