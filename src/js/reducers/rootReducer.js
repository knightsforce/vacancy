import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import vacancies from './vacancies';
import users from './users';

let rootReducer = combineReducers({
	routing: routerReducer,
	vacancies,
	users,
});

export default rootReducer;