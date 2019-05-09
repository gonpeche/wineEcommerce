import React, { Component } from 'react';
import Orders from '../../components/Orders';
import AdminPanelContainer from '../AdminPanelContainer/AdminPanelContainer';
import { connect } from 'react-redux';
import axios from 'axios';
import s from './style.css';
import { fetchAllUsers } from '../../store/actions/UserActions';
import { fetchAllOrders } from '../../store/actions/OrderActions';

class OrdersContainer extends Component {
	constructor(props){
		super(props);
		this.state= {
			allOrders : [],
			allUsers : [],
			dataOrders: []
		}
		this.handleChange= this.handleChange.bind(this);
	}
	componentDidMount(){
		this.props.fetchUsers()
			.then(() => this.setState({ allUsers : this.props.allUsers }))
			.then(() => {
				this.props.fetchOrders()
					.then(() => this.setState({ allOrders : this.props.allOrders }))
					.then(() => {
						var usersOrders= [];
						var users= this.props.allUsers;
						var orders= this.props.allOrders;
						// Una vez que tengo todas las ordenes, armo el formato que le voy a pasar al componente <Orders />
						// donde cada orden esté asociada a su correspondiente usuario.
						for(var i=0; i<orders.length; i++){
							for(var j=0; j<users.length; j++){
								// Aca armo el formato fecha con el 'createdAt' que te da sequelize.
								var date= orders[i].createdAt.split('T')[0].split('-').reverse();
								// Agrego las barras a la fecha.
								date.splice(1,0,'/');
								date.splice(3,0,'/');
								orders[i].userId && orders[i].userId == users[j].id 
								&& usersOrders.push({
									id : orders[i].id,
									nOrder : orders[i].id + orders[i].createdAt.split('T')[0].split('-').reverse().join(''),
									date : date.join(''),
									user : users[j].firstName + ' ' + users[j].lastName,
									email : users[j].email,
									cellphone : users[j].telefono,
									status : orders[i].status.toUpperCase()
								})
							}
						}
						this.setState({
							dataOrders : usersOrders
						});
				})
		})
	}
	handleChange(e){
		axios.put(`api/orders/${e.target.id}`, {
			status : e.target.value.toLowerCase()
		})
	}
	render(){
		return (
			<div className= { s.container }>
				<AdminPanelContainer sidebar={ 's.sidebar2' }/>
				<Orders users= { this.state.users } orders= { this.state.dataOrders } handleChange= { this.handleChange }/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		allUsers : state.user.allUsers,
		allOrders : state.order.allOrders
	}
}

const mapDispatchToProps= (dispatch) => {
	return {
		fetchUsers : () => dispatch(fetchAllUsers()),
		fetchOrders : () => dispatch(fetchAllOrders())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(OrdersContainer);

