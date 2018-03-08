import React, { Component } from 'react';
import './App.css';
//import ButtonsDemo from './ButtonsDemo';
import LoginForm from './Form/HorizontalLoginForm'
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <LoginForm />
      </div>
    );
  }
}

