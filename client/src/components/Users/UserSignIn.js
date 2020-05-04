import React from 'react';
import { Link } from 'react-router-dom';
import ErrorDisplay from '../ErrorDisplay';

export default class UserSignIn extends React.Component {

    state = {
        username: '',
        password: '',
        errors: false,
    }

    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState(() => {
            return {
                [name]:value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/courses' }}
        const { username, password } = this.state;
        
        context.actions.signIn(username, password)
            .then(user => {
                if(user.emailAddress) {
                    this.props.history.push(from)
                } else if (user) {
                    this.setState(() => {return {errors: user}})
                }
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/error')
            });

    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/courses')
    }

    render() {
        const { errors } = this.state
        return (
            <div>
                <div className="bounds">
                    <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <ErrorDisplay errors={errors} />
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Email Address"
                                    autoComplete="username"
                                    onChange={this.change}
                                    value={this.state.username}/>
                            </div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.change}
                                    autoComplete="current-password"
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