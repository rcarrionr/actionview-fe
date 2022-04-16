import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (values.login_mail_domain && !/^[\w-]+([.][\w-]+)+$/.test(values.login_mail_domain)) {
    errors.login_mail_domain = 'Format is incorrect';
  }
  //if (values.enable_login_protection && !/^[1-9][0-9]*$/.test(values.enable_login_protection)) {
  //  errors.enable_login_protection = 'Must enter positive integers';
  //}
  return errors;
};

@reduxForm({
  form: 'syssetting',
  fields: [ 'login_mail_domain', 'allow_create_project', 'http_host', 'enable_login_protection', 'week2day', 'day2hour', 'logs_save_duration' ],
  validate
})
export default class PropertiesModal extends Component {
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
    const ecode = await update({ properties: _.pick(values, [ 'login_mail_domain', 'allow_create_project', 'http_host', 'enable_login_protection', 'week2day', 'day2hour', 'logs_save_duration' ]) });
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
      fields: { 
        login_mail_domain, 
        allow_create_project, 
        http_host,
        enable_login_protection,
        week2day, 
        day2hour,
        logs_save_duration }, 
      handleSubmit, 
      invalid, 
      dirty, 
      submitting, 
      data } = this.props;

    const dayOptions = [
      { value: 6, label: '6' },
      { value: 5.5, label: '5.5' },
      { value: 5, label: '5' },
      { value: 4.5, label: '4.5' },
      { value: 4, label: '4' }
    ];

    const hourOptions = [
      { value: 10, label: '10' },
      { value: 9.5, label: '9.5' },
      { value: 9, label: '9' },
      { value: 8.5, label: '8.5' },
      { value: 8, label: '8' },
      { value: 7.5, label: '7.5' },
      { value: 7, label: '7' },
      { value: 6.5, label: '6.5' },
      { value: 6, label: '6' }
    ];

    const logsSaveOptions = [
      { value: '0d', label: 'do not save' },
      { value: '3m', label: '3Month' },
      { value: '6m', label: '6Month' },
      { value: '1y', label: '1year' },
      { value: '2y', label: '2year' }
    ];

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>General setting</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ login_mail_domain.touched && login_mail_domain.error ? 'error' : null }>
            <ControlLabel>Default login email domain name</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...login_mail_domain } placeholder='Mailbox domain name'/>
            { login_mail_domain.touched && login_mail_domain.error && <HelpBlock style={ { float: 'right' } }>{ login_mail_domain.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText' validationState={ http_host.touched && http_host.error ? 'error' : null }>
            <ControlLabel>System domain name</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...http_host } placeholder='Such as:https://actionview.cn'/>
            { http_host.touched && http_host.error && <HelpBlock style={ { float: 'right' } }>{ http_host.error }</HelpBlock> }
          </FormGroup>
          <div>
            <FormGroup controlId='formControlsText' style={ { width: '45%', display: 'inline-block' } }>
              <ControlLabel>Whether to allow users to create projects</ControlLabel>
              <Select
                simpleValue
                disabled={ submitting }
                clearable={ false }
                searchable={ false }
                options={ [ { value: 1, label: 'Yes' }, { value: 0, label: 'no' } ] }
                value={ allow_create_project.value || 0 }
                onChange={ newValue => { allow_create_project.onChange(newValue) } }
                placeholder='please choose'/>
            </FormGroup>
            <FormGroup controlId='formControlsText' style={ { width: '45%', display: 'inline-block', float: 'right' } }>
              <ControlLabel>Enable secure login protection</ControlLabel>
              <Select
                simpleValue
                disabled={ submitting }
                clearable={ false }
                searchable={ false }
                options={ [ { value: 1, label: 'Yes' }, { value: 0, label: 'no' } ] }
                value={ enable_login_protection.value || 0 }
                onChange={ newValue => { enable_login_protection.onChange(newValue) } }
                placeholder='please choose'/>
            </FormGroup>
          </div>
          <div>
            <FormGroup style={ { width: '45%', display: 'inline-block' } }>
              <ControlLabel>Weekly effective working day(sky)</ControlLabel>
              <Select
                simpleValue
                disabled={ submitting }
                clearable={ false }
                searchable={ false }
                options={ dayOptions }
                value={ week2day.value }
                onChange={ newValue => { week2day.onChange(newValue) } }
                placeholder='please choose'/>
            </FormGroup>
            <FormGroup style={ { width: '45%', display: 'inline-block', float: 'right' } }>
              <ControlLabel>Effective working hours every day(Hour)</ControlLabel>
              <Select
                simpleValue
                disabled={ submitting }
                clearable={ false }
                searchable={ false }
                options={ hourOptions }
                value={ day2hour.value }
                onChange={ newValue => { day2hour.onChange(newValue) } }
                placeholder='please choose'/>
            </FormGroup>
          </div>
          <div>
            <FormGroup style={ { width: '45%', display: 'inline-block' } }>
              <ControlLabel>Log save</ControlLabel>
              <Select
                simpleValue
                disabled={ submitting }
                clearable={ false }
                searchable={ false }
                options={ logsSaveOptions }
                value={ logs_save_duration.value || '6m' }
                onChange={ newValue => { logs_save_duration.onChange(newValue) } }
                placeholder='please choose'/>
            </FormGroup>
          </div>
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
