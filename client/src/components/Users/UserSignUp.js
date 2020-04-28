import React from 'react';
import { Link } from 'react-router-dom';
import ErrorDisplay from '../ErrorDisplay';

export default class UserSignUp extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: null,
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

    // handleSubmit is the event handler for the form submission but also includes form submission functions.
    handleSubmit = (e) => {
        e.preventDefault();

        const { context } = this.props
        const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

        const user = { firstName, lastName, emailAddress, password, confirmPassword }
        context.utility.createUser(user)
            .then(errData => {
                if(errData.success) {
                    this.props.history.push('/courses');
                } else if (errData) {
                    this.setState(() => {return {errors: errData}})
                }
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/error')
            })

    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/courses');
    }

    render() {

        const { errors } = this.state;

        return (
            <div>
                <div className="bounds">
                    <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    onChange={this.change}
                                    value={this.state.firstName}/>
                            </div>
                            <div>
                                <input 
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={this.change}
                                    value={this.state.lastName}/>
                            </div>
                            <div>
                                <input 
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    placeholder="Email Address"
                                    onChange={this.change}
                                    value={this.state.emailAddress}/>
                            </div>
                            <div>
                                <input 
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.change}
                                    value={this.state.password}/>
                            </div>
                            <div>
                                <input 
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={this.change}
                                    value={this.state.confirmPassword}/>
                            </div>
                            <ErrorDisplay errors={errors}/>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to='/signin'>Click here</Link> to sign in!</p>
                    </div>
                </div>
            </div>
        );
    }
}