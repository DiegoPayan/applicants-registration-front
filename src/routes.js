import Edit from './modules/aspirantes/edit';
import List from './modules/aspirantes/list';
import StudiesList from './modules/niveles/studies';
import BranchesList from './modules/niveles/branch';
import PositionsList from './modules/niveles/position';
import Download from './modules/aspirantes/download';
import Configuracion from './modules/configuracion';
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
        arrow: "/home"
    },
    {
        name: "Editar aspirante",
        id: "Editar",
        path: "/editar/aspirante/:id",
        component: Edit,
        arrow: "/home"
    },
    {
        name: "Listado de Niveles de estudio",
        id: "Nivel de estudios",
        path: "/niveles-estudio",
        component: StudiesList,
        arrow: "/home"
    },
    {
        name: "Listado de Ramas",
        id: "Ramas",
        path: "/ramas",
        component: BranchesList,
        arrow: "/home"
    },
    {
        name: "Listado de Puestos",
        id: "Puestos",
        path: "/puestos",
        component: PositionsList,
        arrow: "/home"
    },
    {
        name: "Configuración de Firmas",
        id: "Configuración",
        path: "/configuracion",
        component: Configuracion,
        arrow: "/home"
    },
    {
        name: "Descargar Listado",
        id: "Descarga",
        path: "/descarga/listado",
        component: Download,
        arrow: "/home"
    }
]

export default routes;