import React, {useEffect, useState} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";

/*
    This class is the pop-up screen that displays more detailed information
    about the weather of a city.
*/
function Weather(props: any) {

    // This state sets the font color depending on the background image
    const [fontColor, setFont] = useState<string>('black');

    // This state sets the background image
    const [background, setBackground] = useState<string>('day');

    // This state sets the city name
    const [cityName, setCity] = useState<string>('Placeholder');

    // This state sets the weather description
    const [weather, setWeather] = useState<string>('Placeholder');

    // This state sets the current temperature
    const [temp, setTemp] = useState<number>(0);

    // This state sets the highest temperature range
    const [high, setHigh] = useState<number>(0);

    // This state sets the lowest temperature range
    const [low, setLow] = useState<number>(0);

    // This state sets the wind speed
    const [windSpeed, setWind] = useState<number>(0);

    // This state sets the precipitation level
    const [precipitation, setPrec] = useState<number>(0);

    // This state sets the humidity level
    const [humidity, setHumid] = useState<number>(0);

    // This state sets the cloudiness level
    const [cloudiness, setCloud] = useState<number>(0);

    // Component refreshs when new information is loaded from the prop
    useEffect(() => {
        // Run only if pop up information is given
        if (props.popupInfo) {
            // Set background and font color based on time
            if(props.popupInfo.locatInfo.current.weather[0].icon.includes('d')){
                setBackground('day');
                setFont('black');
            }
            else{
                setBackground('night');
                setFont('white');
            }
            // Update the states
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

    // This helper function adds the location to the user's favourites
    function favourite(){
        // Grab the required information needed to search
        const favouritePlace = {
          lat: props.popupInfo.locatInfo.lat,
          lon: props.popupInfo.locatInfo.lon,
          country: props.popupInfo.country,
          name: props.popupInfo.cityName,
        };
        // If no favourites stored, store it first
        if (!localStorage.fav){
            let favs = [];
            favs.push(favouritePlace);
            localStorage.setItem('fav', JSON.stringify(favs));
        }
        else{
            let stored = JSON.parse(localStorage.fav);
            // If already in favourites, do not add it
            if(stored.some((location: { lat: any; lon: any; }) => location.lat === favouritePlace.lat && location.lon === favouritePlace.lon)){
                console.log("Already in your favourites!");
            }
            else{
                stored.push(favouritePlace);
                // Store in JSON format
                localStorage.setItem('fav', JSON.stringify(stored));
            }
        }
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