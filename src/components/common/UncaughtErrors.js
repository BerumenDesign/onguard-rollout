import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const UncaughtErrors = ({error, onClose}) => {
    const close = () => {
        if (onClose) {
            onClose();
        }
    };
    const actions = [
        <FlatButton label="Close" primary={true} onClick={close} />
    ];
    console.log('UncaughtErrors', error, onClose);
    return (
        <Dialog actions={actions} modal={false} open={true} title="Unexpected error" onRequestClose={close}>{error.message}</Dialog>
    );
};

export default UncaughtErrors;