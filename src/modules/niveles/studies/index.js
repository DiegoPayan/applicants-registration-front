import React, { Fragment, Component } from 'react';
import { Button, TextField, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import { getEstudios, updateEstudio, saveEstudio } from "../../actions";
import CircularProgress from '@material-ui/core/CircularProgress';
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
    ERR_STATUS_STUDIES_TITLE,
    OK_STATUS_STUDIES_TITLE
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
        this.setState({ isSave: false, loading: true })
        this.props.getEstudios();
    }
    disableLevel = async (e) => {
        this.closeRemove()
        console.log(e);

        let studySave = await this.props.updateEstudio(e.id, { estatus: e.estatus === "INACTIVO" ? "ACTIVO" : "INACTIVO" })

        if (studySave.status === 200) {
            this.setState({ isSave: { message: OK_EDIT_SAVE_STUDIES, title: OK_STATUS_STUDIES_TITLE } })
            return
        }
        this.setState({ isSave: { message: ERR_EDIT_SAVE_BRANCH, title: ERR_STATUS_STUDIES_TITLE } })
    }
    onSearch = (value) => {
        const studies = this.props.estudios.data.filter(study => {
            return study.nombre.toUpperCase().includes(value.toUpperCase());
        })
        this.setState({ studies });
    }
    render() {
        const { studies, loading, studyId, study, isSave } = this.state;
        return (
            <Fragment>
                <div className="container-btn-action">
                    <Button variant="outlined" color="primary" className="btn-action" onClick={() => this.closeRemove({ id: "x" })} >Nuevo      </Button></div>
                <div className="card card-container">
                    <PaginatedTable
                        onSearch={this.onSearch}
                        title="Niveles de estudio"
                        data={studies}
                        columns={[{ id: "id", label: "ID" }, { id: "nombre", label: "Nombre", width: "70%" }, { id: "estatus", label: "Estatus" }, { id: "editar", label: "", onClick: (e) => { this.closeRemove(e) } }, { id: "eliminar", label: "", onClick: (e) => { this.disableLevel(e) } }]} />
                </div>
                {loading && <CircularProgress color="secondary" />}
                <AlertDialog id="dialog-reason" open={Boolean(studyId)} title={`${!isNaN(studyId) ? "Editar" : "Agregar"} Nivel de estudio`} noAgreeClick={this.closeRemove} agreeClick={this.removeAspirant} btnAgree="Guardar" btnNoAgree="Cancelar">
                    <TextField variant="filled" className="txt-reason" id="study" label="Nivel de estudio" value={study} onChange={(e) => this.setState({ study: e.target.value })} />
                </AlertDialog>
                <AlertDialog id="dialog-reason" open={Boolean(isSave)} title={isSave.title} noAgreeClick={this.keepInList} agreeClick={this.goToHome} btnAgree="Ir a listado" btnNoAgree="Permanecer en la pantalla">
                    {isSave.message}
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
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudiesList);
