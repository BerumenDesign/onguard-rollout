import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

const FormAddUserInfo = () => (<div class="container">
  <form>
    <h2>Add users info</h2>

        <h3>All fields are required</h3>

      <div className="formRow">
        <div className="formColumn">
          <h4>Basic info</h4>
          <TextField floatingLabelText="First name" floatingLabelFixed={false}/>
          <TextField floatingLabelText="Last name" floatingLabelFixed={false}/>
          <TextField floatingLabelText="Email" floatingLabelFixed={false}/>
          <TextField floatingLabelText="Mobile phone number" floatingLabelFixed={false}/>
          <TextField floatingLabelText="IMEI number (optional)" floatingLabelFixed={false}/>
        </div>
        <div className="formColumn">
          <h4>Select user type</h4>
          <Checkbox label="Lone worker user (mobile)"/>
          <Checkbox label="ERC user (Web)"/>
          <Checkbox label="External user"/>
        </div>
        <div className="formColumn">
          <h4>Select user type</h4>
          <Checkbox label="User/dispatcher"/>
          <Checkbox label="Administator"/>
          <p>Temporary password will be assigned.</p>
        </div>
      </div>
      <div className="formButton">
        <FlatButton label="Cancel"/>
        <RaisedButton label="Continue" primary={true}/>
      </div>
    </form>

</div>);

export default FormAddUserInfo;
