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
  const onTierChange = (data) => {
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

      {props.billing.type === 'prepaid' ? <PrepaidValidator billing={props.billing} onValidated={onValidated} /> : null}
      {props.billing.type === 'tier' ? <TierSelector billing={props.billing} onChange={onTierChange} /> : null}
    </form>
  );
};

class TierSelector extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onFeatChange = this.onFeatChange.bind(this);
  }
  onChange(e) {
    let _billing = {...this.props.billing};
    _billing[e.target.name] = e.target.value;
    this.props.onChange(_billing);
  }
  onFeatChange(feats) {
    let _billing = {...this.props.billing};
    _billing.feats = feats;
    this.props.onChange(_billing);
  }
  render() {
    return (
      <div class="formRow">
        <div class="formColumn">
          <h4>Select billing plan</h4>
          <RadioButtonGroup name="plan" onChange={this.onChange}>
            <RadioButton value="litePTT" label={[
                "LITE PTT LW", <br/>,
                <span className="optionText">$10 per user / month</span>
              ]}/>
            <RadioButton value="premium" label={[
                "PREMIUM", <br/>,
                <span className="optionText">$15 per user / month</span>
              ]}/>
          </RadioButtonGroup>
        </div>

        {
          this.props.billing.plan ?
            (
              <TierAddonsSelector feats={this.props.billing.feats} onChange={this.onFeatChange} />
            ) : null
        }
      </div>
    )
  }
};

class TierAddonsSelector extends React.Component {
  constructor() {
    super();
    this.state = {
      features: {
        'monitoring': false,
        'custom_overlays': false,
        'gas_detector': false
      }
    };
    this.onChange = this.onChange.bind(this);
    this.notifyParent = this.notifyParent.bind(this);
  }
  onChange(e) {
    this.setState({ features: {...this.state.features, [e.target.name]: e.target.checked} }, this.notifyParent);
  }
  notifyParent() {
    this.props.onChange(Object.keys(this.state.features).filter(feat => this.state.features[feat], this));
  }
  render() {
    return (
      <div>
         <div class="formColumn">
          <h4>Include add ons (Optional)</h4>
          {/* <RadioButtonGroup name="addons">
            <RadioButton value="noAddOns" label="Do not include add ons"/>
            <RadioButton value="allAddOns" label={[
                "Include all add ons", <br/>,
                <span className="optionText">$10 per user / month</span>,
                <ul>
                  <li>24/7 ERC Monitoring</li>
                  <li>Indoor location / custom map overlays</li>
                  <li>Personal gas detector support</li>
                </ul>
              ]}/>
            <RadioButton value="selectAddOns" label={[
                "Select add ons", <br/>,
                <span className="optionText">$5 each per user / month</span>
              ]}/>
          </RadioButtonGroup>
        </div> */}
        {/* <div class="formColumn"> */}
          <h4>Select add ons</h4>
          <Checkbox name="monitoring" label={[
              "24/7 ERC Monitoring", <br/>,
              <span className="optionText">$5 per user / month</span>
            ]} onCheck={this.onChange} />
          <Checkbox name="custom_overlays" label={[
              "Indoor location / custom map overlays", <br/>,
              <span className="optionText">$5 per user / month</span>
            ]} onCheck={this.onChange} />
          <Checkbox name="gas_detector" label={[
              "Personal gas detector support", <br/>,
              <span className="optionText">$5 per user / month</span>
            ]} onCheck={this.onChange} />
          <p className="totalAddOns">2 add ons = $10 per user/month</p>
        </div>
      </div>
    );
  }
};

export default TextForm3;
