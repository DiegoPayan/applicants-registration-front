import Edit from './modules/aspirantes/edit';
import List from './modules/aspirantes/list';
import StudiesList from './modules/niveles/studies';
import BranchesList from './modules/niveles/branch';
import PositionsList from './modules/niveles/position';
const routes = [
    {
        name: "Listado de Aspirantes",
        id: "Listados",
        path: "/home",
        component: List,

    },
    {
        name: "Listado de Aspirantes",
        id: "Listados",
        path: "/",
        component: List,

    },
    {
        name: "Nuevo aspirante",
        id: "Nuevo aspirante",
        path: "/agregar/aspirante",
        component: Edit,

    },
    {
        name: "Editar aspirante",
        id: "Editar",
        path: "/editar/aspirante/:id",
        component: Edit,

    },
    {
        name: "Listado de Niveles de estudio",
        id: "Nivel de estudios",
        path: "/niveles/estudio",
        component: StudiesList,

    },
    {
        name: "Listado de Ramas",
        id: "Ramas",
        path: "/niveles/ramas",
        component: BranchesList,

    },
    {
        name: "Listado de Puestos",
        id: "Puestos",
        path: "/niveles/puestos",
        component: PositionsList,

    }
]

export default routes;