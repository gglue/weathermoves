import React, {useRef, useState} from 'react';
import {Box,TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface weatherLocation{
    "lat": number,
    "lon": number
}

interface weather{
    "current": string[],
    "daily": string[]
}

function Home(){
    const [locationResults, setLocations] = useState<weatherLocation[]>();
    const [weatherResults, setWeathers] = useState<weather[]>([]);
    const [search, setSearch] = useState<string|undefined>();
    const searchRef = useRef(null);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        let geoUri = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=6&appid=${API_KEY}`;

        axios.get<weatherLocation[]>(geoUri).then(res => {
            setLocations(res.data);


            if(locationResults){
                locationResults.map(locationResult => {
                    let weatherUri = `https://api.openweathermap.org/data/3.0/onecall?lat=${locationResult.lat}&lon=${locationResult.lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}`;
                    axios.get<weather>(weatherUri).then(res => {
                        //setWeathers([...weatherResults, res.data]);
                        console.log(res.data);
                    })
                })
            }
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit} >
                <Box sx={{ display: 'flex', alignItems: 'flex-end',}}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5, ml: 2.5 }} />
                    <TextField onChange={(newValue: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearch(newValue.target.value)}
                               ref={searchRef} sx={{width: 290}} id="input-with-sx" label="Please enter a city name or postal code" variant="standard" />
                </Box>
            </form>
        </div>
    );
}


export default Home;