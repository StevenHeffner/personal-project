import React, { Component } from "react";
import Logo from "./MEAP2w01svg.svg"

class Auth extends Component {
  render() {
    return (
      <div>
        <a href={process.env.REACT_APP_LOGIN}>
          <button className="">Login</button>
         <img src ={Logo}/> 
        </a>
      </div>
    );
  }
}

export default Auth;
