import React from 'react';
import { Link } from 'react-router-dom'

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import s from '../containers/NavbarContainer/NavbarStyles.css'
import ShoppingCart from './ShoppingCart'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: { useNextVariants: true },
});

function CustomizedInputs(props) {
  const { classes, user, logOut, handleHome } = props;

  return (
    <div className={s.container}>             
      <div className={s.leftSideNavbar}>
        <li> <Link to="/" onClick= { handleHome }>HOME</Link></li> 
        <div className={s.profile_Navbar}>
            {user.firstName && <Link to="/user"> {user.firstName} </Link> }
        </div>         
      </div>
      <div className={s.middleNavbar}>
        <div className={classes.container}>
          <MuiThemeProvider theme={theme}>
            <form onSubmit={(e) => {
              e.preventDefault()
              props.handleSubmit(e.target.search.value)
                }}>
              <TextField
                fullWidth={true}
                onChange={props.handleChange}
                className={classes.margin}
                name="search"
                label="¿Qué vino buscás?"
                id="mui-theme-provider-standard-input"
                />
            </form>
          </MuiThemeProvider>
        </div>
    </div>
    <div className={s.rightSideNavbar}>
			{ (user.firstName) &&  <Link to ="/"  onClick={logOut}>LOG OUT </Link> }
			{	!(user.firstName) &&  <Link to="/login"> LOGIN  </Link>	}
			{	!(user.firstName) &&  <Link to="/register">  REGISTER </Link>	}
			<div> <Link to="/carrito">  <ShoppingCart /> </Link></div>      
   	</div>
  </div>
  );
}

export default withStyles(styles)(CustomizedInputs);
