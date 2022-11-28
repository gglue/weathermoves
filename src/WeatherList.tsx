import React, {useEffect, useState} from 'react';
import {Box, Grid, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import LocationRow from "./LocationRow";
import Weather from "./Weather";
import {useLocation} from "react-router-dom";

/*
    This class is used to output a list of weather information.
    Either by search results or by your saved favourites.
 */
function WeatherList(props : { search : boolean, darkMode : boolean}){

    // State used to retrieve the latitude and Longitude when using the search bar
    const [locationResults, setLocations] = useState<WeatherLocation[]|WeatherLocation>();

    // State used to retrieve the weather information using latitude and longitutde
    const [search, setSearch] = useState<string|undefined>();

    // State used to place a placeholder element while Application is retrieving information
    const [loading, setLoading] = useState<boolean>(true);

    // State used to toggle on/off the popup for more detailed weather information
    const [trigger, setTrigger] = useState<boolean>(false);

    // State used to fill the pop-up with weather information
    const [popupInfo, setPopup] = useState<any>();

    // Stores the API key (I know its dangerous to access it this way, in real situation we store API key in backend)
    const API_KEY = process.env.REACT_APP_API_KEY;

    // Sets the total number of results per search
    const TOTAL_QUERY = Number(localStorage.getItem('QueryNumber')) || 5;

    // location used for re-rendering
    const location = useLocation();

    // Re-rendering each time location and/or search bar is disabled
    useEffect(() => {

        // If it's the favourite list, grab saved favourite latitude and longitude from localStorage
        if (!props.search){
            if(localStorage.fav){
                let stored = JSON.parse(localStorage.fav);
                setLocations(stored);
                setLoading(false);
            }
        }

    }, [location, props.search]);

    // Invoked when user enters input in the search bar
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        let geoUri;

        // Fetch lat and lon differently depending on if user is searching with city name or zip code, country code
        if (search?.includes(',')){
            geoUri = `https://api.openweathermap.org/geo/1.0/zip?zip=${search}&limit=${TOTAL_QUERY}&appid=${API_KEY}`;
        }
        else {
            geoUri = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${TOTAL_QUERY}&appid=${API_KEY}`;
        }

        // Send Get request and start creating a list of LocationRows
        axios.get<WeatherLocation[]>(geoUri).then(res => {
            setLocations(res.data);
            setLoading(false);
        })
    }

    // Helper function used to create the list of LocationRows
    function printList(){
        // Only run if there are results from the GET request for lat and lon
        if(locationResults) {
            // Create the LocationRows differently depending on if it is an array or not (Multiple or one result)
            if (Array.isArray(locationResults)) {
                return (
                    locationResults
                        ? locationResults.map(locationResult => (
                            <Grid item xs={12}><LocationRow lat={locationResult.lat} lon={locationResult.lon}
                                                            name={locationResult.name} country={locationResult.country}
                                                            popupInfo={popupInfo} setPopup={setPopup} darkMode={props.darkMode}
                                                            setTrigger={setTrigger} trigger={trigger}/> </Grid>
                        ))
                        : null
                )
            } else {
                return (
                    <Grid item xs={12}><LocationRow lat={locationResults.lat} lon={locationResults.lon}
                                                    name={locationResults.name} country={locationResults.country}
                                                    popupInfo={popupInfo} setPopup={setPopup} darkMode={props.darkMode}
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
                    <Grid container justifyContent="center" alignItems="center" direction="row" className='searchResults' sx={{overflowY: 'auto', overflowX: "hidden", maxHeight: window.innerHeight-177}}>
                        {loading ? null : printList()}
                    </Grid>
                </Grid>}
        </Grid>
    );
}


export default WeatherList;