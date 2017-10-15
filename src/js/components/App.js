import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
//import { syncHistoryWithStore } from 'react-router-redux';
import { Route, Redirect, withRouter } from 'react-router';
//import createHistory from 'history/createBrowserHistory'
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers/rootReducer';

import VacanciesList from './VacanciesList';
import Vacancy from './Vacancy';

var initState = localStorage.getItem("store");
if(initState) initState = JSON.parse(initState);
else {
	initState = {
	
		users: [
			{
				"id": 1,
				"name": "Александр Бородин"
			},
			{
				"id": 2,
				"name": "Сергей Пахоруков"
			},
			{
				"id": 3,
				"name": "Екатерина Седых"
			},
			{
				"id": 4,
				"name": "Юлия Ким"
			},
			{
				"id": 5,
				"name": "Александра Фёдорова"
			}
		],

		vacancies: [
			{
				"id": 1,
				"title": "Scala Developer @ Acme",
				"assignees": [
					3
				],
				"description": "5+ лет опыта"
			},
			{
				"id": 2,
				"title": "Android Developer @ Green Robot Studio",
				"assignees": [
					1,
					2
				],
				"description": "Знание Kotlin"
			}

		],
	}
	localStorage.setItem("store", JSON.stringify(initState));
}

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(rootReducer, initState, applyMiddleware(middleware, thunk));
//const history = syncHistoryWithStore(hashHistory, store);

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id='app'>
				{(this.props.location.pathname == '/') ? <Redirect push to='/vacancies/'/> : null}
				<Route exact={true} path="/vacancies/" component={VacanciesList}/>			
				<Route exact={false} path="/vacancies/:id/" component={Vacancy}/>
			</div>
		);
	}
}

export default withRouter(connect()(App));

export {store, history};
//export {store, history};