import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { unregister } from "./registerServiceWorker";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CssBaseline from 'material-ui/CssBaseline';
import store from "./ducks/store";
import { createMuiTheme } from 'material-ui/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F6414A'
    },
    secondary:{
      main:'#787878',
      light: '#ffffff'
    }
  },
});


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <MuiThemeProvider theme = {theme}>
        <CssBaseline/>
        <App />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
unregister();
