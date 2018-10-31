import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Row, Input, Button } from "react-materialize";
import Wrapper from "./components/Wrapper";
import Things from "./pages/Things";
import Computers from "./pages/Computers";
import Completed from "./pages/Completed";
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Fragment>
            <Wrapper>
              <Nav />
              <div>
                <Switch>
                  <Route exact path="/" component={Things} />
                  <Route exact path="/things" component={Things} />
                  <Route exact path="/completed" component={Completed} />
                  <Route exact path="/computers" component={Computers} />                  
                </Switch>
              </div>  
            </Wrapper>
          </Fragment>
        </div>
      </Router>        
    );
  }
}

export default App;
