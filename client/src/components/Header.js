import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default ({context}) => {
    const authUser = context.authenticatedUser;
    return (
        <div className="header">
            <div className="bounds">
                <Link to="/courses">
                    <h1 className="header--logo">Courses</h1>
                </Link>
                <nav>
                    {authUser 
                    ? <React.Fragment>
                        <span>Welcome, {authUser.firstName}</span>
                        <Link className="signout" to="/signout">Sign Out</Link>
                      </React.Fragment>
                    : <React.Fragment>
                        <NavLink className="signup" to="/signup" >Sign Up</NavLink> 
                        <NavLink className="signin" to="/signin" >Sign In</NavLink>
                      </React.Fragment>}
                </nav>
            </div>
        </div>
    )
};