import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.version) {
    errors.version = '必填';
  }
  return errors;
};

@reduxForm({
  form: 'selectversion',
  fields: [ 'version' ],
  validate
})
export default class SelectVersionModal extends Component {
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
    release: PropTypes.func.isRequired,
    releasedIssues: PropTypes.array.isRequired,
    close: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { release, releasedIssues, close } = this.props;
    const ecode = await release(_.map(releasedIssues, (v) => v.id));
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('已发布。', 'success', 2000);
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
    const { i18n: { errMsg }, fields: { version }, handleSubmit, invalid, submitting, options } = this.props;

    const versionOptions = _.map(options.versions || [], (val) => { return { label: val.name, value: val.id } });

    return (
      <Modal { ...this.props } onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>发布问题</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ version.touched && version.error ? 'error' : '' }>
            <ControlLabel><span className='txt-impt'>*</span>选择版本</ControlLabel>
            <Select 
              simpleValue 
              clearable={ false } 
              disabled={ submitting } 
              options={ versionOptions } 
              value={ version.value } 
              onChange={ (newValue) => { version.onChange(newValue) } } 
              placeholder='选择版本'/>
            { version.touched && version.error && <HelpBlock style={ { float: 'right' } }>{ version.error }</HelpBlock> }
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button disabled={ submitting || invalid } type='submit'>确定</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>取消</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}