import React from 'react';
import states from '../../i18n/states.json';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import i18n from '../../utils/i18n';

//Uses provinces from https://github.com/substack/provinces - requires country code ISO 3166-1 alpha-2
const StateSelector = ({value, country, onChange, errorText}) => {
    const _onChange = (e, i, v) => {
      onChange(v);
    };
    return (
      <SelectField autoWidth={true} floatingLabelText={i18n.string('label_state_or_province')} value={value} onChange={_onChange} errorText={errorText}>
        <MenuItem value="" primaryText="" />
        {
          states.filter(state => state.country === country).map(state => <MenuItem value={state.short} primaryText={state.name} />)
        }
      </SelectField >
    );
};

export default StateSelector;