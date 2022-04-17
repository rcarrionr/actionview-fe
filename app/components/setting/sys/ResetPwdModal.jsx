import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import _ from 'lodash';

const img = require('../../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.send_auth_pwd) {
    errors.send_auth_pwd = 'Be required';
  }
  return errors;
};

@reduxForm({
  form: 'sysetting',
  fields: ['send_auth_pwd'],
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
    resetPwd: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { values, resetPwd, close } = this.props;
    const ecode = await resetPwd({ smpt: _.pick(values, [ 'send_auth_pwd' ]) });
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('The password has been set.', 'success', 2000);
    } else {
      this.setState({ ecode: ecode });
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
    const { i18n: { errMsg }, fields: { send_auth_pwd }, handleSubmit, invalid, submitting } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>password setting</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ send_auth_pwd.touched && send_auth_pwd.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>verify password</ControlLabel>
            <FormControl disabled={ submitting } type='password' { ...send_auth_pwd } placeholder='New confirmation password'/>
            { send_auth_pwd.touched && send_auth_pwd.error && <HelpBlock style={ { float: 'right' } }>{ send_auth_pwd.error }</HelpBlock> }
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
