import React, { Component, Fragment } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Menu } from '../../../components/select';
import { connect } from 'react-redux';
import { getAspiranteById } from "../../actions";
import "./edit.css"

class Edit extends Component {
  state = {
    folio:"",
    fecha:"",
    nombre:"",
    apellidoPaterno:"",
    apellidoMaterno:"",
    nivel:"",
    rama:"",
    puesto:"",
    zona:"",
    listado:"",
    loading:false
  }
  async componentDidMount(){
    const { match,getAspiranteById,aspirante}=this.props;
if(match.params && match.params.id){
  this.setState({loading:true})
await getAspiranteById(match.params.id);
if(aspirante && aspirante.data &&  !aspirante.status){
  const {folio,fechaCreacion,nombre,apellidoMaterno,apellidoPaterno,rama,zona,puesto}=aspirante.data;
this.setState({  
  folio:folio,nombre,
fecha:fechaCreacion,
nombre:"",
apellidoPaterno:"",
apellidoMaterno:"",
nivel:"",
rama:"",
puesto:"",
zona:"",
listado:"",
loading:false
});
}
}
  }
  handleChange = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
}
  render() {
    return (
      <Fragment>
        <div className="title-container flex-center">Editar Aspirante </div>
        <form className="form-edit" noValidate autoComplete="off">
          <TextField id="folio"  className="w25" label="Folio" variant="outlined" />
          <TextField id="fecha" className="w25" type="date" label="Fecha" variant="outlined" />
          <div className="w50"/>
          <TextField id="nombre"  className="w25" label="Nombre" variant="outlined" />
          <TextField id="apellidoPaterno"  className="w25" label="Apellido Paterno" variant="outlined" />
          <TextField id="apellidoMaterno"  className="w25" label="Apellido Materno" variant="outlined" />
          <Menu className="w25" label="Nivel" values={[]}></Menu>
          <Menu className="w25" label="Rama" values={[]}></Menu>
          <Menu className="w25" label="Puesto" values={[]}></Menu>
          <Menu className="w25" label="Zona" values={[]}></Menu>
          <Menu className="w25" label="Listado" values={[]}></Menu>
          <Button className="btn-edit" variant="contained" color="primary">
            Guardar aspirante
          </Button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  aspirante: state.usuarios.aspiranteById
})
const mapDispatchToProps = dispatch => {
  return {
    getAspiranteById : (props) => { return getAspiranteById(props)(dispatch) },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);