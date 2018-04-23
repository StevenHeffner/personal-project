import React, { Component } from "react";
import IngredientsCard from "./IngredientCard";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import { getAllRecipes } from "../../ducks/reducer";
import { connect } from "react-redux";
import Icon from "material-ui/Icon";
import MenuItem from "material-ui/Menu/MenuItem";
import TextField from "material-ui/TextField";
import Fraction from "fraction.js";

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from "material-ui/Dialog";
import Slide from "material-ui/transitions/Slide";
import DeleteIcon from "@material-ui/icons/Delete";
import { List } from "material-ui";

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
  popupButton: {
    textTransform: "none",
    fontSize: "17px"
  },
  editButton: {
    marginRight: "15px"
  },
  dialog: {
    width: 600
  },
  textField: {
    width: "200px",
    marginTop: "21px"
  },
  dialogActions: {
    alignItems: "flex-start",
    margin: "10px 4px"
  }
});

class RecipeCard extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      openEdit: false,
      nameEdit: "",
      updatedRecipe: []
    };
    this.updateRecipe = this.updateRecipe.bind(this);
  }
  updateRecipe() {
    axios.post("/recipes/edit", this.state);
    this.handleCloseEdit();
  }

  handleUpdateChange = key => event => {
    let updatedRecipe = [...this.props.recipe.ingredients];
    if (event.target.name === "quantity") {
      updatedRecipe[key].quantity = +event.target.value;
    }
    this.setState({
      updatedRecipe
    });
    console.log(updatedRecipe);
    // console.log("edit list", [key][event.target.quantity]);
  };

  deleteRecipe(id) {
    axios.delete(`recipes/${id}`).then(() => this.props.getAllRecipes());
  }

  handleNameEdit(e) {
    this.setState({
      nameEdit: e.target.value
    });
  }

  handleClickOpenEdit = () => {
    this.setState({ openEdit: true });
  };

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };

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
        {/* <img className="img" src={img} /> */}
        <div
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            flexGrow: 1,
            width: "100%",
            backgroundColor: "red",
            backgroundImage: `url(${img})`
          }}
        />
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
              <div className="card_buttons">
                <Button
                  onClick={this.handleClickOpenEdit}
                  variant="fab"
                  aria-label="delete"
                  color="primary"
                  className={classes.editButton}
                >
                  <Icon>edit_icon</Icon>
                </Button>
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
            </div>
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <div className="ingredients-card-container">
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
            <Button className={classes.popupButton} onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openEdit}
          onClose={this.handleCloseEdit}
          aria-labelledby="form-dialog-title"
        >
          <div className="pop-header">
            <DialogTitle id="form-dialog-title">Edit Recipe</DialogTitle>
          </div>
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>What would you like to edit?</DialogContentText>
            <TextField
              onChange={e => this.handleNameEdit(e)}
              id="recipie-name"
              value={name}
              margin="dense"
              label="Recipe Name"
              // defaultValue= {name}
              // value={name}
              fullWidth
            />

            {ingredients.map((ingredient, i) => {
              // let x = new Fraction(ingredient.quantity);
              // let res = x.toFraction(true);
              // console.log('key', i)
              return (
                <div className="input" key={i}>
                  <TextField
                    // onChange={this.handleUpdate(i)}

                    value={ingredient.item}
                    style={{ marginTop: "8px" }}
                    name="item"
                    margin="dense"
                    id={"itemid" + i}
                    type="text"
                    label="Item"
                    fullWidth
                  />
                  <TextField
                    onChange={this.handleUpdateChange(i)}
                    defaultValue={ingredient.quantity}
                    style={{ marginTop: "8px" }}
                    name="quantity"
                    id={"quantityid" + i}
                    margin="dense"
                    label="Quantity"
                    fullWidth
                    type="number"
                  />
                  <TextField
                    // style={{marginTop:"5px"}}
                    id="select-measurement"
                    value={ingredient.measurement}
                    label="Measurment"
                    name="measurement"
                    className={classes.textField}
                    style={{ marginTop: "5px" }}
                    // onChange={this.handleChange2(i)}
                  />
                </div>
              );
            })}
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button
              onClick={this.handleCloseEdit}
              color="primary"
              className={classes.popupButton}
            >
              Cancel
            </Button>
            <Button
              onClick={this.updateRecipe}
              className={classes.popupButton}
              // onClick={this.handleAddRecipe}
              color="primary"
            >
              Save
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
