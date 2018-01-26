import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NewTheme from './theme/muiTheme.js'
import HorizontalLinearStepper from './components/stepper.js'
import AppBar from './components/appBar.js'
import TextForm from './components/formAdmin.js';
import TextForm1 from './components/formAdmin1.js';
import TextForm2 from './components/formAdmin2.js';
import TextForm3 from './components/formAdmin3.js';
import TextForm3a from './components/formAdmin3a.js';
import TextForm4 from './components/formAdmin4.js';
// import logo from './logo.svg';
import './App.css';


const App = () => (<MuiThemeProvider>
  <AppBar/>
  <HorizontalLinearStepper/>

  <TextForm/>
  <TextForm1/>
  <TextForm2/>
  <TextForm3/>
  <TextForm3a/>
  <TextForm4/>


</MuiThemeProvider>);

export default App;
