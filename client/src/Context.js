import React, { Component } from 'react';
import Utility from './Utility';
// Add Cookies to Persist User Authentication

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
  };

  constructor() {
    super();
    this.utility = new Utility();
  }

  render() {
    const value = {
        actions: {
        }
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
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

