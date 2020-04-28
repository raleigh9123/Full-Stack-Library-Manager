const apiBaseUrl = { baseURL: 'http://localhost:5000/api' }

export default class Utility {
    api(path, method = 'GET', body = null) {
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

        return fetch(url, options)
     }

    async createCourse(course) {
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
    
    async updateCourse(course) {
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

    async deleteCourse(id) {
        const response = await this.api(`/courses/${id}`, "DELETE");
        if(response.status === 204) {
            return [];
        } else {
            throw new Error();
        }
    }

    async createUser(user) {
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

    async getUser(user) {
        console.log(user);

    }

}