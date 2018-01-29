import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Address from './common/Address';

const TextForm2 = (props) => {
  const onChange = (e) => {
    props.onChange({ company: {...props.company, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value} });
  };
  const onAddressChange = (data) => {
    let company = {...props.company};
    company.address = data;
    props.onChange({company});
  };
  const onBillingChange = (data) => {
    let company = {...props.company};
    company.billing = data;
    props.onChange({company});
  }
  return (
    <form>
      <h2>Add company</h2>
      <h3>All fields are required</h3>
      <div className="formRow">
        <div className="formColumn">
          <h4>Company info</h4>
          <TextField floatingLabelText="Company Name" floatingLabelFixed={false} name="name" onChange={onChange} />
          <br/>
          <TextField floatingLabelText="Company phone" floatingLabelFixed={false} name="phone" onChange={onChange} />
          <br/>
          <TextField floatingLabelText="Email (Optional)" floatingLabelFixed={false} name="email" onChange={onChange} />
          <br/>
        </div>
        <div className="formColumn">
          <h4>Company address</h4>
          <Address 
            address={props.company.address.address}
            city={props.company.address.city}
            zip={props.company.address.zip}
            country={props.company.address.country}
            state={props.company.address.state}
            onChange={onAddressChange} />
        </div>
        <div className="formColumn">
          <h4>Billing address</h4>
          <Checkbox label="Same as company address" onCheck={onChange} name="sameAsCompanyAddress" checked={props.company.sameAsCompanyAddress} /><br/>
          {
            props.company.sameAsCompanyAddress ? null : (
              <Address 
                address={props.company.billing.address}
                city={props.company.billing.city}
                zip={props.company.billing.zip}
                country={props.company.billing.country}
                state={props.company.billing.state}
                onChange={onBillingChange} />
            )
          }
        </div>
      </div>
    </form>
  );
};

export default TextForm2;
