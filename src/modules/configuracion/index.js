import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { getConfiguracion } from '../actions';

import './configuracion.css';

class Configuration extends Component {

  state = {
    firmas: []
  }

  async componentDidMount() {
    await this.props.getConfiguration();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { configuracion } = nextProps
    if (this.props.configuracion !== configuracion && configuracion && configuracion.data) {
      this.setState({
        configuracion
      });
    }
    this.setState({ loading: false })
  }

render() {
  console.log(this.props.configuracion);
  return (
    < Fragment >
      <div className="container-btn-action">
        <Button variant="outlined" color="primary" className="btn-action" onClick={() => this.closeRemove({ id: "x" })} >Nuevo Puesto     </Button></div>
      <div className="card card-container">
        <div className="config_title">
          <span className="config_title_span">Configuración de firmas</span>
        </div>
        <div className="config_body">
          <div className="config_body_part">
            <span>INSTITUTO</span>
            <div className="config_body_part_input">
              <TextField
                label="Nombre"
                variant="outlined"
                margin= "dense"
                className="config_input"
              />
              <TextField
                label="Puesto"
                variant="outlined"
                margin= "dense"
                className="config_input"
              />
            </div>
            <div className="config_body_part_input margin-top">
              <TextField
                label="Nombre"
                variant="outlined"
                margin= "dense"
                className="config_input"
              />
              <TextField
                label="Puesto"
                variant="outlined"
                margin= "dense"
                className="config_input"
              />
            </div>
          </div>
          <div className="config_body_part">
            <span>INTEGRANTES DE LA SUBCOMISIÓN</span>
            <div className="config_body_part_input">
              <TextField
                label="Nombre"
                variant="outlined"
                margin= "dense"
                className="config_input"
              />
              <TextField
                label="Puesto"
                variant="outlined"
                margin= "dense"
                className="config_input"
              />
            </div>
          </div>
          <div className="config_body_part">
            <span>SINDICATO</span>
            <div className="config_body_part_input">
              <TextField
                label="Nombre"
                variant="outlined"
                margin= "dense"
                className="config_input"
              />
              <TextField
                label="Puesto"
                variant="outlined"
                margin= "dense"
                className="config_input"
              />
            </div>
            <div className="config_body_part_input margin-top">
              <TextField
                label="Nombre"
                variant="outlined"
                margin= "dense"
                className="config_input"
              />
              <TextField
                label="Puesto"
                variant="outlined"
                margin= "dense"
                className="config_input"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
}

}

const mapStateToProps = state => {
  return {
    configuracion: state.usuarios.configuracion
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getConfiguration: () => { return getConfiguracion()(dispatch) }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configuration);