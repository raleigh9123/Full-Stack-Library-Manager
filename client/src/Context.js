import React, { Component } from 'react';
import Utility from './Utility';
// Add Cookies to Persist User Authentication

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: null
  };

  constructor() {
    super();
    this.utility = new Utility();
  }

  render() {
    const { authenticatedUser } = this.state;
    
    const value = {
        authenticatedUser,
        utility: this.utility,
        actions: {
          signIn: this.signIn,
        },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  signIn = async(emailAddress, password) => {
      const user = await this.utility.getUser(emailAddress, password);
      console.log(user);
      
      if(user) {
        this.setState(() => {
          return {
            authenticatedUser: user
          }
        })
      }

      return user
  }

}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

