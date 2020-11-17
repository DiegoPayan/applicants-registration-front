import React from 'react';

import PaginatedTable from '../../../components/PaginatedTable';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Close';
import "./download.css";

export function Preview({ aspirantes, handleClose, type }) {

    let columns = [{ id: "id", label: "ID" }, { id: "nombreCompleto", label: "NOMBRE" }, { id: "nivel", label: "NIVEL MAXIMO DE ESTUDIOS" }, { id: "e", label: "E" }, { id: "p", label: "P" }, { id: "ts", label: "TS" }, { id: "tr", label: "TR" }, { id: "total", label: "TOTAL" }, { id: "nominacion", label: "NOMINACIÓN" }, { id: "motivo", label: "MOTIVO DE BAJA" }];
    let columnsCronologico = [{ id: "id", label: "ID" }, { id: "nombreCompleto", label: "NOMBRE" }, { id: "nivel", label: "NIVEL MAXIMO DE ESTUDIOS" }, { id: "nominacion", label: "NOMINACIÓN" }, { id: "motivo", label: "MOTIVO DE BAJA" },];

    const modifyArray = (array) => {
        return array.map(aspirante => {
            aspirante.nombreCompleto = `${aspirante.nombre} ${aspirante.apellidoPaterno} ${aspirante.apellidoMaterno}`
            aspirante.nivel = aspirante.estudios.nombre;
            aspirante.e = aspirante.puntaje.escolaridad;
            aspirante.p = aspirante.puntaje.parentesco
            aspirante.ts = aspirante.puntaje.tiempoServicio
            aspirante.tr = aspirante.puntaje.tiempoRegistro
            aspirante.total = aspirante.puntaje.total
            aspirante.motivo = aspirante.motivo_baja
            return aspirante
        })
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
                                columns={type !== "cronologico" ? columns : columnsCronologico} />
                            <PaginatedTable
                                title="SINDICATO"
                                rowsPerPage={item.aspirantes.sindicato.length}
                                data={modifyArray(item.aspirantes.sindicato)}
                                columns={type !== "cronologico" ? columns : columnsCronologico} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}