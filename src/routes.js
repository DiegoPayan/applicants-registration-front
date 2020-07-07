import Edit from './modules/aspirantes/edit';
import List from './modules/aspirantes/list';
const routes = [{
    name: "Listado de Aspirantes",
    id: "Listados",
    path: "/home",
    component: List,

},
{
    name: "Listado de Aspirantess",
    id: "Aspirantes",
    path: "/jjj",
    component: List,

}
]

export default routes;