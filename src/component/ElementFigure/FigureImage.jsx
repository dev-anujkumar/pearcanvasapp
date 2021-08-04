import React from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
}));

const FigureImage = () => {
    const classes = useStyles();
    const [label, setLabel] = React.useState('Label');

    return (
        <>
        <div className='image-header'>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Label</InputLabel>
            <Select
                labelId="select-label"
                id="simple-select"
                value={label}
                onChange={(event) => {
                    setLabel(event.target.value);
                }}
            >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>   
        </FormControl>
        <TextField className='textfield-name' id="name" label="Label Name" />
        <TextField className='textfield-number' id="number" label="Number" />
        </div>
        </>
    )
}

export default FigureImage
