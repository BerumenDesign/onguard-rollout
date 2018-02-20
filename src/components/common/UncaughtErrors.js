import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import i18n from '../../utils/i18n';

const UncaughtErrors = ({error, onClose}) => {
    const close = () => {
        if (onClose) {
            onClose();
        }
    };
    const actions = [
        <FlatButton label={i18n.string('btn_close')} primary={true} onClick={close} />
    ];
    console.log('UncaughtErrors', error, onClose);
    return (
        <Dialog actions={actions} modal={false} open={true} title={error.title} onRequestClose={close}>{error.message}</Dialog>
    );
};

export default UncaughtErrors;