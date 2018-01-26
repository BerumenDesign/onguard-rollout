import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';

const TextForm3a = () => (<div class="container">
  <form>
    <h2>Choose service plan</h2>
    <h3>All fields are required</h3>
    <h4>Billing plan</h4><br/>
    <RadioButtonGroup name="Billing">
      <RadioButton value="prepaidProgram" label={["This is , <strong>not</strong>,  working."]}/>
      <RadioButton value="tierProgram" label="Select tier"/>
    </RadioButtonGroup>

    <div class="formRow">
      <div class="formColumn">

        <h4>Billing plan</h4>
        <label><input type="radio" name="gender" value="male"/>
          LITE PTT LW<br/>
          <span className="optionText">$10 per user/month</span><br/></label>
        <label><input type="radio" name="gender" value="male"/>
          PREMIUM<br/>
          <span className="optionText">$15 per user/month</span><br/></label>
      </div>
      <div class="formColumn">
        <h4>Include add ons (Optional)</h4>
        <label><input type="radio" name="gender" value="male"/>Do not include add ons</label><br/>
        <label><input type="radio" name="gender" value="male"/>
          Include all add ons<br/>
          <span className="optionText">$10 per user / month</span><br/>
          <ul>
            <li>24/7 ERC Monitoring</li>
            <li>Indoor location / custom map
overlays</li>
            <li>Personal gas detector support</li>
          </ul>
        </label>
        <label><input type="radio" name="gender" value="male"/>
          Include all add ons<br/>
          <span className="optionText">$10 per user / month</span><br/>
          <ul>
            <li><label><input type="Checkbox"/> 24/7 ERC Monitoring <br/> <span class="optionText">$5 per user/month</span></label></li>
            <li><label><input type="Checkbox"/> Indoor location / custom
map overlays <br/> <span class="optionText">$5 per user/month</span></label></li>
            <li><label><input type="Checkbox"/> Personal gas detector
support <br/> <span class="optionText">$5 per user/month</span></label></li>
          </ul>
        </label>
      </div>

    </div>
    <div className="formButton">
      <FlatButton label="Cancel"/>
      <RaisedButton label="Continue" primary={true}/>
    </div>
  </form>

</div>);

export default TextForm3a;
