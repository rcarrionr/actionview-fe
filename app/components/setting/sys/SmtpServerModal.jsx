import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.host) {
    errors.host = 'Be required';
  }
  // if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(values.ip)) {
  else if (!/^[\w-]+([.][\w-]+)+$/.test(values.host)) {
    errors.host = 'Format is incorrect';
  }

  if (!values.port) {
    errors.port = 'Be required';
  } else if (values.port && !/^[1-9][0-9]*$/.test(values.port)) {
    errors.port = 'Must enter positive integers';
  }

  if (!values.username) {
    errors.username = 'Be required';
  }

  if (!values.has_old_password && !values.password) {
    errors.password = 'Be required';
  }
  return errors;
};

@reduxForm({
  form: 'syssetting',
  fields: [ 'host', 'port', 'encryption', 'username', 'has_old_password', 'password' ],
  validate
})
export default class SmtpServerModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, passwordShow: true };
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

    if (data.password) {
      this.state.passwordShow = false;
    }

    const newData = _.clone(data);
    newData.has_old_password = data.password ? true : false;
    newData.password = '';
    initializeForm(newData);
  }

  async handleSubmit() {
    const { values, update, close } = this.props;
    const ecode = await update({ smtp: _.omit(values.password ? values : _.omit(values, [ 'password' ]), [ 'has_old_password' ]) });
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
      fields: { host, port, encryption, username, has_old_password, password }, 
      handleSubmit, 
      invalid, 
      dirty, 
      submitting, 
      data } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>SMPTServer settings</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup validationState={ host.touched && host.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>server</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...host } placeholder='Host name orIPaddress'/>
            { host.touched && host.error && <HelpBlock style={ { float: 'right' } }>{ host.error }</HelpBlock> }
          </FormGroup>
          <FormGroup validationState={ port.touched && port.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>port</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...port } placeholder='port'/>
            { port.touched && port.error && <HelpBlock style={ { float: 'right' } }>{ port.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>encryption</ControlLabel>
            <Select
              disabled={ submitting }
              clearable={ false }
              searchable={ false }
              options={ [ { value: '', label: 'none' }, { value: 'tls', label: 'TLS' }, { value: 'ssl', label: 'SSL' } ] }
              value={ encryption.value || '' }
              onChange={ newValue => { encryption.onChange(newValue) } }
              placeholder='please choose'/>
          </FormGroup>
          <FormGroup validationState={ username.touched && username.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>account number</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...username } placeholder='Enter an account'/>
            { username.touched && username.error && <HelpBlock style={ { float: 'right' } }>{ username.error }</HelpBlock> }
          </FormGroup>
          <FormGroup validationState={ !has_old_password.value && password.touched && password.error ? 'error' : null }>
            <ControlLabel>
              { !has_old_password.value ? <span className='txt-impt'>*</span> : <span/> }
              password 
              { has_old_password.value && 
              <a style={ { fontWeight: 'normal', fontSize: '12px', cursor: 'pointer', marginLeft: '5px' } } 
                onClick={ (e) => { e.preventDefault(); if (this.state.passwordShow) { password.onChange('') } this.setState({ passwordShow: !this.state.passwordShow }) } }>
                { this.state.passwordShow ? 'Cancel' : 'set up' }
              </a> }
            </ControlLabel>
            { this.state.passwordShow && <FormControl disabled={ submitting } type='text' { ...password } placeholder='enter password'/> }
            { !has_old_password.value && password.touched && password.error && <HelpBlock style={ { float: 'right' } }>{ password.error }</HelpBlock> }
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
