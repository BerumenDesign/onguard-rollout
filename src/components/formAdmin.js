import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';



const TextForm = () => (<div class="container">
  <form>
    <h2>Data Center Region</h2>
    <h3>All fields are required</h3>
    <div className="formRow">
      <div className="formColumn">
        <SelectField autoWidth={true} floatingLabelText="Select region">
          <MenuItem value={1} primaryText="Select list for region"/>
        </SelectField >
        <br/>
        <TextField floatingLabelText="Estimated number of employees" floatingLabelFixed={false}/>
        <br/>

      </div>
    </div>
    <div className="formButton">
      <FlatButton label="Cancel"/>
      <RaisedButton label="Continue" primary={true}/>
    </div>
  </form>
</div>);

export default TextForm;
