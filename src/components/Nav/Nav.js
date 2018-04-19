import React from "react";
import { Link } from 'react-router-dom';
import { MenuList, MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import BookMarkIcon from './img/ic_collections_bookmark_black_24px.png'
import ListIcon from './img/ic_view_list_black_24px.png'
import Cart from './img/ic_local_grocery_store_black_24px.png'




const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: '#F6414A',
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {
    fontSize:'18px',
    fontWeight:'100',
    letterSpacing:'.5px',
    width:'auto',
    

  },
  icon: {
    height:'20px',
    width:'20px',
    marginLeft: '15px'

  },
});


function Nav (props) {
  const { classes } = props;
   return (
       <Paper style = {{height: '100vh', width: '300px', paddingTop: '20px'}}>
      <MenuList>
      <Link to ='recipes' className="removeline"><MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
          {<img src = {BookMarkIcon} alt = 'book mark icon'/>}
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Recipes" />
        </MenuItem></Link>
        <Link className="removeline" to ='meal-plan'><MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
          {<img src = {ListIcon} alt = 'list icon'/>}
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Meal Plan" />
        </MenuItem></Link>
        <Link className="removeline" to ='grocery-list'><MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
          {<img src = {Cart} alt = 'list icon'/>}
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Grocery List" />
        </MenuItem></Link>
      </MenuList>
    </Paper>
  );
} 

// Nav.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
    
 
  

export default withStyles(styles)(Nav);



// <div className="nav">
// <div className="pages">

 
// {/* <Link to ='recipes'><MainButton icon = {<img src = {BookMarkIcon}/>} label={`      Recipes`}/></Link>
//  <Link to ='meal-plan'><MainButton icon = {<img src = {ListIcon}/>} label={`    Meal Plan`}/></Link>
//  <Link to ='grocery-list'><MainButton icon = {<img src = {Cart}/>} label={`   Grocery List`}/></Link> */}
// </div>
// </div>