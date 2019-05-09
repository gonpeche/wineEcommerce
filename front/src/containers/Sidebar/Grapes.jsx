import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import s from './styles.css'

class Grapes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			check: true,
			allGrapes: []
		}
	}
	componentDidMount() {
		axios.get('/api/grapes/')
			.then(res => { this.setState({ allGrapes: res.data}) })
	}
	
	toggleMenu() {
		this.setState(prevState => ({
			check: !prevState.check
		}))
	}
	render() {
		const { allGrapes } = this.state
		const { handleChange } = this.props
		return (
			<div>
				<ul className={s.filtros}>
					<div className={s.categoria}>
						<h3> Uvas</h3>
						<i onClick={() => this.toggleMenu()} className="material-icons">
							{ this.state.check ? "expand_less" : "expand_more" }
						</i>
					</div>
					{
						this.state.check &&
							<form>
								{
									allGrapes[0] && allGrapes.map( function (uva,i) {
										return (
											<label htmlFor={uva.grapeName} key={i}>
												<li className={s.filtrosItems}> 
													<input 
														id={uva.grapeName} 
														className={s.checkbox} 
														onChange={handleChange} 
														type="checkbox" 
														value={JSON.stringify(uva)}
													/> 
														{uva.grapeName}
													</li>                                  
											</label>
										)
									})
								}
							</form>
					}
				</ul>  
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
    return {
        getProductsBySearchSidebar: function(producto) {
            dispatch(getProductsBySearchSidebar(producto))
        }
    }
}


export default connect(null, mapDispatchToProps) (Grapes);