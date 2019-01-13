import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types'
import i18n from '../../utils/i18n';

const Confirmation = (props) => (
  <div className="formRowCenter">
    <h2>{i18n.string('label_confirmation_heading')}</h2>
    <p>{i18n.string('label_confirmation_subheading')}</p>

    <h3>{i18n.string('label_invite_heading')}</h3>
    <RaisedButton label={i18n.string('btn_confirmation_invite_user')} primary={true} onClick={props.onContinue}/> <br />
    <FlatButton label={i18n.string('btn_confirmation_skip_invite_user')} primary={false}/>
  </div>
);

Confirmation.propTypes = {
    onContinue: PropTypes.func.isRequired
};

export default Confirmation;
