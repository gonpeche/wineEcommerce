import React from 'react';
import {Link} from 'react-router-dom';
import s from '../containers/AdminPanelContainer/style.css';

export default () => (
	<div className={ s.sidebar2 }>
		<Link to='/orders'>
				<p>Administración de órdenes</p>
				<hr/>
		</Link>
		<Link to='/newproduct'>
				<p>Publicar vino</p>
				<hr/>
		</Link>
		<Link to='/product/edit'>
				<p>Edición de productos</p>
				<hr/>
		</Link>
		<Link to='/newcategory'>
				<p>Crear categorías</p>
				<hr/>
		</Link>
		<Link to='/accounts'>
				<p>Configuración de cuentas</p>
		</Link>
	</div>
)
