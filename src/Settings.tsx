import React from "react";

function Settings(){
    console.log(localStorage.getItem('darkMode') || null);
    console.log(localStorage.getItem('QueryNumber') || null);
    return (
        <h1></h1>
    )
}

export default Settings;