/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const [optionArr, setOptionArr] = React.useState([0.5, 1, 1.5, 2, 2.5, 3, 3.5])
  const [value, setValue] = React.useState(null)

  // Solves the locality value not showing up in edit warehouse
  React.useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <FormControl fullWidth className={classes.selectFormControl}>
      <Select
        disabled={props.disabled}
        onChange={e => props.handleChange(e.target.value)}
        defaultValue={optionArr[0]}
        value={value}
      >
        {optionArr.map(item => {
          return <MenuItem
            classes={{
              root: classes.selectMenuItem
            }}
            value={item}
          >
            Within {item}km
          </MenuItem>
        })}
      </Select>
    </FormControl>
  );
}