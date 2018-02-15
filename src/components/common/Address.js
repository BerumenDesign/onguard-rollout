import React from 'react';
import TextField from 'material-ui/TextField';
import CountrySelector from '../common/CountrySelector';
import StateSelector from '../common/StateSelector';
import Validation from '../../utils/validation';

class Address extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.showError = this.showError.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    let __validation = {...this.props.validation};
    const fields = ['address', 'city', 'zip', 'country', 'state'];

    if (__validation) {
      let _validationPromises = [];
      
      fields.forEach(function(field) {
        _validationPromises.push(this.validate(field));
      }, this);

      if (!__validation.fields) {
        __validation.fields = {};
      }

      console.log('formAdmin2.validation.promises', _validationPromises);
      
      Promise.all(_validationPromises).then(function(_validations) {
        console.log('formAdmin2.validationsPromises.then', _validations);
        _validations.forEach(function (validated, i) {
          __validation.fields[fields[i]] = validated.fields[fields[i]];
        });

        // initialize validation
        if (__validation && this.props.onValidation) {
          console.log('formAdmin2.validationsPromises.then.validationObject', __validation);
          this.props.onValidation(__validation);
        }
      }.bind(this)).catch(function(err) {
        console.error('formAdmin2.init.validation.failed ', err);
      });
    }
  }
  onChange(e) {
    const field = e.target.name;
    const {address, city, zip, country, state} = this.props;
    this.props.onChange({address, city, zip, country, state, [field]: e.target.value}, function () {
      if (this.props.validation) {
        this.validate(field)
          .then(function(validation) {
            if (this.props.onValidation) {
              this.props.onValidation(validation);
            }
          })
          .catch(function() {
            console.error('Address.validation.failed', this.props.validation);
          });
      }
    }.bind(this));
  }
  onCountryChange(country) {
    const {address, city, zip, state} = this.props;
    this.props.onChange({address, city, zip, state, country}, function() {
      if (this.props.validation) {
        this.validate('country')
          .then(function(validation) {
            if (this.props.onValidation) {
              this.props.onValidation(validation);
            }
          })
          .catch(function() {
            console.error('Address.validation.failed', this.props.validation);
          });
      }
    });
  }
  onStateChange(state) {
    const {address, city, zip, country} = this.props;
    this.props.onChange({address, city, zip, country, state}, function() {
      if (this.props.validation) {
        this.validate('country')
          .then(function(validation) {
            if (this.props.onValidation) {
              this.props.onValidation(validation);
            }
          })
          .catch(function() {
            console.error('Address.validation.failed', this.props.validation);
          });
      }
    });
  }
  showError(field) {
    return this.props.validation && this.props.validation.fields && this.props.validation.fields[field] && this.props.validation.fields[field].dirty && !this.props.validation.fields[field].valid ? this.props.validation.fields[field].errorMsg : false;
  }
  validate(field) {
    return new Promise(function (resolve, reject) {
      let _validation = {...this.props.validation};
    
      if (_validation) {
        let valid = true;
        let errorMsg = null;
        let _promise = null;
        
        switch (field) {
          case 'address':
            errorMsg = 'Street Address is required';
            _promise = Validation.streetaddress(this.props.address);
            break;
          case 'city':
            errorMsg = 'City is required';
            _promise = Validation.city(this.props.city);
            break;
          case 'zip':
            errorMsg = 'Zip/Postal code is required';
            _promise = Validation.zip(this.props.zip);
            break;
          case 'country':
            errorMsg = 'Country is required';
            _promise = Validation.country(this.props.country);
            break;
          case 'state':
            errorMsg = 'State/Province is required';
            _promise = Validation.state(this.props.state);
            break;
          default:
            console.error('formAdmin1.validate.field.undefined ', field);
            reject();
        }

        //regardless of success or fail, we pass validation object back with updated data
        _promise
          .then(function() {
            if (!_validation.fields) {
              _validation.fields = {};
            }

            valid = true;
            errorMsg = null; //since validation passed, null the error
            _validation.fields[field] = {..._validation.fields[field], valid, errorMsg };
            
            resolve(_validation);
          }).catch(function() {
            if (!_validation.fields) {
              _validation.fields = {};
            }

            valid = false;
            _validation.fields[field] = {..._validation.fields[field], valid, errorMsg };
            
            resolve(_validation);
          });
      } else {
        console.log('Address.validate.validation.undefined ', _validation);
        reject();
      }
    
    // return validation
    }.bind(this));
  };
  render() {
    return (
      <div>
        <TextField floatingLabelText="Address" floatingLabelFixed={false} name="address" address={this.props.address} onChange={this.onChange} errorText={this.showError('address')} />
        <br/>
        <TextField floatingLabelText="City" floatingLabelFixed={false} name="city" value={this.props.city} onChange={this.onChange} errorText={this.showError('city')} />
        <br/>
        <TextField floatingLabelText="Postal code" floatingLabelFixed={false} name="zip" value={this.props.zip} onChange={this.onChange} errorText={this.showError('zip')} />
        <br/>
        <CountrySelector name="country" value={this.props.country} onChange={this.onCountryChange} errorText={this.showError('country')} />
        <br/>
        <StateSelector name="state" value={this.props.state} country={this.props.country} onChange={this.onStateChange} errorText={this.showError('state')} />
        <br/>
      </div>
    );
  }
};

export default Address;