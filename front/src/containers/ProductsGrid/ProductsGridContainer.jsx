import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductsGrid from '../../components/ProductsGrid';
import SidebarContainer from '../Sidebar/SidebarContainer'

import s from '../Main.css'

import { selectSingleProduct, fetchSimilarProducts } from '../../store/actions/ProductsActions'
import { addProductToOrder, setLocalStorage, addProductToDataBase } from '../../store/actions/OrderActions'
import {isLogged} from '../../store/actions/UserActions'

//MATERIAL UI PARA EL TOAST
import { MySnackbarContentWrapper} from '../Toasts/toast1'
import Snackbar from '@material-ui/core/Snackbar';

function mapStateToProps(state, ownProps) {
	return {
		filtrosNavbar: state.products.filteredProducts,
		allProducts: state.products.allProducts,
		order: state.order,
		user: state.user,
		selectedProduct : state.products.selectedProduct,
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		selectSingleProduct: function(producto) {
			dispatch(selectSingleProduct(producto))
		},
		fetchSimilarProducts: function(producto) {
			dispatch(fetchSimilarProducts(producto))
		},
		addProductToOrder: function(product, user){
			dispatch(addProductToOrder(product, user))
		},
		setLocalStorage: function(estadoProducts){
			setLocalStorage(estadoProducts)
		},
		addProductToDataBase:function(cart){
			dispatch(addProductToDataBase(cart))
		},      
	};
}


class ProductsGridContainer extends Component {
	constructor(props) {
			super(props);
			this.state= {
					//Open es para el toast
					open: false,
			}
			this.handleClick = this.handleClick.bind(this);
			this.handleClickCart = this.handleClickCart.bind(this);
			this.handleClickToast = this.handleClickToast.bind(this);
			this.handleCheckout= this.handleCheckout.bind(this);
	}

	handleClickToast = () => {
		this.setState({ open: true });
	};
	
	handleCloseToast = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		this.setState({ open: false });
	};
		
	
	handleClick(selectedProduct) {
		this.props.selectSingleProduct(selectedProduct.id);
		this.props.fetchSimilarProducts(selectedProduct.id);
		this.props.history.push(`/OneProduct/${selectedProduct.id}`);
	}
	
	handleClickCart(product){
		var user = this.props.user
		this.props.addProductToOrder(product, user);
		this.handleClickToast();
	}

	handleClickToast = () => {
		this.setState({ open: true });
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		this.setState({ open: false });
	};
	
	handleCheckout(e){
		var prod= JSON.parse(e.target.value)
		this.handleClickCart(prod);
		this.props.history.push('/checkout');
	}

	render() {
		return (
			<div className={s.row}>
				<div className={s.side}>
						<SidebarContainer />
				</div>
				<div className={s.main}>
					{
						this.props.filtrosNavbar.result === false ?
							<h2 style={{ color: '#040404', fontWeight: 100, textAlign: "center", paddingTop: "20px", fontFamily: "Lato Roboto sans-serif" }}>  No se encontraron vinos. </h2> 	
							: (
									<ProductsGrid 
										products={
											this.props.filtrosNavbar.length > 0 ?
											this.props.filtrosNavbar : 
											this.props.allProducts
										}
										handleClick={this.handleClick}
										handleClickCart={this.handleClickCart}
										handleClickToast={this.handleClickToast}
										handleCheckout= {this.handleCheckout}
									/>
								)
					}
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						open={this.state.open}
						autoHideDuration={2500}
						onClose={this.handleClose}
						>
						<MySnackbarContentWrapper
								onClose={this.handleClose}
								variant="success"
								message="El vino se agregó al carrito!"
						/>
						</Snackbar>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsGridContainer);





