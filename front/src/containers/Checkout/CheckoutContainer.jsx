import React from 'react';
import { connect } from 'react-redux'

//Material UI:
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import Review from './Reviews';
import { styles } from './styles'
import { sendEmail, handleEmptyOrder } from '../../store/actions/OrderActions';
import { Link } from 'react-router-dom';
import axios from 'axios';

const steps = ['Instrucciones', 'Datos personales', 'Revisar pedido'];

class Checkout extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			activeStep: 0,
			telefono: '',
			domicilio: '',
			ciudad: '',
			provincia: '',
			user: {}
		};
		this.handleChange= this.handleChange.bind(this);
		this.sendEmail= this.sendEmail.bind(this);
		this.goCheckout= this.goCheckout.bind(this);
	}

	componentDidMount(){
		axios.get(`/api/user/${this.props.user.id}`)
			.then(data => this.setState({ 
				telefono: data.data.telefono,
				domicilio: data.data.domicilio,
				ciudad: data.data.ciudad,
				provincia: data.data.provincia
			}))
	}

	handleChange(e){
		var val= e.target.value;
		val ? this.setState({ [e.target.name] : val }) : this.setState ({ [e.target.name] : ' ' })
	}

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
		// Actualizo la informacion del usuario para guardar sus datos personales para proximas compras.
		if(this.state.activeStep == 1){ 
			this.state.user= {
				id: this.props.user.id,
				firstName: this.props.user.firstName,
				lastName: this.props.user.lastName,
				email: this.props.user.email,
				telefono: this.state.telefono.trim() || this.props.user.telefono,
				domicilio: this.state.domicilio.trim() || this.props.user.domicilio,
				ciudad: this.state.ciudad.trim() || this.props.ciudad,
				provincia: this.state.provincia.trim() || this.props.user.provincia	
			}
			axios.put(`/api/user/${this.props.user.id}/update`, this.state.user)
		}
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  getStepContent(step) {
    switch (step) {
      case 0:
      	return <PaymentForm user={ this.props.user }/>;
      case 1:
      	return <AddressForm state= { this.state } handleChange= { this.handleChange } user= { this.props.user } />;
      case 2:
        return <Review products={ this.props.order }/>;
      default:
        throw new Error('Unknown step');
    }
  }

	sendEmail(e){
		this.props.contactEmail(this.state.user,this.props.order);
		this.props.handleEmptyOrder(this.props.user);
		this.handleNext();
	}

	goCheckout(){
		this.props.history.push('/carrito');
	}

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Confirmación de pedido
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    ¡Listo! Gracias por tu pedido.
                  </Typography>
                  <Typography variant="subtitle1">
                    Tu número de pedido es el XXXX. En breve nos comunicaremos con vos para acordar la entrega.
                    Cualquier cosa nos podes escribir a "pogo@pogo.pogo"
                  </Typography>
									<Link to='/'>
										<Button variant="contained" color="primary" className={classes.button} >
											Back to shopping 
										</Button>
									</Link>
								</React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                      <Button onClick={ activeStep == 0 && this.goCheckout || this.handleBack} className={classes.button}>
                        Atras
                      </Button>
                    {
                      this.props.user.id &&
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={activeStep === steps.length - 1 ? this.sendEmail : this.handleNext}
                          className={classes.button}
                        >
                        {activeStep === steps.length - 1 ? '¡Es correcto!' : 'Siguiente'}
                        </Button>
                    }
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{ 
      order: state.order,
      user: state.user,
		}
};

function mapDispatchToProps(dispatch){
  return{ 
		contactEmail: (user, order) => {
			dispatch(sendEmail(user, order))
		},
		handleEmptyOrder : (user) => (dispatch) => dispatch(handleEmptyOrder(user))
  }
};



export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Checkout));