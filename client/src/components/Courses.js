import React, { Component } from 'react';
import Course from './Course';
import { Link } from 'react-router-dom';

export default class Courses extends Component {
   
    // initialize courseList state
    state = {
        courseList: ""
    }



    componentDidMount() {
        const { context } = this.props;

        if (context.authenticatedUser !== null) {
            const emailAddress = context.authenticatedUser.user[0].emailAddress;
            const password = context.currentPassword;
           
            context.actions.signInCheck(emailAddress, password)
        }
        

        context.data.getAllCourses() 
        // getAllCourses from Data.js
        // set State value as all courses info
      .then( courses => {
          this.setState( prevState => {
              return {
                  courseList: courses.courses
              }
          })
       
      }).catch((errors) => {
        console.log(errors);
        this.props.history.push('/error');
    });

   };
   
   
    render() {   
        
       
        let results = this.state.courseList;
        let coursesObject = [];
        // build courses array with for loop  through each result in state
        for (var i = 0; i < results.length; i++) {
            coursesObject[i] = 
            
                 <Course
                    title={results[i].title}
                    id={results[i].id}
                    key={results[i].id}
                />  
                
            
        }
      

            return (
                    
                <div className="bounds">   
                    {coursesObject}  
                    {/* courses populate from object */}
                    
                
                <div className="grid-33">
                        <Link to="/courses/create" className="course--module course--add--module">
                            <h3 className="course--add--title">
                                {/* svg icon */}
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                </svg>
                            New Course</h3>
                        </Link>
                    </div>
                </div>
            )

    }
     
}

 