import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {withContext, PrivateRoute} from './Context';

import './styles/global.css';

import Header from './components/Header';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

import Courses from './components/Courses/Courses';
import CourseDetail from './components/Courses/CourseDetail';
import CreateCourse from './components/Courses/CreateCourse';
import UpdateCourse from './components/Courses/UpdateCourse';

import UserSignIn from './components/Users/UserSignIn';
import UserSignUp from './components/Users/UserSignUp';
import UserSignOut from './components/Users/UserSignOut';

const HeaderContext = withContext(Header);

const CoursesContext = withContext(Courses);
const CourseDetailContext = withContext(CourseDetail);
const CreateCourseContext = withContext(CreateCourse);
const UpdateCourseContext = withContext(UpdateCourse);

const UserSignInContext = withContext(UserSignIn);
const UserSignUpContext = withContext(UserSignUp);
const UserSignOutContext = withContext(UserSignOut);


export default () => (
  <Router>
    <div>
      <Route path="/" component={HeaderContext} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/courses"/>
        </Route>
        <Route exact path="/courses" component={CoursesContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseContext} />
        <PrivateRoute path="/courses/:courseId/update" component={UpdateCourseContext} />
        <Route path="/courses/:courseId" component={CourseDetailContext} />
        <Route path="/signin" component={UserSignInContext} />
        <Route path="/signup" component={UserSignUpContext} />
        <Route path="/signout" component={UserSignOutContext}/>
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        {/* If Route is not found, render error component render error component */}
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
