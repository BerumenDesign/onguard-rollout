import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const TextForm4a = () => (<div class="container">
  <div className="formRow">
    <div className="formColumn">
      <h2>Payment info (optional)</h2>
      <p>To ensure no interruption of service please enter alternative payment information to be used after the prepaid plan has expired</p>

      <h4>Select payment method</h4>
      <RadioButtonGroup name="paymentMethod">
        <RadioButton value="creditCard" label="Credit card"/>
        <RadioButton value="otherMethod" label="Other payment method"/>
      </RadioButtonGroup>

      <p>We will contact you soon to set up a payment method.</p>

      {/* This text is added if the user chose to add other payment method while it is 30 days free trial */}
      <p className="totalAddOns">Enjoy your 30-day free trail</p>

      {/* This text is changed if the user chose to add other payment method while it is on prepaid program */}
      <p className="totalAddOns">Your account will be active for a year, January 25, 2018.</p>

    </div>
  </div>
  <div className="formButton">
    <FlatButton label="Cancel"/>
    <RaisedButton label="Continue" primary={true}/>
  </div>
</div>);

export default TextForm4a;
