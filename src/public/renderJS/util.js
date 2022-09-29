const backendApi = 'https://jobsbackendheroku.herokuapp.com'

async function request (route, method, body) {

	let response = await fetch(backendApi + route, {
		method: method,
		body: body
	})

	return await response.json()
}

async function req (route, method, body) {

	let response = await fetch(backendApi + route, {
		headers: {
			'Content-Type':'application/json'
		},
		method,
		body: (body instanceof FormData) ? body : JSON.stringify(body)
	})

	if(!(response.status === 200 || response.status === 201)) {
		response = await response.json()
		throw new Error(response.message)
	}

	return await response.json()
}

