import React, { Component } from 'react';
// import { Consumer } from '../Context'
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { render } from 'react-dom';

export default class CourseDetail extends Component {

  

    render() {


        const results = this.props.context.courseList;               
        let courseDetail = results.filter(course => course.id.toString() === this.props.match.params.id.toString());
                   
                return (
                    <div>
                        <div class="actions--bar">
                        <div class="bounds">
                            <div class="grid-100">
                            {
                                this.props.context.authenticatedUser.user[0].id === courseDetail[0].teacher.id  ?
                                    <React.Fragment>
                                        <Link   
                                            to={{
                                                pathname:`/courses/${this.props.match.params.id}/update`
                                                }}
                                            >
                                            <div className="button">Update Course</div>
                                        
                                        </Link>
                                        <Link onClick={this.delete} >
                                            <div className="button">Delete Course</div>
                                        </Link>
                                    </React.Fragment>
                                    
                                    : null
                                }
                                <Link class="button button-secondary" href="/">Return to List</Link>
                            </div>
                        </div>
                        </div>
                        <div class="bounds course--detail">
                        <div class="grid-66">
                            <div class="course--header">
                                <h4 class="course--label">Course</h4>
                                <h3 class="course--title">{ courseDetail[0].title }</h3>
                                 <p>By { courseDetail[0].teacher.firstName } { courseDetail[0].teacher.lastName }</p> 
                            </div>
                            <div class="course--description">
                            <ReactMarkdown  source={courseDetail[0].description}>
                               
                            </ReactMarkdown>
                            
                            </div>
                    
                        </div>
                        <div class="grid-25 grid-right">
                            <div class="course--stats">
                            <ul class="course--stats--list">
                                <li class="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{ courseDetail[0].estimatedTime }</h3>
                                </li>
                                <li class="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ReactMarkdown  source={courseDetail[0].materialsNeeded}>
                    
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
            const { context } = this.props;
           
            const courseId = this.props.match.params.id;
            const emailAddress = this.props.context.authenticatedUser.user[0].emailAddress;
            const password = this.props.context.currentPassword;
            console.log(password);
            console.log(emailAddress);
            this.props.context.data.deleteCourse(courseId, emailAddress, password)
                .then(() => {
                    // this.props.history.push('/');
                    window.location.href = '/';
                });  
          
        }
    
    }
   

// could add cookie to preserve state to fix refresh issue

