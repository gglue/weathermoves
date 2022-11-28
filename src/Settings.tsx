import React, {useState} from "react";
import {Grid, MenuItem, Select, ToggleButton, Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
function Settings(props : {setMode : any, darkMode : boolean}){
    const [queryNumber, setQuery] = useState<number>(Number(localStorage.getItem('QueryNumber')) || 5);
    function queryList(){
        let x;
        const values =[]
        for (x = 1; x <= 5; x++){
            values.push(<MenuItem value={x}>{x}</MenuItem>);
        }
        return values;
    }

    function handleChange(e: any){
        if(typeof e.target.value === 'number'){
            setQuery(e.target.value);
            localStorage.setItem('QueryNumber', e.target.value.toString());
        }
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