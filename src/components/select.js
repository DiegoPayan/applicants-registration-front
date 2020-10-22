import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const Menu =({label,className,value,onChange,values})=>{
    return(
        <TextField
        id="standard-select-currency"
        select
        className={className}
        variant="outlined"
        label={label}
        value={value}
        onChange={onChange}
      >
        {values.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )
}

export default Menu;