import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const FormCreateGroup = () => (<div class="container">
  <form>
    <h2>Create group</h2>
    <TextField floatingLabelText="Enter IMEI"/>

    <h4>Select monitoring method</h4>
    <RadioButtonGroup name="monitorMethod">
      <RadioButton value="selfMonitor" label={["Self monitoring", <br/>,
      <span className="optionText">Self-monitoring will use your own company and safety team to monitor via the OnGuard Web ERC</span>]}/>
      <RadioButton value="thirdPartyMonitor" label="3rd Party Monitoring"/>
    </RadioButtonGroup>
  </form>
  <div class="formButton">
    <FlatButton label="Cancel"/>
    <RaisedButton label="Continue" primary={true}/>
  </div>
</div>);

export default FormCreateGroup;
