import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const FormCreateGroupa = () => (<div>
  <div>
// Please add S60 svg logo here
  </div>

  <div class="container smallContainer">
    <form>
      <h2>Use prepaid program</h2>
      <TextField floatingLabelText="Enter Grainger invoice number" fullWidth={true}/><br/>
      <TextField floatingLabelText="Enter first IMEI from invoice" fullWidth={true}/>
      <RaisedButton className="fullButton verifyButton" label="Verify code" primary={true} fullWidth={true}/><br/>
      <div className="center">
        VERIFIED CODE
      </div>
      <div class="loginButton">
        <RaisedButton label="Continue" disabled={true} fullWidth={true}/><br/>
      </div>
    </form>
  </div>
</div>);

export default FormCreateGroupa;
