import { combineReducers } from 'redux';
import ProductsReducer from './ProductsReducer'
import UserReducer from './UserReducer'
import OrderReducer from './OrderReducer'

export default combineReducers({
	products : ProductsReducer,
	user : UserReducer,
	order : OrderReducer,
});
