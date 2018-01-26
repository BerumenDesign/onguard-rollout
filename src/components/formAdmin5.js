import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const TextForm2 = () => (
  <div className="container">
  <form>
    <h2>Add company</h2>
    <h3>All fields are required</h3>
    <div className="formRow">
    <div className="profileBusiness"></div>
    <FlatButton label="ADD COMPANY LOGO" primary={true}/>
  </div>
  <div className="formRow">
  <div className="formColumn">
    <h4>Company info</h4>
    <TextField
      floatingLabelText="Company Name"
      floatingLabelFixed={false}
    />
    <br />
    <TextField
      floatingLabelText="Company phone"
      floatingLabelFixed={false}
    />
    <br />
    <TextField
      floatingLabelText="Email (Optional)"
      floatingLabelFixed={false}
    />
    <br />
    <TextField
      floatingLabelText="Mobile phone number"
      floatingLabelFixed={false}
    />
    <br />
  </div>
    <div className="formColumn">
    <h4>Company address</h4>
    <TextField
      floatingLabelText="Address"
      floatingLabelFixed={false}
    /><br />
    <TextField
      hintText="City"
      floatingLabelText="Password"
      type="password"
    /><br />
    <TextField
      hintText="Password"
      floatingLabelText="Confirm password"
      type="password"
    /><br />
  </div>
</div>
  <div className="formButton">
    <FlatButton label="Cancel" />
    <RaisedButton label="Continue"  primary={true} />
  </div>
  </form>
</div>
);

export default TextForm2;
