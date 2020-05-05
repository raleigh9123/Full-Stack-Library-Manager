import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <div className="grid-33 centered bounds">
                <h1>Error</h1>
                <p>Sorry! We just encountered an unexpected error.</p>
                <Link to="/courses"><button className="button button-secondary">Return to Courses</button></Link>
            </div>
        </div>
    );
};