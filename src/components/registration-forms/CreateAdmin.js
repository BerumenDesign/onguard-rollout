import React from 'react';
import TextField from 'material-ui/TextField';
import Validation from '../../utils/validation';
import i18n from '../../utils/i18n';

class CreateAdmin extends React.Component {
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
            errorMsg = i18n.string('error_first_name_required');
            _promise = Validation.name(this.props.user[field]);
            break;
          case 'lastName':
            errorMsg = i18n.string('error_last_name_required');
            _promise = Validation.name(this.props.user[field]);
            break;
          case 'phone':
            errorMsg = i18n.string('error_invalid_phone_number');
            _promise = Validation.phone(this.props.user[field]);
            break;
          case 'email':
            errorMsg = i18n.string('error_invalid_email_address');
            _promise = Validation.email(this.props.user[field]);
            break;
          case 'password':
            errorMsg = i18n.string('error_password_meet_criteria');
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
        <h2>{i18n.string('label_create_admin_account')}</h2>
        <p>{i18n.string('label_create_admin_details')}</p>
        <p><b>{i18n.string('label_create_admin_details_2')}</b></p>
        <h3>{i18n.string('label_all_fields_required')}</h3>

        <div className="formRow">
          <div className="formColumn">
            <h4>{i18n.string('label_basic_info')}</h4>
            <TextField floatingLabelText={i18n.string('label_first_name')} name="firstName" value={this.props.user.firstName} floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('firstName')} />
            <br/>
            <TextField floatingLabelText={i18n.string('label_last_name')} name="lastName" value={this.props.user.lastName} floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('lastName')} />
            <br/>
            <TextField floatingLabelText={i18n.string('label_phone_number')} name="phone" value={this.props.user.phone} floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('phone')} />
            <br/>
          </div>
          <div className="formColumn">
            <h4>{i18n.string('label_login_credentials')}</h4>
            <TextField floatingLabelText={i18n.string('label_username')} hintText={i18n.string('hint_username')} value={this.props.user.email} name="email" floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('email')} />
            <br/>
            <TextField floatingLabelText={i18n.string('label_password')} name="password" value={this.props.user.password} floatingLabelFixed={false} onChange={this.onChange} errorText={this.showError('password')} />
            <br/>
          </div>
        </div>
      </form>
    );
  }
}

export default CreateAdmin;
