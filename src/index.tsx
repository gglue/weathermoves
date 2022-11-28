import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/body.css';
import './css/App.css';
import './css/header.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

/*
    The root of the application used to run React.
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </React.StrictMode>
);

