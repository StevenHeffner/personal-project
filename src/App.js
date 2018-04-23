import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import routes from "./routes";
import { withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App" style ={{height: "100%"}}>
        {this.props.location.pathname !== "/" ? <Header /> : null}
        <div className = "main-container">
          {this.props.location.pathname !== "/" ? <Nav /> : null}
        {routes}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
