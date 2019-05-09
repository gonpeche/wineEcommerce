// IMPORT SINCE LIBRARIES
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import s from './Main.css';

//IMPORT CONTAINERS
import NewCategoryContainer from './NewCategoryContainer/NewCategoryContainer';
import ProductListContainer from './ProductListContainer/ProductListContainer';
import OneProductContainer from './OneProductContainer/OneProductContainer';
import NewProductContainer from './NewProductContainer/NewProductContainer';
import ProductsGridContainer from './ProductsGrid/ProductsGridContainer';
import UserPanelContainer from './UserPanelContainer/UserPanelContainer';
import AccountsContainer from './AccountsContainer/AccountsContainer';
import OrdersContainer from './OrdersContainer/OrdersContainer';
import NavbarContainer from './NavbarContainer/NavbarContainer';
import RegisterContainer from './Register/RegisterContainer';
import CheckoutContainer from './Checkout/CheckoutContainer';
import CartContainer from './Cart/CartContainer';
import LoginContainer from './Login/LoginContainer';
import Toast1 from './Toasts/toast1';

// IMPORT COMPONENTS
import AdminSidebar from '../components/AdminSidebar';

//IMPORT ACTIONS STORE
import { isLogged } from '../store/actions/UserActions'
import { fetchAllProducts } from '../store/actions/ProductsActions'
import { setStateByStorage } from '../store/actions/OrderActions';

//MATERIAL UI VALIDATION
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

class Main extends React.Component {
	constructor(props) {
		super(props);        
	}

	componentDidMount() {
		this.props.fetchAllProducts();
		this.props.isLogged();
		this.checkLocalStorage();
	}

	checkLocalStorage(){
		//chequea el localstorage, en caso de tener algo,
		// si el store de redux esta vacio, se setea el store de redux con el local storage
		var auxStorage= JSON.parse(localStorage.getItem("order"))
		if(auxStorage && this.props.order.products.length ==0){
			this.props.setStateByStorage(auxStorage)
		}
	}

	render() {
		const user = this.props.user
		return (
			<div className={s.container}>
				<div className={s.navbar}>
					<NavbarContainer user={user}/>
				</div>
				<div className={s.main}>
					<Switch>
						<Route exact path='/' component= { ProductsGridContainer } />
						<Route path='/checkout' component= { CheckoutContainer } />
						<Route path='/Toast1' component= { Toast1 } />
						<Route path='/register' component= { RegisterContainer } />
						<Route path='/login' component= { LoginContainer } />     
						<Route path='/carrito' component= { CartContainer } />
						<Route path='/OneProduct/:id' component= { OneProductContainer } />
						
						{	user.access === 5 && <Route path='/newproduct' component= { NewProductContainer } /> }
						{	user.access === 5 && <Route path='/user' component={AdminSidebar} /> || <Route path='/user' component={ UserPanelContainer } /> }
						{	user.access === 5 && <Route path='/newcategory' component= { NewCategoryContainer } /> }
						{	user.access === 5 && <Route path='/product/edit' component= { ProductListContainer } /> }
						{	user.access === 5 && <Route path='/orders' component= { OrdersContainer } /> }
						{ user.access === 5 && <Route path='/accounts' component= { AccountsContainer } /> }
					</Switch>
				</div>
			</div>   
		);
	}
}

function mapStateToProps(state){
	return{ 
		user: state.user,
		order: state.order,
	}
};


        
function mapDispatchToProps(dispatch){
	return{
		isLogged: function(){
			dispatch(isLogged())
		},
		fetchAllProducts: function() {
			dispatch(fetchAllProducts())
		},
		setStateByStorage:function(storage){
			dispatch(setStateByStorage(storage))
		},
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(Main)

