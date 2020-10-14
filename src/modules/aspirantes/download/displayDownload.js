import React from 'react';
import Edit from '@material-ui/icons/Edit';
import Remove from '@material-ui/icons/DeleteForever';
import PaginatedTable from '../../../components/PaginatedTable';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Close';

export function Preview({ aspirantes, handleClose }) {
    let history = useHistory();

    let columns = [{ id: "id", label: "ID" }, { id: "nombreCompleto", label: "NOMBRE" }, { id: "nivel", label: "NIVEL MAXIMO DE ESTUDIOS" }, { id: "e", label: "E" }, { id: "p", label: "P" }, { id: "ts", label: "TS" }, { id: "tr", label: "TR" }, { id: "total", label: "TOTAL" }, { id: "nominacion", label: "NOMINACIÓN" }, { id: "motivo", label: "MOTIVO DE BAJA" }, { id: "editar", label: "", onClick: (e) => { history.push(`/editar/aspirante/${e.id}`) } }, { id: "eliminar", label: "", onClick: (e) => { this.closeRemove(e) } }];
    let columnsCronologico = [{ id: "id", label: "ID" }, { id: "nombreCompleto", label: "NOMBRE" }, { id: "nivel", label: "NIVEL MAXIMO DE ESTUDIOS" }, { id: "nominacion", label: "NOMINACIÓN" }, { id: "motivo", label: "MOTIVO DE BAJA" }, { id: "editar", label: "", onClick: (e) => { history.push(`/editar/aspirante/${e.id}`) } }, { id: "eliminar", label: "", onClick: (e) => { this.closeRemove(e) } }];

    const modifyArray = (array) => {
        const aspirantes = array.map(aspirante => {
            aspirante.nombreCompleto = `${aspirante.nombre} ${aspirante.apellidoPaterno} ${aspirante.apellidoMaterno}`
            aspirante.nivel = aspirante.estudios.nombre;
            aspirante.e = aspirante.puntaje.escolaridad;
            aspirante.p = aspirante.puntaje.parentesco
            aspirante.ts = aspirante.puntaje.tiempoServicio
            aspirante.tr = aspirante.puntaje.tiempoRegistro
            aspirante.total = aspirante.puntaje.total
            aspirante.motivo = aspirante.motivo_baja
            aspirante.editar = <Edit />;
            aspirante.eliminar = <Remove />
            return aspirante
        })
        return aspirantes;
    }

    return (
        <div className="modal">
            <IconButton color="secondary" aria-label="add an alarm" className="icon-close" onClick={handleClose}>
                <DeleteIcon />
            </IconButton>
            <div className="container-modal">
                {aspirantes && Array.isArray(aspirantes.data) && aspirantes.data.map(item =>
                    <div className="container-list-order">
                        <br />
                        <div className="title-list-order">
                            SUBCOMISIÓN MIXTA DE BOLSA DE TRABAJO EN: DELEGACIÓN ESTATAL SINALOA &emsp;
                            REGIÓN: centro &emsp;
                    RAMA: {item.rama} &emsp;
                    PUESTO: {item.puesto} &emsp;
                </div>
                        <br />
                        <br />

                        <div className="tbl-list-order">
                            <PaginatedTable
                                title="INSTITUTO"
                                rowsPerPage={item.aspirantes.instituto.length}
                                data={modifyArray(item.aspirantes.instituto)}
                                columns={columns} />
                            <PaginatedTable
                                title="SINDICATO"
                                rowsPerPage={item.aspirantes.sindicato.length}
                                data={modifyArray(item.aspirantes.sindicato)}
                                columns={columns} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}