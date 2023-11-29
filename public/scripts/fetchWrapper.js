const get = (url, options = {}) => {
    const requestOptions = {
        method: 'GET',
        ...options
    };
    return fetch(url, requestOptions).then(handleResponse);
}

const post = (url, options = {}) => {
    const body = options.body || {};
    const headers = options.headers || {};
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

const put = (url, options = {}) => {
    const body = options.body || {};
    const headers = options.headers || {};
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
const _delete = (url, options = {}) => {
    const requestOptions = {
        method: 'DELETE',
        ...options
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper function
const handleResponse = (response) => {
    if (!response.ok) {
        return Promise.reject(`${response.url}: ${response.status} ${response.statusText}`);
    }
    return response.json().catch(err => Promise.reject(err.message));
}

const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};