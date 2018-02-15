import React from 'react';
import TextField from 'material-ui/TextField';
import Validation from '../utils/validation';

class TextForm1 extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    let __validation = {...this.props.validation};
    const fields = ['firstName', 'lastName', 'phone', 'email', 'password'];

    if (__validation) {
      let _validationPromises = [];
      
      fields.forEach(function(field) {
        _validationPromises.push(this.validate(field));
      }, this);

      if (!__validation.fields) {
        __validation.fields = {};
      }

      console.log('formAdmin1.validation.promises', _validationPromises);
      
      Promise.all(_validationPromises).then(function(_validations) {
        console.log('formAdmin1.validationsPromises.then', _validations);
        _validations.forEach(function (validated, i) {
          __validation.fields[fields[i]] = validated.fields[fields[i]];
        });

        // initialize validation
        if (__validation && this.props.onValidation) {
          console.log('formAdmin1.validationsPromises.then.validationObject', __validation);
          this.props.onValidation(__validation);
        }
      }.bind(this)).catch(function(err) {
        console.error('formAdmin1.init.validation.failed ', err);
      });
    }
  }
  onChange(e) {
    let fieldName = e.target.name;
    let value = e.target.value;
    let __user = {...this.props.user, [fieldName]: value};
    
    this.props.onChange({ user: __user }, function () {
      this.validate(fieldName)
        .then(function(__validation) {
          if (__validation && this.props.onValidation) {
            __validation.fields[fieldName].dirty = true; //set state to dirty so we can show error if applicable
            this.props.onValidation(__validation);
          }
        }.bind(this))
        .catch(function() {
          console.error('formAdmin1.validation.failed', this.props.validation);
        });
    }.bind(this));
  }
  validate(field) {
    return new Promise(function (resolve, reject) {
      let validation = {...this.props.validation};
    
      if (validation) {
        let valid = true;
        let errorMsg = null;
        let _promise = null;
        
        switch (field) {
          case 'firstName':
            errorMsg = 'You must enter your first name';
            _promise = Validation.name(this.props.user[field]);
            break;
          case 'lastName':
            errorMsg = 'You must enter your last name';
            _promise = Validation.name(this.props.user[field]);
            break;
          case 'phone':
            errorMsg = 'You must enter a valid phone number';
            _promise = Validation.phone(this.props.user[field]);
            break;
          case 'email':
            errorMsg = 'You must enter a valid Email address';
            _promise = Validation.email(this.props.user[field]);
            break;
          case 'password':
            errorMsg = 'Password must be at least 8 characters';
            _promise = Validation.password(this.props.user[field]);
            break;
          default:
            console.error('formAdmin1.validate.field.undefined ', field);
            reject();
        }

        //regardless of success or fail, we pass validation object back with updated data
        _promise
          .then(function() {
            if (!validation.fields) {
              validation.fields = {};
            }

            valid = true;
            errorMsg = null; //since validation passed, null the error
            validation.fields[field] = {...validation.fields[field], valid, errorMsg };
            
            resolve(validation);
          }).catch(function() {
            if (!validation.fields) {
              validation.fields = {};
            }

            valid = false;
            validation.fields[field] = {...validation.fields[field], valid, errorMsg };
            
            resolve(validation);
          });
      } else {
        console.error('formAdmin1.validate.validation.undefined ', validation);
        reject();
      }
    
    // return validation
    }.bind(this));
  }
  showError(field) {
    return this.props.validation && this.props.validation.fields && this.props.validation.fields[field] && this.props.validation.fields[field].dirty ? this.props.validation.fields[field].errorMsg : false;
  }
  render() {
    return (
      <form>
        <h2>Create admin account</h2>
        <h3>All fields are required</h3>
  
        <div className="formRow">
          <div className="formColumn">
            <h4>Basic info</h4>
            <TextField floatingLabelText="First name" name="firstName" floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('firstName')} />
            <br/>
            <TextField floatingLabelText="Last name" name="lastName" floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('lastName')} />
            <br/>
            <TextField floatingLabelText="Mobile phone number" name="phone" floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('phone')} />
            <br/>
          </div>
          <div className="formColumn">
            <h4>Login credentials</h4>
            <TextField floatingLabelText="Username" name="email" floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('email')} />
            <br/>
            <TextField floatingLabelText="Password" name="password" floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('password')} />
            <br/>
          </div>
        </div>
      </form>
    );
  }
}

// class Username extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       query: {
//         timeout: null,
//         delay: 200,
//         username: this.props.username
//       }
//     };
//     this.onChange = this.onChange.bind(this);
//   }
//   onChange(e) {
//     let query = { ...this.state.query };
//     if (query.timeout) {
//       clearTimeout(query.timeout);
//     }

//     query.username = e.target.value;

//     query.timeout = setTimeout(function() {

//     }.bind(this), query.delay);
//   }
//   render() {
//     <TextField floatingLabelText="Username" name="email" floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('email')} />
//   }
// }

export default TextForm1;
