import React, { Component } from 'react';
import { 
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';


import './App.css';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import NotFound from './components/NotFound';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import withContext from './Context';
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import { withRouter } from 'react-router-dom';

// subscribe components to context
const SignUpWithContext = withContext(SignUp);
const SignInWithContext = withContext(SignIn);
const HeaderWithContext = withContext(Header);
const SignOutWithContext = withContext(SignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);
const CoursesWithContext = withContext(Courses);
const ForbiddenWithContext = withContext(Forbidden);
// subscribe Forbidden to withRouter to get props.history
const ForbiddenWithRouter = withRouter(ForbiddenWithContext);


export default class App extends Component {


  render() {

    return (
            <BrowserRouter>
              <HeaderWithContext />
              <Switch> 
                {/* Switch will go to not found at bottom if no match */}
                <Route exact path="/" component={CoursesWithContext} />
               {/* Private routes only accessible if authenticated */}
                <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
                <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
                <Route path="/signout" component={SignOutWithContext} />
                <Route exact path="/courses/:id/" component={CourseDetailWithContext} />
                <Route path="/signup" component={SignUpWithContext} />
                <Route path="/signin" component={SignInWithContext} />
                <Route path="/error" component={UnhandledError} />
                <Route path="/forbidden" component={ForbiddenWithRouter} />
                <Route component={NotFound} />
              </Switch>
              
            </BrowserRouter>  
    )
   } 

}
