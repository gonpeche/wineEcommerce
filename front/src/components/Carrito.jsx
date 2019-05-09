import React from 'react';
import { Link } from 'react-router-dom'

import s from '../containers/Cart/styles.css'


export default ({user, order, handleClickCart, handleRemoveProduct, handleDeleteProduct, handleClickEmpty }) => {
var total = 0;
	return(
		<div className={s.carritoContainerFluid}>
			<div className={s.carritoContainer}>
				<table>
					<thead>
							<tr>
									<th><span>Producto</span></th>
									<th><span>Cantidad</span></th>
									<th><span>Subtotal</span></th>
									<th><button className={s.eliminarCarrito} onClick={()=> handleClickEmpty(user)}>Vaciar carrito</button></th>
							</tr>
					</thead>
					<tbody>
						{ 
							order.length > 0 && order.map(producto => {    
								return( 
									<tr key={producto.product.id}>
										<th>
											<div>
												<h2>{producto.product.productName} </h2>
												<h3>Uvas: <span>Malbec Cabernet</span></h3>
											</div>
										</th>
										<th>
											<button className={s.sumarRestar} onClick={() => handleRemoveProduct(producto.product, user)}>-</button>
											<p>{producto.cantidad}</p> 
											<button className={s.sumarRestar} onClick={() => handleClickCart(producto.product, user)}>+</button>
										</th>
										<th>
											{ producto.product.price * producto.cantidad }
										</th>
										<th>
											<button className={s.eliminarCarrito} onClick={()=>handleDeleteProduct(producto.product, user)}>Eliminar Producto</button>
										</th>
								</tr>
								)
							})
						}  
						<tr className={s.trfinal}>
							<th>
								<div></div>
							</th>
							<th></th>
							<th></th>
							<th>
								{			
									order.length > 0 && order.map(producto => {    
										total+= producto.product.price * producto.cantidad
									})
								}
								<b> Total:  ${total}</b>
							</th>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={s.carritoFooter}>
				<div className={s.carritoFooterCheckout}>
					<div className={s.footerLeft}>
						<Link to ="/" > <button className={s.btnBack} >Back to shopping</button></Link>
					</div>
					<div className={s.footerRight}>
						<Link to={`/checkout`} className={s.btnCheckout}> Checkout </Link>
					</div>
				</div>
			</div>
		</div>
	)
}