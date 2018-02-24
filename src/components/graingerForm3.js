import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const GraingerForm3 = () => (<div class="container">
  <div className="formRowCenter">
    <h2>Congratulations</h2>
    <p>Your admin account has been created</p>

    <h3>Do you want to create a group and invite users?</h3>
    <RaisedButton label="Enter payment method" primary={true}/>
    <FlatButton label="OR DO IT LATER IN USER ADMIN TOOL" primary={false}/>
  </div>
</div>);

export default GraingerForm3;
