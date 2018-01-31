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
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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
      step: 0,
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
    this.nextStep = this.nextStep.bind(this);
  }
  onChange(data) {
    console.log('App.onChange', data);
    this.setState({ ...data }, function() {
      console.log('App.onChange.then', this.state);
    });
  }
  nextStep() {
    this.setState({ step: ++this.state.step });
  }
  render() {
    return (
      <div>
        <HorizontalLinearStepper step={this.state.step} />

        {this.state.step === 0 ? <TextForm onChange={this.onChange} region={this.state.region} employeeCount={this.state.employeeCount} /> : null}
        {this.state.step === 1 ? <TextForm1 user={this.state.user} onChange={this.onChange} /> : null}
        {this.state.step === 2 ? <TextForm2 company={this.state.company} onChange={this.onChange} /> : null}
        {this.state.step === 3 ? <TextForm3 billing={this.state.billing} onChange={this.onChange} /> : null}
        {/* <TextForm3a/>
        <TextForm4/>
        <TextForm4a/>
        <TextForm5/>
        <TextForm6/>
        <FormCreateGroup/>
        <FormCreateGroupa/>
        <FormCreateGroup1/>
        <FormAddUserInfo/> */}

        <div className="formButton">
          <FlatButton label="Cancel"/>
          <RaisedButton label="Continue" primary={true} onClick={this.nextStep} />
        </div>
      </div>
    )
  }
}
export default App;
