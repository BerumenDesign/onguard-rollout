import React from 'react';
import TextField from 'material-ui/TextField';
import Validation from '../utils/validation';

const TextForm1 = (props) => {
  const onChange = (e) => {
    let __user = {...props.user, [e.target.name]: e.target.value};
    props.onChange({ user: __user }, function () {
      let __validation = validate(e.target.name);
      
      if (__validation && props.onValidation) {
        __validation.fields[e.target.name].dirty = true;
        props.onValidation(__validation);
      }
    });
  };
  const validate = (field) => {
    let validation = {...props.validation};
    
    if (validation) {
      let valid = true;
      let errorMsg = null;
      
      switch (field) {
        case 'firstName':
          let firstName = props[field];
          valid = firstName && firstName.length > 2;
          errorMsg = !valid ? 'You must enter your first name' : null;
          break;
        case 'lastName':
          let lastName = props[field];
          valid = lastName && lastName.length > 2;
          errorMsg = !valid ? 'You must enter your last name' : null;
          break;
        case 'phone':
          let phone = props[field];
          //temp likely will want to use Twilio for validating this phone number
          
          if (!phone || phone.length !== 10) {
            errorMsg = 'You must enter a valid phone number';
          } else {
            errorMsg = null;
          }
          // valid = phone && phone.length > 2;
          // errorMsg = !valid ? 'You must enter your last name' : null;
          break;
        case 'email':
          let email = props[field];

          if (!Validation.email(email)) {
            errorMsg = 'You must enter a valid Email address';
          } else {
            errorMsg = null;
          }
          break;
      }

      validation.fields[field] = {...validation.fields[field], valid, errorMsg };
    }
    
    return validation
  };
  const showError = (field) => {
    return props.validation && props.validation.fields && props.validation.fields[field] && props.validation.fields[field].dirty ? props.validation.fields[field].errorMsg : false;
  };

  let __validation = {...props.validation};

  if (__validation) {
    ['firstName', 'lastName', 'phone', 'email', 'password'].forEach(function(field) {
      __validation = validate(field);
    });
    // initialize validation
    if (props.onValidation) {
      props.onValidation(__validation);
    }
  }

  return (
    <form>
      <h2>Create admin account</h2>
      <h3>All fields are required</h3>

      <div className="formRow">
        <div className="formColumn">
          <h4>Basic info</h4>
          <TextField floatingLabelText="First name" name="firstName" floatingLabelFixed={false} onChange={onChange} errorText={showError('firstName')} />
          <br/>
          <TextField floatingLabelText="Last name" name="lastName" floatingLabelFixed={false} onChange={onChange} errorText={showError('lastName')} />
          <br/>
          <TextField floatingLabelText="Mobile phone number" name="phone" floatingLabelFixed={false} onChange={onChange} errorText={showError('phone')} />
          <br/>
        </div>
        <div className="formColumn">
          <h4>Login credentials</h4>
          <TextField floatingLabelText="Username" name="email" floatingLabelFixed={false} onChange={onChange} errorText={showError('email')} />
          <br/>
          <TextField floatingLabelText="Password" name="password" floatingLabelFixed={false} onChange={onChange} errorText={showError('password')} />
          <br/>
        </div>
      </div>
    </form>
  );
}

export default TextForm1;
