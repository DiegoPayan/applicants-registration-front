import React, { Fragment, Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { download, getDisplayDownload } from "../../actions";
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "./download.css";
import { Preview } from './displayDownload';
import Unregister from '../../../components/unregister';
class Download extends Component {
    state = {
        loading: true,
        tl: "",
        sc: "",
        openUn: false,
        openPreview: false
    }
    getList = () => {
        const { sc, tl } = this.state;
        this.props.display(sc, tl)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    closeRemove = (e) => {
        this.setState({ removeId: e ? e.id : false })
    }

    handlePreview = () => {
        this.setState({ openPreview: !this.state.openPreview })
    }

    render() {
        const { value, openUn, sc, tl, openPreview } = this.state;
        const { aspirantes } = this.props;
        return (
            <Fragment>
                <div className="container-btn-action">
                    <Button variant="outlined" disabled={tl === "" && sc === "" && !aspirantes} color="primary" onClick={() => { this.props.download(); }} className="btn-action" >Descargar lista      </Button>
                </div>
                <div className="card card-container">
                    <div className="container-forms">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Subcomisión</FormLabel>
                            <RadioGroup aria-label="sc" name="sc" value={value} onChange={this.handleChange}>
                                <FormControlLabel value="DELEGACION" control={<Radio />} label="DELEGACIÓN" />
                                <FormControlLabel value="HOSPITAL REGIONAL" control={<Radio />} label="HOSPITAL REGIONAL" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Tipo de Lista</FormLabel>
                            <RadioGroup aria-label="tl" name="tl" value={value} onChange={this.handleChange}>
                                <FormControlLabel value="puntuacion" control={<Radio />} label="Puntuación" />
                                <FormControlLabel value="cronologico" control={<Radio />} label="Cronologico" />
                            </RadioGroup>
                        </FormControl>
                        <Button variant="outlined" disabled={tl == "" && sc == ""} color="primary" onClick={this.getList} className="btn-normal"  >Buscar lista      </Button>
                    </div>
                    <Button variant="outlined" color="primary" disabled={tl === "" && sc === "" && !aspirantes} onClick={this.handlePreview} className="btn-normal"  >Vista previa      </Button>

                </div>
                {/* {loading && <CircularProgress color="secondary" />} */}
                <Unregister
                    aspirante={"id"}
                    open={openUn}
                    closeRemove={() => { }}
                />
                {openPreview &&
                    <Preview
                        aspirantes={aspirantes}
                        handleClose={this.handlePreview}
                    />}
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    aspirantes: state.usuarios.aspirantesDescarga
})
const mapDispatchToProps = dispatch => {
    return {

        download: (sc, tl) => { return download(sc, tl)(dispatch) },
        display: (sc, tl) => { return getDisplayDownload(sc, tl)(dispatch) },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Download);
