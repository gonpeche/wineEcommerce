import React from 'react';
import s from '../containers/NewCategoryContainer/styles.css'

export default ({ handleChange, handleSubmit }) => {
	return (
		<form className={s.formCreateCategory}>
			<div className= { s.botones }>
				<input onChange={ handleChange } name='cellars' type="text" placeholder="Introduce el nombre de la bodega"/>
				<button onClick={ handleSubmit } name='cellars'>Agregar bodega</button>

				<input onChange={ handleChange } name='lines' type="text" placeholder="Introduce el nombre de la línea"/>
				<button onClick={ handleSubmit } name='lines'>Agregar línea</button>

				<input onChange={ handleChange } name='grapes' type="text" placeholder="Introduce el nombre de la cepa"/>
				<button onClick={ handleSubmit } name='grapes'>Agregar cepa</button>
			</div>
		</form>
	)
}