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
import Loading from './components/Loading/loading';
moment.locale('es');

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Routes() {
  return (
    <Fragment>
      {/**/}
      {routes.map((item, key) => <AuthRoute key={key}
        path={item.path}
        exact
        component={item.component} />)}
    </Fragment>)
}

function App(props) {
  const { snackbar, handleSnackbar, loading } = props;
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
      {loading && <Loading />}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.usuarios);

  return ({
    snackbar: state.usuarios.snackbar,
    loading: state.usuarios.loading
  })
}
const mapDispatchToProps = dispatch => {
  return {
    handleSnackbar: (props) => { handleSnackbar(props)(dispatch) },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);