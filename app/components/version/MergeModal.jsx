import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock, Checkbox } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.source) {
    errors.source = 'Be required';
  }
  if (!values.dest) {
    errors.dest = 'Be required';
  }
  return errors;
};

@reduxForm({
  form: 'mergeversion',
  fields: [ 'source', 'dest' ],
  validate
})
export default class MergeModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, isSendMsg: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    versions: PropTypes.array.isRequired,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    merge: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { merge, values, close } = this.props;
    const ecode = await merge({ source: values.source, dest: values.dest });
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('Merged.', 'success', 2000);
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
    const { i18n: { errMsg }, fields: { source, dest }, handleSubmit, invalid, submitting, versions } = this.props;

    const versionOptions = _.map(versions || [], (val) => { return { label: val.name, value: val.id } });

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Consolidated version</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <div className='info-col' style={ { marginBottom: '15px', marginTop: '5px' } }>
            <div className='info-icon'><i className='fa fa-info-circle'></i></div>
            <div className='info-content'>After the version is incorporated, it will not be able to restore, please consume carefully.</div>
          </div>
          <FormGroup controlId='formControlsText' validationState={ source.touched && source.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>To merge the version</ControlLabel>
            <Select 
              simpleValue 
              clearable={ false } 
              disabled={ submitting } 
              options={ versionOptions } 
              value={ source.value } 
              onChange={ (newValue) => { source.onChange(newValue) } } 
              placeholder='Select version'/>
            { source.touched && source.error && <HelpBlock style={ { float: 'right' } }>{ source.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText' validationState={ dest.touched && dest.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>Incorporate</ControlLabel>
            <Select
              simpleValue
              clearable={ false }
              disabled={ submitting }
              options={ versionOptions }
              value={ dest.value }
              onChange={ (newValue) => { dest.onChange(newValue) } }
              placeholder='Select version'/>
            { dest.touched && dest.error && <HelpBlock style={ { float: 'right' } }>{ dest.error }</HelpBlock> }
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button disabled={ submitting || invalid || source.value == dest.value } type='submit'>Sure</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>Cancel</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
