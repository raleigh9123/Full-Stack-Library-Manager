import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import withContext from './Context';

import './styles/global.css';

import Header from './components/Header';
import NotFound from './components/NotFound';

import Courses from './components/Courses/Courses';
import CourseDetail from './components/Courses/CourseDetail';
import CreateCourse from './components/Courses/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UpdateCourse from './components/Courses/UpdateCourse';

const CoursesContext = withContext(Courses);
const CreateCourseContext = withContext(CreateCourse);
const UpdateCourseContext = withContext(UpdateCourse);
const CourseDetailContext = withContext(CourseDetail);


export default () => (
  <Router>
    <div>
      <Route path="/" component={Header} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/courses"/>
        </Route>
        <Route exact path="/courses" component={CoursesContext} />
        <Route path="/courses/create" component={CreateCourseContext} />
        <Route path="/courses/:courseId/update" component={UpdateCourseContext} />
        <Route path="/courses/:courseId" component={CourseDetailContext} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" />
        {/* If Route is not found, render error component render error component */}
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
