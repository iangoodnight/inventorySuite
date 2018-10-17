import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Row, Input } from "react-materialize";
import Wrapper from "./components/Wrapper";
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
          <Row>
            <Input placeholder="Task" s={6} label="task" />
            <Input type="textarea" placeholder="How to perform task" s={12} label="howTo" />
          </Row>  
        </Wrapper>
      </div>
    );
  }
}

export default App;
