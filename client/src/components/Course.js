import React from 'react';
import { Link } from 'react-router-dom';

// creates each individual course- gets props from 'courses'

const Course = (props) => (
    <div className="grid-33">
        <h4 className="course--label">Course</h4>
        <Link   
            to={{
                pathname:`/courses/${props.id}`
            }}
            // links to course detail page
            className="course--module course--link"
        >
          <h3 className="course--title">{props.title}</h3>  
        </Link>
  </div>
 
);

export default Course;