import React from 'react';
import countries from '../../i18n/countries.json';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//Uses ISO 3166-1 alpha-2 https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes
const CountrySelector = (props) => {
    const onChange = (e, i, v) => {
      props.onChange(v);
    };
    return (
      <SelectField autoWidth={true} floatingLabelText="Country" value={props.value} onChange={onChange}>
        <MenuItem value="" primaryText="" />
        {
          countries.map(country => <MenuItem key={country['alpha-2']} value={country['alpha-2']} primaryText={country.name} />)
        }
      </SelectField >
    );
};

export default CountrySelector;