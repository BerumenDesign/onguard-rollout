import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import RegionSelector from './common/RegionSelector';

class TextForm extends React.Component {
  onRegionChange(region) {
    this.props.onChange({region});
  }
  onEmployeeCountChange(e) {
    this.props.onChange({[e.target.name]: e.target.value});
  }
  render() {
    return (
      <form>
        <h2>Data Center Region</h2>
        <h3>All fields are required</h3>
        <div className="formRow">
          <div className="formColumn">
            <RegionSelector onChange={this.onRegionChange.bind(this)} value={this.props.region} />
            <br/>
            <TextField name="employeeCount" floatingLabelText="Estimated number of employees" floatingLabelFixed={false} onChange={this.onEmployeeCountChange.bind(this)} value={this.props.employeeCount} />
            <br/>
          </div>
        </div>
        <div className="formButton">
          <FlatButton label="Cancel"/>
          <RaisedButton label="Continue" primary={true}/>
        </div>
      </form>
    );
  }
};

export default TextForm;
