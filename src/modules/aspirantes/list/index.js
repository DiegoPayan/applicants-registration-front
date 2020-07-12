import React, { Fragment, Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAspirantes } from "../../actions";
import CircularProgress from '@material-ui/core/CircularProgress';
import Edit from '@material-ui/icons/Edit';
import Remove from '@material-ui/icons/DeleteForever';
import moment from 'moment';
import PaginatedTable from '../../../components/PaginatedTable';
import AlertDialog from '../../../components/DialogConfirm';
import "./list.css"
class List extends Component {
    state = {
        loading: true,
        aspirantes: [],
        removeId: false,
        reason: ""
    }
    async componentDidMount() {

        let aspirantesData = await this.props.getAspirantes();
        console.log(aspirantesData)
        if (aspirantesData.status !== 200) {
            this.setState({ loading: false });
            return;
        }
        const aspirantes = aspirantesData.data.map(aspirante => {
            aspirante.nombre = `${aspirante.nombre} ${aspirante.apellidoPaterno} ${aspirante.apellidoMaterno}`
            aspirante.rama = aspirante.rama.nombre;
            aspirante.puesto = aspirante.puesto.nombre;
            aspirante.zona = aspirante.zona.nombre;
            aspirante.fecha = moment(aspirante.fecha).format('L');
            aspirante.editar = <Edit />;
            aspirante.eliminar = <Remove />
            return aspirante
        })
        this.setState({ loading: false, aspirantes });
    }

    closeRemove = (e) => {
        this.setState({ removeId: e ? e.id : false })
    }

    removeAspirant = async () => {

        this.closeRemove()
    }

    onSearch = (value) => {
        const aspirantes = this.props.aspirantes.data.filter(aspirante => {
            const nombre = `${aspirante.nombre} ${aspirante.apellidoPaterno} ${aspirante.apellidoMaterno}`;
            return nombre.toUpperCase().includes(value.toUpperCase());
        })
        this.setState({ aspirantes });
    }

    render() {
        const { aspirantes, loading, removeId, reason } = this.state;
        return (
            <Fragment>
                <div className="container-btn-action">
                    <Button variant="outlined" color="primary" onClick={() => this.props.history.push("/agregar/aspirante")} className="btn-action" >Agregar aspirante      </Button></div>
                <div className="card card-container">
                    <PaginatedTable
                        title="Aspirantes"
                        onSearch={this.onSearch}
                        data={aspirantes}
                        columns={[{ id: "id", label: "Folio" }, { id: "fecha", label: "Fecha" }, { id: "nombre", label: "Nombre" }, { id: "rama", label: "Rama" }, { id: "zona", label: "Zona" }, { id: "puesto", label: "Puesto" }, { id: "listado", label: "Listado" }, { id: "editar", label: "", onClick: (e) => { this.props.history.push(`/editar/aspirante/${e.id}`) } }, { id: "eliminar", label: "", onClick: (e) => { this.closeRemove(e) } }]} />
                </div>
                {loading && <CircularProgress color="secondary" />}
                <AlertDialog id="dialog-reason" open={Boolean(removeId)} title="Motivo de baja" noAgreeClick={this.closeRemove} agreeClick={this.removeAspirant} btnAgree="Dar de baja" btnNoAgree="Cancelar">
                    <TextField variant="filled" className="txt-reason" id="standard-basic" label="Motivo" value={reason} onChange={(e) => this.setState({ reason: e.target.value })} />
                </AlertDialog>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    aspirantes: state.usuarios.aspirantes
})
const mapDispatchToProps = dispatch => {
    return {
        getAspirantes: () => { return getAspirantes()(dispatch) },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
