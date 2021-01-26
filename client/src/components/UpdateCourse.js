
import React, { Component } from 'react';

export default class UpdateCourse extends Component {


    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        teacherFirstName: '',
        teacherLastName: '',
        teacherId: '',
        errors: []
    }
    // initialize state


componentDidMount() {
        const courseId = this.props.match.params.id;
            // match URL parameter
        this.props.context.data.getCourse(courseId) 
            // getCourse from Data.js
            .then( course => {
                    if(course.course.length < 1) {
                        this.props.history.push('/notfound');
                        // go to notfound if no course matching ID supplied
                    } else if (this.props.context.authenticatedUser.user[0].id !== course.course[0].teacher.id) {
                       // blocked if trying to update course where teacher id doesn't match user ID
                        this.props.history.push('/forbidden');
                    } else {
                        console.log(course);

                        // if all ok, set State to match all course info from getCourse
                        
                        this.setState(() => {
                            return { 
                                title: course.course[0].title,
                                description: course.course[0].description,
                                estimatedTime: course.course[0].estimatedTime,
                                materialsNeeded: course.course[0].materialsNeeded,
                                teacherFirstName: course.course[0].teacher.firstName,
                                teacherLastName: course.course[0].teacher.lastName,
                                teacherId: course.course[0].teacher.id
                            }
                        })
            }
        }) .catch((errors) => {
            console.log(errors);
            this.props.history.push('/error');
        });
      
    // this.onLoad(); 
}

// Pretty sure this code is not needed any more- not sure why I had it

// onLoad = () => {
//     this.setState(() => {
//         return {
//             title: document.getElementById('title').value,
//             description: document.getElementById('description').value,
//             estimatedTime: document.getElementById('estimatedTime').value,
//             materialsNeeded: document.getElementById('materialsNeeded').value
//         };
//     });
// }


    render() {

        const {
            errors
        } = this.state;
        
    
            return (
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    <div>
                        <form>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                   {/* show errors if not meeting requirements */}
                                    <ErrorsDisplay errors={errors} />   
                                     </div>
                                    <div>
                                        {/* each input has onchange which updates state and pulls value from state */}
                                        <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                        value={this.state.title} onChange={this.change} />
                                    </div>
                                    <p>By {this.state.teacherFirstName} {this.state.teacherLastName}</p>
                                </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description} onChange={this.change}  >
                
                                </textarea></div>
                            </div>
                            </div>
                            <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                        placeholder="Hours" value={this.state.estimatedTime} onChange={this.change}  />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.change}  >

                                    </textarea></div>
                                </li>
                                </ul>
                            </div>
                            </div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.submit} >Update Course</button>
                            <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
    

    );
}

    change = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        if (value === "") {
            value = null; // makes sure if empty then it is flagged as invalid if required field
        }
        this.setState(() => {
            return {
                [name]: value  
            };
        });
    
};

    submit = (e) => {
        e.preventDefault();
        const { context } = this.props;
        // set up all parameters needed for updateCourse function
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        
        const courseId = this.props.match.params.id;
        const userId = context.authenticatedUser.user[0].id;
        const emailAddress = context.authenticatedUser.user[0].emailAddress;
        const password = context.currentPassword;
        
         context.data.updateCourse(courseId, emailAddress, password, title, description, estimatedTime, materialsNeeded, userId) 
            // call update course from Data.js
        .then( errors => {
                 if (errors.length) {
                    console.log(errors);
                    const list = [];
                    for (var i = 0; i < errors.length; i++) {
                      list.push(errors[i].message)
                      this.setState({
                        errors: list,
                      })
                    }
                    // update errors which will display through ErrorsDisplay function (bottom)
               
             } else {
              
             window.location.href = '/';
               console.log('Successful update');
              }
      
    }).catch((errors) => {
        console.log(errors);
        this.props.history.push('/error');
    });
     }


    cancel = (e) => {
        e.preventDefault();
        this.props.history.push(`/courses/${this.props.match.params.id}`);
        // go back to prev page (course detail)
    }

}

function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;
  
    if (errors.length) {
      errorsDisplay = (
            <div>
              <h2 class="validation--errors--label">Validation errors</h2>
              <div class="validation-errors">
                <ul>
                 
                { errors.map((error, i) => <li key={i}> {error} </li>)}   
                  
                </ul>
              </div>
            </div>
      )
    }

    return errorsDisplay;

};
        

  


