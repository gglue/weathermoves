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
    return (
        <div className = "container" style={{width: window.innerWidth, height: window.innerHeight}}>
            <div className = "container-logo">
                <header><Logo/></header>
                <Routes>
                    <Route path="/" element={<WeatherList search={true}/>}/>
                    <Route path="/favourites" element={<WeatherList search={false}/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
                <footer><Footer/></footer>
            </div>
        </div>
      );
}

export default App;
