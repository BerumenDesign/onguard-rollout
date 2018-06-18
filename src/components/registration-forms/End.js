import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const end = (props) => {
  const newInvite = () => {
    props.onContinue('invite');
  };

  return (
    <div className="container">
      <div className="formRowCenter">
        <h2>You are good to go!</h2>

        <h3>Do you want invite more ERC users?</h3>
        <RaisedButton label="Invite ERC users" onClick={newInvite} secondary={false}/>
        <FlatButton label="OR DO IT LATER IN USER ADMIN TOOL" primary={false}/>

        <Paper zDepth={1} className="section">
          <p>To use the web ERC, users and admins can use this link</p>

          <FlatButton label="(Note: Add URL)" primary={false}/>
        </Paper>
      </div>
    </div>
  );
}

export default end;
