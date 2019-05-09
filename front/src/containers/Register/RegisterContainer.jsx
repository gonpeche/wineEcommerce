import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

import Register from '../../components/Register'

class RegisterContainer extends React.Component{
	constructor(props){
		super(props)
		this.state={
				email:"",
				password:"",
				firstName:"",
				lastName:""
		}   
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);    
	}
	
	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}         

	handleSubmit(event) {
		event.preventDefault(); 
		const state=this.state;
		axios.post('/api/user/register',{
			email: state.email,
			password: state.password,
			firstName: state.firstName,
			lastName: state.lastName,
		}) 
			.then( () => this.props.history.push('/login') )
			.catch(()=>alert('revisa tus datos'))		
	} 
	render(){
		const {email, password, firstName, lastName}=this.state
		return(
			<div>
				<Register 
					handleInputChange={this.handleInputChange}
					handleSubmit={this.handleSubmit}
					email={email}
					password={password}
					firstName={firstName}
					lastName={lastName}
				/>			
			</div> 
		)
	} 
}
function mapStateToProps(state) {
	return {
		user:state.user
	}
}

function mapDispatchToProps(dispatch) {
	return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
