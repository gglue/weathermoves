import {useLocation, useNavigate} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import GradeIcon from '@mui/icons-material/Grade';
import SettingsIcon from '@mui/icons-material/Settings';
import React from "react";

function Footer(props:{darkMode : boolean}){
    // Variables used to help redirect
    const location = useLocation();
    const navigate = useNavigate();
    const DARK_MODE = props.darkMode;
    // Changes the viewing mode and if not on home page, go to home page
    const handleChange = (e: any, newValue : string) =>{
        e.preventDefault();
        if (!(location.pathname === newValue)) navigate(newValue);
    }
    return(
        <BottomNavigation sx={{ position: 'absolute', right: 65, left : 65, bottom: 0, color: DARK_MODE ? 'white': 'black', backgroundColor: DARK_MODE ? 'grey' : 'white'}} value={location.pathname} showLabels onChange={handleChange}>
            <BottomNavigationAction
                label="Search"
                value="/"
                icon={<TravelExploreIcon/>}
            />
            <BottomNavigationAction
                label="Favourites"
                value="/favourites"
                icon={<GradeIcon/>}
            />
            <BottomNavigationAction
                label="Settings"
                value="/settings"
                icon={<SettingsIcon/>}
            />
        </BottomNavigation>
    )
}

export default Footer;