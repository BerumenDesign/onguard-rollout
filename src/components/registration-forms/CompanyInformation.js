import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Address from '../common/Address';
import Validation from '../../utils/validation';
import i18n from '../../utils/i18n';

class TextForm2 extends React.Component {
  constructor() {
    super();
    this.state = {
      addressValidation: {valid: false, fields: {}},
      billingValidation: {valid: false, fields: {}}
    };
    this.onChange = this.onChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onAddressValidation = this.onAddressValidation.bind(this);
    this.onBillingChange = this.onBillingChange.bind(this);
    this.onBillingValidation = this.onBillingValidation.bind(this);
    this.validate = this.validate.bind(this);
    this.showError = this.showError.bind(this);
    this.toggleSameAddress = this.toggleSameAddress.bind(this);
  }
  componentDidMount() {
    let __validation = {...this.props.validation};
    const fields = ['name', 'phone', 'email'];

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
          this.props.onValidation(__validation);
        }
      }.bind(this)).catch(function(err) {
        console.error('formAdmin2.init.validation.failed ', err);
      });
    }
  }
  onChange(e) {
    const fieldName = e.target.name;
    this.props.onChange({ company: {...this.props.company, [fieldName]: e.target.type === 'checkbox' ? e.target.checked : e.target.value} }, function() {
      this.validate(fieldName)
        .then(function(__validation) {
          if (__validation && this.props.onValidation) {
            __validation.fields[fieldName].dirty = true; //set state to dirty so we can show error if applicable
            this.props.onValidation(__validation);
          }
        }.bind(this))
        .catch(function() {
          console.error('formAdmin1.validation.failed', this.props.validation);
        }.bind(this));
    }.bind(this));
  }
  onAddressChange(data, cb) {
    let company = {...this.props.company};
    company.address = data;
    this.props.onChange({company}, cb);
  }
  onAddressValidation(addressValidation) {
    this.setState({ addressValidation }, function() {
      if (this.props.onValidation) {
        let _main_validation = {...this.props.validation};

        if (!_main_validation.fields) {
          _main_validation.fields = {};
        }

        ['address', 'city', 'zip', 'country', 'state'].forEach((field) => _main_validation.fields['address.' + field ] = addressValidation.fields[field] );

        this.props.onValidation(_main_validation);
      }
    });
  }
  onBillingChange(data, cb) {
    let company = {...this.props.company};
    company.billing = data;
    this.props.onChange({company}, cb);
  }
  onBillingValidation(billingValidation) {
    this.setState({ billingValidation }, function() {
      if (this.props.onValidation) {
        let _main_validation = {...this.props.validation};

        ['address', 'city', 'zip', 'country', 'state'].forEach((field) => _main_validation.fields['billing.' + field ] = billingValidation.fields[field] );

        this.props.onValidation(_main_validation);
      }
    });
  }
  validate(field) {
    return new Promise(function (resolve, reject) {
      let validation = {...this.props.validation};

      if (validation) {
        let valid = true;
        let errorMsg = null;
        let _promise = null;

        switch (field) {
          case 'name':
            errorMsg = i18n.string('error_company_name_required');
            _promise = Validation.name(this.props.company[field]);
            break;
          case 'phone':
            errorMsg = i18n.string('error_invalid_phone_number');
            _promise = Validation.phone(this.props.company[field]);
            break;
          case 'email':
            errorMsg = i18n.string('error_invalid_email_address');
            _promise = Validation.email(this.props.company[field], true);
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
  toggleSameAddress(e) {
    let checked = e.target.checked;
    let company = {...this.props.company};

    company.sameAsCompanyAddress = checked;

    if (checked) {
      // remove billing address,
      company.billing = {};
    }

    this.props.onChange({company}, function() {
      if (checked && this.props.validation && this.props.onValidation) {
        // remove billing validation
        let validation = {...this.props.validation};
        ['billing.address', 'billing.city', 'billing.zip', 'billing.country', 'billing.state'].forEach(key => delete validation.fields[key]);
        this.props.onValidation(validation);
      }
    }.bind(this));
  }
  render() {
    return (
      <form>
        <h2>{i18n.string('label_add_company')}</h2>
        <h3>{i18n.string('label_all_fields_required')}</h3>
        <div className="formRow">
          <div className="formColumn">
            <h4>Company info</h4>
            <TextField floatingLabelText={i18n.string('label_company_name')} floatingLabelFixed={false} name="name" value={this.props.company.name} onChange={this.onChange} errorText={this.showError('name')} />
            <br/>
            <TextField floatingLabelText={i18n.string('label_company_phone')} floatingLabelFixed={false} name="phone" value={this.props.company.phone} onChange={this.onChange} errorText={this.showError('phone')} />
            <br/>
            <TextField floatingLabelText={i18n.string('label_email') + ' (' + i18n.string('label_optional') + ')'} floatingLabelFixed={false} name="email" value={this.props.company.email} onChange={this.onChange} errorText={this.showError('email')} />
            <br/>
          </div>
          <div className="formColumn">
            <h4>{i18n.string('label_company_address')}</h4>
            <Address
              address={this.props.company.address.address}
              city={this.props.company.address.city}
              zip={this.props.company.address.zip}
              country={this.props.company.address.country}
              state={this.props.company.address.state}
              onChange={this.onAddressChange}
              validation={this.state.addressValidation}
              onValidation={this.onAddressValidation} />
          </div>
          <div className="formColumn">
            <h4>{i18n.string('label_billing_address')}</h4>
            <Checkbox label={i18n.string('label_same_as_company_address')} onCheck={this.toggleSameAddress} name="sameAsCompanyAddress" checked={this.props.company.sameAsCompanyAddress} /><br/>
            {
              this.props.company.sameAsCompanyAddress ? null : (
                <Address
                  address={this.props.company.billing.address}
                  city={this.props.company.billing.city}
                  zip={this.props.company.billing.zip}
                  country={this.props.company.billing.country}
                  state={this.props.company.billing.state}
                  onChange={this.onBillingChange}
                  validation={this.state.billingValidation}
                  onValidation={this.onBillingValidation} />
              )
            }
          </div>
        </div>
      </form>
    );
  }
};

export default TextForm2;
