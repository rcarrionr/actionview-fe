import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';

const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Be required';
  } else if (values.name.indexOf(' ') !== -1 || values.name.indexOf('%') !== -1) {
    errors.name = 'Step names can\'t have spaces or%';
  } else if (props.data.name !== values.name && _.findIndex(props.collection || [], { name: values.name }) !== -1) {
    errors.name = 'This step already exists';
  }

  if (!values.state) {
    errors.state = 'required';
  }
  return errors;
};

@reduxForm({
  form: 'wfconfig',
  fields: [ 'id', 'name', 'state' ],
  validate
})
export default class CreateModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    submitting: PropTypes.bool,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    data: PropTypes.object,
    options: PropTypes.object,
    collection: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { initializeForm, data } = this.props;
    initializeForm(data);
  }

  handleSubmit() {
    const { values, edit, close } = this.props;
    edit(values);
    close();
  }

  handleCancel() {
    const { close, submitting } = this.props;
    if (submitting) {
      return;
    }
    close();
  }

  render() {
    const { 
      fields: { id, name, state }, 
      dirty, 
      handleSubmit, 
      invalid, 
      submitting, 
      data, 
      options, 
      collection } = this.props;

    const stateOptions = _.map(_.filter(options.states || [], (o) => { return _.findIndex(collection, { state: o.id }) === -1 || o.id === data.state }), (val) => { return { label: val.name, value: val.id } });

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Editing steps - { data.name }</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ name.touched && name.error ? 'error' : null }>
            <FormControl type='hidden' { ...id }/>
            <ControlLabel>
              <span className='txt-impt'>*</span>Step name
            </ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...name } placeholder='Step name'/>
            { name.touched && name.error && <HelpBlock style={ { float: 'right' } }>{ name.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>
              <span className='txt-impt'>*</span>Link status
            </ControlLabel>
            <Select 
              disabled={ submitting } 
              options={ stateOptions } 
              simpleValue 
              value={ state.value } 
              onChange={ newValue => { state.onChange(newValue) } } 
              placeholder='Please select a status' 
              clearable={ false } 
              searchable={ false }/>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={ !dirty || submitting || invalid } type='submit'>Sure</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>Cancel</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
