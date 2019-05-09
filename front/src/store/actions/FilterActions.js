import { FETCH_PRODUCTS_BY_NAME } from '../constants/index';
import axios from 'axios';

// Setea el state.filteredProduct
const fetchProductsByName = products => ({
	type: FETCH_PRODUCTS_BY_NAME,
	products,
});

// Filtros Navbar
export const getProductsBySearchNavbar = nombre => {
	return dispatch =>
		axios.get('/api/products/busqueda', {
			params: {
				nombre: nombre,
			},
		})
			.then(res => dispatch(fetchProductsByName(res.data)))
			.catch(e => console.log(e))
};

// Filtros Sidebar

const queryBusqueda = []
export const getProductsBySearchSidebar = (filtroSeleccionado,check) => {
	// Identifico el tipo de filtro a aplicar y si tiene el checkbox en true, lo pusheo al array queryBusqueda,
	// si tiene el checkbox en false, quiere decir que anteriormente ya fue agregado al array y luego
	// destildado del checkbox, entonces lo elimino con el pop().
	if (filtroSeleccionado.grapeName) {
		check ? queryBusqueda.push(`grape=${filtroSeleccionado.id}`) : queryBusqueda.pop();
	} else if (filtroSeleccionado.cellarName) {
		check ? queryBusqueda.push(`cellar=${filtroSeleccionado.id}`) : queryBusqueda.pop();
	} else if (filtroSeleccionado.lineName) {
		check ? queryBusqueda.push(`line=${filtroSeleccionado.id}`) : queryBusqueda.pop();
	}
	return dispatch => 
		axios.get(`/api/products/filter?${queryBusqueda.join('&')}`)
			.then(res => {
				if (res.data.length < 1) {
					res.send({ respuesta: false })
					} else {
						dispatch(fetchProductsByName(res.data))
					}
			})
}



