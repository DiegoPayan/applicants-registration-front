import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import "./container.css"
import { Button } from '@material-ui/core';

const Container = (props) => {
  const [state, setState] = useState(false);
  const sideList = side => (
    <div
      className=""
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        {['1|', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(!state);
  };

  return (
    <div className="container">
      <AppBar position="static" className="header">
        <Toolbar>
          <IconButton onClick={toggleDrawer()} edge="start" className="" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title-header">
            SNTISSSTE
    </Typography>
          <div variant="h6" className="">
            Adriana Zaragoza Lopez
    </div>
        </Toolbar>
      </AppBar>
      <div className="card card-container">
         {/*  <div className="title-container flex-center">Lista de agregados
      <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div> */}
        {props.children}
      </div>
      <Drawer open={state} onClose={toggleDrawer()}>
        {sideList('left')}
      </Drawer>
    </div>

  )
}
export default Container;