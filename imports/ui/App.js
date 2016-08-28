import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SchoolDropDown from './SchoolDropDown';
import ChartsApp from './ChartsApp';
import AdminLogin from './admin/AdminLogin';

export default class App extends React.Component{
  render(){
    return(
        <MuiThemeProvider>
         <SchoolDropDown />
     	</MuiThemeProvider>
      )
  }
}
