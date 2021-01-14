import config from './components/config';

export default class Data {
  
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
        console.log('not null');
      }

      if (requiresAuth) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials} `;
      }

      return fetch(url, options);
    };

async getUser(emailAddress, password) {
  const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password } );
    // why backticks on users?
  if (response.status === 200) {
    return response.json().then(data => data); // ???
  } else if (response.status === 401) {
    return null;
  } else {
    throw new Error();
  }
}

async createUser(user) {
    const response = await this.api('/users', 'POST', user);
      if (response.status === 201) {
        return []; // empty array
        } else if (response.status === 400) {
          console.log('400!')
          return response.json().then(data => {
            return data.errors // array of errors
          }); 
        } else {
          console.log(response.status);
          //throw new Error();
        }
  }

  async deleteCourse(courseId, emailAddress, password) {
    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 200) {
      return []; // empty array
      } else if (response.status == 401) {
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


  async updateCourse(courseId, emailAddress, password, title, description, estimatedTime, materialsNeeded, userId) {
    const response = await this.api(`/courses/${courseId}`, 'PUT', { "title": title, "description": description, "estimatedTIme": estimatedTime, "materialsNeeded": materialsNeeded, "userId": userId }, true, { emailAddress, password });
    if (response.status === 204) {
      return []; // empty array
      } else {
        console.log(response.status);
        //throw new Error();
      }
  };

  

  async createCourse(emailAddress, password, title, description, estimatedTime, materialsNeeded, userId) {
    console.log('in Data.js');
    const response = await this.api('/courses', 'POST', { "title": title, "description": description, "estimatedTIme": estimatedTime, "materialsNeeded": materialsNeeded, "userId": userId }, true, { emailAddress, password });
    if (response.status === 201) {
      console.log(response.status);
      return []; // empty array
      } else {
        console.log(response.status);
        //throw new Error();
      }
  };

 }