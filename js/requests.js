
const URL = 'https://ajax.test-danit.com/api/v2/cards/'

export default class Requests {
    static enter(object) {
        return fetch(URL+"login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
        .then(response => response.text())
    }

	static get(entity, token) {
		return fetch(URL + entity, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json());
	}

    static post(object, token) {
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(object)
        }).then(response => response.json());
    }

	static put(object, id, token) {
		return fetch(URL + id, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(object),
        }).then(response => response.json());
	}

	static delete(id, token) {
		return fetch(URL + id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            },
		})
	}
}
