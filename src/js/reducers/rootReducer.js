import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import vacancies from './vacancies';


let rootReducer = combineReducers({
	routing: routerReducer,
	vacancies,
});

export default rootReducer;