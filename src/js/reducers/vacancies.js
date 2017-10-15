export default function vacancies(state=[], action) {
	let payload = action.payload;
	state = [].concat(state);
	switch(action.type) {
		case 'EDIT_VACANCY':
			var	data = payload.data, id = data.id;

			for(let i=0, count = state.length; i<count; i++) {
				if(state[i].id == id) {
					state[i] = data;
					break;
				}
			}
			writeLocalStorage('vacancies', state);
			break;

		case 'CREATE_VACANCY':
			state.push(payload.data);
			writeLocalStorage('vacancies', state);
			break;
	}

	payload = null;
	return state;
}

function writeLocalStorage(key, value) {
	let store = localStorage.getItem('store');
	if(!store) return;
	store = JSON.parse(store);
	store[key] = value;
	localStorage.setItem('store', JSON.stringify(store));
}