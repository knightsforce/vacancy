import { push } from 'react-router-redux'

export function filterOut(value) {
	return (dispatch)=>{
		value ? dispatch(push(`/vacancies/`)) : dispatch(push(`/vacancies/?assignee`));
	}
}

export function manageVacancy(data, isCreate) {
	return {
		type: (isCreate) ? 'CREATE_VACANCY' : 'EDIT_VACANCY',
		payload: {
			data,
		}
	}
}