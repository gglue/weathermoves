import React, {useRef, useState} from 'react';
import {Box, Grid, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import LocationRow from "./LocationRow";

function Home(){
    const [locationResults, setLocations] = useState<WeatherLocation[]>();
    const [search, setSearch] = useState<string|undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const TOTAL_QUERY = process.env.REACT_APP_TOTAL_QUERY;
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        let geoUri = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${TOTAL_QUERY}&appid=${API_KEY}`;

        axios.get<WeatherLocation[]>(geoUri).then(res => {
            setLocations(res.data);
            setLoading(false);
        })
    }

    function printList(){
        return (
            locationResults
                ? locationResults.map(locationResult => (
                    <Grid item xs = {12}><LocationRow lat={locationResult.lat} lon={locationResult.lon}/> </Grid>
                ))
                : null
        )
    }

    return(
        <Grid container justifyContent="center" alignItems="center" direction="row" className='root'>
            <form onSubmit={handleSubmit} >
                <Box sx={{ display: 'flex', alignItems: 'flex-end',}}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5}} />
                    <TextField onChange={(newValue: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearch(newValue.target.value)}
                               sx={{width: 290}} id="input-with-sx" label="Please enter a city name or postal code" variant="standard" />
                </Box>
            </form>
            {loading ? null : printList()}
        </Grid>
    );
}


export default Home;