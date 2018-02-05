import React from 'react';
import TextField from 'material-ui/TextField';
import RegionSelector from './common/RegionSelector';

class TextForm extends React.Component {
  componentDidMount() {
    let validation = this.props.validation;

    if (validation) {
      ['region', 'employeeCount'].forEach(function(field) {
        validation = this.validate(field);
      }, this);
      // initialize validation
      if (this.props.onValidation) {
        this.props.onValidation(validation);
      }
    }
  }
  onRegionChange(region) {
    this.props.onChange({region}, () => {
      let validation = this.validate('region');
      
      if (validation && this.props.onValidation) {
        validation.fields.region.dirty = true;
        this.props.onValidation(validation);
      }
    });
  }
  onEmployeeCountChange(e) {
    this.props.onChange({[e.target.name]: e.target.value}, () => {
      let validation = this.validate('employeeCount');
      
      if (validation && this.props.onValidation) {
        validation.fields.employeeCount.dirty = true;
        this.props.onValidation(validation);
      }
    });
  }
  validate(field) {
    let validation = this.props.validation;
    
    if (validation) {
      let valid = true;
      let errorMsg = null;
      
      switch (field) {
        case 'region':
          let region = this.props[field];
          valid = region && region.length;
          errorMsg = !valid ? 'You must select a region' : null;
          break;
        case 'employeeCount':
          let count = this.props[field];
          valid = count && count > 0;
          errorMsg = !valid ? 'Employee count must be greater than 1' : null;
      }

      validation.fields[field] = {...validation.fields[field], valid, errorMsg };
    }
    
    return validation;
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
