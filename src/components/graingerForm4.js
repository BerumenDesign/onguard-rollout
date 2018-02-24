import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

const GraingerForm4 = () => (<div class="container">
  <form>
      <h2>Add Web ERC user</h2>
      <h3>All fields are required</h3>

    <div className="formRow">
      <div className="formColumn">
        <h4>User info</h4>
        <TextField floatingLabelText="First name" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Last name" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Email" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Mobile phone number" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="IMEI number (optional)" floatingLabelFixed={false}/>
        <br/>
      </div>
      <div className="formColumn">
        <h4>Select user type <FontIcon className="material-icons">info</FontIcon></h4>
        <Checkbox label="ERC user (Web)"/><br/>
        <Checkbox label="External user"/>
      </div>
      <div className="formColumn">
        <h4>Select ERC user role <FontIcon className="material-icons">info</FontIcon></h4>
        <Checkbox label="User/dispatcher"/><br/>
        <Checkbox label="Administator"/>
      </div>
    </div>
    <div className="formButton">
      <h4>Temporary password will be assigned.</h4>
      <FlatButton label="Cancel"/>
      <RaisedButton label="Continue" primary={true}/>
    </div>
  </form>
</div>);

export default GraingerForm4;
