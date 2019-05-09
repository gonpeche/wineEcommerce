import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import s from '../AdminPanelContainer/style.css';
import FormProductEdit from '../../components/FormProductEdit';
import UpdateToast from './UpdateToast';
import { fetchAllCellars, fetchAllLines, fetchSelectedGrapes, getGrapes, updateProduct, backToList } from '../../store/actions/ProductsActions';


class NewProductContainer extends Component{
	constructor(props){
		super(props);
		this.state={
			productName: '',
			year: '',
			image: '',
			description: '',
			price: 0,
			stock: 0,
			cellarId: 0,
			lineId: 0,
			selectedCellar: {},
			selectedLine: {},
			selectedGrapes: [],
			grapes: [],
			open: false,
			allGrapes: []
		}
		this.handleChange= this.handleChange.bind(this);
		this.handleSubmit= this.handleSubmit.bind(this);
		this.handleClose= this.handleClose.bind(this);
		this.backToList= this.backToList.bind(this);
	}

	componentDidMount(){
		this.props.getGrapes()	
			.then(data => this.setState({ allGrapes : data.grapes }))
		this.props.fetchAllCellars()
		this.props.fetchAllLines()
		this.props.fetchGrapes(this.props.selectedProduct.id)
			.then(data => {
				var grapes= data.selectedGrapes.map(e => {
					return {
						id: e.id,
						grapeName: e.grapeName,
						check: true
					}
				});
				this.setState({ selectedGrapes:grapes })
			})
			.then(data => this.grapeFormat(this.state.allGrapes,this.state.selectedGrapes))
		axios.get(`/api/cellars/${this.props.selectedProduct.cellarId}`)
			.then(cellar => this.setState({ selectedCellar:cellar.data }))
		axios.get(`/api/lines/${this.props.selectedProduct.lineId}`)
			.then(line => this.setState({ selectedLine:line.data }))
	}

	handleChange(e){
		var val= e.target.value;
		// Si el target son los checkbox de grapes, el setState va a depender de su estado boolean.
		if(e.target.name == 'grapes'){
			// Parseo el value del checkbox html.
			var parseGrape= JSON.parse(val)
			// Armo un objeto que voy a usar para checkear el estado boolean del checkbox.
			var grape= {
				id: parseGrape.id,
				grapeName: parseGrape.grapeName,
				check: e.target.checked
			}
			// Si está tildado lo pusheo al state.
			// console.log(grape)
			if(grape.check){
				this.state.grapes.push(grape);
			// Si ya está en el state y llega con su check en false, lo elimino.
			}else{
				for(var i=0; i<this.state.grapes.length; i++){
					this.state.grapes[i].id == grape.id && this.state.grapes.splice(i,1)
				}
			}
		}else{
			val ? this.setState({ [e.target.name] : val }) : this.setState ({ [e.target.name] : ' ' })
		}
	}

	handleSubmit(e){
		// Elimina valores duplicados del array.
		Array.prototype.unique=function(a){
			return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
		});
		// Actualizo el valor del estado, guardando en grapes solo sus ID's.
		this.state.grapes= this.state.grapes.filter(grape => {
			return grape.check;
		})
		var grapes= [];
		for(var i=0; i<this.state.grapes.length; i++){
			grapes[i]= Number(this.state.grapes[i].id);
		}
		grapes= grapes.unique();
		const selectedProduct= this.props.selectedProduct;
		const state= this.state;
		var data= {
			productId: selectedProduct.id,
			productName: state.productName || selectedProduct.productName,
			year: state.year || selectedProduct.year,
			image: state.image || selectedProduct.image,
			description: state.description || selectedProduct.description,
			price: Number(state.price) || selectedProduct.price,
			stock: Number(state.stock) || selectedProduct.stock,
			cellarId: Number(state.cellarId) || selectedProduct.cellarId,
			lineId: Number(state.lineId) || selectedProduct.lineId,
			grapes: grapes
		}
		this.props.updateProduct(data)
			.then(() => this.setState({ open : true }));
	}

  handleClose () {
		this.setState({
			open:false
		});
  };

	// Defino un unico array de grapes compuestas por su id, su grapeName y su valor check
	// que va a depender de si pertenecen al array de las selectedGrapes o no.
	grapeFormat(allGrapes,selectedGrapes){
		var allGrapes= allGrapes.map(e => {
			return {
				id: e.id,
				grapeName: e.grapeName,
				check: false 
			}
		});
		for (var i=0; i<allGrapes.length; i++){			
			for(var j=0; j<selectedGrapes.length; j++){
				if(allGrapes[i].id == selectedGrapes[j].id){
					allGrapes[i]= selectedGrapes[j]
				}
			}
		}
		this.setState({
			allGrapes : allGrapes,
			grapes : selectedGrapes
		})
	}

	backToList(){
		this.props.backToList();
	}

	render(){
		return (
			<div className={s.container}>
				<FormProductEdit
					backToList= { this.backToList } 
					handleCheck= { this.handleCheck }
					allCellars= { this.props.allCellars } 
					allLines= { this.props.allLines } 
					allGrapes= { this.state.allGrapes }
					selectedGrapes= { this.state.selectedGrapes }
					selectedLine= { this.state.selectedLine }
					selectedCellar= { this.state.selectedCellar }
					handleChange= { this.handleChange } 
					selectedProduct= { this.props.selectedProduct }
					state= { this.state }
					handleSubmit= { this.handleSubmit }
				/>
				{
					this.state.open &&  
					<UpdateToast open= { this.state.open } handleClose= { this.handleClose } status={ this.props.productUpdated }/> 
				}
			</div>
		)
	}
}

const mapStateToProps= (state) => {
	return {
		allCellars: state.products.allCellars,
		allLines: state.products.allLines,
		selectedGrapes: state.products.selectedGrapes,
		grapes: state.products.grapes,
		productUpdated: state.products.productUpdated,
	}
}

const mapDispatchToProps= (dispatch) => {
	return {
		fetchAllCellars: function(){
			return dispatch(fetchAllCellars())
		},
		fetchAllLines: function(){
			return dispatch(fetchAllLines())
		},
		fetchGrapes: function(productId){
			return dispatch(fetchSelectedGrapes(productId))
		},
		getGrapes : function(){
			return dispatch(getGrapes());
		},
		updateProduct : function(data){
			return dispatch(updateProduct(data))
		},
		backToList : function(){
			return dispatch(backToList())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewProductContainer);
