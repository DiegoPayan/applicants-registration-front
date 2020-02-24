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
            localStorage.setItem("token", login.data);
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
                    <div className="logo-login">
                        <img alt="" src={require("../../../images/logo.jpg")} />
                    </div>
                    <div className="form-login">
                        <TextField
                            id="idUsuario"
                            label="Código"
                            value={this.state.idUsuario}
                            type="password"
                            onChange={this.handleChange}
                            autoComplete="current-password"
                            variant="filled"
                        />
                        <Button onClick={this.handleAuth} variant="contained" color="primary">
                            Iniciar sesión
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