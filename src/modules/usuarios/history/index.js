import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHistorial, handleSnackbar } from "../../actions";

import PaginatedTable from '../../../components/PaginatedTable';

class Historial extends Component {
    state = {
        loading: true,
        positions: [],
    }
    async componentDidMount() {
        this.props.getHistorial();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { historial } = nextProps
        if (this.props.historial !== historial && historial && historial.data) {

            if (historial.status === 200) {
                const newHistorial = historial.data.map(item => {
                    item.usuario = `${item.usuarios.nombre} ${item.usuarios.apellidoPaterno} ${item.usuarios.apellidoMaterno}`
                    item.aspirante = `${item.aspirantes.nombre} ${item.aspirantes.apellidoPaterno} ${item.aspirantes.apellidoMaterno}`
                })
                this.setState({
                    positions: historial.data
                });
            }
            this.setState({ loading: false })
        }
    }

    onSearch = (value) => {
        const positions = this.props.historial.data.filter(position => {
            return Object.values(position).find(item => item.toString().toUpperCase().includes(value.toString().toUpperCase()))
        })
        this.setState({ positions });
    }
    render() {
        const { positions } = this.state;
        return (
            <div className="container-btn-action h100">
                <div className="card card-container">
                    <PaginatedTable
                        onSearch={this.onSearch}
                        title="Historial"
                        paginated
                        data={positions}
                        columns={[{ id: "usuario", label: "Usuario" }, { id: "aspirante", label: "Aspirante" }, { id: "dato", label: "Cambio" }, { id: "antes", label: "Antes" }, { id: "despues", label: "Después" }]} />
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => ({
    historial: state.usuarios.historial
})
const mapDispatchToProps = dispatch => {
    return {
        getHistorial: () => { return getHistorial()(dispatch) },
        handleSnackbar: (props) => { handleSnackbar(props)(dispatch) },

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Historial);
