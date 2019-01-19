import React from 'react';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import i18n from '../utils/i18n'

const HorizontalLinearStepper = (props) => {
  const steps = ['step_verification', 'step_make_admin', 'step_make_company', 'step_invite_or_skip', 'step_invite_user'];

    return (
      <div>
        <div className="formRow">
          <Stepper activeStep={props.step}>
            {
              steps.map(step => <Step key={step}>
                <StepLabel>
                  <span className="hideMobile">{i18n.string(step)}</span>
                </StepLabel>
              </Step>)
            }
          </Stepper>
        </div>
      </div>
    );
};

export default HorizontalLinearStepper;
