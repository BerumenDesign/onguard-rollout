import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const TextForm3a = () => (<div class="container">
  <form>
    <h2>Choose service plan</h2>
    <h3>All fields are required</h3>
    <h4>Billing plan</h4>
    <RadioButtonGroup name="Billing">
      <RadioButton value="prepaidProgram" label="Use prepaid program"/>
      <RadioButton value="tierProgram" label="Select tier"/>
    </RadioButtonGroup>

    <div className="formRow">
      <div className="formColumn">
        <h2>Select tier</h2>
        <h3>Start your 30-day free trail.</h3>
      </div>
    </div>

    <div class="formRow">
      <div class="formColumn">
        <h4>Select billing plan</h4>
        <RadioButtonGroup name="selectTiers">
          <RadioButton value="litePTT" label={[
              "LITE PTT LW", <br/>,
              <span className="optionText">$10 per user / month</span>
            ]}/>
          <RadioButton value="premium" label={[
              "PREMIUM", <br/>,
              <span className="optionText">$15 per user / month</span>
            ]}/>
        </RadioButtonGroup>
      </div>
      <div class="formColumn">
        <h4>Include add ons (Optional)</h4>
        <RadioButtonGroup name="addons">
          <RadioButton value="noAddOns" label="Do not include add ons"/>
          <RadioButton value="allAddOns" label={[
              "Include all add ons", <br/>,
              <span className="optionText">$10 per user / month</span>,
              <ul>
                <li>24/7 ERC Monitoring</li>
                <li>Indoor location / custom map overlays</li>
                <li>Personal gas detector support</li>
              </ul>
            ]}/>
          <RadioButton value="selectAddOns" label={[
              "Select add ons", <br/>,
              <span className="optionText">$5 each per user / month</span>
            ]}/>
        </RadioButtonGroup>
      </div>
      <div class="formColumn">
        <h4>Select add ons</h4>
        <Checkbox label={[
            "24/7 ERC Monitoring", <br/>,
            <span className="optionText">$5 per user / month</span>
          ]}/>
        <Checkbox label={[
            "Indoor location / custom map overlays", <br/>,
            <span className="optionText">$5 per user / month</span>
          ]}/>
        <Checkbox label={[
            "Personal gas detector support", <br/>,
            <span className="optionText">$5 per user / month</span>
          ]}/>
        <p className="totalAddOns">2 add ons = $10 per user/month</p>

      </div>

    </div>
    <div className="formButton">
      <FlatButton label="Cancel"/>
      <RaisedButton label="Continue" primary={true}/>
    </div>
  </form>

</div>);

export default TextForm3a;
