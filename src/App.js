import React from 'react';
import {Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './components/appBar.js';
import './App.css';
import Registration from './components/Registration'


const App = () => (
    <MuiThemeProvider>
      {/*<AppBar />*/}
      <div className="container">
        <Route path="/" component={Registration} />
      </div>
    </MuiThemeProvider>
);

export default App;
