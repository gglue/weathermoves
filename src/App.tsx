import React from 'react';
import { ReactComponent as Logo} from "./logo.svg";
import {Routes, Route, useLocation} from "react-router-dom";
import Home from "./Home"
function App() {
    const location = useLocation();
    return (
        <div className = "container">
            <div className = "container-view">
                <header><Logo/></header>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/weatherLocation" element={<Home/>}/>
                </Routes>
            </div>
        </div>
      );
}

export default App;
