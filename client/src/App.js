import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Row, Input, Button } from "react-materialize";
import Wrapper from "./components/Wrapper";
import Things from "./pages/Things"
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Wrapper>
          <Nav />
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Things />  
        </Wrapper>
      </div>
    );
  }
}

export default App;
