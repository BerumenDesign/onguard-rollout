import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Imei from './Imei';

class PrepaidValidator extends React.Component {
    constructor() {
      super();
      this.state = {
        imei: ''
      };
      this.onChange = this.onChange.bind(this);
      this.verify = this.verify.bind(this);
    }
    onChange(imei) {
      this.setState({imei});
    }
    verify() {
      //verify IMEI with some API call and return data to onValidated prop function
    }
    render() {
      return (
        <div className="formRow">
          <div className="formColumn">
            <h4>Use prepaid program</h4>
            <p>Enter 1 IMEI from the batch of phones purchased to lookup prepaid program eligibility</p>
            <Imei name="imei" value={this.state.imei} onChange={this.onChange} />
            <br/>
            <RaisedButton label="Verify code" onClick={this.verify} />
  
            <Paper zDepth={1} className="activePlan">
              <h4>Your plan is now active</h4>
              <p>Active until January 25, 2018</p>
              <Divider/>
              <h5>Prepaid billing plan</h5>
              <h4>LITE PTT LW</h4>
              <p>This plan includes the following add ons</p>
              <ul>
                <li>24/7 ERC Monitoring</li>
                <li>Indoor location / custom map overlays</li>
                <li>Personal gas detector support</li>
              </ul>
            </Paper>
          </div>
        </div>
      );
    }
};

export default PrepaidValidator;