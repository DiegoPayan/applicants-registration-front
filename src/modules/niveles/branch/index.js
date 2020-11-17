import React, { Fragment, Component } from 'react';
import { Button, TextField, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import { getRamas, updateRama, saveRama, handleSnackbar } from "../../actions";
import Edit from '@material-ui/icons/Edit';
import Remove from '@material-ui/icons/DeleteForever';
import Replay from '@material-ui/icons/Replay';
import PaginatedTable from '../../../components/PaginatedTable';
import AlertDialog from '../../../components/DialogConfirm';
import {
    OK_EDIT_SAVE_BRANCH,
    OK_EDIT_SAVE_BRANCH_TITLE,
    ERR_EDIT_SAVE_BRANCH,
    OK_STATUS_BRANCH_TITLE,
    ERR_EDIT_SAVE_BRANCH_TITLE,
    DELETE_LEVEL
} from '../../../constants';

class BranchesList extends Component {
    state = {
        loading: true,
        aspirantes: [],
        branchId: false,
        branches: [],
        branch: "",
        isSave: false
    }
    async componentDidMount() {
        this.props.getRamas();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { ramas } = nextProps
        if (this.props.ramas !== ramas && ramas && ramas.data) {
            if (ramas.status === 200) {
                this.setState({
                    branches: ramas.data.map(branch => {
                        branch.editar = <Edit />;
                        branch.eliminar = this.returnImg(branch.estatus)
                        return branch
                    })
                });
            }
            this.setState({ loading: false })
        }
    }
    returnImg = (status) => {
        return <Tooltip title={status === "ACTIVO" ? "Deshabilitar rama" : "Activar rama"} aria-label="add">
            {status === "INACTIVO" ? <Replay /> : <Remove />}
        </Tooltip>
    }

    closeRemove = (e) => {
        this.setState({ branchId: e ? e.id : false, branch: e && e.id && !isNaN(e.id) ? this.getNameById(e.id)[0].nombre : "" })
    }

    removeAspirant = async () => {
        const { branchId, branch } = this.state;
        this.closeRemove()
        let branchSave;
        if (!isNaN(branchId)) {
            branchSave = await this.props.updateRama(branchId, { nombre: branch })
        } else {
            branchSave = await this.props.saveRama({ nombre: branch })
        }
        if (branchSave.status === 200) {
            this.setState({ isSave: { message: OK_EDIT_SAVE_BRANCH, title: OK_EDIT_SAVE_BRANCH_TITLE } })
            return
        }
        this.setState({ isSave: { message: ERR_EDIT_SAVE_BRANCH, title: ERR_EDIT_SAVE_BRANCH_TITLE } })
    }

    getNameById = (id) => this.state.branches.filter(item => item.id === id)

    keepInList = () => {
        this.setState({ isSave: false })
        this.props.getRamas();
    }
    disableLevel = async (e) => {
        this.setState({ isSave: { title: DELETE_LEVEL(e.nombre) }, delete: e })
    }
    remove = async () => {
        const e = this.state.delete;
        let branchSave = await this.props.updateRama(e.id, { estatus: e.estatus === "INACTIVO" ? "ACTIVO" : "INACTIVO" })
        this.keepInList()
        if (branchSave.status === 200) {
            this.props.handleSnackbar({ message: OK_STATUS_BRANCH_TITLE, type: "success", open: true })
            return
        }
        this.props.handleSnackbar({ message: branchSave.message, type: "error", open: true })
    }

    onSearch = (value) => {
        const branches = this.props.ramas.data.filter(branch => {
            return branch.nombre.toUpperCase().includes(value.toUpperCase());
        })
        this.setState({ branches });
    }
    render() {
        const { branches, branchId, branch, isSave } = this.state;
        return (
            <Fragment>
                <div className="container-btn-action">
                    <Button variant="outlined" color="primary" className="btn-action" onClick={() => this.closeRemove({ id: "x" })} >Nueva Rama     </Button></div>
                <div className="card card-container">
                    <PaginatedTable
                        onSearch={this.onSearch}
                        title="Ramas"
                        data={branches}
                        paginated
                        columns={[{ id: "id", label: "ID" }, { id: "nombre", label: "Nombre", width: "70%" }, { id: "estatus", label: "Estatus" }, { id: "editar", label: "", onClick: (e) => { this.closeRemove(e) } }, { id: "eliminar", label: "", onClick: (e) => { this.disableLevel(e) } }]} />
                </div>
                <AlertDialog id="dialog-reason" disableAgree={!branch.trim().length} open={Boolean(branchId)} title={`${!isNaN(branchId) ? "Editar" : "Agregar"} Ramas`} noAgreeClick={this.closeRemove} agreeClick={this.removeAspirant} btnAgree="Guardar" btnNoAgree="Cancelar">
                    <TextField variant="filled" className="txt-reason" id="branch" label="Nivel de estudio" value={branch} onChange={(e) => this.setState({ branch: e.target.value })} />
                </AlertDialog>
                <AlertDialog id="dialog-reason" open={Boolean(isSave)} title={isSave.title} agreeClick={this.keepInList} btnAgree="Aceptar">
                </AlertDialog>
            </Fragment >
        );
    }
}
const mapStateToProps = (state) => ({
    ramas: state.usuarios.ramas
})
const mapDispatchToProps = dispatch => {
    return {
        getRamas: () => { return getRamas()(dispatch) },
        updateRama: (id, Rama) => { return updateRama(id, Rama)(dispatch) },
        saveRama: (Rama) => { return saveRama(Rama)(dispatch) },
        handleSnackbar: (props) => { handleSnackbar(props)(dispatch) },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BranchesList);
