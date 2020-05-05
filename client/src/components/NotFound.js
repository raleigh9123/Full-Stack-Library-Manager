import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <div className="bounds grid-33 centered">
                <h1>Page Not Found</h1>
                <p>Sorry! We couldn't find the page you are looking for.</p>
                <Link to="/courses"><button className="button">Return to Courses</button></Link>
            </div>
        </div>
    );
};