import React, { Component } from 'react';
// import FlatButton from 'material-ui/FlatButton';
import Button from 'material-ui/Button';


class MainButton extends Component {
  render() {
    let style = {
      color: '#414141',
      height:'50px',
    }
    let labelStyle = {
      fontSize:'18px',
      textTransform:'null',
      fontWeight:300,
      letterSpacing: '.5px',

    }
    return (
      <div>
        <Button icon = {this.props.icon} labelStyle={labelStyle} style = {style} label={this.props.label} fullWidth={true}/> 
      </div>
    );
  }
}

export default MainButton;