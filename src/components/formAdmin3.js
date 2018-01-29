import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import PrepaidValidator from './common/PrepaidValidator';

const TextForm3 = (props) => {
  const onChange = (e) => {
    props.onChange({ billing: {...props.billing, [e.target.name]: e.target.value} });
  }
  const onValidated = (data) => {
    props.onChange({ billing: {...props.billing, ...data} });
  }
  return (
    <form>
      <h2>Choose service plan</h2>
      <h3>All fields are required</h3>
      <h4>Billing plan</h4><br/>
      <RadioButtonGroup name="type" onChange={onChange} valueSelected={props.billing.type}>
        <RadioButton value="prepaid" label="Use prepaid program"/>
        <RadioButton value="tier" label="Select tier"/>
      </RadioButtonGroup>

      {props.billing.type === 'prepaid' ? <PrepaidValidator onValidated={onValidated} /> : null}
      {props.billing.type === 'tier' ? <TierSelector /> : null}
    </form>
  );
};

class TierSelector extends React.Component {
  render() {
    return <div>Tier Selector</div>;
  }
}

export default TextForm3;
