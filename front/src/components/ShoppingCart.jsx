import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {connect} from 'react-redux'

const styles = theme => ({
  badge: {
    top: -2,
    right: -20,
    // The border color match the background color.
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[1200]
    }`,
  },
});

function CustomizedBadge(props) {
  const { classes } = props;
  var totalProductos = 0;
  props.order.products.length > 0 ? 
		props.order.products.map(producto => {
    	totalProductos += producto.cantidad;
  	})
	: totalProductos
  return (
    <IconButton aria-label="Cart" style={{'padding': '0'}}>
    {
      totalProductos > 0 ? 
      <Badge  badgeContent={ totalProductos } color="secondary" classes={{ badge: classes.badge }}>
        <ShoppingCartIcon />
      </Badge>
      :
      <ShoppingCartIcon />
    }
    </IconButton>
  );
}


function mapStateToProps(state){
	return{
		order: state.order
	}
};

function mapDispatchToProps(dispatch){
	return{ }
};

const cart = withStyles(styles)(CustomizedBadge);

export default connect(mapStateToProps,mapDispatchToProps)(cart)