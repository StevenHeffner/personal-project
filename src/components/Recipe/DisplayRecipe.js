import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllRecipes } from "../../ducks/reducer";
import RecipeCard from "./RecipeCard";

class DisplayRecipe extends Component {
  componentDidMount() {
    this.props.getAllRecipes();
  }
  // componentWillReceiveProps(){
  //   this.setState()
  // }

  render() {
    console.log("Display Recipe render");
    const { recipes } = this.props;
    console.log("db body", recipes);
    return (
      <div className="displayrec">
        {recipes.map((recipe, key) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes
  };
}

export default connect(mapStateToProps, { getAllRecipes })(DisplayRecipe);
