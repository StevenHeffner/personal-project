import axios from "axios";

const initialState = {
  user: "",
  recipes: [],
  numMealPlans:null,
  mealPlan: [],
  groceryList: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, { user: action.payload });
      break;
    case GET_ALL_RECIPES + "_FULFILLED":
      console.log("Get all Recipes fulfilled, data: ", action.payload);
      return Object.assign({}, state, { recipes: action.payload });
      console.log('heller',state.recipes)
      break;
    case NUM_OF_MEALPLANS:
      return Object.assign({}, state, {numMealPlans: action.payload})
      break;
    case UPDATE_MEAL_PLAN:
      return Object.assign({}, state, {mealPlan: action.payload} )
      

    default:
      return state;
  }
}

const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const GET_ALL_RECIPES = "GET_ALL_RECIPES";
const NUM_OF_MEALPLANS = "NUM_OF_MEALPLANS";
const UPDATE_MEAL_PLAN = 'UPDATE_MEAL_PLAN';



export function getAllRecipes() {
  const recipes = axios.get("/recipes").then(allRecipes => {
    return allRecipes.data;
 
  });
  return {
    type: GET_ALL_RECIPES,
    payload: recipes
  };
}

export function getUserInfo() {
  const userData = axios.get("/auth/me").then(userInfo => {
    return userInfo.data;
  });
  return {
    type: UPDATE_USER_INFO,
    payload: userData
  };
}

export function numOfMealPlans(num){
  return {
    type: NUM_OF_MEALPLANS,
    payload:num
  }
}

export function updateMealPlan(state){
  return {
    type:UPDATE_MEAL_PLAN,
    payload:state
  }
}