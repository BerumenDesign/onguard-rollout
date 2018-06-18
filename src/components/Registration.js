import React from "react";

import Stepper from './stepper.js';
import CreateAdmin from './registration-forms/CreateAdmin.js';
import CompanyInformation from './registration-forms/CompanyInformation.js';
import Confirmation from './registration-forms/Confirmation.js';
import Verification from './registration-forms/Verification';
import UserInvite from './registration-forms/UserInvite.js';
import End from './registration-forms/End';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import UncaughtErrors from './common/UncaughtErrors';
import FirebaseStore from '../stores/FirebaseStore';
import i18n from '../utils/i18n';

class Registration extends React.Component {
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
    this.prevStep = this.prevStep.bind(this);
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
  nextStep(params) {
    // check that form is valid for given step and throw errors on any invalid fields
    this.isValidated().then(() => {
      let _promise = [];
      let step = this.state.step + 0; // for changing step value in certain cases

      switch (step) {
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
                    this.setState({company: {...this.state.company, ...res.company}});
                  })
              })
          );
          break;
        case 2:
          _promise.push(FirebaseStore.updateCompany(this.state.company));
          break;
        case 4:
          _promise.push(FirebaseStore.makeInvite(this.state.newUser, this.state.company.id, 'invoice_' + this.state.invoice));
          break;
        case 5:
          // this will take user back to makeInvite step
          step = 3;
          break;
        default:
          break;
      }

      Promise.all(_promise)
        .then(() => {
          this.setState({ step: ++step, validation: { valid: false } });
        })
        .catch((err) => {
          console.error('App.nextStep.promises.failed', err);
          if (err.errors) {
            this.handleErrors(err.errors);
          }
        });
    });
  }
  prevStep(params) {
    let _promise = [];
    let step = this.state.step + 0; // for mutating step value in certain cases

    switch (step) {
      case 4:
        step = 6;
        break;
      default:
        break;
    }

    Promise.all(_promise)
      .then(() => {
        this.setState({ step: --step, validation: { valid: false } });
      })
      .catch((err) => {
        console.error('App.prevStep.promises.failed', err);
        if (err.errors) {
          this.handleErrors(err.errors);
        }
      });
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
          this.state.step > 0 && <div className="bg-white flex flex-content-center"><Stepper step={this.state.step} /></div>
        }

        {
          this.state.step === 0 &&
          <Verification
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
            {this.state.step === 1 && <CreateAdmin user={this.state.user} onValidation={this.onValidation} validation={this.state.validation} onChange={this.onChange} />}
            {this.state.step === 2 && <CompanyInformation company={this.state.company} onChange={this.onChange} onValidation={this.onValidation} validation={this.state.validation} />}
            {this.state.step === 3 && <Confirmation onContinue={this.nextStep}/>}
            {this.state.step === 4 && <UserInvite user={this.state.newUser} onChange={this.onChange} validation={this.state.validation} onValidation={this.onValidation} />}
            {this.state.step === 5 && <End onContinue={this.nextStep}/>}

            {
              [0,3,5].indexOf(this.state.step) === -1 &&
              <div className="formButton">
                <FlatButton label={i18n.string('btn_cancel')} onClick={this.prevStep} />
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

export default Registration
