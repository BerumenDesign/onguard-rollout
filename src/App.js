import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HorizontalLinearStepper from './components/stepper.js';
import AppBar from './components/appBar.js';
import TextForm from './components/formAdmin.js';
import TextForm1 from './components/formAdmin1.js';
import TextForm2 from './components/formAdmin2.js';
import TextForm3 from './components/formAdmin3.js';
import TextForm3a from './components/formAdmin3a.js';
import TextForm4 from './components/formAdmin4.js';
import TextForm4a from './components/formAdmin4a.js';
import TextForm5 from './components/formAdmin5.js';
import TextForm6 from './components/formAdmin6.js';
import FormCreateGroup from './components/formCreateGroup.js';
import FormCreateGroupa from './components/formCreateGroupa.js';
import FormCreateGroup1 from './components/formCreateGroup1.js';
import FormAddUserInfo from './components/formAddUserInfo.js';
import './App.css';

const App = () => (<MuiThemeProvider>
  <AppBar/>
  <HorizontalLinearStepper/>

  <TextForm/> {/* Data region */}
  <TextForm1/> {/* Create admin account */}
  <TextForm2/> {/* Add company */}
  <TextForm3/> {/* Choose service plan - Use prepaid program */}
  <TextForm3a/> {/* Choose service plan - Select tier */}
  <TextForm4/> {/* Payment info (optional) */}
  <TextForm4a/>
  <TextForm5/>
  <TextForm6/>
  <FormCreateGroup/>
  <FormCreateGroupa/>
  <FormCreateGroup1/>
  <FormAddUserInfo/>
</MuiThemeProvider>);

export default App;
