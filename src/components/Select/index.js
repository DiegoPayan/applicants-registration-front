import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function SelectMenu({ items, className, value, onChange, label, id }) {

    return (
        <FormControl className={className}>
            <InputLabel id="demo-simple-select-label" style={{ paddingLeft: "3%" }}
            >{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id={id}
                name={id}
                variant="filled"
                value={value}
                onChange={onChange}
            >
                {items.map((item, key) => <MenuItem key={key} value={item.id}>{item.nombre}</MenuItem>
                )}
            </Select>
        </FormControl>

    );
}