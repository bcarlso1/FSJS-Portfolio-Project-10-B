import React, { Component } from 'react';
import Data from '../Data';
import config from '../components/config';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.state = {
        courseList: [],
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        currentPassword: null,
      
      };
    this.data = new Data(); // this.data is new instance of Data class
}

componentDidMount() {
    this.performSearch();
}

performSearch = () => {
    fetch(config.apiUrl + '/courses/')
    .then(response => response.json())
    .then(responseData => {
        this.setState({
            courseList: responseData.courses
        })
    })
}

  render() {

    
    const value = {
        authenticatedUser: this.state.authenticatedUser,
        courseList: this.state.courseList,
        data: this.data,
        currentPassword: this.state.currentPassword,
        actions: { 
          signIn: this.signIn,
          signOut: this.signOut,
     
        }
      };
      
    return (    
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          currentPassword: password,
        };
      });

      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null })
    Cookies.remove('authenticatedUser');
  }

}

// withContext higher order fxn
  export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }
  
  export const Consumer = Context.Consumer;
  
