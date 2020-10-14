import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListA from '@material-ui/icons/List';
import Person from '@material-ui/icons/Person';
import Puesto from '@material-ui/icons/AssignmentInd';
import Estudio from '@material-ui/icons/Ballot';
import Rama from '@material-ui/icons/Timeline';
import MT from '@material-ui/icons/MeetingRoom';
import Settings from '@material-ui/icons/Settings';
import Back from '@material-ui/icons/KeyboardBackspace';
import "./container.css"
import routes from '../../../routes';
import { useHistory } from 'react-router-dom';

const Container = (props) => {
  let history = useHistory();

  const [state, setState] = useState(false);
  const [selected, setSelected] = useState("");
  const [title, setTitle] = useState("");
  const [arrow, setArrow] = useState(false);


  useEffect(() => {
    const ruta = routes.filter(item => item.path === window.location.pathname.replace(/\d+/g, ":id"));
    console.log(ruta);

    setTitle(ruta[0] ? ruta[0].name : "")
    setSelected(ruta[0] ? ruta[0].id : "")
    setArrow(ruta[0] ? ruta[0].arrow || false : "")
  }
    , [props]);

  const onSelect = ({ currentTarget: { id } }) => {
    setSelected(id)
    const ruta = routes.filter(item => item.id === id);
    setTitle(ruta[0] ? ruta[0].name : "")
    history.push(ruta[0] ? ruta[0].path : "")
  }

  const arrayList = [{ name: "Descarga", img: <ListA />, onClick: (e) => onSelect(e) }, { name: "Listados", img: <Person />, onClick: (e) => onSelect(e) }, { name: "Nivel de estudios", img: <Estudio />, onClick: (e) => onSelect(e) }, { name: "Ramas", img: <Rama />, onClick: (e) => onSelect(e) }, { name: "Puestos", img: <Puesto />, onClick: (e) => onSelect(e) }, { name: "Configuración", img: <Settings />, onClick: (e) => onSelect(e) },]
  const sideList = () => (
    <div
      className=""
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <IconButton onClick={toggleDrawer()} edge="start" className="flex-end-self" color="black" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <img className="img-sidebar" src={require("../../../images/logo.jpg")} alt="logo"></img>
      <div className="listItem listExpanded"  >
        {arrayList.map(item => <IconButton key={item.name} onClick={item.onClick} id={item.name} className={selected === item.name && "selectedBtn"}>{item.img} <span className="span-btn-sb">{item.name}</span></IconButton>
        )}
      </div>

      <IconButton className="btn-log-out" onClick={logOut} ><MT /> <span className="span-btn-sb">Cerrar Sesión</span></IconButton>
    </div>
  );

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(!state);
  };
  const logOut = () => {
    localStorage.clear();
    history.push("/login")
  }

  return (
    <div className="container">
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography variant="h6" className="title-header">
            {arrow && <IconButton onClick={() => history.push(arrow)} edge="start" className="flex-end-self" color="white" aria-label="menu">
              <Back style={{ color: "white" }} />
            </IconButton>}
            {title}
          </Typography>
          <div variant="h6" className="name-and-rol">
            Adriana Zaragoza Lopez
            <div className="font-weight-300">Rol</div>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position="static" className={`sidebar- ${state && "boxshadow-none"}`} style={{ boxShadow: state ? "none !important" : "" }}>
        <IconButton onClick={toggleDrawer()} edge="start" className="" color="black" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <img className="img-sidebar" style={{ visibility: "hidden" }} src={require("../../../images/logo.jpg")} alt="logo"></img>

        <div className="listItem" >
          {arrayList.map(item => <IconButton id={item.name} key={item.name} onClick={item.onClick} className={selected === item.name && "selectedBtn"}>{item.img} </IconButton>
          )}
        </div>

        <IconButton className="btn-log-out" onClick={logOut} ><MT /></IconButton>
      </AppBar>
      <div className="card background-card">
        {props.children}
      </div>
      <Drawer open={state} onClose={toggleDrawer()} className="sidebar-expanded">
        {sideList('left')}
      </Drawer>
    </div>

  )
}
export default Container;