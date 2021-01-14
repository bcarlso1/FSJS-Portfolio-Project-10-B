import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UpdateCourse extends Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
}
  
  render() {

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
  } = this.state;

  console.log(this.state)

    return(

      <div class="bounds course--detail">
      <h1>Create Course</h1>
      <div>
        <div>
          {/* <h2 class="validation--errors--label">Validation errors</h2>
           <div class="validation-errors">
            <ul>
              <li>Please provide a value for "Title"</li>
              <li>Please provide a value for "Description"</li>
            </ul> 
          </div> */}
        </div>
        <form>
          <div class="grid-66">
            <div class="course--header">
              <h4 class="course--label">Course</h4>
              <div>
                <input id="title" name="title" type="text" class="input-title course--title--input" placeholder="Course title..." onChange={this.change} 
                 />
              </div>
              <p>By Joe Smith</p>
            </div>
            <div class="course--description">
              <div><textarea id="description" name="description" class="" placeholder="Course description..." onChange={this.change}></textarea></div>
            </div>
          </div>
          <div class="grid-25 grid-right">
            <div class="course--stats">
              <ul class="course--stats--list">
                <li class="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div><input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input"
                      placeholder="Hours" onChange={this.change} /></div>
                </li>
                <li class="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div><textarea id="materialsNeeded" name="materialsNeeded" class="" placeholder="List materials..." onChange={this.change} ></textarea></div>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid-100 pad-bottom"><button class="button" type="submit" onClick={this.submit}>Create Course</button>
          <button class="button button-secondary"><Link to="/">Cancel</Link></button></div>
        </form>
      </div>
    </div>

    )

  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
        return {
            [name]: value  // why this syntax
        };
    });
    }

    submit = (e) => {
        e.preventDefault();
        const { context } = this.props;
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const userId = this.props.context.authenticatedUser.user[0].id;
        const emailAddress = this.props.context.authenticatedUser.user[0].emailAddress;
        const password = this.props.context.currentPassword;
        console.log(emailAddress);
        console.log(password);
        this.props.context.data.createCourse(emailAddress, password, title, description, estimatedTime, materialsNeeded, userId)
        .then(() => {
            // this.props.history.push('/');
            window.location.href = '/';
        });  
        console.log('Successful update');
      
    }

      cancel = (e) => {
          e.preventDefault();
          this.props.history.push(`/`);
      }

}
    




  
 

       