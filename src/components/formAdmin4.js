import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const TextForm4 = () => (<div class="container">
  <div className="formRow">
    <div className="formColumn">
      <h2>Payment info (optional)</h2>
      <p>To ensure no interruption of service please enter alternative payment information to be used after the prepaid plan has expired</p>

      <RaisedButton label="Enter payment method" primary={true}/>

    </div>

  </div>
  <div className="formButton">
    <FlatButton label="Cancel"/>
    <RaisedButton label="Continue" primary={true}/>
  </div>
</div>);

export default TextForm4;
