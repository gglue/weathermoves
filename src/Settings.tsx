import React, {useState} from "react";
import {Grid, MenuItem, Select, ToggleButton, Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

/*
    This class holds the settings window which is used to
    toggle between light/dark and change the number of search results.
    The toggle between themes in inherited by prop from App.jsx
*/
function Settings(props : {setMode : any, darkMode : boolean}){

    // State used to set the number of search results
    const [queryNumber, setQuery] = useState<number>(Number(localStorage.getItem('QueryNumber')) || 5);

    // This helper function creates menu items for the dropdown select
    function queryList(){
        let x;
        const values =[]
        for (x = 1; x <= 5; x++){
            values.push(<MenuItem value={x}>{x}</MenuItem>);
        }
        return values;
    }

    // Invoked when a change is made
    function handleChange(e: any){
        // If search results changed, just change value
        if(typeof e.target.value === 'number'){
            setQuery(e.target.value);
            localStorage.setItem('QueryNumber', e.target.value.toString());
        }

        // If theme changed, remove from localStorage if dark -> light, otherwise create in localStorage
        else{
            if (props.darkMode){
                localStorage.removeItem('darkMode');
            }
            else{
                localStorage.setItem('darkMode', true.toString());
            }
            props.setMode(!props.darkMode);
        }
    }
    return (
        <Grid container direction="column" alignItems="center" spacing={5} justifyContent="center" sx={{mt: 2}}>
            <Grid item>
                <Typography variant="h6">Dark Mode:</Typography>
            </Grid>
            <Grid item>
                <ToggleButton value={props.darkMode} selected={props.darkMode} onChange={handleChange}><CheckIcon /></ToggleButton>
            </Grid>
            <Grid item>
                <Typography variant="h6">Queries per search:</Typography>
            </Grid>
            <Grid item>
                <Select onChange={handleChange} value={queryNumber}>
                    {queryList()}
                </Select>
            </Grid>
        </Grid>
    )
}

export default Settings;