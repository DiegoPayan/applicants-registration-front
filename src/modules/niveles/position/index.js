import React, { Fragment, Component } from 'react';
import { Button, TextField, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import { getPuestos, updatePuesto, savePuesto, handleSnackbar } from "../../actions";
import Edit from '@material-ui/icons/Edit';
import Remove from '@material-ui/icons/DeleteForever';
import Replay from '@material-ui/icons/Replay';
import PaginatedTable from '../../../components/PaginatedTable';
import AlertDialog from '../../../components/DialogConfirm';
import {
    OK_EDIT_SAVE_POSITION,
    OK_EDIT_SAVE_POSITION_TITLE,
    ERR_EDIT_SAVE_POSITION_TITLE,
    OK_STATUS_POSITION_TITLE,
    ERR_EDIT_SAVE_BRANCH,
    DELETE_LEVEL
} from '../../../constants';

class PositionsList extends Component {
    state = {
        loading: true,
        aspirantes: [],
        positionId: false,
        positions: [],
        position: "",
        isSave: false
    }
    async componentDidMount() {
        this.props.getPuestos();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { puestos } = nextProps
        if (this.props.puestos !== puestos && puestos && puestos.data) {
            if (puestos.status === 200) {
                this.setState({
                    positions: puestos.data.map(position => {
                        position.editar = <Edit />;
                        position.eliminar = this.returnImg(position.estatus)
                        return position
                    })
                });
            }
            this.setState({ loading: false })
        }
    }
    returnImg = (status) => {
        return <Tooltip title={status === "ACTIVO" ? "Deshabilitar nivel" : "Activar nivel"} aria-label="add">
            {status === "INACTIVO" ? <Replay /> : <Remove />}
        </Tooltip>
    }

    closeRemove = (e) => {
        this.setState({ positionId: e ? e.id : false, position: e && e.id && !isNaN(e.id) ? this.getNameById(e.id)[0].nombre : "" })
    }

    removeAspirant = async () => {
        const { positionId, position } = this.state;
        this.closeRemove()
        let positionSave;
        if (!isNaN(positionId)) {
            positionSave = await this.props.updatePuesto(positionId, { nombre: position })
        } else {
            positionSave = await this.props.savePuesto({ nombre: position })
        }
        if (positionSave.status === 200) {
            this.setState({ isSave: { message: OK_EDIT_SAVE_POSITION, title: OK_EDIT_SAVE_POSITION_TITLE } })
            return
        }
        this.setState({ isSave: { message: ERR_EDIT_SAVE_BRANCH, title: ERR_EDIT_SAVE_POSITION_TITLE } })
    }

    getNameById = (id) => this.state.positions.filter(item => item.id === id)

    keepInList = () => {
        this.setState({ isSave: false })
        this.props.getPuestos();
    }
    disableLevel = async (e) => {
        this.setState({ isSave: { title: DELETE_LEVEL(e.nombre) }, delete: e })
    }
    remove = async () => {
        const e = this.state.delete;
        let positionSave = await this.props.updatePuesto(e.id, { estatus: e.estatus === "INACTIVO" ? "ACTIVO" : "INACTIVO" })
        this.keepInList()

        if (positionSave.status === 200) {
            this.props.handleSnackbar({ message: OK_STATUS_POSITION_TITLE, type: "success", open: true })
            return
        }
        this.props.handleSnackbar({ message: positionSave.message, type: "error", open: true })
    }
    onSearch = (value) => {
        const positions = this.props.puestos.data.filter(position => {
            return position.nombre.toUpperCase().includes(value.toUpperCase());
        })
        this.setState({ positions });
    }
    render() {
        const { positions, positionId, position, isSave } = this.state;
        return (
            <Fragment>
                <div className="container-btn-action">
                    <Button variant="outlined" color="primary" className="btn-action" onClick={() => this.closeRemove({ id: "x" })} >Nuevo Puesto     </Button></div>
                <div className="card card-container">
                    <PaginatedTable
                        onSearch={this.onSearch}
                        title="Puestos"
                        paginated
                        data={positions}
                        columns={[{ id: "id", label: "ID" }, { id: "nombre", label: "Nombre", width: "70%" }, { id: "estatus", label: "Estatus" }, { id: "editar", label: "", onClick: (e) => { this.closeRemove(e) } }, { id: "eliminar", label: "", onClick: (e) => { this.disableLevel(e) } }]} />
                </div>
                <AlertDialog id="dialog-reason" disableAgree={!position.trim().length} open={Boolean(positionId)} title={`${!isNaN(positionId) ? "Editar" : "Agregar"} Puesto`} noAgreeClick={this.closeRemove} agreeClick={this.removeAspirant} btnAgree="Guardar" btnNoAgree="Cancelar">
                    <TextField variant="filled" className="txt-reason" id="position" label="Puesto" value={position} onChange={(e) => this.setState({ position: e.target.value })} />
                </AlertDialog>
                <AlertDialog id="dialog-reason" open={Boolean(isSave)} title={isSave.title} agreeClick={this.remove} btnAgree="Aceptar">
                </AlertDialog>
            </Fragment >
        );
    }
}
const mapStateToProps = (state) => ({
    puestos: state.usuarios.puestos
})
const mapDispatchToProps = dispatch => {
    return {
        getPuestos: () => { return getPuestos()(dispatch) },
        updatePuesto: (id, estudio) => { return updatePuesto(id, estudio)(dispatch) },
        savePuesto: (estudio) => { return savePuesto(estudio)(dispatch) },
        handleSnackbar: (props) => { handleSnackbar(props)(dispatch) },

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PositionsList);
