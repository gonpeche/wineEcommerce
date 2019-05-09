import { FETCH_ORDERS, SET_CART } from '../constants/index';

const initialSate ={
    products : [],
		orders : []
};

export default (state = initialSate, action) => {
	switch (action.type) {
		case "ADD_TO_ORDER":
		// #FindIndex se fija si el elemento pertenece al estado
		// SI es -1 , lo crea con el object assing
		// Si es > -1 Guarda un arreglo de ayuda con todo el estado de los productos
		// cambia el indice en base al findindex
		// Pisa el estado anterior con el nuevo arreglo de ayuda
			var elem = state.products.findIndex(elem => elem.product.id == action.product.id);
			if(elem == -1){
				return Object.assign({}, state, {products: [...state.products, {product: action.product, cantidad: 1}] });
			}else{
				var arrProducts = state.products;
				arrProducts[elem].cantidad++;
				return Object.assign({}, state, {products: arrProducts});
			}
		case "REMOVE_FROM_ORDER":
			// resta una unidad del producto de una orden
			var elem = state.products.findIndex(elem => elem.product.id == action.product.id);
			var arrProducts = state.products;
			var cantidad =arrProducts[elem].cantidad 
			if(cantidad>0){
				arrProducts[elem].cantidad--;
			}
			return Object.assign({}, state, {products: arrProducts});
		
		case "DELETE_FROM_ORDER":
			//elimina el producto y toda la cantidad de una orden
			var elem = state.products.findIndex(elem => elem.product.id == action.product.id);
			var arrProducts = state.products; 
			arrProducts.splice(elem, 1);
			return Object.assign({}, state, {products: arrProducts});
			
		case "ADD_STORAGE_TO_STATE":
			return Object.assign({}, state, {products: action.storage});

		case "EMPTY_CART":
			return Object.assign({},state, {products: action.carrito });

		case SET_CART:
			return Object.assign({},state, { cart : action.cart });

		case FETCH_ORDERS:
			return Object.assign({}, state, { allOrders : action.allOrders });

		default:
			return state;
	}
}