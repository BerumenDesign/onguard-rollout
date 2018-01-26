import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';

const TextForm3 = () => (<div class="container">
  <form>
    <h2>Choose service plan</h2>
    <h3>All fields are required</h3>
    <h4>Billing plan</h4><br/>
    <RadioButtonGroup name="Billing">
      <RadioButton value="prepaidProgram" label="Use prepaid program"/>
      <RadioButton value="tierProgram" label="Select tier"/>
    </RadioButtonGroup>
    <div className="formRow">
      <div className="formColumn">
        <h4>Use prepaid program</h4>
        <p>Enter 1 IMEI from the batch of phones purchased to lookup prepaid program eligibility</p>
        <TextField floatingLabelText="Enter IMEI"/>
        <br/>
        <RaisedButton label="Verify code"/>

        <Paper zDepth={1} className="activePlan">
          <h4>Your plan is now active</h4>
          <p>Active until January 25, 2018</p>
          <Divider/>
          <h5>Prepaid billing plan</h5>
          <h4>LITE PTT LW</h4>
          <p>This plan includes the following add ons</p>
          <ul>
            <li>24/7 ERC Monitoring</li>
            <li>Indoor location / custom map overlays</li>
            <li>Personal gas detector support</li>
          </ul>
        </Paper>
      </div>
    </div>

    <div class="formButton">
      <FlatButton label="Cancel"/>
      <RaisedButton label="Continue" primary={true}/>
    </div>
  </form>
</div>);

export default TextForm3;
