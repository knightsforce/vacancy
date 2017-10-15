import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router';

import { filterOut } from '../actions/vacancies';

class VacanciesList extends Component {
	constructor(props) {
		super(props);

		this._renderUsers = this._renderUsers.bind(this);
		this._renderVacancies = this._renderVacancies.bind(this);
	}

	_renderUsers() {

		let {
			users,
		} = this.props;

		users = users.map((item, i)=>{
			return(<li key={i}>{item.name}</li>)
		})
		return <ul>{users}</ul>;
	}

	_renderVacancies() {	
		let {
			users,
			vacancies,
		} = this.props,
		assignees,
		result = [],
		str ='';

		for(let key in users) {
			
			for(let j in vacancies) {
				assignees = vacancies[j].assignees;
				if(!assignees || (assignees && !assignees.includes(users[key].id))) continue;
				str+=vacancies[j].title;
			}

			if(str) {
				result.push(<li key={users[key].id}><b>{users[key].name}</b>{': '+str}</li>);
				str='';

			}
		}

		return <ul>{result}</ul>;
	}

	render() {
		let path = this.props.routing.location.search;
		return (
			<div id='vacanciesList'>
				<FilterBlock search={path == '?assignee'} onClickFilter={this.props.filterOut}/>
				{
					path == '?assignee' ? this._renderVacancies() : this._renderUsers() 

				}
			</div>
		);
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VacanciesList));

function mapStateToProps(state) {
	return {
		users: state.users,
		vacancies: state.vacancies,
		routing: state.routing,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		filterOut: (value) => dispatch(filterOut(value))
	}
}





class FilterBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: !!props.search,
		}

		this._onClick = this._onClick.bind(this);
	}

	_onClick() {
		this.setState((prevState)=>{
			return {active: !prevState.active}
		});
		(this.props.onClickFilter) && this.props.onClickFilter(this.props.search);
	}

	render() {
		return (
			<div id='filterBlock'>
				<h3>Фильтры</h3>
				<button
					className={`button-filter${this.state.active ? " reset" : ""}`}
					onClick={this._onClick}
				>
					{this.state.active ? "Отменить" : "Фильтровать"}
				</button>
			</div>
		)
	}
}


//				<input className='input-filter' placeholder='Введите assignee' onChange={this._onChange}/>

//this._onChange = (e) => { this.value=e.target.value}