import React from 'react';
import TextField from 'material-ui/TextField';
import CountrySelector from '../common/CountrySelector';
import StateSelector from '../common/StateSelector';

const Address = ({address, city, zip, country, state, onChange}) => {
    const _onChange = (e) => {
      onChange({address, city, zip, country, state, [e.target.name]: e.target.value});
    };
    const onCountryChange = (_country) => {
      onChange({address, city, zip, state, country: _country});
    };
    const onStateChange = (_state) => {
      onChange({address, city, zip, country, state: _state});
    };
    return (
      <div>
        <TextField floatingLabelText="Address" floatingLabelFixed={false} name="address" address={address} onChange={_onChange} />
        <br/>
        <TextField floatingLabelText="City" floatingLabelFixed={false} name="city" value={city} onChange={_onChange} />
        <br/>
        <TextField floatingLabelText="Postal code" floatingLabelFixed={false} name="zip" value={zip} onChange={_onChange} />
        <br/>
        <CountrySelector name="country" value={country} onChange={onCountryChange} />
        <br/>
        <StateSelector name="state" value={state} country={country} onChange={onStateChange} />
        <br/>
      </div>
    )
};

export default Address;