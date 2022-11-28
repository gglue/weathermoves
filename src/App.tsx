import React, {useState} from 'react';
// @ts-ignore
import { ReactComponent as Logo} from "./logo.svg";
import {Routes, Route} from "react-router-dom";
import WeatherList from "./WeatherList";
import Settings from "./Settings";
import Footer from "./Footer";

function App() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [darkMode, setMode] = useState<boolean>(localStorage.darkMode || false);
    const DARK_MODE = darkMode;
    return (
        <div className = "container" style={{width: window.innerWidth, height: window.innerHeight, color: DARK_MODE ? 'white': 'black', backgroundColor: DARK_MODE ? 'grey' : 'white'}}>
            <div className = "container-logo">
                <header><Logo/></header>
                <Routes>
                    <Route path="/" element={<WeatherList search={true} darkMode={darkMode}/>}/>
                    <Route path="/favourites" element={<WeatherList search={false} darkMode={darkMode}/>}/>
                    <Route path="/settings" element={<Settings setMode={setMode} darkMode={darkMode}/>}/>
                </Routes>
                <footer><Footer darkMode={darkMode}/></footer>
            </div>
        </div>
      );
}

export default App;
