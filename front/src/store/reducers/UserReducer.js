import { LOG_A_USER, LOGOUT_USER, FETCH_USERS } from '../constants';
const initialState = {}

export default (state = initialState, action) => {
	switch(action.type){
			
		case LOG_A_USER:
			return Object.assign({}, state, action.user);   
		
		case LOGOUT_USER:
			return Object.assign({}, state, action.user);   
		
		case FETCH_USERS:
			return Object.assign({}, state, { allUsers : action.allUsers });
		
		default:
			return state;
	}
}


