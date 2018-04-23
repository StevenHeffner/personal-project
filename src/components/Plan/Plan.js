import React, { Component } from "react";
import PlanDialog from "./PlanDialog";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import AddIcon from "@material-ui/icons/Add";
import {connect} from "react-redux"
import {getAllRecipes} from "../../ducks/reducer"


const styles = theme => ({
  button: {}
});

class Plan extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={{overflowY: 'auto', width: '100%'}}> 
        <div className="title">
          <p>Meal Plan</p>
          <Button
            onClick = {this.handleClickOpen}
            variant="fab"
            color="primary"
            aria-label="add"
            className={classes.button}
          >
            <AddIcon />
          </Button>
        </div>
        <div className="plan">
          <PlanDialog
            handleClickOpen={this.handleClickOpen}
            handleClose={this.handleClose}
            state = {this.state}
          />
        </div>
      </div>
    );
  }
}

Plan.propTypes = {
  classes: PropTypes.object.isRequired
};



export default connect(null, {getAllRecipes})(withStyles(styles)(Plan));
