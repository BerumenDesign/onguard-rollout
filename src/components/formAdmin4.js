import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class TextForm4 extends React.Component {
  constructor() {
    super();
    this.state = { showPaymentForm: false };
    this.showPaymentForm = this.showPaymentForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  showPaymentForm() {
    this.setState({ showPaymentForm: true });
  }
  onChange(data) {
    this.props.onChange({ billing: {...this.props.billing, payment: data }});
  }
  render() {
    return (
      <div>
        {
          !this.state.showPaymentForm ?
            (
              <div className="formRow">
                <div className="formColumn">
                  <h2>Payment info (optional)</h2>
                  <p>To ensure no interruption of service please enter alternative payment information to be used after the prepaid plan has expired</p>
          
                  <RaisedButton label="Enter payment method" primary={true} onClick={this.showPaymentForm}/>
          
                </div>
              </div>
            ) : null
        }
    
        {this.state.showPaymentForm ? <PaymentForm payment={this.props.billing.payment} onChange={this.onChange} /> : null}
      </div>
    );
  }
};

const PaymentForm = ({payment, onChange}) => {
  const _onChange = (e) => {
    onChange({...payment, [e.target.name]: e.target.value});
  };
  return (
    <div className="formRow">
      <div className="formColumn">
        <h2>Payment info (optional)</h2>
        <p>To ensure no interruption of service please enter alternative payment information to be used after the prepaid plan has expired</p>
  
        <h4>Select payment method</h4>
        <RadioButtonGroup name="type" onChange={_onChange}>
          <RadioButton value="preauthorized" label="Credit card"/>
          <RadioButton value="other" label="Other payment method"/>
        </RadioButtonGroup>

        {
          payment.type === 'other' ? 
            (
              <div>
                <p>We will contact you soon to set up a payment method.</p>
  
                {/* This text is added if the user chose to add other payment method while it is 30 days free trial */}
                <p className="totalAddOns">Enjoy your 30-day free trail</p>

                {/* This text is changed if the user chose to add other payment method while it is on prepaid program */}
                <p className="totalAddOns">Your account will be active for a year, January 25, 2018.</p>
              </div>
            ) : null
        }
  
      </div>
    </div>
  );
}

export default TextForm4;