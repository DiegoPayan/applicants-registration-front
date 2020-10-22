import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { handleAuth, handleSnackbar } from "../../actions";
import "./login.css"
class Login extends Component {
    state = {
        idUsuario: ""
    };
    handleAuth = async () => {
        const login = await this.props.handleAuth(this.state.idUsuario);
        this.props.handleSnackbar({ open: true, message: login.message, type: login.status > 350 ? "error" : "success" })
        if (login.status < 350) {
            sessionStorage.setItem("token", login.data);
            this.props.history.push("/");
        }
    }
    handleChange = ({ target: { value, id } }) => {
        this.setState({ [id]: value });
    }
    render() {
        return (
            <div className="container-login flex-center">
                <div className="card card-login">
                    <span>INICIO DE SESIÓN</span>
                    <div className="logo-login">
                        <img alt="" src={require("../../../images/sntissste-logo.png")} />
                    </div>
                    <div className="form-login">
                        <TextField
                            id="idUsuario"
                            label="Clave de acceso"
                            value={this.state.idUsuario}
                            type="password"
                            onChange={this.handleChange}
                            autoComplete="current-password"
                            variant="outlined"
                            onKeyPress={(e) => e.key == 'Enter' && this.handleAuth()}
                        />
                        <Button onClick={this.handleAuth} variant="contained">
                            INGRESAR
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleAuth: (id) => { return handleAuth(id)(dispatch) },
        handleSnackbar: (props) => { handleSnackbar(props)(dispatch) },
    }
}
export default connect(
    null,
    mapDispatchToProps
)(Login)

    ;