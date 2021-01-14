import React from 'react';
import Course from './Course';
import { Consumer } from '../Context';
import { Link } from 'react-router-dom';

const Courses = () => { 
    return (
        <Consumer>
            { context => {
                const results = context.courseList;
                let courses = results.map(course =>
                        <Course
                            title={course.title}
                            id={course.id}
                            key={course.id}
                        />   
                        );
                console.log(courses);
            
            return (
                    
                <div class="bounds">   
                        {courses} 
                
                    <div className="grid-33" id="new-course">
                        <Link to="/courses/create">
                            <h3 className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                </svg>
                            New Course</h3>
                        </Link>
                    </div>
                </div>
            )

        }}
        </Consumer>

    );
}
    
    export default Courses;