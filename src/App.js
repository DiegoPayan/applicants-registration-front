import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './modules/usuarios/Login';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { handleSnackbar } from "./modules/actions";
import routes from './routes';
import moment from 'moment';
import 'moment/locale/es';
import Page404 from './components/Page404';
import AuthRoute from './components/AuthRoute';
moment.locale('es');

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Routes() {
  return (
    <Fragment>
      {routes.map((item, key) => <AuthRoute key={key}
        path={item.path}
        exact
        component={item.component} />)}
    </Fragment>)
}

function App(props) {
  const { snackbar, handleSnackbar } = props;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    handleSnackbar({ open: false })
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            component={Login} />
          <Routes />
          <Route component={Page404} />

        </Switch>
      </BrowserRouter>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.type}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  snackbar: state.usuarios.snackbar
})
const mapDispatchToProps = dispatch => {
  return {
    handleSnackbar: (props) => { handleSnackbar(props)(dispatch) },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);