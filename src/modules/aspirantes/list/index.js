import React, { Fragment, Component } from 'react';
import { TableList } from '../../listas';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { GetAspirantes } from "../../actions";
import CircularProgress from '@material-ui/core/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit';
import "./list.css"
class List extends Component {
    state = {
        loading: true
    }
    async componentDidMount() {
        await this.props.getAspirantes();
        this.setState({ loading: false })
    }
    render() {
        const { aspirantes } = this.props;
        return (
            <Fragment>
                <div className="title-container flex-center">Lista de Aspirantes
       </div>
                {!this.state.loading && <div className="container-list">
                    <Button onClick={() => this.props.history.push("/aspirante")} variant="contained" color="primary">Agregar aspirante</Button>
                    <TableList
                        headers={["Folio", "Nombre", "Listado", "Estatus", "Rama", "Estudios", "Puesto", "Zona", "Puntaje"]}>
                        {aspirantes && aspirantes.data && aspirantes.data.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.folio}
                                </TableCell>
                                <TableCell align="right">{`${row.nombre} ${row.apellidoPaterno} ${row.apellidoMaterno}`}</TableCell>
                                <TableCell align="right">{row.listado}</TableCell>
                                <TableCell align="right">{row.estatus}</TableCell>
                                <TableCell align="right">{row.rama.nombre}</TableCell>
                                <TableCell align="right">{row.estudios.nombre}</TableCell>
                                <TableCell align="right">{row.puesto.nombre}</TableCell>
                                <TableCell align="right">{row.zona.nombre}</TableCell>
                                <TableCell align="right">{row.puntaje.escolaridad}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        endIcon={<Edit />}
                                        onClick={() => this.props.history.push(`/aspirante/${row.id}`)}
                                    >
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableList>
                </div>}
                {this.state.loading && <CircularProgress color="secondary" />
                }
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    aspirantes: state.usuarios.aspirantes
})
const mapDispatchToProps = dispatch => {
    return {
        getAspirantes: () => { return GetAspirantes()(dispatch) },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
