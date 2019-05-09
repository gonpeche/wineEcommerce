import React from 'react';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import s from '../containers/Register/RegisterStyles.css'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  colorInput: {
	color: '#504F50 !important',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#b61850'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function SignIn(props) {
	const { classes } = props;
	const {handleInputChange, handleSubmit, email, password, lastName, firstName} = props;
	return (
		<main className={classes.main} >
			<CssBaseline />
			<Paper className={classes.paper}>
			<Typography component="h1" variant="h5">
					Register
			</Typography>
			<form className={classes.form} onSubmit={handleSubmit}>
				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="name" className={classes.colorInput}>Name</InputLabel>
					<Input textfield="algo" onChange={handleInputChange} value={firstName} id="firstName" name="firstName"  className={classes.colorInput} autoComplete="firstName" />
				</FormControl>
				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="email"  className={classes.colorInput}>Last Name</InputLabel>
					<Input id="lastName" onChange={handleInputChange} value={lastName} name="lastName" autoComplete="lastName"  />
				</FormControl>
				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="email" className={classes.colorInput}>Email Address</InputLabel>
					<Input id="email" onChange={handleInputChange}  value={email}  name="email" autoComplete="email" />
				</FormControl>
				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="password" className={classes.colorInput}>Password</InputLabel>
					<Input name="password" onChange={handleInputChange}  value={password} type="password" id="password" autoComplete="current-password" />
				</FormControl>
				<br/>
				<br/>
				<br/>
				<Button
				type="submit"
				fullWidth
				variant="contained"
				className={s.btnRegister}
				>
				Sign in
				</Button>
			</form>
		</Paper>
	</main>
	);
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);

