import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CreateCourse extends Component {

  // initialize state, title and description null so trigger error if not populated
  state = {
    title: null,
    description: null,
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
}
  
  render() {

    const {
      errors,
  } = this.state;
  // instead of this.state.errors

    return(

      <div className="bounds course--detail">
      <h1>Create Course</h1>
      <div>
          <ErrorsDisplay errors={errors} />   
        {/* takes errors from state, see function at bottom */}
      </div>
        <form>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.change} 
                 />
              </div>
              {/* fill in user from context */}
              <p>By {this.props.context.authenticatedUser.user[0].firstName} {this.props.context.authenticatedUser.user[0].lastName}</p>
            </div>
            <div className="course--description">
              <div><textarea id="description" name="description" placeholder="Course description..." onChange={this.change}></textarea></div>
              {/* run "onchange" function for any entry */}
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                      placeholder="Hours" onChange={this.change} /></div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.change} ></textarea></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.submit}>Create Course</button>
          <button className="button button-secondary"><Link to="/">Cancel</Link></button></div>
        </form>
      </div>

    )

  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // take name of input and value and use to update state

    this.setState(() => {
        return {
            [name]: value  // why this syntax
        };
    });
    }



  
    submit = (e) => {
        e.preventDefault();
        const { context } = this.props; // this.props.context
       // define all items that will be sent as parameters to createCourse function 
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const userId = context.authenticatedUser.user[0].id;
        const emailAddress = context.authenticatedUser.user[0].emailAddress;
        const password = context.currentPassword;
      
        context.data.createCourse(emailAddress, password, title, description, estimatedTime, materialsNeeded, userId)
            .then( errors => {
              if (errors.length) {
                // create array of errors messages in state with for loop
                // displayed with ErrorsDisplay
                const list = [];
                for (var i = 0; i < errors.length; i++) {
                  list.push(errors[i].message)
                  this.setState({
                    errors: list,
                  })
                }
              console.log(errors);
              } else {
                window.location.href = '/';
                console.log('Successful update');
               }
   
    }).catch((errors) => {
      console.log(errors);
      this.props.history.push('/error');
  });






};

      cancel = (e) => {
          e.preventDefault();
          this.props.history.push(`/`);
          // back to home
      }

    }




    function ErrorsDisplay({ errors }) {
      let errorsDisplay = null;
  
      if (errors.length) {
          errorsDisplay = (
              <div>
                  <h2> Validation Error</h2>
                  <div>
                {/* create li for each error with key prop */}
                    { errors.map((error, i) => <li key={i}> {error} </li>)}   
                  </div>
        
              </div>
          );
      }
  
      return errorsDisplay;
  }