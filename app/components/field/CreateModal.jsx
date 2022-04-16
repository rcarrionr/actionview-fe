import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';
import { FieldTypes } from '../share/Constants';

const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Be required';
  }

  const usedKeys = [ 
    'id', 
    'type', 
    'state', 
    'assignee', 
    'reporter', 
    'modifier',
    'resolver',
    'closer',
    'created_at', 
    'updated_at', 
    'resolved_at', 
    'closed_at', 
    'regression_times', 
    'his_resolvers', 
    'resolved_logs', 
    'no', 
    'schema', 
    'parent_id', 
    'parent', 
    'subtasks', 
    'links', 
    'entry_id', 
    'definition_id', 
    'comments_num',
    'worklogs_num',
    'gitcommits_num',
    'sprint',
    'sprints',
    'filter',
    'from',
    'from_kanban_id',
    'limit',
    'page',
    'orderBy',
    'stat_x',
    'stat_y',
    'stat_time',
    'stat_dimension',
    'is_accu',
    'interval',
    'recorded_at',
    'scale',
    'requested_at'
  ];

  if (!values.key) {
    errors.key = 'Be required';
  } else {
    _.forEach(props.collection, (v) => {
      usedKeys.push(v.key);
      if (v.type === 'TimeTracking') {
        usedKeys.push(v.key + '_m');
      } else if (v.type === 'MultiUser') {
        usedKeys.push(v.key + '_ids');
      }
    });
    if (usedKeys.indexOf(values.key) !== -1) {
      errors.key = 'This key value already exists or has been used by the system';
    }
    if (values.type && ((values.type === 'TimeTracking' && usedKeys.indexOf(values.key + '_m') !== -1) || (values.type === 'MultiUser' && usedKeys.indexOf(values.key + '_m') !== -1))) {
      errors.key = 'This key value already exists or has been used by the system';
    }
  }

  if (!values.type) {
    errors.type = 'Be required';
  }

  return errors;
};

@reduxForm({
  form: 'field',
  fields: [ 'name', 'key', 'type', 'applyToTypes', 'description' ],
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
    isSysConfig: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    options: PropTypes.object,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
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
    const { 
      i18n: { errMsg }, 
      isSysConfig,
      fields: { name, key, type, applyToTypes, description }, 
      handleSubmit, 
      invalid, 
      options, 
      submitting } = this.props;

    const typeOptions = _.map(options.types || [], (val) => { return { label: val.name, value: val.id } });

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Create a field</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ name.touched && name.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>Field name</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...name } placeholder='Field name'/>
            { name.touched && name.error && <HelpBlock style={ { float: 'right' } }>{ name.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText' validationState={ key.touched && key.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>Key value</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...key } placeholder='Key value unique'/>
            { key.touched && key.error && <HelpBlock style={ { float: 'right' } }>{ key.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsSelect' validationState={ type.touched && type.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>type</ControlLabel>
            <Select 
              disabled={ submitting } 
              options={ FieldTypes } 
              simpleValue 
              value={ type.value } 
              onChange={ newValue => { type.onChange(newValue) } } 
              placeholder='Please select field type' 
              clearable={ false }/>
            { type.touched && type.error && <HelpBlock style={ { float: 'right' } }>{ type.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsSelect' style={ { display: isSysConfig ? 'none' : '' } }>
            <ControlLabel>appropriate types</ControlLabel>
            <Select 
              disabled={ submitting } 
              multi 
              options={ typeOptions } 
              simpleValue 
              value={ applyToTypes.value || null } 
              onChange={ newValue => { applyToTypes.onChange(newValue) } } 
              placeholder='Default'/>
          </FormGroup>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>describe</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...description } placeholder='Description'/>
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
