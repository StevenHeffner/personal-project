import React, { Component } from "react";
import _ from "lodash";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { numOfMealPlans, getAllRecipes, updateMealPlan } from "../../ducks/reducer";
import RecipeCard from "../Recipe/RecipeCard";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

class PlanDialog extends Component {
  constructor() {
    super();
    this.state = {
      num: null,
    };
  }

  componentDidMount() {
    this.props.getAllRecipes();
  }
  handleNum(e) {
    this.setState({
      num: e.target.value
    });
  }

  generateMealPlan() {
    let randomElements = _.sampleSize(this.props.recipes, this.state.num);

    this.props.updateMealPlan(randomElements)

    this.props.handleClose();
  }
  render() {
    // console.log(this.state.num)
    // console.log("PlanDialog:", this.props);
    // console.log("state", this.state.mealPlan);

    return (
      <div className="">
        <Dialog
          open={this.props.state.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className="mealplantitle">
            Create A Meal Plan
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              How many meals would you like generated?
            </DialogContentText>
            <TextField
              onChange={e => {
                this.handleNum(e);
              }}
              autoFocus
              margin="dense"
              id="name"
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.generateMealPlan()} color="primary">
              Generate
            </Button>
          </DialogActions>
        </Dialog>
        <div className="displayrec">
          {this.props.mealPlan[0]
            ? this.props.mealPlan.map((recipe, key) => {
                return <RecipeCard key={recipe.id} recipe={recipe} />;
              })
            : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    mealPlan: state.mealPlan
  };
}
export default connect(mapStateToProps, { numOfMealPlans, getAllRecipes, updateMealPlan })(
  PlanDialog
);
