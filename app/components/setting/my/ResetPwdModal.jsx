import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Be required';
  }
  if (!values.new_password) {
    errors.new_password = 'Be required';
  } else {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^ ]{8,}$/;
    if (!re.test(values.new_password)) {
      errors.new_password = 'The password must contain letters, numbers, at least8Position';
    }
  }
  if (!values.new_password2) {
    errors.new_password2 = 'Be required';
  }
  if ((values.new_password || values.new_password2) && values.new_password != values.new_password2) {
    errors.new_password2 = 'Password is inconsistent';
  }

  return errors;
};

@reduxForm({
  form: 'mysetting',
  fields: ['password', 'new_password', 'new_password2'],
  validate
})
export default class ResetPwdModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    reLogin: PropTypes.func.isRequired,
    resetPwd: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { values, resetPwd, close, reLogin } = this.props;
    const ecode = await resetPwd(_.pick(values, [ 'password', 'new_password' ]));
    this.setState({ ecode });
    if (ecode === 0) {
      close();
      notify.show('Password has been modified, please login again.', 'success', 2000);
      reLogin();
    }
  }

  handleCancel() {
    const { close, submitting } = this.props;
    if (submitting) {
      return;
    }
    this.setState({ ecode: 0 });
    close();
  }

  render() {
    const { i18n: { errMsg }, fields: { password, new_password, new_password2 }, handleSubmit, invalid, submitting } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>reset Password</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsSrc' validationState={ password.touched && password.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>old password</ControlLabel>
            <FormControl disabled={ submitting } type='password' { ...password } placeholder='old password'/>
            { password.touched && password.error && <HelpBlock style={ { float: 'right' } }>{ password.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsNew' validationState={ new_password.touched && new_password.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>new password</ControlLabel>
            <FormControl disabled={ submitting } type='password' { ...new_password } placeholder='The new password must contain letters, numbers, at least8Position'/>
            { new_password.touched && new_password.error && <HelpBlock style={ { float: 'right' } }>{ new_password.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsNew2' validationState={ new_password2.touched && new_password2.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>Confirm Password</ControlLabel>
            <FormControl disabled={ submitting } type='password' { ...new_password2 } placeholder='Confirm Password'/>
            { new_password2.touched && new_password2.error && <HelpBlock style={ { float: 'right' } }>{ new_password2.error }</HelpBlock> }
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button disabled={ submitting || invalid } type='submit'>Sure</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>Cancel</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
