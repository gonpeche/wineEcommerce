import { FETCH_PRODUCTS_BY_NAME, SELECT_PRODUCT, FETCH_ALL_PRODUCTS, SELECT_SIMILAR_PRODUCTS, CREATE_PRODUCT, GET_GRAPES, FETCH_ALL_CELLARS, FETCH_ALL_LINES, FETCH_SELECTEDGRAPES, PRODUCT_UPDATED } from '../constants/index'

const initialSate ={
    selectedProduct: {},
    filteredProducts: [],
    allProducts: {},
    similarProducts: {},
    product: {},
    grapes: {},
		allCellars: {},
		allLines: {},
		selectedGrapes: [],
		productUpdated: {}
};

export default (state = initialSate, action) => {

	switch (action.type) {

		case FETCH_PRODUCTS_BY_NAME:
			return Object.assign({}, state, { filteredProducts: action.products });

		case SELECT_PRODUCT:
			return Object.assign({}, state, { selectedProduct: action.product })

		case SELECT_SIMILAR_PRODUCTS:
			return Object.assign({}, state, { similarProducts: action.products })

		case FETCH_ALL_PRODUCTS:
			return Object.assign({}, state, { allProducts: action.products })

		case CREATE_PRODUCT:
			return Object.assign({}, state, { product:action.product });

		case GET_GRAPES:
			return Object.assign({}, state, { grapes:action.grapes });

		case FETCH_ALL_CELLARS:
			return Object.assign({}, state, { allCellars:action.cellars });

		case FETCH_ALL_LINES:
			return Object.assign({}, state, { allLines:action.lines });

		case FETCH_SELECTEDGRAPES:
			return Object.assign({}, state, { selectedGrapes:action.selectedGrapes });

		case PRODUCT_UPDATED:
			return Object.assign({}, state, { productUpdated:action.productUpdated });

		default:
			return state;
	}
}


