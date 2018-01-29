import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const TextForm2 = () => (<div className="container">
  <form>
    <h2>Credit card info</h2>
    <div className="formRow">
      <div className="iframe">This is the iframe for payment method</div>
    </div>
    <div className="formButton">
      <FlatButton label="Cancel"/>
      <RaisedButton label="Continue" primary={true}/>
    </div>
  </form>
</div>);

export default TextForm2;
