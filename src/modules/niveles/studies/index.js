import React, { Fragment, Component } from 'react';
import { Button, TextField, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import { getEstudios, updateEstudio, saveEstudio, handleSnackbar } from "../../actions";
import Edit from '@material-ui/icons/Edit';
import Remove from '@material-ui/icons/DeleteForever';
import Replay from '@material-ui/icons/Replay';
import PaginatedTable from '../../../components/PaginatedTable';
import AlertDialog from '../../../components/DialogConfirm';
import {
    OK_EDIT_SAVE_STUDIES,
    OK_EDIT_SAVE_STUDIES_TITLE,
    ERR_EDIT_SAVE_BRANCH,
    ERR_EDIT_SAVE_STUDIES_TITLE,
    OK_STATUS_STUDIES_TITLE,
    DELETE_LEVEL
} from '../../../constants';

class StudiesList extends Component {
    state = {
        loading: true,
        aspirantes: [],
        studyId: false,
        studies: [],
        study: "",
        isSave: false
    }
    async componentDidMount() {
        this.props.getEstudios();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { estudios } = nextProps
        if (this.props.estudios !== estudios && estudios && estudios.data) {
            if (estudios.status === 200) {
                this.setState({
                    studies: estudios.data.map(study => {
                        study.editar = <Edit />;
                        study.eliminar = this.returnImg(study.estatus)
                        return study
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
        this.setState({ studyId: e ? e.id : false, study: e && e.id && !isNaN(e.id) ? this.getNameById(e.id)[0].nombre : "" })
    }

    removeAspirant = async () => {
        const { studyId, study } = this.state;
        this.closeRemove()
        let studySave;
        if (!isNaN(studyId)) {
            studySave = await this.props.updateEstudio(studyId, { nombre: study })
        } else {
            studySave = await this.props.saveEstudio({ nombre: study })
        }
        if (studySave.status === 200) {
            this.setState({ isSave: { message: OK_EDIT_SAVE_STUDIES, title: OK_EDIT_SAVE_STUDIES_TITLE } })
            return
        }
        this.setState({ isSave: { message: ERR_EDIT_SAVE_BRANCH, title: ERR_EDIT_SAVE_STUDIES_TITLE } })
    }

    getNameById = (id) => this.state.studies.filter(item => item.id === id)

    goToHome = () => {
        this.props.history.push("/home");
    }

    keepInList = () => {
        this.setState({ isSave: false })
        this.props.getEstudios();
    }
    disableLevel = async (e) => {
        this.setState({ isSave: { title: DELETE_LEVEL(e.nombre) }, delete: e })
    }
    remove = async () => {
        const e = this.state.delete;
        let studySave = await this.props.updateEstudio(e.id, { estatus: e.estatus === "INACTIVO" ? "ACTIVO" : "INACTIVO" })
        this.keepInList()
        if (studySave.status === 200) {
            this.props.handleSnackbar({ message: OK_STATUS_STUDIES_TITLE, type: "success", open: true })
            return
        }
        this.props.handleSnackbar({ message: studySave.message, type: "error", open: true })
    }
    onSearch = (value) => {
        const studies = this.props.estudios.data.filter(study => {
            return study.nombre.toUpperCase().includes(value.toUpperCase());
        })
        this.setState({ studies });
    }
    render() {
        const { studies, studyId, study, isSave } = this.state;
        return (
            <Fragment>
                <div className="container-btn-action">
                    <Button variant="outlined" color="primary" className="btn-action" onClick={() => this.closeRemove({ id: "x" })} >Nuevo Nivel de Estudios     </Button></div>
                <div className="card card-container">
                    <PaginatedTable
                        onSearch={this.onSearch}
                        title="Niveles de estudio"
                        data={studies}
                        paginated
                        columns={[{ id: "id", label: "ID" }, { id: "nombre", label: "Nombre", width: "70%" }, { id: "estatus", label: "Estatus" }, { id: "editar", label: "", onClick: (e) => { this.closeRemove(e) } }, { id: "eliminar", label: "", onClick: (e) => { this.disableLevel(e) } }]} />
                </div>
                <AlertDialog id="dialog-reason" open={Boolean(studyId)} title={`${!isNaN(studyId) ? "Editar" : "Agregar"} Nivel de estudio`} disableAgree={!study.trim().length} noAgreeClick={this.closeRemove} agreeClick={this.removeAspirant} btnAgree="Guardar" btnNoAgree="Cancelar">
                    <TextField variant="filled" className="txt-reason" id="study" label="Nivel de estudio" value={study} onChange={(e) => this.setState({ study: e.target.value })} />
                </AlertDialog>
                <AlertDialog id="dialog-reason" open={Boolean(isSave)} title={isSave.title} agreeClick={this.remove} btnAgree="Aceptar" >
                </AlertDialog>
            </Fragment >
        );
    }
}
const mapStateToProps = (state) => ({
    estudios: state.usuarios.estudios
})
const mapDispatchToProps = dispatch => {
    return {
        getEstudios: () => { return getEstudios()(dispatch) },
        updateEstudio: (id, estudio) => { return updateEstudio(id, estudio)(dispatch) },
        saveEstudio: (estudio) => { return saveEstudio(estudio)(dispatch) },
        handleSnackbar: (props) => { handleSnackbar(props)(dispatch) },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudiesList);
