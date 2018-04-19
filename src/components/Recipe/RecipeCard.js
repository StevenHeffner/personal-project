import React, { Component } from "react";
import IngredientsCard from "./IngredientCard";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import { getAllRecipes } from "../../ducks/reducer";
import { connect } from "react-redux";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Slide from "material-ui/transitions/Slide";
import DeleteIcon from "@material-ui/icons/Delete";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  button: {
    height: "50px",
    width: "100%",
    textTransform: "none",
    fontFamily: "sans-serif",
    fontSize: "16px",
    boxShadow: "none"
  },
  dialog: {
    width: 600
  }
});

class RecipeCard extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  deleteRecipe(id) {
    axios.delete(`recipes/${id}`).then(() => this.props.getAllRecipes());
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { id, name, ingredients, img } = this.props.recipe;
    // console.log('HELLER:',ingredients)
    // let ingredientsJSX = ingredients.map((ingredient, i) => {
    //   return (

    //     <div className="viewrec" key={i}>
    //       <p className="text">{ingredient.quantity}</p>
    //       <p className="text">{ingredient.measurement}</p>
    //       <p className="text">{ingredient.item}</p>
    //     </div>
    //   );
    // });
    return (
      <div className="card">
        <img className="img" src={img} />
        <div className="cardTitle">{name}</div>
        <Button
          onClick={this.handleClickOpen}
          variant="raised"
          color="primary"
          className={classes.button}
        >
          View Recipe
        </Button>
        <Dialog
          open={this.state.open}
          transition={Transition}
          keepMounted
          onClose={this.handleClose}

          // style = {{width:'600px'}}
        >
          <DialogTitle>
            <div className="dialog-title">
              {name}
              <Button
                onClick={() => this.deleteRecipe(this.props.recipe.id)}
                variant="fab"
                aria-label="delete"
                color="primary"
                className={classes.deleteButton}
              >
                <DeleteIcon />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <div className='ingredients-card-container'>
              {ingredients.map((ingredient, key) => {
                return (
                  <IngredientsCard
                    key={ingredient.ingredients_id}
                    ingredient={ingredient}
                  />
                );
              })}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, { getAllRecipes })(withStyles(styles)(RecipeCard));
