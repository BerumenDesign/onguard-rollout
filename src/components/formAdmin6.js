import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const TextForm6 = () => (
  <div className="formRowCenter">
    <h2>Congratulations</h2>
    <p>Your admin account has been created</p>

    <h3>Do you want to create a group and invite users?</h3>
    <RaisedButton label="YES, LET'S DO IT NOW" primary={true}/> <br />
    <FlatButton label="OR DO IT LATER IN GROUP SETTINGS" primary={false}/>
  </div>
);

export default TextForm6;
