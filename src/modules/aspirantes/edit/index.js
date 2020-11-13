import React, { Component, Fragment } from 'react';
import { Button, TextField } from '@material-ui/core';
import SelectMenu from '../../../components/Select';
import { getAspiranteById, saveAspirante, getRamas, getEstudios, getPuestos, getZonas, getFolio, editAspirante } from "../../actions";
import { connect } from 'react-redux';
import { numericCharacters, camelizeString } from "../../../utils"
import moment from 'moment';
import AlertDialog from '../../../components/DialogConfirm';
import { GUARDAR_OTRO_A, EDITAR_AGAIN_A } from '../../../constants';

import "./edit.css"

const initialState = { folio: "", id: false, birthday: "", maternal: "", paternal: "", name: "", studies: "", branch: "", position: "", zone: "", list: "", scholarship: 0, relationship: 0, registry: 0, service: 0 }

class Edit extends Component {
  state = {
    ...initialState,
    loading: true,
    isSave: false,
    estatus: "ACTIVO"
  }
  async componentDidMount() {
    const { match, getAspiranteById } = this.props;

    if (match.params && match.params.id) {
      await getAspiranteById(match.params.id);
    } else {
      const folio = await this.props.getFolio();
      if (folio && typeof folio == "string") {
        this.setState({ folio })
      }
    }
    await this.props.getEstudios();
    await this.props.getPuestos();
    await this.props.getRamas();
    await this.props.getZonas();
    this.setState({ loading: false })


  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    const { aspirante } = nextProps
    if (this.props.aspirante !== aspirante && aspirante && aspirante.data && aspirante.status === 200) {
      const { puntaje: { escolaridad, tiempoServicio, tiempoRegistro, parentesco }, id, estatus, folio, fecha, apellidoPaterno, nombre, apellidoMaterno, idEstudios, idRama, idPuesto, idZona, listado } = aspirante.data;
      this.setState({
        folio: folio, estatus, id: parseInt(id), birthday: moment(fecha).format("YYYY-MM-DD"), name: nombre, maternal: apellidoMaterno, paternal: apellidoPaterno, studies: idEstudios, branch: idRama, position: idPuesto, zone: idZona, list: listado, scholarship: escolaridad, relationship: parentesco, registry: tiempoRegistro, service: tiempoServicio
      });
    }

  }
  handleChange = ({ target: { value, id, name } }) => {
    this.setState({ [name || id]: value });
  }

  saveAspirante = async () => {
    const { folio, birthday, estatus, name, maternal, id, paternal, studies, branch, position, zone, list, scholarship, relationship, registry, service } = this.state;
    const data = {
      aspirante: {
        id: id || null,
        folio,
        idEstudios: studies,
        idRama: branch,
        idPuesto: position,
        idZona: zone,
        nombre: camelizeString(name),
        apellidoPaterno: camelizeString(paternal),
        apellidoMaterno: camelizeString(maternal),
        listado: list,
        fecha: birthday,
        estatus
      },
      puntaje: {
        escolaridad: scholarship,
        tiempoRegistro: registry,
        tiempoServicio: service,
        parentesco: relationship,
        total: parseInt(scholarship) + parseInt(registry) + parseInt(service) + parseInt(relationship)
      }
    }
    let save = {}
    const { match } = this.props;

    if (match.params && match.params.id) {
      save = await this.props.editAspirante(data.aspirante);
    } else {
      save = await this.props.saveAspirante(data)
    }
    if (save && save.status === 200) {
      this.setState({ isSave: { failed: false, message: !id ? GUARDAR_OTRO_A : EDITAR_AGAIN_A, title: "Se guardo con exito el aspirante" } })
      return
    }
    this.setState({ isSave: { failed: true, message: "Desea intentar de nuevo o ir a listados?", title: "No se guardo con exito el aspirante" } })

  }
  closeSave = () => {
    if (!this.state.id && !this.state.isSave.failed) {
      this.setState({ ...initialState, isSave: false })
      return
    }
    this.setState({ isSave: false })
  }
  goToHome = () => {
    this.props.history.push("/home");
  }

  render() {
    const { folio, birthday, name, paternal, maternal, studies, branch, position, zone, list, isSave, scholarship, relationship, registry, service, loading } = this.state;
    const { estudios, ramas, puestos, zonas } = this.props;
    const total = parseInt(scholarship) + parseInt(registry) + parseInt(service) + parseInt(relationship)

    return (
      <Fragment>
        <div className="container-btn-action">
          <Button variant="outlined" color="primary" onClick={this.saveAspirante} className="btn-action" >Guardar aspirante      </Button></div>
        <div className="card-container-edit card-container">
          <div className="card card-name">
            <TextField id="folio" label="Folio" value={folio} onChange={this.handleChange} variant="filled" />
            <TextField
              id="birthday"
              label="Fecha de ingreso"
              variant="filled"
              type="date"
              onChange={this.handleChange}
              value={birthday}
              className=""
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField id="name" className="" value={name} label="Nombre(s)" onChange={this.handleChange} variant="filled" />
            <TextField id="paternal" className="" value={paternal} label="Apellido paterno" onChange={this.handleChange} variant="filled" />
            <TextField id="maternal" className="" value={maternal} label="Apellido materno" onChange={this.handleChange} variant="filled" />

          </div>
          <div className="card card-zone">
            <SelectMenu items={estudios && estudios.data || []} className="" value={studies} onChange={this.handleChange} label="Nivel de estudios" id="studies" />
            <SelectMenu items={ramas && ramas.data || []} className="" value={branch} onChange={this.handleChange} label="Rama" id="branch" />
            <SelectMenu items={puestos && puestos.data || []} className="" value={position} onChange={this.handleChange} label="Puesto" id="position" />
            <SelectMenu items={zonas && zonas.data || []} className="" value={zone} onChange={this.handleChange} label="Zona" id="zone" />
            <SelectMenu items={[{ id: "INSTITUTO", nombre: "INSTITUTO" }, { id: "SINDICATO", nombre: "SINDICATO" }]} className="" value={list} onChange={this.handleChange} label="Listado" id="list" />

          </div>
          <div className="card card-points">
            <TextField id="scholarship" className="txt-ponts" onChange={this.handleChange} value={scholarship} label="Escolaridad" variant="filled" onKeyPress={numericCharacters} />
            <TextField id="relationship" className="txt-ponts" onChange={this.handleChange} value={relationship} label="Parentesco" variant="filled" onKeyPress={numericCharacters} />
            <TextField id="registry" className="txt-ponts" onChange={this.handleChange} value={registry} label="Tiempo de servicio" variant="filled" onKeyPress={numericCharacters} />
            <TextField id="service" className="txt-ponts" onChange={this.handleChange} value={service} label="Tiempo de registro" variant="filled" onKeyPress={numericCharacters} />
            <div className="total-points txt-color-gray" >Total:<span>{total}</span></div>
          </div>
        </div>
        <AlertDialog id="dialog-reason" open={Boolean(isSave)} title={isSave.title} noAgreeClick={this.closeSave} agreeClick={this.goToHome} btnAgree="Ir a listado" btnNoAgree="Permanecer en la pantalla">
          {isSave.message}
        </AlertDialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  aspirante: state.usuarios.aspiranteById,
  ramas: state.usuarios.ramas,
  estudios: state.usuarios.estudios,
  puestos: state.usuarios.puestos,
  zonas: state.usuarios.zonas
})
const mapDispatchToProps = dispatch => {
  return {
    getAspiranteById: (props) => { return getAspiranteById(props)(dispatch) },
    saveAspirante: (data) => { return saveAspirante(data)(dispatch) },
    editAspirante: (data) => { return editAspirante(data)(dispatch) },
    getRamas: () => { return getRamas()(dispatch) },
    getEstudios: () => { return getEstudios()(dispatch) },
    getPuestos: () => { return getPuestos()(dispatch) },
    getZonas: () => { return getZonas()(dispatch) },
    getFolio: () => { return getFolio()(dispatch) },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);