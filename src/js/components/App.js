import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
//import { syncHistoryWithStore } from 'react-router-redux';
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers/rootReducer';

import VacanciesList from './VacanciesList';
import Vacancy from './Vacancy';



var initState = {

}


const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(rootReducer, initState, applyMiddleware(middleware, thunk));
//const history = syncHistoryWithStore(hashHistory, store);

class App extends Component {
	constructor(props) {
		super(props);
	}
//<Route exact path="/" component={Home}/>
	render() {
		return (
			<div id='app'>
			
			</div>
		);
	}
}

export default connect()(App);

export {store, history};
//export {store, history};