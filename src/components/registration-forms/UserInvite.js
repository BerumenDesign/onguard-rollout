import React from 'react';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Validation from "../../utils/validation";
import i18n from "../../utils/i18n";

class UserInvite extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    this.onChange = e => {
      let field = e.target.name;
      let value = e.target.value;
      this.props.onChange({newUser: {...this.props.user, [field]: value}}, () => {
          console.log('onChange', field, value);
          this.validate(field)
              .then((validation) => {
                  if (validation && this.props.validation) {
                      validation.fields[field].dirty = true;
                      this.props.onValidation(validation);
                  }
              })
              .catch((err) => {
                  console.error('formAddUserInfo.onChange.validate.failed', err);
              });
      });
    };
    this.onRadioChange = e => {
      let field = e.target.name;
      let value = e.target.value;
      this.props.onChange({newUser: {...this.props.user, [field]: value}}, () => {
        this.validate(field)
          .then((validation) => {
            if (validation && this.props.validation) {
                validation.fields[field].dirty = true;
                this.props.onValidation(validation);
            }
          })
          .catch((err) => {
            console.error('formAddUserInfo.onChange.validate.failed', err);
          });
      });
    };

    this.validate = field => {
      return new Promise((resolve, reject) => {
        let validation = this.props.validation;

        if (validation) {
          let valid = false;
          let errorMsg = null;
          let _promise = null;

          switch (field) {
            case 'firstName':
            case 'lastName':
              _promise = Validation.name(this.props.user[field]);
              errorMsg = i18n.string(field === 'firstName' ? 'error_first_name_required' : 'error_last_name_required');
              break;
            case 'email':
              _promise = Validation.email(this.props.user[field]);
              errorMsg = i18n.string('error_invalid_email_address');
              break;
            case 'phone':
              _promise = Validation.phone(this.props.user[field]);
              errorMsg = i18n.string('error_invalid_phone_number');
              break;
            case 'imei':
              _promise = Validation.IMEI(this.props.user[field], true);
              errorMsg = i18n.string('error_invalid_imei_number');
              break;
            case 'type':
              _promise = Validation.enum(this.props.user[field], ['external', 'erc']);
              errorMsg = i18n.string('error_invalid_user_type');
              break;
            case 'role':
              _promise = Validation.enum(this.props.user[field], ['user', 'admin']);
              errorMsg = i18n.string('error_invalid_user_role');
              break;
          }

            _promise
              .then(function() {
                if (!validation.fields) {
                    validation.fields = {};
                }

                valid = true;
                errorMsg = null;

                validation.fields[field] = {...validation.fields[field], valid, errorMsg };
                resolve(validation);
              })
              .catch(function() {
                if (!validation.fields) {
                    validation.fields = {};
                }

                valid = false;

                validation.fields[field] = {...validation.fields[field], valid, errorMsg };
                resolve(validation);
              });
        } else {
          reject();
        }
      });
    };

    this.showError = (field) => {
      return this.props.validation && this.props.validation.fields && this.props.validation.fields[field] && this.props.validation.fields[field].dirty ? this.props.validation.fields[field].errorMsg : false;
    };
  }

  render() {
      return (
          <div className="container">
              <form>
                  <h2>Add users info</h2>

                  <h3>All fields are required</h3>

                  <div className="formRow">
                      <div className="formColumn">
                          <h4>Basic info</h4>
                          <TextField name="firstName" errorText={this.showError('firstName')} floatingLabelText="First name" floatingLabelFixed={false} value={this.props.user.firstName} onChange={this.onChange}/>
                          <TextField name="lastName" errorText={this.showError('lastName')}floatingLabelText="Last name" floatingLabelFixed={false} value={this.props.user.lastName} onChange={this.onChange}/>
                          <TextField name="email" errorText={this.showError('email')} floatingLabelText="Email" floatingLabelFixed={false} value={this.props.user.email} onChange={this.onChange}/>
                          <TextField name="phone" type="tel" errorText={this.showError('phone')} floatingLabelText="Mobile phone number" floatingLabelFixed={false} value={this.props.user.phone} onChange={this.onChange}/>
                          <TextField name="imei" errorText={this.showError('imei')} floatingLabelText="IMEI number (optional)" floatingLabelFixed={false} value={this.props.user.imei} onChange={this.onChange}/>
                      </div>
                      <div className="formColumn">
                          <h4>Select user type</h4>
                          <RadioButtonGroup name="type" errorText={this.showError('type')} onChange={this.onRadioChange} valueSelected={this.props.user.type}>
                              <RadioButton name="type" label="ERC user (Web)" value="erc" />
                              <RadioButton name="type" label="External user" value="external" />
                          </RadioButtonGroup>
                      </div>
                      {
                          this.props.user.type === 'erc' ?
                              <div className="formColumn">
                                  <h4>Select user type</h4>
                                  <RadioButtonGroup name="role" errorText={this.showError('role')} onChange={this.onRadioChange} valueSelected={this.props.user.role}>
                                      <RadioButton name="role" label="User/dispatcher" value="user"/>
                                      <RadioButton name="role" label="Administator" value="admin"/>
                                  </RadioButtonGroup>
                                  <p>Temporary password will be assigned.</p>
                              </div> : null
                      }
                  </div>
              </form>
          </div>
      );
  }
}

export default UserInvite;
