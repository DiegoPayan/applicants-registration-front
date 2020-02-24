import React, { Fragment ,Component} from 'react';
import CustomPaginationActionsTable from '../../listas';
import { Button } from '@material-ui/core';
import "./list.css"
class List extends Component {
    state = {  }
    render() {
        return (
            <Fragment>
            <div className="title-container flex-center">Niveles de Estudio
       </div>
       <div className="container-list">
       <Button variant="contained" color="primary">Agregar Nivel</Button>
       <CustomPaginationActionsTable headers={["Id", "Nivel", "Estatus",""]}></CustomPaginationActionsTable>
    </div>
    </Fragment>
        );
    }
}

export default List;