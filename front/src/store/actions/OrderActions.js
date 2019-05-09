import axios from "axios"
import { 
	FETCH_ORDERS, 
	SET_CART, 
	ADD_TO_ORDER,
	REMOVE_FROM_ORDER,
	DELETE_FROM_ORDER,
	ADD_STORAGE_TO_STATE,
	EMPTY_CART,
} from '../constants';

const add_product_to_order = function(product){
	return {
		type: ADD_TO_ORDER,
		product
	}
}
const remove_product_from_order = function(product){
	return{
		type: REMOVE_FROM_ORDER, 
		product
	}   
}
const delete_product_from_order = function(product){
	return{
		type: DELETE_FROM_ORDER,
		product
	}
}
const add_store_to_state = function(storage){
	return{
		type: ADD_STORAGE_TO_STATE,
		storage
	}
}
const empty_cart = function(){
	return{
		type: EMPTY_CART,
		carrito:[]
	}
}
const setCart = function(cart){
	return{
		type: SET_CART,
		cart
	}
}

const fetchOrders = (allOrders) => {
	return {
		type : FETCH_ORDERS,
		allOrders
	}
}

export const handleEmptyOrder = (user) => {
	return (dispatch, getState) => {
		dispatch(empty_cart());
		setLocalStorage(getState());
		if(user.firstName){
			deleteOrderFromDataBase(user);
		}
	}
}

export const removeProductFromOrder = (product, user)=>{
  //resta una unidad del producto de la orden
	return (dispatch, getState) => {
		dispatch(remove_product_from_order(product));
		setLocalStorage(getState());
		if(user.firstName){
			deleteOneProductFromDataBase(product, user);
		}
	}
}
export const deleteProductFromOrder = (product, user) => {
	//elimina el producto de la orden
	return (dispatch, getState) => {
		dispatch(delete_product_from_order(product));
		setLocalStorage(getState());
		if(user.firstName){
			deleteProductFromDataBase(product, user);
		}
	}
}

export const setStateByStorage = (storage) => {
	return (dispatch) => {
		dispatch(add_store_to_state(storage));
	}
}

export const deleteOneProductFromDataBase = (product, user) => {
	axios.post('/api/orders/less-product',{
		userId :user.id,
		productId:product.id
	})
} 
export const deleteProductFromDataBase = (product, user) => {
	axios.post('/api/orders/remove-product',{
		userId :user.id,
		productId:product.id
	})
} 

export const deleteOrderFromDataBase = (user) => {
	axios.post('/api/orders/remove-order',{
		userId: user.id
	})
}

export const sendEmail = (user, order) => (dispatch) => {
	axios.post('/api/orders/email', {
		user,
		order
	})
		.catch(e => console.log(e))
}

export const fetchAllOrders = () => dispatch => {
	return axios.get('/api/orders')
		.then(res => res.data)
		.then(orders => dispatch(fetchOrders(orders)))
}

export const addProductToOrder = (product, user) => {
	return (dispatch, getState) => {
		dispatch(add_product_to_order(product));
		setLocalStorage(getState());
		if(user.firstName){
			addProductToDataBase(product, user);
		}
	}
}

export const addProductToDataBase = (product, user) => {
	axios.post('/api/orders/add-product',{
		userId :user.id,
		productId:product.id
	});
}

export const getCart = (userId) => dispatch => {
	axios.get(`api/orders/cart/${userId}`)
		.then(res => res.data)
		.then(cart => {
			for(var i=0; i<cart.length; i++){
				dispatch(add_product_to_order(cart[i].product));
			}
			setLocalStorage({ 
				order : { 
					products : cart 
				}
			})
		})         
}

export const setLocalStorage = ({ order }) => {
	var setOrder = JSON.stringify(order.products)
	localStorage.setItem("order", setOrder)  
}