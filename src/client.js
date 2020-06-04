const findRoomById2 = (id) => {
	let status; 
	fetch('/room/'+id)
		.then((res)=> {
			// console.log(res)
			status = res.status;
			console.log('res');
			console.log(res);				
			return res.json()
		})
		.then((jsonData) => {
			console.log('jsonData');
			console.log(jsonData);
			console.log('status');
			console.log(status);
		})
		.catch((err) => {
			console.error(err);
		})
}

const findRoomById = (id) => {
	return fetch('/room/'+id, {
		method: 'get',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(checkStatus)
		.then(parseJSON)
		// .then(success);
}

const createRoom = (room) => {
	return fetch('/room/create', {
		method: 'post',
		body: JSON.stringify(room),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	}).then(checkStatus)
}

const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = new Error(`HTTP Error ${response.statusText}`);
		error.status = response.statusText;
		error.response = response;
		console.log(error);
		throw error;
	}
}

function parseJSON(response) {
	return response.json();
}

export  {findRoomById, createRoom};