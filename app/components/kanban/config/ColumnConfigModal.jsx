import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Be required';
  }

  if (values.max && !(/(^[1-9]\d*$)/.test(values.max))) {
    errors.max = 'Must enter positive integers';
  }

  if (values.min && !(/(^[1-9]\d*$)/.test(values.min))) {
    errors.min = 'Must enter positive integers';
  }

  return errors;
};

@reduxForm({
  form: 'column',
  fields: [ 'name', 'states', 'max', 'min' ],
  validate
})
export default class ColumnConfigModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    no: PropTypes.number.isRequired,
    config: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { update, no, config, values, close } = this.props;

    const columns = _.clone(config.columns || []);
    if (no >= 0) {
      const ind = _.findIndex(columns, { no });
      columns[ind] = { no, name: values.name, states: values.states ? values.states.split(',') : [], max: values.max || '', min: values.min || '' };
    } else {
      let no = 0;
      if (columns.length > 0) {
        no = _.max(_.map(columns, (v) => v.no)) + 1;
      }
      columns.push({ name: values.name, no, states: values.states ? values.states.split(',') : [], max: values.max || '', min: values.min || '' });
    }

    const ecode = await update({ id: config.id, columns });
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('Set the settings.', 'success', 2000);
    } else { 
      this.setState({ ecode: ecode });
    }
  }

  componentWillMount() {
    const { initializeForm, config, no } = this.props;
    if (no >= 0) {
      const column = _.find(config.columns, { no });
      initializeForm({ name: column.name, states: (column.states || []).join(','), max: column.max || '', min: column.min || '' });
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
      fields: { name, states, max, min }, 
      handleSubmit, 
      invalid, 
      submitting, 
      config, 
      no, 
      options 
    } = this.props;

    let otherStates = [];
    _.forEach(config.columns, (v) => {
      if (v.no !== no) {
        otherStates = _.union(otherStates, v.states);
      }
    });

    const stateOptions = [];
    _.forEach(options.states || [], (v) => {
      if (_.indexOf(otherStates, v.id) === -1) {
        stateOptions.push({ label: <span className={ 'state-' + v.category + '-label' }>{ v.name }</span>, value: v.id });
      }
    });

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>{ no >= 0 ? 'Editorial column' : 'Add column' }</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup validationState={ name.touched && name.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>name</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...name } placeholder='Column name'/ >
            { name.touched && name.error &&
              <HelpBlock style={ { float: 'right' } }>{ name.error }</HelpBlock> }
          </FormGroup>
          <FormGroup>
            <ControlLabel>state</ControlLabel>
            <Select 
              multi
              simpleValue 
              disabled={ submitting } 
              clearable={ false }
              options={ stateOptions } 
              value={ states.value } 
              onChange={ (newValue) => { states.onChange(newValue) } } 
              placeholder='Select state'/>
            { stateOptions.length == 0 &&
              <div>
                <span style={ { fontSize: '12px', color: '#8a6d3b' } }>All issues have been used by other columns, you need to remove some of the status status from other columns or create new problem status options.</span>
              </div> }
          </FormGroup>
          <FormGroup validationState={ max.touched && max.error ? 'error' : null }>
            <ControlLabel>Maximum number of problemsMax)</ControlLabel>
            <FormControl 
              disabled={ submitting } 
              type='text' 
              { ...max } 
              placeholder='Input positive integer'/ >
            { max.touched && max.error &&
              <HelpBlock style={ { float: 'right' } }>{ max.error }</HelpBlock> }
          </FormGroup>
          <FormGroup validationState={ min.touched && min.error ? 'error' : null }>
            <ControlLabel>Minimum number of problemsMin)</ControlLabel>
            <FormControl 
              disabled={ submitting } 
              type='text' 
              { ...min } 
              placeholder='Input positive integer'/ >
            { min.touched && min.error &&
              <HelpBlock style={ { float: 'right' } }>{ min.error }</HelpBlock> }
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
