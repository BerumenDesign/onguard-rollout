import React from 'react';
import Validation from '../../utils/validation';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import i18n from '../../utils/i18n';
import logo from '../../images/logo.png';

class Verification extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.validate = this.validate.bind(this);
    }
    componentDidMount() {
        let validation = {...this.props.validation};
        const fields = ['invoice', 'firstImei'];

        if (validation) {
            let _validationPromises = [];

            fields.forEach(function(field) {
                _validationPromises.push(this.validate(field));
            }, this);

            if (!validation.fields) {
                validation.fields = {};
            }

            console.log('Verification.mounted.validation.promises', _validationPromises);

            Promise.all(_validationPromises).then(function(vals) {
                console.log('Verification.mounted.validationsPromises.then', vals);
                vals.forEach(function (validated, i) {
                    validation.fields[fields[i]] = validated.fields[fields[i]];
                });

                // initialize validation
                if (validation && this.props.onValidation) {
                    this.props.onValidation(validation);
                }
            }.bind(this)).catch(function(err) {
                console.error('Verification.mounted.validation.failed ', err);
            });
        }
    }
    onChange(e) {
        if (this.props.onChange) {
            const fieldName = e.target.name;

            let data = {
                invoice: this.props.invoice,
                firstImei: this.props.firstImei
            };

            if (e.target.name === 'invoice') {
                data.invoice = parseInt(e.target.value);
            } else {
                data[e.target.name] = e.target.value;
            }

            this.props.onChange(data, () => {
                if (this.props.onValidation && this.props.validation) {
                    this.validate(fieldName)
                        .then(function(validation) {
                            if (validation && this.props.onValidation) {
                                validation.fields[fieldName].dirty = true; //set state to dirty so we can show error if applicable
                                this.props.onValidation(validation);
                            }
                        }.bind(this))
                        .catch(function() {
                            console.error('Verification.validation.failed', this.props.validation);
                        }.bind(this));
                }
            });
        }
    }
    validate(field) {
        return new Promise(function (resolve, reject) {
            let validation = {...this.props.validation};

            if (validation) {
            let valid = true;
            let errorMsg = null;
            let _promise = null;

            switch (field) {
                case 'invoice':
                    errorMsg = i18n.string('error_invalid_invoice_number');
                    _promise = Validation.invoice(this.props[field]);
                    break;
                case 'firstImei':
                    errorMsg = i18n.string('error_invalid_imei_number');
                    _promise = Validation.IMEI(this.props[field]);
                    break;
                default:
                    console.error('formAdmin1.validate.field.undefined ', field);
                    reject();
            }

            //regardless of success or fail, we pass validation object back with updated data
            _promise
                .then(function() {
                    if (!validation.fields) {
                        validation.fields = {};
                    }

                    valid = true;
                    errorMsg = null; //since validation passed, null the error
                    validation.fields[field] = {...validation.fields[field], valid, errorMsg };

                    resolve(validation);
                })
                .catch(function() {
                    if (!validation.fields) {
                        validation.fields = {};
                    }

                    valid = false;
                    validation.fields[field] = {...validation.fields[field], valid, errorMsg };

                    resolve(validation);
                });
            } else {
                console.error('formAdmin1.validate.validation.undefined ', validation);
                reject();
            }
        }.bind(this));
    }
    showError(field) {
        return this.props.validation && this.props.validation.fields && this.props.validation.fields[field] && this.props.validation.fields[field].dirty ? this.props.validation.fields[field].errorMsg : false;
    }
    render() {
        return (
            <div>
                <div className="container smallContainer">
                    <div className="text-center">
                        <img src={logo} style={{maxWidth: '100%'}} />
                    </div>
                </div>
                <div className="container smallContainer bg-white">
                    <form>
                        <h2 className="text-center">{i18n.string('label_use_prepaid_program')}</h2>
                        <TextField
                            floatingLabelText={i18n.string('label_enter_company_invoice_number', {company: 'Grainger'})}
                            fullWidth={true}
                            name="invoice"
                            type="number"
                            value={this.props.invoice}
                            onChange={this.onChange}
                            errorText={this.showError('invoice')} />
                        <TextField
                            floatingLabelText={i18n.string('label_enter_first_imei_from_invoice')}
                            fullWidth={true}
                            name="firstImei"
                            value={this.props.firstImei}
                            onChange={this.onChange}
                            errorText={this.showError('firstImei')} />
                        <RaisedButton fullWidth={true} label={i18n.string('btn_continue')} primary={true} onClick={this.props.onContinue} />
                    </form>
                </div>
            </div>
        );
    }
};

export default Verification;
