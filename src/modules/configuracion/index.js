import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { getConfiguracion, saveConfiguracion } from '../actions';

import './configuracion.css';

class Configuration extends Component {

  state = {}

  async componentDidMount() {
    await this.props.getConfiguration();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { configuracion } = nextProps
    if (this.props.configuracion !== configuracion && configuracion && configuracion.data) {
      for (let i = 1; i <= 5; i++) {
        let data = configuracion.data.find(e => e.orden == i);
        if (data) {
          this.setState({
            [`nombre${i}`]: data['nombre'],
            [`puesto${i}`]: data['puesto']
          });
        }
      }
    }
    this.setState({ loading: false })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  saveConfiguration = () => {
    let {
      nombre1, nombre2, nombre3, nombre4, nombre5,
      puesto1, puesto2, puesto3, puesto4, puesto5,
    } = this.state;

    this.props.saveConfiguracion([{
        "nombre": nombre1,
        "puesto": puesto1,
        "orden": 1
      },
      {
        "nombre": nombre2,
        "puesto": puesto2,
        "orden": 2
      },
      {
        "nombre": nombre3,
        "puesto": puesto3,
        "orden": 3
      },
      {
        "nombre": nombre4,
        "puesto": puesto4,
        "orden": 4
      },
      {
        "nombre": nombre5,
        "puesto": puesto5,
        "orden": 5
      }
    ]);
  }

  render() {

    let {
      nombre1, nombre2, nombre3, nombre4, nombre5,
      puesto1, puesto2, puesto3, puesto4, puesto5,
    } = this.state;

    return (
      < Fragment >
        <div className="container-btn-action">
          <Button variant="outlined" color="primary" className="btn-action" onClick={() => this.saveConfiguration()} >Guardar configuración     </Button></div>
        <div className="card card-container">
          <div className="config_title">
            <span className="config_title_span">Configuración de firmas</span>
          </div>
          <div className="config_body">
            <div className="config_body_part">
              <span>INSTITUTO</span>
              <div className="config_body_part_input">
                <TextField
                  id="nombre1"
                  label="Nombre"
                  variant="outlined"
                  margin="dense"
                  className="config_input"
                  value={nombre1 || ''}
                  onChange={this.handleChange}
                />
                <TextField
                  id="puesto1"
                  label="Puesto"
                  variant="outlined"
                  margin="dense"
                  className="config_input"
                  value={puesto1 || ''}
                  onChange={this.handleChange}
                />
              </div>
              <div className="config_body_part_input margin-top">
                <TextField
                  id="nombre2"
                  label="Nombre"
                  variant="outlined"
                  margin="dense"
                  className="config_input"
                  value={nombre2 || ''}
                  onChange={this.handleChange}
                />
                <TextField
                  id="puesto2"
                  label="Puesto"
                  variant="outlined"
                  margin="dense"
                  className="config_input"
                  value={puesto2 || ''}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="config_body_part">
              <span>INTEGRANTES DE LA SUBCOMISIÓN</span>
              <div className="config_body_part_input">
                <TextField
                  id="nombre3"
                  label="Nombre"
                  variant="outlined"
                  margin="dense"
                  className="config_input"
                  value={nombre3 || ''}
                  onChange={this.handleChange}
                />
                <TextField
                  id="puesto3"
                  label="Puesto"
                  variant="outlined"
                  margin="dense"
                  className="config_input"
                  value={puesto3 || ''}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="config_body_part">
              <span>SINDICATO</span>
              <div className="config_body_part_input">
                <TextField
                  id="nombre4"
                  label="Nombre"
                  variant="outlined"
                  margin="dense"
                  className="config_input"
                  value={nombre4 || ''}
                  onChange={this.handleChange}
                />
                <TextField
                  id="puesto4"
                  label="Puesto"
                  variant="outlined"
                  margin="dense"
                  className="config_input"
                  value={puesto4 || ''}
                  onChange={this.handleChange}
                />
              </div>
              <div className="config_body_part_input margin-top">
                <TextField
                  id="nombre5"
                  label="Nombre"
                  variant="outlined"
                  margin="dense"
                  className="config_input"
                  value={nombre5 || ''}
                  onChange={this.handleChange}
                />
                <TextField
                  id="puesto5"
                  label="Puesto"
                  variant="outlined"
                  margin="dense"
                  className="config_input"
                  value={puesto5 || ''}
                  onChange={this.handleChange}
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
    getConfiguration: () => { return getConfiguracion()(dispatch) },
    saveConfiguracion: (data) => { return saveConfiguracion(data)(dispatch) }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configuration);