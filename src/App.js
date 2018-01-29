import React from 'react';
import {Route} from 'react-router-dom';
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

const App = () => (
  <MuiThemeProvider>
    <AppBar />
    <div className="container">
      <Route path="/" component={Register} />
    </div>
  </MuiThemeProvider>
);

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      region: '',
      employeeCount: '',
      user: {},
      company: {
        billing: {},
        address: {}
      },
      billing: {
        type: 'prepaid',
        plan: '',
        feats: [],
        addons: []
      }
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(data) {
    console.log('App.onChange', data);
    this.setState({ ...data }, function() {
      console.log('App.onChange.then', this.state);
    });
  }
  render() {
    return (
      <div>
        <HorizontalLinearStepper/>

        <TextForm onChange={this.onChange} region={this.state.region} employeeCount={this.state.employeeCount} />
        <TextForm1 user={this.state.user} onChange={this.onChange} />
        <TextForm2 company={this.state.company} onChange={this.onChange} />
        <TextForm3 billing={this.state.billing} onChange={this.onChange} />
        <TextForm3a/>
        <TextForm4/>
        <TextForm4a/>
        <TextForm5/>
        <TextForm6/>
        <FormCreateGroup/>
        <FormCreateGroupa/>
        <FormCreateGroup1/>
        <FormAddUserInfo/>
      </div>
    )
  }
}
export default App;
