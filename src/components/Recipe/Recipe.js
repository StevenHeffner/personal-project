import React, { Component } from "react";
import axios from "axios";
import DisplayRecipe from "./DisplayRecipe";
import Button from "material-ui/Button";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AddIcon from "material-ui-icons/Add";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/Menu/MenuItem";
import { connect } from "react-redux";
import { getAllRecipes } from "../../ducks/reducer";
// import Fraction from "fraction"

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

const measurements = [
  {
    value: "lbs"
  },
  {
    value: "units"
  },
  {
    value: "cups"
  },
  {
    value: "oz"
  },
  {
    value: "tsp"
  },
  {
    value: "tbsp"
  }
];

const styles = theme => ({
  miniFabButton: {
    minWidth: "35px",
    marginRight: "302px",
    marginBotton: "7px",
    width: "35px",
    height: "35px"
  },
  dialogContent: {
    padding: "0px 24px 0px 24px"
  },
  popupButton: {
    textTransform: "none",
    fontSize: "17px"
  },
  dialogActions: {
    alignItems: "flex-start",
    margin: "10px 4px"
  },
  textField: {
    width: "200px",
    marginTop: "21px"
  }
});

class Recipe extends Component {
  constructor() {
    super();

    this.state = {
      newRecipe: [],
      currentList: [{ item: "", quantity: "", measurement: "lbs", img: "" }],

      // currentList: [],
      recipeName: "",
      recipeImg: "",
      // numIngredients: 1,
      // measurement: "lbs",
      open: false
    };

    // this.styles = theme => ({
    //   button: {
    //     marginRight: "30px"
    //   }
    // });
    this.incrementNum = this.incrementNum.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.getIngredPics = this.getIngredPics.bind(this);
  }
  async getPic(name) {
    let recipeImgProm = await axios.get(
      `https://api.edamam.com/search?q=${name}&app_id=${
        process.env.REACT_APP_APP_ID
      }&app_key=${process.env.REACT_APP_APP_KEY}`
    );
    this.setState({
      recipeImg: recipeImgProm.data.hits[0].recipe.image
    });
  }
  async getIngredPics() {
    return new Promise(async (resolve, reject) => {
      let currentIngredients = [...this.state.currentList];
      const promises = [];
      currentIngredients.forEach(ingredient => {
        promises.push(
          axios.get(
            `https://trackapi.nutritionix.com/v2/search/instant?query=${
              ingredient.item
            }&branded=false`,
            {
              headers: {
                "x-app-id": `${process.env.REACT_APP_NUTRIT_ID}`,
                "x-app-key": `${process.env.REACT_APP_NUTRIT_KEY}`
              }
            }
          )
        );
        // ingredient.img = ingredientImgProm.data.common[0].photo.thumb
        console.log("with image:", currentIngredients);
      });
      const resolved = await Promise.all(promises);
      resolved.forEach((response, i) => {
        currentIngredients[i].img = response.data.common[0].photo.thumb;
        currentIngredients[i].quantity = eval(currentIngredients[i].quantity);
      });
      this.setState(
        {
          currentList: currentIngredients
        },
        () => {
          resolve();
        }
      );
    });
  }

  async handleAddRecipe() {
    const result = this.state.currentList.filter(ingredient => {
      return ingredient.item === "" || ingredient.quantity === "";
    });
    if (result[0]) {
      this.handleClose();
    } else {
      this.getPic(this.state.recipeName);
      await this.getIngredPics();
      const newRecipe = [];
      newRecipe.push({
        recipeName: this.state.recipeName,
        recipeImg: this.state.recipeImg,
        ingredients: this.state.currentList
      });
      console.log("new recipe:", newRecipe);
      axios
        .post("/recipes", newRecipe[0])
        .then(() => this.props.getAllRecipes());
      this.handleClose();
    }
  }

  incrementNum() {
    const list = [...this.state.currentList];
    list.push({ item: "", quantity: "", img: "" });
    this.setState({ currentList: list });
    // this.setState({
    //   numIngredients: ++this.state.numIngredients
    // });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      currentList: [{ item: "", quantity: "", measurement: "lbs", img: "" }]
    });
  };

  // handleChange(e) {
  //   let tempList = [...this.state.currentList];
  //   let index = e.target.id.match(/\d+/)[0];
  //   if (!tempList[index]) {
  //     tempList[index] = {};
  //   }
  //   if (e.target.id[0] === "i") {
  //     tempList[index].name = e.target.value;
  //   } else if (e.target.id[0] === "q") {
  //     tempList[index].quantity = e.target.value;
  //   }
  //   this.setState({
  //     currentList: tempList
  //   });
  // }

  handleName(e) {
    this.setState({
      recipeName: e.target.value
    });
  }

  // handleType = name => event => {
  //   this.setState({
  //     [name]: event.target.value
  //   });
  // };

  handleChange2 = index => event => {
    const list = [...this.state.currentList];
    if (list[index][event.target.quantity]) {
      list[index][event.target.quantity] = event.target.value;
    }
    list[index][event.target.name] = event.target.value;
    this.setState({ currentList: list });
  };

  render() {
    // this.getIngredPics()

    // console.log(this.state.currentList[0].measurement);
    console.log("current list", this.state.currentList);
    const { classes } = this.props;
    // let inputArray = [];
    // for (let i = 0; i < this.state.numIngredients; i++) {
    //   inputArray.push(
    //     <div className="input" key={i}>
    //       <TextField
    //         onChange={this.handleChange2(i)}
    //         name="item"
    //         margin="dense"
    //         id={"itemid" + i}
    //         type="text"
    //         label="Item"
    //         fullWidth
    //       />
    //       <TextField
    //         onChange = {this.handleChange2(i)}
    //         id={"quantityid" + i}
    //         margin="dense"
    //         label="Quantity"
    //         fullWidth
    //       />
    //     </div>
    //   );
    // }

    return (
      <div className="recipebody">
        <div className="title">
          <div>
            <p>Recipes</p>
          </div>
          <div>
            <Button
              onClick={this.handleClickOpen}
              variant="fab"
              color="primary"
              aria-label="add"
              className={classes.mainFabButton}
            >
              <AddIcon />
            </Button>
          </div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <div className="pop-header">
              <DialogTitle id="form-dialog-title">Add Recipe</DialogTitle>
            </div>
            <DialogContent className={classes.dialogContent}>
              <DialogContentText>
                Continue to add ingredients untill your recipe has been
                completed.
              </DialogContentText>
              <TextField
                onChange={e => this.handleName(e)}
                id="recipie-name"
                autoFocus
                margin="dense"
                label="Recipie Name"
                fullWidth
              />

              {this.state.currentList.map((listItem, i) => {
                return (
                  <div className="input" key={i}>
                    <TextField
                      onChange={this.handleChange2(i)}
                      value={listItem.item}
                      name="item"
                      margin="dense"
                      id={"itemid" + i}
                      type="text"
                      label="Item"
                      fullWidth
                    />
                    <TextField
                      onChange={this.handleChange2(i)}
                      name="quantity"
                      id={"quantityid" + i}
                      margin="dense"
                      label="Quantity"
                      fullWidth
                    />
                    <TextField
                      id="select-measurement"
                      select
                      name="measurement"
                      className={classes.textField}
                      value={this.state.currentList[0].measurement}
                      onChange={this.handleChange2(i)}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      margin="normal"
                    >
                      {measurements.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                );
              })}
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <Button
                onClick={this.incrementNum}
                mini={true}
                variant="fab"
                color="primary"
                aria-label="add"
                className={classes.miniFabButton}
              >
                <AddIcon />
              </Button>
              <Button
                onClick={this.handleClose}
                color="primary"
                className={classes.popupButton}
              >
                Cancel
              </Button>
              <Button
                className={classes.popupButton}
                onClick={this.handleAddRecipe}
                color="primary"
              >
                Add Recipe
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <DisplayRecipe />
        </div>
      </div>
    );
  }
}
Recipe.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, { getAllRecipes })(withStyles(styles)(Recipe));
