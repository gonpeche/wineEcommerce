// IMPORT SINCE LIBRARIES
import React from 'react';
import {connect} from 'react-redux'
import Carrito from '../../components/Carrito'
import {
	addProductToOrder, 
	removeProductFromOrder, 
	deleteProductFromOrder, 
	handleEmptyOrder
} from '../../store/actions/OrderActions'

class cartContainer extends React.Component{
	constructor(props){
		super(props)
		this.handleClickCart = this.handleClickCart.bind(this)   
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this)
		this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
		this.handleClickEmpty = this.handleClickEmpty.bind(this)
	}
	
	handleClickCart(product, user){
		this.props.addProductToOrder(product, user);
	}
	handleRemoveProduct(product, user){
		this.props.removeProductFromOrder(product, user)
	}
	handleDeleteProduct(product, user){
		this.props.deleteProductFromOrder(product, user)
	}
	handleClickEmpty(user){   
		this.props.handleEmptyOrder(user)
	}

	render(){
		return(
			<Carrito 
				order={this.props.order.products} 
				handleClickCart={this.handleClickCart}
				handleRemoveProduct={this.handleRemoveProduct}
				handleDeleteProduct={this.handleDeleteProduct}
				handleClickEmpty={this.handleClickEmpty}
				user={this.props.user}
			/>
		)
	}
}

function mapStateToProps(state){
	return{
		order: state.order,
		user: state.user
	}
};

function mapDispatchToProps(dispatch){
	return{ 
		addProductToOrder:function(product, user){
			dispatch(addProductToOrder(product, user))
		},
		removeProductFromOrder:function(product, user){
			dispatch(removeProductFromOrder(product, user))
		},
		deleteProductFromOrder:function(product, user){
			dispatch(deleteProductFromOrder(product, user))
		},
		handleEmptyOrder:function(user){
			dispatch(handleEmptyOrder(user))
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(cartContainer)