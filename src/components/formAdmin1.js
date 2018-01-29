import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const TextForm1 = (props) => {
  const onChange = (e) => {
    props.onChange({ user: {...props.user, [e.target.name]: e.target.value} });
  };
  return (
    <form>
      <h2>Create admin account</h2>
      <h3>All fields are required</h3>

      <div className="formRow">
        <div className="formColumn">
          <h4>Basic info</h4>
          <TextField floatingLabelText="First name" name="firstName" floatingLabelFixed={false} onChange={onChange} />
          <br/>
          <TextField floatingLabelText="Last name" name="lastName" floatingLabelFixed={false} onChange={onChange} />
          <br/>
          <TextField floatingLabelText="Mobile phone number" name="phone" floatingLabelFixed={false} onChange={onChange} />
          <br/>
        </div>
        <div className="formColumn">
          <h4>Login credentials</h4>
          <TextField floatingLabelText="Username" name="email" floatingLabelFixed={false} onChange={onChange} />
          <br/>
          <TextField floatingLabelText="Password" name="password" floatingLabelFixed={false} onChange={onChange} />
          <br/>
        </div>
      </div>
      <div className="formButton">
        <FlatButton label="Cancel"/>
        <RaisedButton label="Continue" primary={true}/>
      </div>
    </form>
  );
}

export default TextForm1;
