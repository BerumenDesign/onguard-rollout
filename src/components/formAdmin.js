import React from 'react';
import TextField from 'material-ui/TextField';
import RegionSelector from './common/RegionSelector';
import Validation from '../utils/validation';

class TextForm extends React.Component {
  componentDidMount() {
    let validation = this.props.validation;

    console.log('validation:', validation);

    if (validation) {
      const fields = ['region', 'employeeCount'];
      let _validationPromises = [];
      fields.forEach(function(field) {
        _validationPromises.push(this.validate(field));
      }, this);
      
      Promise.all(_validationPromises).then(function(validations, i) {
        validations.forEach(function (validated) {
          if (fields[i] && validated) {
            validation.fields[fields[i]] = validated;
          }
        });
        console.log('formAdmin._validationPromises.then.validationObject', validation);
        // initialize validation
        if (this.props.onValidation) {
          this.props.onValidation(validation);
        }
      }.bind(this))
      .catch(function() {
        console.error('formAdmin.mounted.validation.failed');
      });
    }
  }
  onRegionChange(region) {
    this.props.onChange({region}, () => {
      this.validate('region')
        .then(function(validation) {
          if (validation && this.props.onValidation) {
            validation.fields.region.dirty = true;
            this.props.onValidation(validation);
          }
        }.bind(this))
        .catch(function() {
          console.error('formAdmin.onRegionChange.validate.failed');
        });
    });
  }
  onEmployeeCountChange(e) {
    this.props.onChange({[e.target.name]: parseInt(e.target.value)}, () => {
      this.validate('employeeCount')
        .then(function(validation) {
          if (validation && this.props.onValidation) {
            validation.fields.employeeCount.dirty = true;
            this.props.onValidation(validation);
          }
        }.bind(this))
        .catch(function() {
          console.error('formAdmin.onEmployeeCountChange.validate.failed');
        });
    });
  }
  validate(field) {
    return new Promise(function (resolve, reject) {
      let validation = this.props.validation;
    
      if (validation) {
        let valid = false;
        let errorMsg = null;
        let _promise = null;
        
        switch (field) {
          case 'region':
            // let region = this.props[field];
            // valid = region && region.length;
            _promise = Validation.dataCenterRegion(this.props[field]);
            errorMsg = 'You must select a region';
            break;
          case 'employeeCount':
            // let count = this.props[field];
            // valid = count && count > 0;
            _promise = Validation.count(this.props[field], 1, 1000000);
            errorMsg = 'Employee count must be greater than 1';
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
          })
      } else {
        reject();
      }
    }.bind(this));
    
    // return validation;
  }
  showError(field) {
    return this.props.validation && this.props.validation.fields && this.props.validation.fields[field] && this.props.validation.fields[field].dirty ? this.props.validation.fields[field].errorMsg : false;
  }
  render() {
    return (
      <form>
        <h2>Data Center Region</h2>
        <h3>All fields are required</h3>
        <div className="formRow">
          <div className="formColumn">
            <RegionSelector onChange={this.onRegionChange.bind(this)} value={this.props.region} error={this.showError('region')} />
            <br/>
            <TextField
              name="employeeCount"
              floatingLabelText="Estimated number of employees"
              floatingLabelFixed={false}
              errorText={this.showError('employeeCount')}
              onChange={this.onEmployeeCountChange.bind(this)}
              value={this.props.employeeCount} />
            <br/>
          </div>
        </div>
      </form>
    );
  }
};

export default TextForm;
