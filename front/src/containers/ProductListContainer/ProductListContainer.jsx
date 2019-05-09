import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminPanelContainer from '../AdminPanelContainer/AdminPanelContainer';
import EditProductContainer from '../EditProductContainer/EditProductContainer';
import s from '../AdminPanelContainer/style.css';
import ProductsList from '../../components/ProductsList';
import { fetchAllProducts, fetchAllCellars, fetchAllLines, selectSingleProduct } from '../../store/actions/ProductsActions';


class NewProductContainer extends Component{
	constructor(props){
		super(props);
		this.state={
			listProducts: [],
			prodToEdit: {},
		}
		this.handleClick= this.handleClick.bind(this);
	}

	componentDidMount(){
		this.props.fetchAllProducts()
		this.props.fetchAllCellars()
		this.props.fetchAllLines()
			.then(data => {
				var vinos= this.props.allProducts;
				var cellars= this.props.allCellars;
				var lines= this.props.allLines;
				var prods= [];
				for (var i=0; i<vinos.length; i++){
					// Busco la bodega que corresponda a cada vino, donde van a coincidir los ID's de su tabla intermedia.
					let cellarName= cellars.find(cellar => cellar.id == vinos[i].cellarId) && cellars.find(cellar => cellar.id == vinos[i].cellarId).cellarName;	
					let lineName= lines.find(line => line.id == vinos[i].lineId) && lines.find(line => line.id == vinos[i].lineId).lineName;
					prods.push({
						id : vinos[i].id,
						name : vinos[i].productName,
						cellar : cellarName,
						line : lineName,
						year : vinos[i].year,
						price : vinos[i].price,
						image : vinos[i].image
					})
				}
				for(var i=0; i<prods.length; i++){
					for(var j=i+1; j<prods.length; j++){
						if(prods[j].id < prods[i].id){
							var aux= prods[i];
							prods[i]= prods[j];
							prods[j]= aux;
						}
					}
				}
				this.setState({
					listProducts : prods
				})
			})
	}

	handleClick(e){
		this.props.editProduct(e.rowData.id);
	}


	render(){
		return (
				<div className={s.container}>
					<AdminPanelContainer />
					{
						Object.keys(this.props.selectedProduct)[0] ?
						<EditProductContainer selectedProduct= {this.props.selectedProduct}/>
						:
						<ProductsList handleClick= {this.handleClick} listProducts= {this.state.listProducts}/>					
					}
				</div>
		)
	}
}

const mapStateToProps= (state) => {
	return {
    allProducts: state.products.allProducts,
		allCellars: state.products.allCellars,
		allLines: state.products.allLines,
		selectedProduct: state.products.selectedProduct,
	}
}

const mapDispatchToProps= (dispatch) => {
	return {
		fetchAllProducts: function(){
			return dispatch(fetchAllProducts())
		},
		fetchAllCellars: function(){
			return dispatch(fetchAllCellars())
		},
		fetchAllLines: function(){
			return dispatch(fetchAllLines())
		},
		editProduct: function(productId){
			return dispatch(selectSingleProduct(productId))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewProductContainer);


