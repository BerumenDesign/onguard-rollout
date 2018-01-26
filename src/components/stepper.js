import React from 'react';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class HorizontalLinearStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 4
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Move Data center region';
      case 1:
        return 'Move Create admin account';
      case 2:
        return 'Move Add company';
      case 3:
        return 'Move Choose service plan';
      case 4:
        return 'Move Payment info (optional)';
      default:
        return 'This is the end';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {
      margin: '0 16px'
    };

    return (<div>
      <div className="formRow">
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>
              <span className="hideMobile">Data center region</span>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <span className="hideMobile">Create admin account</span>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <span className="hideMobile">Add company</span>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <span className="hideMobile">Choose service plan</span>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <span className="hideMobile">Payment info (optional)</span>
            </StepLabel>
          </Step>

        </Stepper>
      </div>
      <div style={contentStyle} className="formRow">
        {
          finished
            ? (<p>
              <a href="#" onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}>
                Click here
              </a>
              to reset the example.
            </p>)
            : (<div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{
                  marginTop: 12
                }}>
                <FlatButton label="Back" disabled={stepIndex === 0} onClick={this.handlePrev} style={{
                    marginRight: 12
                  }}/>
                <RaisedButton label={stepIndex === 2
                    ? 'Finish'
                    : 'Next'} primary={true} onClick={this.handleNext}/>
              </div>
            </div>)
        }
      </div>
    </div>);
  }
}

export default HorizontalLinearStepper;
