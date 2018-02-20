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
import ProofOfAuthority from './components/ProofOfAuthority';
import FormCreateGroup from './components/formCreateGroup.js';
import FormCreateGroupa from './components/formCreateGroupa.js';
import FormCreateGroup1 from './components/formCreateGroup1.js';
import FormAddUserInfo from './components/formAddUserInfo.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import UncaughtErrors from './components/common/UncaughtErrors';
import FirebaseStore from './stores/FirebaseStore';
import i18n from './utils/i18n';

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
      step: 1,
      region: '',
      employeeCount: '',
      invoice: '',
      firstImei: '',
      user: {},
      company: {
        billing: {},
        address: {}
      },
      billing: {
        type: 'prepaid',
        plan: '',
        feats: [],
        addons: [],
        payment: {
          type: ''
        }
      },
      validation: {
        valid: false,
        fields: {}
      },
      uncaughterrors: []
    };
    this.onChange = this.onChange.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.onValidation = this.onValidation.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.dismissUncaughtError = this.dismissUncaughtError.bind(this);
  }
  componentDidMount() {
    FirebaseStore.initialize();
  }
  onChange(data, cb) {
    console.log('App.onChange', data);
    this.setState({ ...data }, function() {
      console.log('App.onChange.then', this.state);
      if (cb) {
        cb();
      }
    });
  }
  nextStep() {
    // check that form is valid for given step and throw errors on any invalid fields
    this.isValidated().then(function () {
      let _promise = [];
      switch (this.state.step) {
        case 1:
          _promise.push(FirebaseStore.makeAdmin(this.state.user));
          break;
        default:
          break;
      }
      
      Promise.all(_promise).then(function() {
        this.setState({ step: ++this.state.step, validation: { valid: false } });
      }.bind(this))
      .catch(function (err) {
        console.error('App.nextStep.promises.failed', err);
        if (err.errors) {
          this.handleErrors(err.errors);
        }
      }.bind(this));
    }.bind(this));
  }
  isValidated() {
    return new Promise(function (resolve, reject) {
      let validation = {...this.state.validation};
      let invalidFields = Object.keys(validation.fields || {}).filter(k => !validation.fields[k].valid);
      // set valid based on remaining invalid fields
      validation.valid = invalidFields.length === 0;
      // set invalid fields dirty state to true to force errors to user
      invalidFields.forEach((k) => validation.fields[k].dirty = true);

      console.log('isValidated', validation, invalidFields);
      
      this.setState({ validation }, () => {
        if (!this.state.validation.valid) {
          reject();
        } else {
          resolve();
        }
      });
    }.bind(this));
  }
  onValidation(e) {
    console.log('App.onValidation', e)
    let validation = {...this.state.validation, ...e};
    // check each field and set valid to false if there are invalid fields
    validation.valid = Object.keys(validation.fields).filter(k => !validation.fields[k].valid).length === 0;
    this.setState({ validation });
  }
  handleErrors(errors) {
    let validation = {...this.state.validation};
    let uncaughterrors = [...this.state.uncaughterrors];

    errors.forEach(function (error) {
      if (error.type === 'validation') {
        if (!validation.fields[error.field]) {
          validation.fields[error.field] = {}
        }
        validation.fields[error.field].valid = false;
        validation.fields[error.field].errorMsg = error.message;
      }

      if (error.type === 'uncaught') {
        uncaughterrors.push(error);
      }
    });
    this.setState({validation, uncaughterrors}, function () {
      console.log('handleErrors.then', this.state.validation, this.state.uncaughterrors);
    });
  }
  dismissUncaughtError(index) {
    let uncaughterrors = [...this.state.uncaughterrors];
    uncaughterrors.splice(index, 1);
    this.setState({ uncaughterrors });
  }
  render() {
    return (
      <div>
        <HorizontalLinearStepper step={this.state.step} />

        <div>
          {this.state.step === 0 ? <TextForm onChange={this.onChange} onValidation={this.onValidation} validation={this.state.validation} region={this.state.region} employeeCount={this.state.employeeCount} /> : null}
          {this.state.step === 1 ? <TextForm1 user={this.state.user} onValidation={this.onValidation} validation={this.state.validation} onChange={this.onChange} /> : null}
          {this.state.step === 2 ? <ProofOfAuthority invoice={this.state.invoice} firstImei={this.state.firstImei} /> : null}
          {/* {this.state.step === 2 ? <TextForm2 company={this.state.company} onChange={this.onChange} onValidation={this.onValidation} validation={this.state.validation} /> : null} */}
          {this.state.step === 3 ? <TextForm3 billing={this.state.billing} onChange={this.onChange} /> : null}
          {this.state.step === 4 ? <TextForm4 billing={this.state.billing} onChange={this.onChange} /> : null}
          {this.state.step === 5 ? <TextForm5/> : null}
          {this.state.step === 6 ? <TextForm6/> : null}
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
            <FlatButton label={i18n.string('btn_cancel')} />
            <RaisedButton label={i18n.string('btn_continue')} primary={true} onClick={this.nextStep} />
          </div>
          {
            this.state.uncaughterrors.map((error, index) => {
              return <UncaughtErrors error={error} onClose={this.dismissUncaughtError.bind(index)} />
            })
          }
        </div>
      </div>
    )
  }
}

export default App;
