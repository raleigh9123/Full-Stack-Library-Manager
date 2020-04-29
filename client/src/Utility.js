const apiBaseUrl = { baseURL: 'http://localhost:5000/api' }

export default class Utility {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = apiBaseUrl.baseURL + path;

        const options = {
            method,
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
          };
        if(body!== null) {
            options.body = JSON.stringify(body)
        }

        if(requiresAuth) {
            const encodedCredentials = btoa(credentials.username + ':' + credentials.password)

            options.headers['Authorization'] = `Basic ${encodedCredentials}`;

        }

        return fetch(url, options)
     }

    createCourse = async(course) => {
        const response = await this.api("/courses", "POST", course);
        if(response.status === 201) {
            return {success: true};
        } else if(response.status === 400 || response.status === 401) {
            return response.json().then(data => {
                return data
            })
        } else {
            throw new Error();
        }
    }
    
    updateCourse = async(course) => {
        const id = course.id;
        const response = await this.api(`/courses/${id}`, "PUT", course);
        if(response.status === 204) {
            return [];
        } else if(response.status === 400 || response.status === 401) {
            return response.json().then(data => {
                return data
            })
        } else {
            throw new Error();
        }
    }

    deleteCourse = async(id) => {
        const response = await this.api(`/courses/${id}`, "DELETE");
        if(response.status === 204) {
            return [];
        } else {
            throw new Error();
        }
    }

    createUser = async(user) => {
        //Ensure all emails stored within database are lowercase
        user.emailAddress = user.emailAddress.toLowerCase()
        
        const response = await this.api("/users", "POST", user);
        
        if(response.status === 201) {
            return {success: true}
        } else if (response.status === 400 || response.status === 401) {
            return response.json().then(data => {
                console.log(data);
                
                return data
            })
        } else {
            throw new Error();
        }
    }

    getUser = async(username, password) => {
        username = username.toLowerCase();
        const response = await this.api('/users', 'GET', null, true, {username, password})
        if(response.status === 200) {
            return response.json().then(data=>data)
        } else if(response.status === 400 || response.status === 401) {
            return response.json().then(data => {
                return data
            })
        } else {
            throw new Error();
        }
    }
    
}