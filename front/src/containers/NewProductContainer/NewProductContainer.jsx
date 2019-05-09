import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import AdminPanelContainer from '../AdminPanelContainer/AdminPanelContainer';
import NewProduct from '../../components/NewProduct';
import s from '../AdminPanelContainer/style.css';
import Toast from './Toast';
import { createProduct, getGrapes } from '../../store/actions/ProductsActions';


class NewProductContainer extends Component{
	constructor(props){
		super(props);
		this.state={
			productName : '',
			cellarName : '',
			lineName : '',
			year : '',
			stock : 0,
			price : 0,	
			description : '',
			image: '',
			grapes: [],
			allCellars: [],
			allLines: [],
			checked: false,
			box: '',
			wrongLine: false,
			wrongCellar: false,
			open: false,
		}
		this.handleChange= this.handleChange.bind(this);
		this.handleClick= this.handleClick.bind(this);
		this.isChecked= this.isChecked.bind(this);
		this.checkValue= this.checkValue.bind(this);
		this.handleClose= this.handleClose.bind(this);
		this.clear= this.clear.bind(this);
	}

	componentDidMount(){
		axios.get('/api/cellars')
			.then(data => this.setState({ allCellars:data.data }))

		axios.get('/api/lines')
			.then(data => this.setState({ allLines:data.data }))
		this.props.getGrapes();
	}
	
	// Checkboxs de grapes:
	isChecked(e){
		this.setState({
			[e.target.name] : e.target.checked
		});
	}

	// Manejo de cada input:
	handleChange(e){
		if(e.target.name == 'grapes'){
			e.target.checked && !this.state.grapes.includes(e.target) && this.state.grapes.push(e.target);
		}else{
			this.setState({
				[e.target.name] : e.target.value
			});
		}
	}
	
	// Submit del form:
	handleClick(e){
		// console.log(this.state)
		this.setState({})
		this.state.grapes= this.state.grapes.filter(grape => {
			return grape.checked;
		})
		for(var i=0; i<this.state.grapes.length; i++){
			this.state.grapes[i]= this.state.grapes[i].id;
		}
		// e.preventDefault();
		const body= {
			productName : this.state.productName || this.state.cellarName + ' - ' + this.state.lineName ,
			cellarName : this.state.cellarName,
			lineName : this.state.lineName,
			year : this.state.year,
			stock : this.state.stock,
			price : this.state.price,	
			description : this.state.description,
			image: this.state.image,
			grapes: this.state.grapes,
			box: this.state.box
		}
		this.props.createProduct(body)
		.then(() => this.setState({ open:true }))
	}

	checkValue(e){
		var regex= /^[a-zA-Z0-9&@.$%\-,():;` ]+$/;
		if(e.target.name == 'cellarName'){
			if(regex.test(e.target.value)){
				this.setState({ wrongCellar : false })
			}else{ 
				this.setState({ wrongCellar : true });
			}
		}
		if(e.target.name == 'lineName'){
			if(regex.test(e.target.value)){
				this.setState({ wrongLine : false })
			}else{ 
				this.setState({ wrongLine : true });
			}
		}
	}

  handleClose () {
		this.setState({
			open:false
		});
  };

	clear(){
		this.setState({
			productName : '',
			cellarName : '',
			lineName : '',
			year : '',
			stock : 0,
			price : 0,	
			description : '',
			image: '',
			grapes: [],			
		})
	}

	render(){
		return (
			<div className={s.container}>
				<AdminPanelContainer />
				
				<NewProduct
					clear= { this.clear }
					wrongLine= { this.state.wrongLine && <p>El campo 'Linea' es obligatorio. Por favor elige entre las opciones</p> }
					wrongCellar= { this.state.wrongCellar && <p>El campo 'Bodega' es obligatorio. Por favor elige entre las opciones</p> }
					checkValue= {this.checkValue}
					isChecked={this.isChecked} 
					state={this.state} 
					grapes= {this.props.grapes} 
					handleChange={this.handleChange} 
					handleClick={this.handleClick} 
				/>
				
				{ 
					this.state.open && 
					<Toast open= {this.state.open} handleClose= {this.handleClose} status={this.props.created}/> 
				}
			</div>
		)
	}
}

const mapStateToProps= (state) => {
	return {
		grapes : state.products.grapes,
		created : state.products.product
	}
}

const mapDispatchToProps= (dispatch) => {
	return {
		createProduct : function(product){
			return dispatch(createProduct(product));
		},
		getGrapes : function(){
			return dispatch(getGrapes());
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewProductContainer);


