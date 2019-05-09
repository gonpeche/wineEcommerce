import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import s from '../../containers/Sidebar/styles.css'


class Grapes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			check: false,
			allLines: [],
		}
	}

	componentDidMount() {
		axios.get('/api/lines/')
			.then(res => { this.setState({ allLines: res.data }) })
	}

	toggleMenu() {
		this.setState(prevState => ({
			check: !prevState.check
		}))
	}

	
	render() {
		const { allLines } = this.state
		const { handleChange } = this.props
		return (
			<div>
				<ul className={s.filtros}>
					<div className={s.categoria}>
						<h3>Líneas</h3>
						<i onClick={() => this.toggleMenu()} className="material-icons">
							{ this.state.check ? "expand_less" : "expand_more" }
						</i>
					</div>
					{
						this.state.check &&
							<form>
								{
									allLines[0] && allLines.map( function (line,i) {
										return (
											<label key={i} htmlFor={line.lineName}>
												<li className={s.filtrosItems}> 
													<input 
														id={line.lineName} 
														className={s.checkbox} 
														onChange={handleChange} 
														type="checkbox" 
														value={JSON.stringify(line)}
													/> 
														{line.lineName}
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


export default connect(null, null) (Grapes);


