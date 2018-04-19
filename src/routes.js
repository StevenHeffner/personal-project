import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import List from './components/List/List';
import Recipe from './components/Recipe/Recipe';
import Plan from './components/Plan/Plan';


export default (
  <Switch>
<Route exact path = '/' component={Auth}/>
<Route path = '/grocery-list' component={List}/>  
<Route path = '/recipes' component={Recipe}/>
<Route path = '/meal-plan' component={Plan}/>

  </Switch>
)



