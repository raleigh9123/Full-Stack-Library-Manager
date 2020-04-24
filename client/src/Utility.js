const apiBaseUrl = { baseURL: 'http://localhost:5000/api' }

export default class Utility {
    api(path, method = 'GET', body = null) {
        const url = apiBaseUrl.baseURL + path;

        const options = {
            method,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        }

        if(body!== null) {
            options.body = JSON.stringify(body)
        }

        return fetch(url, options)
    }

}