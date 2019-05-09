import React from 'react';
import { connect } from 'react-redux';
import Login from '../../components/Login'
import { loginUser } from '../../store/actions/UserActions';
import { getCart } from '../../store/actions/OrderActions';

class LoginContainer extends React.Component{
	constructor(props){
		super(props)
		this.state={
			email:"",
			password:"",
			logged: false  
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
		const email = this.state.email;
		const password = this.state.password;

		this.props.loginUser(email,password)
			.then(res => {
				this.props.getCart(res.user.id);
				this.props.history.push('/');
				// Forzamos a recargar la pagina para que cargue correctamente las cantidades de productos en el carrito.
				window.location.reload();
			})
			.catch(()=>alert('usuario o contraseña no valido'))
	} 



	render() {
		const {email, password}=this.state
		return(
			<React.Fragment>
				{   
					<Login 
						handleInputChange={this.handleInputChange} 
						handleSubmit={this.handleSubmit}
						email={email}
						password={password}
					/>
				}
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		cart : state.order.cart,
	}
}


function mapDispatchToProps(dispatch) {
	return {
		loginUser : (email, password) => dispatch(loginUser(email, password)),
		getCart : (userId) => dispatch(getCart(userId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);