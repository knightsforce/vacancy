import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


import { manageVacancy } from '../actions/vacancies';

function mapStateToProps(state) {
	return {
		users: state.users,
		vacancies: state.vacancies,
		routing: state.routing,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		manageVacancy: (data, isCreate) => dispatch(manageVacancy(data, isCreate))
	}
}






class Vacancy extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {
			match,
			users,
			vacancies,
			routing,
		} = this.props;

		let id = match.params.id,
			path = routing.location.pathname,
			vacancy;

		vacancies.forEach((item, i)=>{
			if(item.id == id) {
				vacancy = item;
				return;
			}
		});

		if(path.includes('/edit')) {
			return <EditVacancy users={users} id={id} vacancy={vacancy} manageVacancy={this.props.manageVacancy}/>
		} else if(path.includes('/create')) {
			return <EditVacancy users={users} search={routing.location.search} create={true} lastId={vacancies[vacancies.length-1].id} manageVacancy={this.props.manageVacancy}/>
		} else if(!vacancy) {
			return <div>Вакансия не найдена</div>;
		}

		return (
			<VacancyDescription users={this.props.users} vacancy={vacancy}/>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vacancy));

function VacancyDescription({users, vacancy}) {
	let assignees = vacancy.assignees,
		str = '';

	for(let i = 0, count=assignees.length; i<count; i++) {
		for(let key in users) {

			if(assignees[i] == users[key].id) str+='; '+users[key].name;
		}
	}

	return (
		<div>
			<p><b>id</b>: {vacancy.id}</p>
			<p><b>Название</b>: {vacancy.title}</p>
			{(str) ? <p><b>Ответственные</b>: {str.slice(1)}</p> : null}
			<p><b>Описание</b>: {vacancy.description}</p>
		</div>
	)
	
}

class EditVacancy extends Component {
	constructor(props) {
		super(props);

		let vacancy = props.vacancy,
			obj = null,
			ids = {},
			search = this._getSearchId();

		if(vacancy) {
			let assignees = vacancy.assignees;
			if(assignees) {
				for(let i=0, count=assignees.length; i<count; i++) {
					ids[assignees[i]] = true;
				}
			}

		}
		
		if(props.create) {
			props.search && (ids[search] = true);
			obj = {
				title: '',
				description: '',
				visible: false,
				ids: ids,
			}

		} else {;
			obj = {
				title: vacancy.title || 'Вакансия'+Math.random(),
				description: vacancy.description || '',
				visible: false,
				ids: ids,
			}
		}

		this.state = obj;
		obj = null;
		ids = null;

		this._renderItems = this._renderItems.bind(this);
		this._getSearchId = this._getSearchId.bind(this);
		this._onClick = this._onClick.bind(this);
		this._onClickSave = this._onClickSave.bind(this);

		this._onChangeTitle = this._onChangeTitle.bind(this);
		this._onChangeDescription = this._onChangeDescription.bind(this);
		this._onClickItem = this._onClickItem.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		let props = nextProps;
		let vacancy = props.vacancy,
			obj = null,
			ids = {},
			search = this._getSearchId();

		if(vacancy) {
			let assignees = vacancy.assignees;
			if(assignees) {
				for(let i=0, count=assignees.length; i<count; i++) {
					ids[assignees[i]] = true;
				}
			}

		}
		
		if(props.create) {
			props.search && (ids[search] = true);
			obj = {
				title: '',
				description: '',
				visible: false,
				ids: ids,
			}

		} else {;
			obj = {
				title: vacancy.title || 'Вакансия'+Math.random(),
				description: vacancy.description || '',
				visible: false,
				ids: ids,
			}
		}

		this.setState(obj);
		obj = null;
		ids = null;

	}

	_getSearchId() {
		let search = this.props.search; 
		if(/assignee=\d+/.test(search)) {
			search = search.split('');
			let length = search.length;
			if(search[length-1]-0) search = search[length-1];
			else if(search[length-2]-0) search = search[length-2];
			length = null;
		}
		return search;
	}

	_onClick() {
		this.setState((prevState)=>{
			return {visible: !prevState.visible};	
		})
	}

	_onClickSave() {
		
		let {
			ids,
			title,
			description,
		} = this.state,
			create = this.props.create,
			assignees = [];

		for(let key in ids) {
			if(ids[key]) assignees.push(key-0);
		}

		if(!title) {
			alert("Заполните заголовок!");
			return;
		}
		return;
		this.props.manageVacancy({
			id: create ? this.props.lastId+1 : this.props.id-0,//Math.random().toFixed(5).slice(2)-0,
			title: title,
			assignees: assignees,
			description: description,
		}, create);
	
	}

	_onChangeTitle(e) {
		this.setState({title: e.target.value});
	}

	_onChangeDescription(e) {
		this.setState({description: e.target.value});
	}

	_onClickItem(id) {
		return (e)=>{
			let ids = null;
			this.setState((prevState)=>{
				ids = prevState.ids;
				ids[id] = !ids[id];
				return {ids: ids};
			});
		}
	}

	_renderItems(users, assignees, ids) {
		let id, names ='',
		{ create } = this.props;
		let search = this._getSearchId();
		users = users.map((item, i)=>{
			id = item.id;
			
			if(create && id == search) names = '; '+item.name;
			else {
				assignees.find((elem)=>{
					if(elem == item.id) {
						names+='; '+item.name; 
						return elem;
					}
				});
			}
			
			return(
				<li key={item.id}
					className={`select-block-list-item${ids[id] ? ' active' : ''}`}
					onClick={this._onClickItem(item.id)}
				>
					{item.name}
				</li>
			);

		});

		return (
			<div className = 'select-block'>
				<p onClick={this._onClick} className='select-block-values'>{(names) ? names.slice(1) : "Выберите ответственного"}</p>
				<ul className={`select-block-list${this.state.visible ? ' visible' : ''}`}>
					{users}		
				</ul>
			</div>
		);
	}

	render() {
		let {
			users,
			vacancy
		} = this.props;

		return (
			<form>
				<input placholder='Название' value={this.state.title} onChange={this._onChangeTitle}/>
				
					{this._renderItems(users, (vacancy) ? vacancy.assignees : [], this.state.ids)}
				
				<textarea onChange={this._onChangeDescription} value={this.state.description}/>
				<button type='button' className='button-filter' onClick={this._onClickSave}>Сохранить</button>
			</form>
		);
	}
}