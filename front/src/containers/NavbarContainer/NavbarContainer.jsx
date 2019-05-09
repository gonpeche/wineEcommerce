import React, { Component } from 'react'
import {connect} from 'react-redux'

import Navbar from '../../components/Navbar';
import {logoutUser} from '../../store/actions/UserActions'
import {handleEmptyOrder} from '../../store/actions/OrderActions'
import { getProductsBySearchNavbar } from '../../store/actions/FilterActions';


class NavbarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchNavbar: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
		this.handleHome = this.handleHome.bind(this);
  }

  logOut(e){
    this.props.logoutUser();
    this.props.handleEmptyOrder();
		this.props.history.push('/');
  }
  handleSubmit() {
    let formatSearch = this.state.searchNavbar

    formatSearch = formatSearch.replace(/(\w)(\w*)/g,
      function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});

    this.props.getProductsBySearchNavbar(formatSearch);
  }

  handleChange(e) {
    this.setState({
      searchNavbar: e.target.value,
    });
  }

	handleHome(e){
    this.props.getProductsBySearchNavbar('');
	}

  render() {
    const user = this.props.user
    return (
      <Navbar
      	handleChange= { this.handleChange }
      	handleSubmit= { this.handleSubmit }
      	handleHome = { this.handleHome }
				logOut= { this.logOut }
      	user= { user }
      />
    )
  }
}

function mapStateToProps(state){
    return{ 
        user : state.user,
        filtrosNavbar: state.products.filteredProducts,

    }
};

function mapDispatchToProps(dispatch){
    return{ 
      logoutUser: ()=>{
        dispatch(logoutUser())
    },
      getProductsBySearchNavbar:(nombre)=> {
        dispatch(getProductsBySearchNavbar(nombre))
      },
      handleEmptyOrder:()=>{
        dispatch(handleEmptyOrder())
      }
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(NavbarContainer)





