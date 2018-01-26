import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const TextForm1 = () => (<div class="container">
  <form>
      <h2>Create admin account</h2>
      <h3>All fields are required</h3>

    <div className="formRow">
      <div className="formColumn">
        <h4>Basic info</h4>
        <TextField floatingLabelText="First name" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Last name" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Email" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Mobile phone number" floatingLabelFixed={false}/>
        <br/>
      </div>
      <div className="formColumn">
        <h4>Login credentials</h4>
        <TextField floatingLabelText="Username" floatingLabelFixed={false}/>
        <br/>
        <TextField floatingLabelText="Password" floatingLabelFixed={false}/>
        <br/>
      </div>
    </div>
    <div className="formButton">
      <FlatButton label="Cancel"/>
      <RaisedButton label="Continue" primary={true}/>
    </div>
  </form>
</div>);

export default TextForm1;
