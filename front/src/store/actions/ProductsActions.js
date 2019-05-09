import { 
	SELECT_PRODUCT, 
	FETCH_ALL_PRODUCTS, 
	SELECT_SIMILAR_PRODUCTS, 
	CREATE_PRODUCT, 
	GET_GRAPES, 
	FETCH_ALL_CELLARS, 
	FETCH_ALL_LINES, 
	FETCH_SELECTEDGRAPES, 
	PRODUCT_UPDATED 
} from '../constants/index';

import axios from 'axios';

// Cuando selecciona un producto desde la grilla o desde el filtro. Recibe un ID 
const selectProduct = function(product){
	return {
		type: SELECT_PRODUCT,
		product
	}
}

export const selectSingleProduct = (productId) => {
	return dispatch => {
		return axios.get(`/api/products/${productId}`)
			.then( producto => {
				dispatch(selectProduct(producto.data))
			})
			.catch(e => console.error(e))
	}
}

// Productos similares:
const selectSimilarProducts = function(products){
	return {
		type: SELECT_SIMILAR_PRODUCTS,
		products
	}
}

export const fetchSimilarProducts = (productId) => dispatch => {
	return axios.get(`/api/products/getProductsByGrape/${productId}`)
    .then(res => res.data.filter((e) => e.id != productId))
		.then(similarProducts => dispatch(selectSimilarProducts(similarProducts)))
    .catch(e => console.log(e))
}

// Render inicial
const fetchProducts = function(products) {
	return {
		type: FETCH_ALL_PRODUCTS,
		products
	}
}

export const fetchAllProducts = () => {
	return dispatch => {
		return axios.get('/api/products')
			.then( res => {
				dispatch(fetchProducts(res.data));
			})
			.catch(e => console.log(e))
	}
}

// Publico un nuevo producto:
const actionCreateProduct= (product) => {
	return {
		type: CREATE_PRODUCT,
		product
	}
}

export const createProduct= (product) => {
	return dispatch => {
		return axios.post('/api/products/newproduct', product)
			.then(res => {
				dispatch(actionCreateProduct(res.status));
			})
			.catch(e => {
				dispatch(actionCreateProduct(e));
			})
	}
}

const actionGetGrapes= (grapes) => {
	return {
		type: GET_GRAPES,
		grapes
	}
}

export const getGrapes= () => {
	return dispatch => {
		return axios.get('/api/grapes')
			.then(res => res.data)
			.then(data =>	dispatch(actionGetGrapes(data)))
			.catch(e => console.log(e))
	}
}

const fetchCellars = function(cellars) {
	return {
		type: FETCH_ALL_CELLARS,
		cellars
	}
}
// Pido todas las bodegas.
export const fetchAllCellars = () => {
	return dispatch => {
		return axios.get('/api/cellars')
			.then(res => dispatch(fetchCellars(res.data)))
			.catch(e => console.log(e))
	}
}

const fetchLines= (lines) => {
	return {
		type: FETCH_ALL_LINES,
		lines
	}
}
// Pido todas las lineas.
export const fetchAllLines= function(){
	return dispatch => {
		return axios.get('/api/lines')
		.then(res => dispatch(fetchLines(res.data)))
		.catch(e => console.log(e))
	}
}

const fetchGrapes= (selectedGrapes) => {
	return {
		type: FETCH_SELECTEDGRAPES,
		selectedGrapes
	}
}
// Pido las uvas de un producto especifico.
export const fetchSelectedGrapes= function(productId){ 
	return dispatch => {
		return axios.get(`/api/grapes/${productId}`)
			.then(res => dispatch(fetchGrapes(res.data.grapes)))
			.catch(e => console.log(e))
	}
}

const productUpdated= (productUpdated) => {
	return {
		type: PRODUCT_UPDATED,
		productUpdated
	}
}
// Actualizo la informacion de un producto.
export const updateProduct= function(data){
	return dispatch => {
		return axios.put('/api/products/update', data)
			.then(res => {
				dispatch(productUpdated(res.status));
			})
			.catch(e => productUpdated(res.status))
	}
}

export const backToList= () => (dispatch) => {
	return dispatch(selectProduct({}));
}