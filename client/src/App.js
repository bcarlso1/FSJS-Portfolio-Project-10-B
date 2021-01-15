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
// import Authenticated from './components/Authenticated';
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';

// const AuthWithContext = withContext(Authenticated);
const SignUpWithContext = withContext(SignUp);
const SignInWithContext = withContext(SignIn);
const HeaderWithContext = withContext(Header);
const SignOutWithContext = withContext(SignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);

export default class App extends Component {


  render() {

    return (
            <BrowserRouter>
              <HeaderWithContext />
              <Switch>
                <Route exact path="/" component={Courses} />
                <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
                <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
                <Route path="/signout" component={SignOutWithContext} />
                <Route exact path="/courses/:id/" component={CourseDetailWithContext} />
                <Route path="/signup" component={SignUpWithContext} />
                <Route path="/signin" component={SignInWithContext} />
                
                <Route path="/forbidden" component={Forbidden} />
                {/* <PrivateRoute path="/authenticated" component={AuthWithContext} />
                <PrivateRoute path="/secret" component={AuthWithContext} /> */}
                <Route component={NotFound} />
              </Switch>
              
            </BrowserRouter>  
    )
   } 

}
