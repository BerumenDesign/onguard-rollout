import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types'

const TextForm6 = (props) => (
  <div className="formRowCenter">
    <h2>Congratulations</h2>
    <p>Your admin account has been created</p>

    <h3>Do you want to invite users?</h3>
    <RaisedButton label="YES, LET'S DO IT NOW" primary={true} onClick={props.onContinue}/> <br />
    <FlatButton label="OR DO IT LATER IN GROUP SETTINGS" primary={false}/>
  </div>
);

TextForm6.propTypes = {
    onContinue: PropTypes.func.isRequired
};

export default TextForm6;
