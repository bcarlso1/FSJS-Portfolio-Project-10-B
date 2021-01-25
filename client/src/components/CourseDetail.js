import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {

// initialize state
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: null
    }

componentDidMount() { // on page load
       
        const courseId = this.props.match.params.id; 
            // set courseId = params from URL
        this.props.context.data.getCourse(courseId) 
            // getCourse function from Data.js, sending URL parameter
            .then( course => {
                    if(course.course.length < 1) {
                        this.props.history.push('/notfound');
                        // if nothing returned, return not found
                    } else {
                        // set state with info from retrieved course
                        this.setState(() => {
                            return { 
                                title: course.course[0].title,
                                // add * for React Markdown bulleted list
                                description: `* ${course.course[0].description}`,
                                estimatedTime: course.course[0].estimatedTime,
                                materialsNeeded: `* ${course.course[0].materialsNeeded}`,
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
        
    }

    render() {        
                return (
                    <div>
                         <div className="actions--bar">
                        <div className="bounds">
                             <div className="grid-100">
                            {
                                // if there is an auth user and its id matches the teacher, show update/delete buttons
                                 this.props.context.authenticatedUser !== null && this.props.context.authenticatedUser.user[0].id === this.state.teacherId  ?
                               
                                   <React.Fragment>
                                        <Link   
                                            to={{
                                                pathname:`/courses/${this.props.match.params.id}/update`
                                                }}
                                            >
                                            <div className="button">Update Course</div>
                                        
                                        </Link>
                                        <Link 
                                            onClick={this.delete}
                                            to="/"
                                        >
                                            <div className="button">Delete Course</div>
                                        </Link>
                                    </React.Fragment>
                                    
                                    : null
                                   
                            }
                                <Link className="button button-secondary" to="/">Return to List</Link>
                            </div>
                        </div>
                        </div>
                        <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                {/* Pull course info from state to populate page */}
                                <h3 className="course--title">{ this.state.title }</h3> 
                                    <p>By { this.state.teacherFirstName } { this.state.teacherLastName }</p>  
                            </div>
                            <div className="course--description">
                            {/* syntax for react markdown */}
                            <ReactMarkdown  source={this.state.description}>
                               
                            </ReactMarkdown>
                            
                            </div>
                    
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{ this.state.estimatedTime }</h3>
                                </li>
                                <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ReactMarkdown  source={this.state.materialsNeeded}>
                                        
                                </ReactMarkdown>
                            
                               
                                </li>
                            </ul> 
                            </div> 
                        </div>
                        </div>                         
                    </div>
          
                )
    
            }
    
        

        delete = () => {
            const { context } = this.props; // instead of this.props.context
           
            const courseId = this.props.match.params.id;
            const emailAddress = context.authenticatedUser.user[0].emailAddress;
            const password = context.currentPassword;
          
            context.data.deleteCourse(courseId, emailAddress, password)
            // delete function from data.js
                .then(() => {
                    window.location.href = '/';
                }).catch((errors) => {
                    console.log(errors);
                    this.props.history.push('/error');
                });  
          
        }
    
    }
   



