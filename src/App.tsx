import React, {useState} from 'react';
import {ReactComponent as Logo} from './logo.svg';
import {Routes, Route} from "react-router-dom";
import WeatherList from "./WeatherList";
import Settings from "./Settings";
import Footer from "./Footer";

/*
    This class holds the main container and the routes for redirecting
*/
function App() {

    // State and variable used to toggle dark mode theme on/off
    const [darkMode, setMode] = useState<boolean>(localStorage.darkMode || false);
    const DARK_MODE = darkMode;

    return (
        <div className = "container" style={{width: window.innerWidth, height: window.innerHeight, color: DARK_MODE ? 'white': 'black', backgroundColor: DARK_MODE ? 'grey' : 'white'}}>
            <div className = "container-logo">
                <header><Logo/></header>
                <Routes>
                    <Route path="/" element={<WeatherList key={'list'} search={true} darkMode={darkMode}/>}/>
                    <Route path="/favourites" element={<WeatherList key={'fav'} search={false} darkMode={darkMode}/>}/>
                    <Route path="/settings" element={<Settings setMode={setMode} darkMode={darkMode}/>}/>
                </Routes>
                <footer><Footer darkMode={darkMode}/></footer>
            </div>
        </div>
      );
}

export default App;
