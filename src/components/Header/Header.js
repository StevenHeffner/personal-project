import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserInfo } from "../../ducks/reducer";
import logo from './MEAP.png'
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
// import {Link} from 'react-router-dom'

const options = [
'Logout'
];


class Header extends Component {
  constructor(){
    super();
    this.state = {
      anchorEl: null,
    }
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    this.props.getUserInfo();
  }
  render() {
    const { anchorEl } = this.state;
    return (
      <div className="header">
        <img className = "logo" src={logo} alt="logo"/>
        <div className = "menu-tab">
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon style={{color: 'white'}} />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              height: 64,
              width: 100,

            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option}  onClick={this.handleClose}>
            <a href={process.env.REACT_APP_LOGOUT} className="removeline">  {option}</a>
            </MenuItem> 
          ))}
        </Menu>

          <p className = 'greet'>Hello, {this.props.user.display_name}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getUserInfo })(Header);
