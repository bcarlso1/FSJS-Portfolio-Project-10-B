
import React, { Component } from 'react';

export default class UpdateCourse extends Component {


    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
    }



componentDidMount() {
    this.onLoad();
}

onLoad = () => {
    this.setState(() => {
        return {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            estimatedTime: document.getElementById('estimatedTime').value,
            materialsNeeded: document.getElementById('materialsNeeded').value
        };
    });
}


    render() {

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        const results = this.props.context.courseList;
        console.log(results);
        let courseDetail = results.filter(course => course.id.toString() === this.props.match.params.id.toString())

    
            return (
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    <div>
                        <form>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                        defaultValue={courseDetail[0].title} onChange={this.change} />
                                    </div>
                                    <p>By {courseDetail[0].teacher.firstName} {courseDetail[0].teacher.lastName}</p>
                                </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" className="" placeholder="Course description..." defaultValue={courseDetail[0].description} onChange={this.change}  >
                
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
                                        placeholder="Hours" defaultValue={courseDetail[0].estimatedTime} onChange={this.change}  />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={courseDetail[0].materialsNeeded} onChange={this.change}  >

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
        const courseId = this.props.match.params.id;
        const userId = this.props.context.authenticatedUser.user[0].id;
        const emailAddress = this.props.context.authenticatedUser.user[0].emailAddress;
        const password = this.props.context.currentPassword;
        this.props.context.data.updateCourse(courseId, emailAddress, password, title, description, estimatedTime, materialsNeeded, userId)
        // this.props.history.push(`/courses/${this.props.match.params.id}`);
        .then(() => {
            // // this.props.history.push('/');
            // window.location.href = '/';
        });  
        console.log('Successful update');
      
    }

    cancel = (e) => {
        e.preventDefault();
        this.props.history.push(`/courses/${this.props.match.params.id}`);
    }

}
        

  


