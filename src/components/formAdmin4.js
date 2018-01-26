import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const TextForm4 = () => (<div class="container">
  <div className="formRow">
    <div className="formColumn">
      <h2>Congratulations</h2>
      <h3>Your admin account has been created</h3>

    <h4>Do you want to create a group and invite users?</h4>
  <RaisedButton label="YES, LET’S DO IT" primary={true} />
  <FlatButton label="NO, I WILL DO IT LATER" />

    </div>
  </div>
</div>);

export default TextForm4;
