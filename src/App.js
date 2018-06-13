import React from 'react';
import {Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HorizontalLinearStepper from './components/stepper.js';
import AppBar from './components/appBar.js';
import TextForm1 from './components/formAdmin1.js';
import TextForm2 from './components/formAdmin2.js';
import TextForm6 from './components/formAdmin6.js';
import ProofOfAuthority from './components/ProofOfAuthority';
import FormAddUserInfo from './components/formAddUserInfo.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import UncaughtErrors from './components/common/UncaughtErrors';
import FirebaseStore from './stores/FirebaseStore';
import LookupStore from './stores/LookupStore';
import i18n from './utils/i18n';
import GraingerForm2 from './components/graingerForm2';
import GraingerForm6 from './components/graingerForm6';

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
      invoice: '',
      firstImei: '',
      user: {},
      company: {
        id: 'faizan_test',
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
      newUser: {
        firstName: '',
        lastName: '',
        role: '',
        imei: '',
        phone: '',
        email: '',
        type: 'external'
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
    LookupStore.initialize();
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
        case 0:
          // check their entry and grab invoice details which will get us the companyId as well
          _promise.push(
              FirebaseStore.checkAuthority(this.state.firstImei, this.state.invoice)
                  .then(res => {
                    this.setState({invoiceDetails: res.invoice, company: {...this.state.company, id: res.invoice.companyId, name: res.invoice.companyName}});
                  })
          );
          break;
        case 1:
          // after creating admin, use the companyId we got earlier to retrieve companydetails
          _promise.push(
            FirebaseStore.makeAdmin({...this.state.user, company: this.state.company})
              .then(() => {
                return FirebaseStore.getCompanyDetails(this.state.company.id)
                  .then(res => {
                    console.log('makeAdmin.then.getCompanyDetails.then', res)
                    if (!res.address || typeof res.address === 'string') {
                      res.address = {}
                    }
                    this.setState({company: {...this.state.company, ...res.company}}, () => {
                      console.log('write company to state.then ', this.state.company);
                    });
                  })
              })
          );
          break;
        case 4:
          _promise.push(FirebaseStore.makeInvite(this.state.newUser, this.state.company.id, 'invoice_' + this.state.invoice));
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
          {
              this.state.step > 0 && <div className="bg-white"><HorizontalLinearStepper step={this.state.step} /></div>
          }

          {
              this.state.step === 0 &&
                <ProofOfAuthority
                    onChange={this.onChange}
                    onContinue={this.nextStep}
                    invoice={this.state.invoice}
                    firstImei={this.state.firstImei}
                    validation={this.state.validation}
                    onValidation={this.onValidation} />
          }

          {
            this.state.step > 0 &&
            <div className="container bg-white">
                {this.state.step === 99 && <GraingerForm2 />}
                {/*{this.state.step === 0 ? <TextForm onChange={this.onChange} onValidation={this.onValidation} validation={this.state.validation} region={this.state.region} employeeCount={this.state.employeeCount} /> : null}*/}
                {this.state.step === 1 && <TextForm1 user={this.state.user} onValidation={this.onValidation} validation={this.state.validation} onChange={this.onChange} />}
                {this.state.step === 2 && <TextForm2 company={this.state.company} onChange={this.onChange} onValidation={this.onValidation} validation={this.state.validation} />}
                {/*{this.state.step === 2 && <TextForm3 billing={this.state.billing} onChange={this.onChange} />}*/}
                {/*{this.state.step === 3 && <TextForm4 billing={this.state.billing} onChange={this.onChange} />}*/}
                {this.state.step === 3 && <TextForm6 onContinue={this.nextStep}/>}
                {this.state.step === 4 && <FormAddUserInfo user={this.state.newUser} onChange={this.onChange} validation={this.state.validation} onValidation={this.onValidation} />}
                {this.state.step === 5 && <GraingerForm6/>}
                {/*<TextForm5/>
                  <TextForm3a/>
                  <TextForm4/>
                  <TextForm4a/>
                  <TextForm5/>
                  <TextForm6/>
                  <FormCreateGroup/>
                  <FormCreateGroupa/>
                  <FormCreateGroup1/>
                  <FormAddUserInfo/> */}

                {
                    [0,3,5].indexOf(this.state.step) === -1 &&
                    <div className="formButton">
                        <FlatButton label={i18n.string('btn_cancel')} />
                        <RaisedButton label={i18n.string('btn_continue')} primary={true} onClick={this.nextStep} />
                    </div>
                }
                {
                    this.state.uncaughterrors.map((error, index) => {
                        return <UncaughtErrors error={error} onClose={this.dismissUncaughtError.bind(index)} />
                    })
                }
            </div>
          }
      </div>
    )
  }
}

export default App;
