import React from 'react';
import s from '../containers/NewProductContainer/style.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class TextFields extends React.Component {
	state={
		grape: false
	}
	handleChange= (name) => e => {
		this.setState({ [name]:e.target.checked })
	}
  render() {
    const { classes, state, handleChange, grapes, checkValue, wrongCellar, wrongLine, handleClick, backToList } = this.props;
    return (
			<div className={s.form}>
				<div className={s.title}>
					<h1>Editar producto</h1>
				</div>
				<form className={classes.container} noValidate autoComplete="off">
					<TextField
						id="standard-name"
						label="Nombre"
						fullWidth
						value={state.productName}
						onChange={handleChange}
						margin="normal"
						name='productName'
						onBlur= {checkValue}
					/>
					<TextField
						id="standard-name"
						label="Año"
						fullWidth
						value={state.year}
						onChange={handleChange}
						margin="normal"
						name='year'
					/>
					<TextField
						id="standard-name"
						label="Nombre imagen"
						fullWidth
						value={state.image}
						onChange={handleChange}
						margin="normal"
						name='image'
					/>
					<TextField
						id="standard-multiline-static"
						label="Descripción"
						multiline
						fullWidth
						margin="normal"
						onChange={handleChange}
						name='description'
					/>
					<TextField
						id="standard-number"
						label="Precio"
						value={state.price}
						onChange={handleChange}
						type="number"
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						margin="normal"
						name='price'
					/>				
					<TextField
						id="standard-number"
						label="Stock"
						value={state.stock}
						onChange={handleChange}
						type="number"
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						margin="normal"
						name='stock'
					/>

					<TextField
						onBlur= {checkValue}
						onChange={handleChange}
						name='cellarName'
						label="Bodega"
						fullWidth
						margin="normal"
						select
						InputLabelProps={{
							shrink: true,
						}}
						SelectProps={{
							native: true,
							MenuProps: {
								className: classes.menu,
							},
						}}
					>
						<option value='' hidden></option>
						{
							state.allCellars[0] && state.allCellars.map(cellar => (
							<option key={cellar.id} value={cellar.cellarName}>
								{cellar.cellarName}
							</option>
							))
						}				
					</TextField>
					<span className={s.alert}>{ wrongCellar }</span>


					<TextField
						onBlur= {checkValue}
						onChange= {handleChange}
						name= 'lineName'
						label= "Linea"
						fullWidth
						margin= "normal"
						select
						InputLabelProps={{
							shrink: true,
						}}
						SelectProps={{
							native: true,
							MenuProps: {
								className: classes.menu,
							},
						}}
					>
						<option value='' hidden></option>
						{
							state.allLines[0] && state.allLines.map(line => (
							<option key={line.id} >
								{line.lineName}
							</option>
							))
						}				
					</TextField>
					<span className={s.alert}>{ wrongLine }</span>

					<div className={s.checkbox}>
						<div className={s.header}>
							<p>Tipos de uva</p>
						</div>
						{
							grapes[0] && grapes.map(grape => {
								return (
									<div key= {grape.id}>
										<div className="form-check">
											<label className={s.label} htmlFor={grape.id}>
											<input onChange={handleChange} type="checkbox" value={grape.id} id={grape.id} name='grapes'/>
												{grape.grapeName}
											  <span className={s.checkmark}></span>
											</label>
										</div>
									</div>						
								)
							})
						}
					</div>
					<div className= {s.submit}>
						<Button onClick={ handleClick } variant="contained" color="primary" className={classes.button}>
							Publicar
						</Button>
						<Button onClick={ backToList } variant="contained" color="primary" className={classes.button}>
							Atras
						</Button>
					</div>
				</form>
			</div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);

