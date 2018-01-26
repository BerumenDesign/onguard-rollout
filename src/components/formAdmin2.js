import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const TextForm2 = () => (<div class="container">
  <form>
    <h2>Add company</h2>
    <h3>All fields are required</h3>
    <div className="formRow">
      <div className="formColumn">
        <h4>Company info</h4>
        <TextField floatingLabelText="Company Name" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Company phone" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Email (Optional)" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Mobile phone number" floatingLabelFixed={false}/>
        <br/>
      </div>
      <div className="formColumn">
        <h4>Company address</h4>
        <TextField floatingLabelText="Address" floatingLabelFixed={false}/><br/>
        <TextField hintText="City" floatingLabelText="City"/><br/>
        <TextField hintText="Postal code" floatingLabelText="Postal code"/><br/>
        <SelectField autoWidth={true} floatingLabelText="State / province">
          <MenuItem value={1} primaryText="Select list for state"/>
        </SelectField >
        <br/>
        <SelectField autoWidth={true} floatingLabelText="Country">
          <MenuItem value={1} primaryText="Select list for country"/>
        </SelectField >
        <br/>
      </div>
      <div className="formColumn">
        <h4>Billing address</h4>
        <Checkbox label="Same as company address"/><br/>
        <TextField floatingLabelText="Address" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="City" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Postal code" floatingLabelFixed={false}/>
        <br/>
        <SelectField autoWidth={true} floatingLabelText="State / province">
          <MenuItem value={1} primaryText="Select list for state"/>
        </SelectField >
        <br/>
        <SelectField autoWidth={true} floatingLabelText="Country">
          <MenuItem value={1} primaryText="Select list for country"/>
        </SelectField >
        <br/>
      </div>
    </div>
    <div className="formButton">
      <FlatButton label="Cancel"/>
      <RaisedButton label="Continue" primary={true}/>
    </div>
  </form>
</div>);

export default TextForm2;
