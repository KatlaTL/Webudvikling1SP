const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url, options = {}) {
    const requestOptions = {
        method: 'GET',
        ...options
    };
    console.log(requestOptions)
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body, headers = {}) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, options = {}) {
    const body = options.body || {}
    const headers = options.headers || {}
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, options = {}) {
    const requestOptions = {
        method: 'DELETE',
        ...options
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper function
function handleResponse(response) {
    console.log(response)
    if (!response.body) return null;
    return response.json().then(data => {   
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}