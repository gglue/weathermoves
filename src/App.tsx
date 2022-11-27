import React from 'react';
// @ts-ignore
import { ReactComponent as Logo} from "./logo.svg";
import {Routes, Route, useLocation} from "react-router-dom";
import WeatherList from "./WeatherList";
import Footer from "./Footer";

function App() {
    const location = useLocation();
    return (
        <div className = "container">
            <div className = "container-logo">
                <header><Logo/></header>
                <Routes>
                    <Route path="/" element={<WeatherList search={true}/>}/>
                    <Route path="/favourites" element={<WeatherList search={false}/>}/>
                </Routes>
                <footer><Footer/></footer>
            </div>
        </div>
      );
}

export default App;
