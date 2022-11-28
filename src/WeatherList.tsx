import React, {useState} from 'react';
import {Box, Grid, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import LocationRow from "./LocationRow";
import Weather from "./Weather";

function WeatherList(props : { search : boolean }){
    const [locationResults, setLocations] = useState<WeatherLocation[]|WeatherLocation>();
    const [search, setSearch] = useState<string|undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [trigger, setTrigger] = useState<boolean>(false);
    const [popupInfo, setPopup] = useState<any>();

    const API_KEY = process.env.REACT_APP_API_KEY;
    const TOTAL_QUERY = 5;
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        let geoUri;
        if (search?.includes(',')){
            geoUri = `https://api.openweathermap.org/geo/1.0/zip?zip=${search}&limit=${TOTAL_QUERY}&appid=${API_KEY}`;
        }
        else {
            geoUri = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${TOTAL_QUERY}&appid=${API_KEY}`;
        }
        axios.get<WeatherLocation[]>(geoUri).then(res => {
            setLocations(res.data);
            setLoading(false);
        })
    }

    function printList(){
        if(locationResults) {
            if (Array.isArray(locationResults)) {
                return (
                    locationResults
                        ? locationResults.map(locationResult => (
                            <Grid item xs={12}><LocationRow lat={locationResult.lat} lon={locationResult.lon}
                                                            name={locationResult.name} country={locationResult.country}
                                                            popupInfo={popupInfo} setPopup={setPopup}
                                                            setTrigger={setTrigger} trigger={trigger}/> </Grid>
                        ))
                        : null
                )
            } else {
                return (
                    <Grid item xs={12}><LocationRow lat={locationResults.lat} lon={locationResults.lon}
                                                    name={locationResults.name} country={locationResults.country}
                                                    popupInfo={popupInfo} setPopup={setPopup}
                                                    setTrigger={setTrigger} trigger={trigger}/> </Grid>
                )
            }
        }
    }

    return(
        <Grid container justifyContent="center" alignItems="center" direction="row" className='searchBar'>
            {trigger ? <Weather trigger={trigger} setTrigger={setTrigger} popupInfo={popupInfo} setPopup={setPopup}> </Weather> :
                <Grid container justifyContent="center" alignItems="center" direction="row" className='searchBar'>
                    <form onSubmit={handleSubmit} >
                        {props.search ?
                            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                <TextField
                                    onChange={(newValue: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearch(newValue.target.value)}
                                    sx={{width: 235}} id="input-with-sx" label="Enter a city or zip code, country."
                                    variant="standard"/>
                            </Box>
                            :
                            null
                        }
                    </form>
                    <Grid container justifyContent="center" alignItems="center" direction="row" className='searchResults' sx={{overflowY: 'auto', overflowX: "hidden", maxHeight: 490}}>
                        {loading ? null : printList()}
                    </Grid>
                </Grid>}
        </Grid>
    );
}


export default WeatherList;