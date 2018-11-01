import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Row, Input, Button } from "react-materialize";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Cameras from "./pages/Cameras";
import Chrome from "./pages/Chrome";
import Completed from "./pages/Completed";
import Computers from "./pages/Computers";
import Linux from "./pages/Linux";
import Network from "./pages/NetworkDevices";
// import Other from "./pages/Other";
// import Phones from "./pages/Phones";
// import Printers from "./pages/Printers";
// import Radios from "./pages/Radios";
// import Servers from "./pages/Servers";
// import Tablets from "./pages/Tablets";
import Things from "./pages/Things";


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
                  <Route exact path="/cameras" component={Cameras} />
                  <Route exact path="/chrome" component={Chrome} />                  
                  <Route exact path="/completed" component={Completed} />
                  <Route exact path="/computers" component={Computers} />
                  <Route exact path="/linux" component={Linux} /> 
                  <Route exact path="/network" component={Network} />
                  <Route exact path="/things" component={Things} />                                   
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
