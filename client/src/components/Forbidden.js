import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <div className="grid-33 centered bounds">
                <h1>Forbidden</h1>
                <p>You do not have authorization to access this page. Please login to access this page.<br></br>***NOTE: Courses may only be updated or deleted by course author.***</p>
                <Link to="/signin"><button className="button">Login</button></Link>
                <Link to="/courses"><button className="button button-secondary">Return to Courses</button></Link>
            </div>
        </div>
    );
};