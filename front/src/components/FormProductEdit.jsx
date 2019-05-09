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
    const { 
						selectedCellar, 
						selectedLine, 
						handleSubmit, 
						classes, 
						state, 
						handleChange, 
						allGrapes, 
						checkValue, 
						wrongCellar, 
						wrongLine, 
						selectedProduct, 
						allCellars, 
						allLines,
						backToList } = this.props;
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
						value= { state.productName || selectedProduct.productName }
						onChange={handleChange}
						margin="normal"
						name='productName'
						onBlur= {checkValue}
					/>
					<TextField
						id="standard-name"
						label="Año"
						fullWidth
						value= { state && state.year || selectedProduct && selectedProduct.year || ''}
						onChange={handleChange}
						margin="normal"
						name='year'
					/>
					<TextField
						id="standard-name"
						label="Nombre imagen"
						fullWidth
						value= { state && state.image || selectedProduct && selectedProduct.image || ''}						
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
						value= { state && state.description || selectedProduct && selectedProduct.description || ''}						
						onChange={handleChange}
						name='description'
					/>
					<TextField
						id="standard-number"
						label="Precio"
						value= { state && state.price || selectedProduct && selectedProduct.price || ''}						
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
						value= { state && state.stock || selectedProduct && selectedProduct.stock || ''}						
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
						name='cellarId'
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
						<option value={ selectedCellar.id } hidden>{ selectedCellar.cellarName }</option>
						{
							allCellars[0] && allCellars.map(cellar => (
							<option key={cellar.id} value={cellar.id}>
								{cellar.cellarName}
							</option>
							))
						}				
					</TextField>
					<span className={s.alert}>{ wrongCellar }</span>


					<TextField
						onBlur= {checkValue}
						onChange= {handleChange}
						name= 'lineId'
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
						<option value={ selectedLine.id } hidden>{ selectedLine.lineName }</option>
						{
							allLines[0] && allLines.map(line => (
							<option key={line.id} value= {line.id}>
								{line.lineName}
							</option>
							))
						}				
					</TextField>
					<span className={s.alert}>{ wrongLine }</span>

					<div className={s.checkbox}>
						<div className={s.header}>
							<h3>Tipos de uva</h3>
						</div>
						{
							allGrapes[0] && allGrapes.map(grape => {
								return (
									<div key= {grape.id}>
										<div className="form-check">
											<label className={s.label} htmlFor={grape.id}>
											<input 
												defaultChecked= { grape.check }
												onChange={handleChange} 
												type="checkbox" 
												value={ JSON.stringify(grape) } 
												id={grape.id} 
												name='grapes'/>
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
						<button className={s.btnBack} onClick= { backToList }>Listado</button>
						<Button onClick={ handleSubmit } variant="contained" color="primary" className={classes.button}>
							Actualizar
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

