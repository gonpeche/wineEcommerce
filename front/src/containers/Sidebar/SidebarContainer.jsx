import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grapes from '../Sidebar/Grapes';
import Cellars from '../Sidebar/Cellars';
import Lines from '../Sidebar/Lines';
import { getProductsBySearchSidebar } from '../../store/actions/FilterActions'

import s from './styles.css'

function mapDispatchToProps(dispatch) {
	return {
		getProductsBySearchSidebar: function(filtro,check) {
			dispatch(getProductsBySearchSidebar(filtro,check))
		}
	}
}

class SidebarContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtro: '',
		}
		this.filterProduct = this.filterProduct.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	filterProduct = (filtro) => {
		this.setState({
			filtro: filtro
		});
	}

	handleChange(e) {
		// Parseo el value del checkbox html. 
		const obj= JSON.parse(e.target.value)
		this.props.getProductsBySearchSidebar(obj, e.target.checked)
	}


	render() {
		return (
			<div id={s.navbarLeft}>
				<div className={s.flotando}>
					<br></br>
					<h2 className= { s.title }>Filtrar vinos</h2>
					<Grapes handleChange={this.handleChange}/>
					<Cellars handleChange={this.handleChange}/>
					<Lines handleChange={this.handleChange}/>
				</div>
			</div>
		)
	}
}


export default connect(null, mapDispatchToProps)(SidebarContainer);