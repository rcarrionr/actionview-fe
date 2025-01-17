import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Be required';
  } else if (_.findIndex(props.collection || [], { name: values.name }) !== -1) {
    errors.name = 'This name already exists';
  }

  if (!values.abb) {
    errors.abb = 'Be required';
  } else {
    const pattern = new RegExp(/^[a-zA-Z0-9]/);
    if (!pattern.test(values.abb)) {
      errors.abb = 'Format is incorrect';
    } else if (_.findIndex(props.collection || [], { abb: values.abb }) !== -1) {
      errors.abb = 'This zoom is existing';
    }
  }

  if (!values.screen_id) {
    errors.screen_id = 'Required';
  }

  if (!values.workflow_id) {
    errors.workflow_id = 'Required';
  }
  return errors;
};

@reduxForm({
  form: 'type',
  fields: ['name', 'abb', 'screen_id', 'workflow_id', 'type', 'description'],
  validate
})
export default class CreateModal extends Component {
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
    options: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { values, create, close } = this.props;
    const ecode = await create(values);
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('Newly created.', 'success', 2000);
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
    const { i18n: { errMsg }, fields: { name, abb, screen_id, workflow_id, type, description }, options = {}, handleSubmit, invalid, submitting } = this.props;
    const { screens = [], workflows = [] } = options;

    if (abb.value) {
      abb.value = abb.value.toUpperCase();
      abb.value = abb.value.substring(0, 1);
    }

    const screenOptions = _.map(screens, function(val) {
      return { label: val.name, value: val.id };
    });
    const workflowOptions = _.map(workflows, function(val) {
      return { label: val.name, value: val.id };
    });
    const typeOptions = [{ label: 'standard', value: 'standard' }, { label: 'Child problem', value: 'subtask' }]; 

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Create a problem type</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ name.touched && name.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>name</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...name } placeholder='Problem type name'/ >
            { name.touched && name.error && <HelpBlock style={ { float: 'right' } }>{ name.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText' validationState={ abb.touched && abb.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>Zoom</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...abb } placeholder='Zoom(A letter or number)'/ >
            { abb.touched && abb.error && <HelpBlock style={ { float: 'right' } }>{ abb.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsSelect'>
            <ControlLabel><span className='txt-impt'>*</span>interface</ControlLabel>
            <Select 
              disabled={ submitting } 
              options={ screenOptions } 
              simpleValue 
              clearable={ false } 
              value={ screen_id.value } 
              onChange={ newValue => { screen_id.onChange(newValue) } } 
              placeholder='Please select an interface'/>
          </FormGroup>
          <FormGroup controlId='formControlsSelect'>
            <ControlLabel><span className='txt-impt'>*</span>Workflow</ControlLabel>
            <Select 
              disabled={ submitting } 
              options={ workflowOptions } 
              simpleValue 
              clearable={ false } 
              value={ workflow_id.value } 
              onChange={ newValue => { workflow_id.onChange(newValue) } } 
              placeholder='Please select a workflow'/>
          </FormGroup>
          <FormGroup controlId='formControlsSelect'>
            <ControlLabel>type</ControlLabel>
            <Select 
              disabled={ submitting } 
              options={ typeOptions } 
              simpleValue 
              clearable={ false } 
              value={ type.value || 'standard' } 
              onChange={ newValue => { type.onChange(newValue) } } 
              placeholder='Please select the problem type'/>
          </FormGroup>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>describe</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...description } placeholder='describe'/>
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
