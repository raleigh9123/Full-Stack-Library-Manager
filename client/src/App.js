import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import withContext from './Context';

import './styles/global.css';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import NotFound from './components/NotFound';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UpdateCourse from './components/UpdateCourse';

const CoursesContext = withContext(Courses);
const CreateCourseContext = withContext(CreateCourse);

export default () => (
  <Router>
    <div>
      <Route path="/" component={Header} />
      <Switch>
        <Route exact path="/courses" component={CoursesContext} />
        <Route path="/courses/new" component={CreateCourseContext} />
        <Route path="/courses/:courseId" component={CourseDetail} />
        <Route path="/courses/:courseId/update" component={UpdateCourse} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  </Router>
)