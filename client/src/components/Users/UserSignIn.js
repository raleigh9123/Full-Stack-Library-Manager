import React from 'react';
import { Link } from 'react-router-dom';

export default class UserSignIn extends React.Component {

    state = {
        emailAddress: '',
        password: '',
    }


    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/courses')
    }

    render() {
        return (
            <div>
                <div className="bounds">
                    <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            <div>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    placeholder="Email Address"
                                    value={this.state.emailAddress}/>
                            </div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}/>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!</p>
                    </div>
                </div>
            </div>
        );
    }
}