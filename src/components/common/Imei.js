import React from 'react';
import Validation from '../../utils/validation';
import TextField from 'material-ui/TextField';

class Imei extends React.Component {
    constructor() {
      super();
      this.state = {valid: true, dirty: false};
      this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
      Validation.IMEI(this.props.value).then(function() {
        this.setState({ valid: true });
      }.bind(this)).catch(function() {
        this.setState({ valid: false });
      }.bind(this));
    }
    showError() {
        if (this.state.dirty) {
            return this.state.valid ? null : 'Invalid IMEI';
        }
    }
    onChange(e) {
      this.props.onChange(e.target.value);
      Validation.IMEI(e.target.value).then(function() {
        this.setState({ valid: true, dirty: true });
      }.bind(this)).catch(function() {
        this.setState({ valid: false, dirty: true });
      }.bind(this));
    }
    render() {
      return <TextField floatingLabelText="Enter IMEI" value={this.props.value} onChange={this.onChange} errorText={this.showError()} disabled={this.props.disabled} />;
    }
};

export default Imei;