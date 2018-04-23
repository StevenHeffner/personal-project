import React, { Component } from "react";
import { connect } from "react-redux";
import IngredientsCard from "../Recipe/IngredientCard";
import _ from "lodash";
import PlanFiller from '../Plan/PlanFiller'

// const flatMap = (arr) =>

class List extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: []
    };
  }
  render() {
    console.log(this.props);

    // const ingredientsArr = this.props.mealPlan.map(
    //   recipe => recipe.ingredients
    // );

    // // imperative programming
    // let ingredientsArr = []
    // for(let i = 0; i < this.props.mealPlan.length; i++) {
    //   if(this.props.mealPlan[i] === 10) {
    //     ingredientsArr.push(this.props.mealPlan[i])
    //   }
    // }

    // // declaritive programming
    // let ingredientsArr = this.props.mealPlan.filter(mp => mp === 10)

    const shoppingList = this.props.mealPlan.reduce((acc, recipe) => {
      const { ingredients } = recipe;
      const uniqueIngredients = ingredients.filter(ingredient => {
        let exists = false;
        acc.forEach(accIngredient => {
          if (accIngredient.ingredients_id === ingredient.ingredients_id) {
            accIngredient.quantity =
              accIngredient.quantity + ingredient.quantity;
            exists = true;
          }
        });

        return !exists;
      });

      const test = acc.concat(...uniqueIngredients);
      return test;
    }, []);

    console.log("BOOM SUCKAS", shoppingList);

    // // console.log(ingredientsArr);
    // // let shoppingListDraft = _.flatten(ingredientsArr);
    // console.log("Shopping List Draft:", shoppingListDraft);

    // let shoppingListFinal = [];

    // for (let i = 0; i < shoppingListDraft.length; i++) {
    //   for (let x = 0; x < shoppingListDraft.length; x++) {
    //     if (
    //       shoppingListDraft[i].ingredients_id ===
    //       shoppingListDraft[x].ingredients_id
    //     ) {
    //       shoppingListDraft[i].ingredients_id =
    //         shoppingListDraft[i].ingredients_id +
    //         shoppingListDraft[x].ingredients_id;
    //       shoppingListFinal.push(shoppingListDraft[i]);
    //       shoppingListDraft[i].splice(i, 1);
    //     } else {
    //       shoppingListFinal.push(shoppingListDraft[i]);
    //     }
    //   }
    // }

    // //

    // console.log("Shopping List Final:", shoppingListFinal);

    return (
      <div style={{overflowY: 'auto', width: '100%'}}>
        <div>
          <p className="title">Grocery List</p>
        </div>
          {shoppingList[0] ? 
        <div className="displaylist" style = {{}}>
               {shoppingList.map((ingredient, i) => {
                return (
                  <IngredientsCard
                    key={ingredient.ingredient_id}
                    ingredient={ingredient}
                    style={{borderRight: '1px solid #e5e5e5', borderLeft: '1px solid #e5e5e5'}}
                  />
                );
              })}
        </div>
              : <PlanFiller/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mealPlan: state.mealPlan
  };
}

export default connect(mapStateToProps)(List);
