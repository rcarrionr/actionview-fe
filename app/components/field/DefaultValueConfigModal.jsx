import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { findDOMNode } from 'react-dom';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import DateTime from 'react-datetime';
import _ from 'lodash'
import { notify } from 'react-notify-toast';

var moment = require('moment');
const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const { data } = props;

  const errors = {};
  if (data.type === 'Number') {
    if (values.defaultValue && isNaN(values.defaultValue)) {
      errors.defaultValue = 'wrong format';
    }
  } else if (data.type === 'Integer') {
    if (values.defaultValue && (isNaN(values.defaultValue) || !/^-?\d+$/.test(values.defaultValue))) {
      errors.defaultValue = 'wrong format';
    }
  } else if (data.type === 'DatePicker') {
    if (values.defaultValue && (isNaN(values.defaultValue) || !/^-?\d+$/.test(values.defaultValue))) {
      errors.defaultValue = 'wrong format';
    }
  }

  if (values.minValue && isNaN(values.minValue)) {
    errors.minValue = 'wrong format';
  }
  if (values.maxValue && isNaN(values.maxValue)) {
    errors.minValue = 'wrong format';
  }
  if ((values.minValue || values.minValue === 0) && (values.maxValue || values.maxValue === 0) && parseFloat(values.minValue) > parseFloat(values.maxValue)) {
    errors.minValue = 'The minimum value cannot be greater than the maximum value';
  }

  if ((values.maxLength || values.maxLength === 0) && (!/^\d+$/.test(values.maxLength) || parseInt(values.maxLength) < 1)) {
    errors.maxLength = 'Please enter is greater than1Integer';
  }

  return errors;
};
@reduxForm({
  form: 'field',
  fields: [ 'id', 'defaultValue', 'maxValue', 'minValue', 'maxLength' ],
  validate
})
export default class DefaultValueConfigModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    optionValues: PropTypes.array,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    config: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    initializeForm: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { initializeForm, data } = this.props;
    if ((data.type === 'MultiSelect' || data.type === 'CheckboxGroup') && _.isArray(data.defaultValue)) {
      data.defaultValue = data.defaultValue && data.defaultValue.join(',');
    } else if (data.type === 'DatePicker' && data.defaultValue) {
      data.defaultValue = parseInt(data.defaultValue);
    }

    initializeForm(data);
  }

  async handleSubmit() {
    const { values, config, close, data } = this.props;

    const submittedData = { ...values };
    if ((values.defaultValue || values.defaultValue === 0) && data.type === 'DatePicker') {
      submittedData.defaultValue = values.defaultValue + 'd'; 
    } else {
      submittedData.defaultValue = values.defaultValue; 
    }
    //alert(JSON.stringify(values));
    const ecode = await config(submittedData);
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
      fields: { id, defaultValue, maxValue, minValue, maxLength }, 
      dirty, 
      handleSubmit, 
      invalid, 
      submitting, 
      data 
    } = this.props;

    let optionValues = [];
    let defaultComponent = {};
    if ([ 'Select', 'MultiSelect', 'CheckboxGroup' , 'RadioGroup' ].indexOf(data.type) !== -1) {
      if (data.optionValues) {
        optionValues = _.map(data.optionValues || [], function(val) {
          return { label: val.name, value: val.id };
        });
      }
      defaultComponent = ( 
        <Select 
          options={ optionValues } 
          simpleValue 
          multi={ data.type === 'CheckboxGroup' || data.type === 'MultiSelect' } 
          value={ defaultValue.value || null } 
          onChange={ newValue => { defaultValue.onChange(newValue) } } 
          placeholder='Set the default value'/> ); 
    } else if (data.type === 'TextArea' || data.type === 'RichTextEditor') {
      defaultComponent = ( 
        <FormControl 
          componentClass='textarea' 
          { ...defaultValue } 
          placeholder='Enter the default value'/> );
    } else if (data.type === 'DatePicker') {
      defaultComponent = ( 
        <div>
          <span style={ { marginRight: '5px' } }>Far away</span>
          <FormControl
            style={ { width: '25%', display: 'inline-block' } }
            type='number'
            { ...defaultValue }
            placeholder='please enter' />
         <span style={ { marginLeft: '5px' } }>sky</span>
         <span style={ { marginLeft: '5px', fontSize: '12px' } }>【Note:0 - Representing the day; empty - Empty defaults]</span>
        </div>);
    } else {
      defaultComponent = ( 
        <FormControl 
          type={ data.type === 'Number' ? 'number' : 'text' }
          { ...defaultValue } 
          placeholder='Enter the default value'/> );
    }

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>{ 'Field properties configuration - ' + data.name }</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup validationState={ defaultValue.value && defaultValue.error ? 'error' : null }>
            <FormControl type='hidden' { ...id }/>
            <ControlLabel>Defaults</ControlLabel>
            { defaultComponent }
            { defaultValue.error && <HelpBlock>{ defaultValue.error }</HelpBlock> }
          </FormGroup>
          { (data.type === 'Number' || data.type === 'Integer') &&
          <div>
            <FormGroup style={ { width: '45%', display: 'inline-block' } } validationState={ minValue.value && minValue.error ? 'error' : null }>
              <ControlLabel>Minimum</ControlLabel>
              <FormControl
                type='Number'
                { ...minValue }
                placeholder='Enter the minimum value'/>
              { minValue.error && <HelpBlock>{ minValue.error }</HelpBlock> }
            </FormGroup>
            <FormGroup style={ { width: '45%', display: 'inline-block', float: 'right' } } validationState={ maxValue.value && maxValue.error ? 'error' : null }>
              <ControlLabel>Maximum value</ControlLabel>
              <FormControl
                type='Number'
                { ...maxValue }
                placeholder='Enter the maximum value'/>
              { maxValue.error && <HelpBlock>{ maxValue.error }</HelpBlock> }
            </FormGroup>
          </div> }
          { (data.type == 'TextArea' || data.type == 'Text' || data.type == 'RichTextEditor')  &&
          <FormGroup style={ { width: '45%' } } validationState={ maxLength.value && maxLength.error ? 'error' : null }>
            <ControlLabel>The maximum length</ControlLabel>
            <FormControl
              type='Number'
              { ...maxLength }
              placeholder='Enter the maximum length, default is not limited'/>
            { maxLength.error && <HelpBlock>{ maxLength.error }</HelpBlock> }
          </FormGroup> }
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button disabled={ submitting || !dirty || invalid } type='submit'>Sure</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>Cancel</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
