import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.from) {
    errors.from = 'Be required';
  } else if (!/^(\w-*\.*)+@(\w+[\w|-]*)+(\.\w+[\w|-]*)*(\.\w{2,})+$/.test(values.from)) {
    errors.from = 'Format is incorrect';
  }
  return errors;
};

@reduxForm({
  form: 'sendmail',
  fields: [ 'from', 'prefix' ],
  validate
})
export default class SetSendMailModal extends Component {
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
    dirty: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    initializeForm: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { initializeForm, data } = this.props;
    initializeForm(data);
  }

  async handleSubmit() {
    const { values, update, close } = this.props;
    const ecode = await update({ mail_send: values });
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('Set the settings.', 'success', 2000);
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
    const { 
      i18n: { errMsg }, 
      fields: { from, prefix }, 
      handleSubmit, 
      invalid, 
      dirty, 
      submitting, 
      data } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Send email settings</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ from.touched && from.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>Message</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...from } placeholder='Enter mailbox'/>
            { from.touched && from.error && <HelpBlock style={ { float: 'right' } }>{ from.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>Email prefix</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...prefix } placeholder='Email prefix(defaultActionView)'/>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button disabled={ !dirty || submitting || invalid } type='submit'>Sure</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>Cancel</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
