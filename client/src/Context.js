import React, { Component } from 'react';
import Utility from './Utility';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

/**
 * Stateful functional class component that wraps Consumer with Provider
 * @state Authenticated User - if logged in, contains user credentials, defaults null
 * @methods
 * @methods
 * * * signIn - Asynchronous function that awaits getUser() function from Utility.js, then sets the AuthenticatedUser state if successful.
 * @returns {Provider Component} - Wraps all children of above Context variable in Provider Component to subscribe consumers to context.
 */
export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.utility = new Utility();
  }

  signIn = async(emailAddress, password) => {
    const user = await this.utility.getUser(emailAddress, password);
    
    if(user) {
      this.setState(() => {
        return {
          authenticatedUser: user
        }
      })

      Cookies.set(
        'authenticatedUser',
        JSON.stringify(user),
        { expires: 1 }
      )
    }

    return user
  }
  
  signOut = () => {
    this.setState(() => { return { authenticatedUser:null }});

    Cookies.remove('authenticatedUser')
  }

  render() {
    const { authenticatedUser } = this.state;
    
    const value = {
        authenticatedUser,
        utility: this.utility,
        actions: {
          signIn: this.signIn,
          signOut: this.signOut
        },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

}


/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component. This wraps a simple component from the application in a <Consumer > component 
 */
export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => 
          <Component 
            {...props} 
            context={context} 
          />
        }
      </Context.Consumer>
    );
  }
}


/**
 * A higher-order component that wraps the provided **withContext** in a user sign-in wall.
 * @param {class} Component - A React component (may also be a wrapped withContext(component) Component from above function ).
 * @returns {function} A higher-order component: Renders the appropriate route with authorization credentials, otherwise redirects to signin/signup page.
 */
export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Context.Consumer>
      {context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/forbidden',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Context.Consumer>
  );
};