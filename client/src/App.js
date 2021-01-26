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
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

// subscribe components to context
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);
const CoursesWithContext = withContext(Courses);




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
                <Route path="/signout" component={UserSignOutWithContext} />
                <Route exact path="/courses/:id/" component={CourseDetailWithContext} />
                <Route path="/signup" component={UserSignUpWithContext} />
                <Route path="/signin" component={UserSignInWithContext} />
                <Route path="/error" component={UnhandledError} />
                <Route path="/forbidden" component={Forbidden} />
                <Route path="/notfound" component={NotFound} />
                <Route component={NotFound} />
              </Switch>
              
            </BrowserRouter>  
    )
   } 

}
