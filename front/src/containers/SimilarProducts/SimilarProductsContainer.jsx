import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimilarProducts from '../../components/SimilarProducts'
import { selectSingleProduct } from '../../store/actions/ProductsActions'
import { addProductToOrder  } from '../../store/actions/OrderActions'

import { MySnackbarContentWrapper} from '../Toasts/toast1'
import Snackbar from '@material-ui/core/Snackbar';



class SimilarProductsContainer extends Component {
	constructor(props) {
		super(props);
		this.state= {
			//Open es para el toast
			open: false,
		}
		this.handleClick = this.handleClick.bind(this)
		this.handleClickCart = this.handleClickCart.bind(this)
	}

	handleClick(selectedProduct) {
		this.props.selectSingleProduct(selectedProduct.id)
	}
	handleClickCart(product){
		this.props.addProductToOrder(product)
		this.handleClickToast();
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

	render() {
		return (
			<div>
				{
					this.props.similarProducts.length > 0 ? 
						<SimilarProducts vinosSimilares={this.props.similarProducts} handleClickCart={this.handleClickCart} handleClick={this.handleClick}/>
					: <h1> No se encuentran productos similares</h1>
				}
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
					open={this.state.open}
					autoHideDuration={2500}
					onClose={this.handleCloseToast}
				>
					<MySnackbarContentWrapper
							onClose={this.handleCloseToast}
							variant="success"
							message="El vino se agrego al carrito!"
					/>
				</Snackbar>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		similarProducts: state.products.similarProducts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectSingleProduct: function(product){
			dispatch(selectSingleProduct(product))
		},
		fetchSimilarProducts: function(producto) {
			dispatch(fetchSimilarProducts(producto))
		},
		addProductToOrder: function(product){
			dispatch(addProductToOrder(product))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SimilarProductsContainer);





