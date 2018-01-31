import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Imei from './Imei';
import Validation from '../../utils/validation';

class PrepaidValidator extends React.Component {
    constructor() {
      super();
      this.state = {
        imei: '',
        verified: false
      };
      this.onChange = this.onChange.bind(this);
      this.verify = this.verify.bind(this);
    }
    onChange(imei) {
      this.setState({imei});
    }
    verify() {
        Validation.IMEI(this.state.imei).then(function() {
            //verify IMEI with some API call and return data to onValidated prop function
            this.props.onValidated({
                plan: 'LITE PTT LW',
                feats: ['24/7 ERC Monitoring', 'Indoor location / custom map overlays', 'Personal gas detector support'],
                expire: 'January 25, 2019'
            });
            this.setState({verified: true});
        }.bind(this)).catch(function() {
            //handle invalid IMEI
        });
    }
    render() {
      return (
        <div className="formRow">
          <div className="formColumn">
            <h4>Use prepaid program</h4>
            <p>Enter 1 IMEI from the batch of phones purchased to lookup prepaid program eligibility</p>
            <Imei name="imei" value={this.state.imei} onChange={this.onChange} disabled={this.state.verified} />
            <br/>
            {this.state.verified ? <div>VERIFIED CODE</div> : <RaisedButton label="Verify code" onClick={this.verify} />}
  
            {
                this.state.verified ?
                    (
                        <Paper zDepth={1} className="activePlan">
                            <h4>Your plan is now active</h4>
                            <p>Active until {this.props.billing.expire}</p>
                            <Divider/>
                            <h5>Prepaid billing plan</h5>
                            <h4>{this.props.billing.plan}</h4>
                            <p>This plan includes the following add ons</p>
                            <ul>
                                {
                                    this.props.billing.feats.map((feat) => (<li>{feat}</li>))
                                }
                            </ul>
                        </Paper>
                    ) : null
            }
          </div>
        </div>
      );
    }
};

export default PrepaidValidator;