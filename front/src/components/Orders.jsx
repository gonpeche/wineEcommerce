
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import s from '../containers/OrdersContainer/style.css';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
		margin: '1% 2%'
  },
  table: {
    minWidth: 700,
		textAlign : 'center',
		margin : 'auto'
	},
});

function CustomizedTable(props) {
  const { classes, handleChange, orders } = props;
  return (
    <Paper className= { classes.root }>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell style={{ textAlign:'center' }}>Órden n°</CustomTableCell>
            <CustomTableCell style={{ textAlign:'center' }}>Fecha</CustomTableCell>
            <CustomTableCell style={{ textAlign:'left' }}>Usuario</CustomTableCell>
            <CustomTableCell style={{ textAlign:'center' }}>Email</CustomTableCell>
            <CustomTableCell style={{ textAlign:'center' }}>Telefono</CustomTableCell>
            <CustomTableCell style={{ textAlign:'center' }}>Estado</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders[0] && orders.map((order,i) => {
						return (
              <TableRow className={classes.row} key={order.nOrder}>
                <CustomTableCell component="th" scope="row">{ order.nOrder }</CustomTableCell>
                <CustomTableCell >{ order.date }</CustomTableCell>
                <CustomTableCell >{ order.user }</CustomTableCell>
                <CustomTableCell >{ order.email }</CustomTableCell>
                <CustomTableCell >{ order.cellphone }</CustomTableCell>
                <CustomTableCell >
									<select id= { order.id } onChange= { handleChange } align= 'right' name="select">
										<option defaultValue= { order.status }>{ order.status }</option> 
										{ order.status != 'CREADA' && <option value="creada"> CREADA </option> }
										{ order.status != 'COMPLETADA' && <option value="completada"> COMPLETADA </option> }
										{ order.status != 'CANCELADA' && <option value="cancelada"> CANCELADA </option> }
									</select>
								</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);