import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

const img = require('../../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.to) {
    errors.to = 'Be required';
  } else if (!/^(\w-*\.*)+@(\w+[\w|-]*)+(\.\w+[\w|-]*)*(\.\w{2,})+$/.test(values.to)) {
    errors.to = 'Format is incorrect';
  }

  if (!values.subject) {
    errors.subject = 'Be required';
  }
  return errors;
};

@reduxForm({
  form: 'sysetting',
  fields: ['to', 'subject', 'contents'],
  validate
})
export default class ResetPwdModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, contents: '' };
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
    sendMail: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { values, sendMail, close } = this.props;
    const ecode = await sendMail(values);
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('Message has been sent.', 'success', 2000);
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
    const { i18n: { errMsg }, fields: { to, subject, contents }, handleSubmit, invalid, submitting } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Send test mail</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ to.touched && to.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>recipient</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...to } placeholder='recipient'/>
            { to.touched && to.error && <HelpBlock style={ { float: 'right' } }>{ to.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText' validationState={ subject.touched && subject.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>theme</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...subject } placeholder='theme'/>
            { subject.touched && subject.error && <HelpBlock style={ { float: 'right' } }>{ subject.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsTextarea'>
            <ControlLabel>content</ControlLabel>
            <FormControl style={ { height: '100px' } } disabled={ submitting } componentClass='textarea' { ...contents } placeholder='content'/>
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
