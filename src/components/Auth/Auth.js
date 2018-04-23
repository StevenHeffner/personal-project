import React, { Component } from "react";
import Logo from "./MEAP2w01svg.svg";

class Auth extends Component {
  render() {
    return (
      <div className="auth">
        <div className="authlogin">
          <a style={{textDecoration: 'none'}}href={process.env.REACT_APP_LOGIN}>
            <img className="mainlogo" src={Logo} />
            <p style = {{fontSize: '25px', textDecoration: 'none', color: 'white', fontFamily:'Roboto, sans-serif', fontWeight:'900',letterSpacing: '2px'}}>Login</p>
          </a>
        </div>
      </div>
    );
  }
}

export default Auth;
