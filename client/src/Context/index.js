import React, { Component } from 'react';
import Data from '../Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

// Context file has info to send across components

export class Provider extends Component {

  constructor() {
    super();
    // state accessible by any component connected with context
    this.state = {
        // courseList: [],
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        currentPassword: Cookies.getJSON('currentPassword') || null,
        
      };
    this.data = new Data(); // this.data is new instance of Data class
}

// This code is no longer necessary I believe-

// componentDidMount() {
//     this.performSearch();
//     // 
// }

// performSearch = () => {
//     fetch(config.apiUrl + '/courses/')
//     .then(response => response.json())
//     .then(responseData => {
//         this.setState({
//             courseList: responseData.courses
//         })
//     })
// }

  render() {

    
    const value = {
        authenticatedUser: this.state.authenticatedUser,
        data: this.data,
        currentPassword: this.state.currentPassword,
        actions: { 
          signIn: this.signIn,
          signOut: this.signOut,
          signInCheck: this.signInCheck,
     
        }
      };
      // set const value with info from state to be passed as props to context
      
    return (    
      <Context.Provider value={value}>
        {/* pass context to all children of provider */}
        {/* see withContext below */}
        {this.props.children}
      </Context.Provider>  
    );
  }


  // Data.js getUser, then update state and add cookies
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
      Cookies.set('currentPassword', JSON.stringify(password), { expires: 1 });
    }
    return user;
  }

  

  signInCheck = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user === null) {
      Cookies.remove('authenticatedUser');
      Cookies.remove('currentPassword');
      
      this.setState(() => {
        return {
          authenticatedUser: null,
          currentPassword: null,
        };
      });

      
    }
  }

  // remove cookies and auth user from state
  signOut = () => {
    this.setState({ authenticatedUser: null, currentPassword: null })
    Cookies.remove('authenticatedUser');
    Cookies.remove('currentPassword');
  }

}

// withContext higher order fxn
// set anything with withContext as a child of Context- receives its props
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
  
