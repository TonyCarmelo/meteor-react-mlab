import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AdminLogin from './AdminLogin';

export default class Admin extends React.Component{
  render(){
    return(
        <MuiThemeProvider>
         <AdminLogin />
        </MuiThemeProvider>
      )
  }
}
