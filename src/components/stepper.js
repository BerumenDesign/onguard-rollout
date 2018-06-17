import React from 'react';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';

const HorizontalLinearStepper = (props) => {
  const steps = ['step_authenticate', 'step_make_admin', 'step_update_company', 'step_invite_or_skip', 'step_invite_user'];

    return (
      <div>
        <div className="formRow">
          <Stepper activeStep={props.step}>
            {
              steps.map(step => <Step key={step}>
                <StepLabel>
                  <span className="hideMobile">{step}</span>
                </StepLabel>
              </Step>)
            }
          </Stepper>
        </div>
      </div>
    );
};

export default HorizontalLinearStepper;
