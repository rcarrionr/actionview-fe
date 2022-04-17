import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock, Checkbox } from 'react-bootstrap';
import _ from 'lodash';
import DateTime from 'react-datetime';
import { notify } from 'react-notify-toast';

var moment = require('moment');
const $ = require('$');
const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Be required';
  }

  if (!values.start_time) {
    errors.start_time = 'Be required';
  } else {
    if (!moment(values.start_time).isValid()) {
      errors.start_time = 'wrong format';
    }
  }

  if (!values.complete_time) {
    errors.complete_time = 'Be required';
  } else {
    if (!moment(values.complete_time).isValid()) {
      errors.complete_time = 'wrong format';
    }
  }

  if (values.start_time && values.complete_time) {
    if (values.start_time > values.complete_time)
    {
      errors.start_time = 'Before starting time, earlier than the end time';
    }
  }

  return errors;
};

@reduxForm({
  form: 'publish',
  fields: ['name', 'start_time', 'complete_time', 'description'],
  validate
})
export default class PublishModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, isSendMsg: true };
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
    initializeForm: PropTypes.func.isRequired,
    sprint: PropTypes.object.isRequired,
    publish: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { values, publish, sprint, close } = this.props;
    
    if (values.start_time) {
      values.start_time = parseInt(moment(values.start_time).startOf('day').format('X'));
    }

    if (values.complete_time) {
      values.complete_time = parseInt(moment(values.complete_time).endOf('day').format('X'));
    }

    values.isSendMsg = this.state.isSendMsg;

    const ecode = await publish(values, sprint.no);
    this.setState({ ecode });

    if (ecode === 0) {
      notify.show('Start complete.', 'success', 2000);
      close();
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

  componentWillMount() {
    const { initializeForm, sprint } = this.props;
    initializeForm({ 
      name: sprint.name || '', 
      start_time: moment(), 
      complete_time: moment().add(15, 'days'), 
      description: sprint.description || '' 
    });
  }

  render() {
    const { 
      sprint,
      i18n: { errMsg }, 
      fields: { name, start_time, complete_time, description }, 
      handleSubmit, 
      invalid, 
      submitting 
    } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>release - { sprint.name }</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyUp={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body style={ { maxHeight: '580px' } }>
          <FormGroup validationState={ name.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>name</ControlLabel>
            <FormControl
              disabled={ submitting }
              type='text'
              { ...name }
              placeholder='name'/>
            { name.error && 
              <HelpBlock style={ { float: 'right' } }>{ name.error }</HelpBlock> }
          </FormGroup>
          <div>
            <FormGroup style={ { width: '45%', display: 'inline-block' } } validationState={ start_time.error ? 'error' : null }>
              <ControlLabel><span className='txt-impt'>*</span>Starting time</ControlLabel>
              <DateTime 
                locale='zh-cn' 
                mode='date' 
                closeOnSelect 
                dateFormat='YYYY/MM/DD' 
                timeFormat={ false } 
                value={ start_time.value } 
                onChange={ newValue => { start_time.onChange(newValue) } }/>
              { start_time.error && 
                <HelpBlock style={ { float: 'right' } }>{ start_time.error }</HelpBlock> }
            </FormGroup>
            <FormGroup style={ { width: '45%', display: 'inline-block', float: 'right' } } validationState={ complete_time.error ? 'error' : null }>
              <ControlLabel><span className='txt-impt'>*</span>End Time</ControlLabel>
              <DateTime 
                locale='zh-cn' 
                mode='date' 
                closeOnSelect 
                dateFormat='YYYY/MM/DD' 
                timeFormat={ false } 
                value={ complete_time.value } 
                onChange={ newValue => { complete_time.onChange(newValue) } }/>
              { complete_time.error && <HelpBlock style={ { float: 'right' } }>{ complete_time.error }</HelpBlock> }
            </FormGroup>
          </div>
          <FormGroup>
            <ControlLabel>describe</ControlLabel>
            <FormControl 
              disabled={ submitting } 
              componentClass='textarea'
              style={ { height: '200px' } }
              { ...description }
              placeholder='describe'/>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Checkbox
            disabled={ submitting }
            checked={ this.state.isSendMsg }
            onClick={ () => { this.setState({ isSendMsg: !this.state.isSendMsg }) } }
            style={ { display: 'inline-block', marginRight: '20px', marginLeft: '10px' } }>
            Notifying item members
          </Checkbox>
          <Button disabled={ submitting || invalid } type='submit'>Sure</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>Cancel</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
