import React, { Fragment, Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAspirantes, download, getDisplayDownload } from "../../actions";
import Edit from '@material-ui/icons/Edit';
import Remove from '@material-ui/icons/DeleteForever';
import moment from 'moment';
import PaginatedTable from '../../../components/PaginatedTable';
import AlertDialog from '../../../components/DialogConfirm';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "./list.css"
class List extends Component {
    state = {
        loading: true,
        aspirantes: [],
        removeId: false,
        reason: "",
        tl: "",
        sc: "",
        value: ""
    }
    async componentDidMount() {

        let aspirantesData = await this.props.getAspirantes();
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
    getList = () => {
        const { sc, tl } = this.state;
        this.props.display(sc, tl)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
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
        const { aspirantes, removeId, reason, sc, tl, value } = this.state;
        return (
            <Fragment>
                <div className="container-btn-action">
                    <Button variant="outlined" color="primary" onClick={() => { this.props.history.push("/agregar/aspirante") }} className="btn-action" >Agregar aspirante      </Button></div>
                <div className="card card-container">
                    <Accordion className="accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <span className="span-download">Descargar listado</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="container-forms">
                                <FormControl component="fieldset" className="form-download">
                                    <FormLabel component="legend">Subcomisión</FormLabel>
                                    <RadioGroup aria-label="sc" name="sc" value={value} onChange={this.handleChange} className="flex-center">
                                        <FormControlLabel value="DELEGACION" control={<Radio />} label="DELEGACIÓN" />
                                        <FormControlLabel value="HOSPITAL REGIONAL" control={<Radio />} label="HOSPITAL REGIONAL" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl component="fieldset" className="form-download">
                                    <FormLabel component="legend">Tipo de Lista</FormLabel>
                                    <RadioGroup aria-label="tl" name="tl" value={value} onChange={this.handleChange} className="flex-center">
                                        <FormControlLabel value="puntuacion" control={<Radio />} label="Puntuación" />
                                        <FormControlLabel value="cronologico" control={<Radio />} label="Cronologico" />
                                    </RadioGroup>
                                </FormControl>
                                <div className="container-buttons-download">
                                    <Button variant="outlined" disabled={tl === "" && sc === ""} color="primary" onClick={this.getList} className="btn-normal"  >Generar lista      </Button>
                                    <Button variant="outlined" color="primary" disabled={tl === "" && sc === "" && !aspirantes} onClick={this.handlePreview} className="btn-normal"  >Vista previa      </Button>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <PaginatedTable
                        title="Aspirantes"
                        onSearch={this.onSearch}
                        data={aspirantes}
                        paginated
                        columns={[{ id: "folio", label: "Folio" }, { id: "fecha", label: "Fecha" }, { id: "nombre", label: "Nombre" }, { id: "rama", label: "Rama" }, { id: "zona", label: "Zona" }, { id: "puesto", label: "Puesto" }, { id: "listado", label: "Listado" }, { id: "editar", label: "", onClick: (e) => { this.props.history.push(`/editar/aspirante/${e.id}`) } }, { id: "eliminar", label: "", onClick: (e) => { this.closeRemove(e) } }]} />
                </div>
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
        download: (sc, tl) => { return download(sc, tl)(dispatch) },
        display: (sc, tl) => { return getDisplayDownload(sc, tl)(dispatch) },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
