import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './modules/usuarios/Login';
import Container from './modules/usuarios/Container';
import Edit from './modules/aspirantes/edit';
import List from './modules/aspirantes/list';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { handleSnackbar } from "./modules/actions";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Routes() {
  return (
    <Container>
      <Route
        path="/home"
        component={List} />
      <Route
      exact
        path="/aspirante/:id"
        component={Edit} />
      <Route
      exact
        path="/aspirante"
        component={Edit} />
      <Redirect exact from="/" to="/home" />
    </Container>
  );

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
          <Routes></Routes>
          {/* <Route component={PageError} /> */}
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