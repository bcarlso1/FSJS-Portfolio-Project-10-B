import config from './components/config';

export default class Data {
  
  // method for accessing API

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
     const url = config.apiUrl + path;

    const options = {
        method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
  
      if (body !== null) {
        options.body = JSON.stringify(body);
     
      }

      if (requiresAuth) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials} `;
      }

      return fetch(url, options);
    };

    // GET request for user- checks if matches to sign in
async getUser(emailAddress, password) {
  const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password } );

  if (response.status === 200) {
    return response.json().then(data => data); 
  } else if (response.status === 401) {
    return null;
  } else {
    throw new Error();
  }
}

// POST request for user, sign up
async createUser(user) {
    const response = await this.api('/users', 'POST', user);
      if (response.status === 201) {
        return []; // empty array
        } else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors // array of errors
          }); 
        } else {
          console.log(response.status);
          //throw new Error();
        }
  }

// DELETE request for course
  async deleteCourse(courseId, emailAddress, password) {
    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 200) {
      return []; // empty array
      } else if (response.status === 401) {
        return response.json().then(data => {
          console.log(response.status)
          console.log(data)
          return data.errors // array of errors
        
        }); 
      } else {
        console.log(response.status);
        //throw new Error();
      }
  };

  // GET request, get all courses
  async getAllCourses() {
    const response = await this.api(`/courses`, 'GET', null, false, null);
    if (response.status === 200) {
      return response.json().then(data => data);
      } else {
        console.log(response.status);
        throw new Error();
      }
  };

  // GET request for a course with ID
  async getCourse(courseId) {
    const response = await this.api(`/courses/${courseId}`, 'GET', null, false, null);
    return response.json().then(data => data);
        //throw new Error();
  };


// PUT request for course
  async updateCourse(courseId, emailAddress, password, title, description, estimatedTime, materialsNeeded, userId) {
    const response = await this.api(`/courses/${courseId}`, 'PUT', { "title": title, "description": description, "estimatedTIme": estimatedTime, "materialsNeeded": materialsNeeded, "userId": userId }, true, { emailAddress, password });
    if (response.status === 204) {
      console.log('success');
      return []; // empty array
      } else {
        return response.json().then(data => {
          return data.errors // array of errors
        }); 
      }
  };

  // POST request for course
  async createCourse(emailAddress, password, title, description, estimatedTime, materialsNeeded, userId) {
    console.log('in Data.js');
    const response = await this.api('/courses', 'POST', { "title": title, "description": description, "estimatedTime": estimatedTime, "materialsNeeded": materialsNeeded, "userId": userId }, true, { emailAddress, password });
    
    if (response.status === 201) {
      console.log(response.status);
      return []; // empty array
    } else if (response.status === 500) {
      return response.json().then(data => {
        return data.errors // array of errors
      }); 
    } else {
      console.log(response.status);
      //throw new Error();w
    }
};

}