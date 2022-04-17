import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import ApiClient from '../../../shared/api-client';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.parent_id) {
    errors.parent_id = 'Be required';
  }
  return errors;
};

@reduxForm({
  form: 'move',
  fields: [ 'parent_id' ],
  validate
})
export default class MoveModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    issue: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    move: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { values, move, close, issue } = this.props;
    const ecode = await move(issue.id, { ...values, parent_id: values.parent_id && values.parent_id.id || '' });
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('Mobile is complete.', 'success', 2000);
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

  async searchIssue(input) {
    input = input.toLowerCase();
    if (!input) {
      return { options: [] };
    }

    const { issue, options: { types=[] }, project } = this.props;

    const api = new ApiClient;
    const limit = 10;
    const results = await api.request( { url: '/project/' + project.key + '/issue/search?s=' + input + '&type=standard' + '&limit=' + limit } );

    const options = [];
    if (results.data.length > 0) {
      _.map(results.data, (v) => {
        if (v.id != issue.parent_id) {
          options.push({ id: v.id, name: _.find(types, { id: v.type }).name + '/' + v.no + ' - ' + v.title });
        }
      });
    }
    return { options };
  }

  render() {
    const { i18n: { errMsg }, fields: { parent_id }, handleSubmit, invalid, submitting, issue } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>{ 'Moving sub-problem - ' + issue.no }</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <div className='info-col' style={ { marginBottom: '15px', marginTop: '5px' } }>
            <div className='info-icon'><i className='fa fa-info-circle'></i></div>
            <div className='info-content'>Only the sub-project moves between different parent projects.</div>
          </div>
          <FormGroup controlId='formControlsText' validationState={ parent_id.touched && parent_id.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>move to</ControlLabel>
            <Select.Async 
              clearable={ false } 
              disabled={ submitting } 
              options={ [] } 
              value={ parent_id.value } 
              onChange={ (newValue) => { parent_id.onChange(newValue) } } 
              valueKey='id' 
              labelKey='name' 
              loadOptions={ this.searchIssue.bind(this) } 
              placeholder='Enter the problem number or name'/>
            { parent_id.touched && parent_id.error && <HelpBlock style={ { float: 'right' } }>{ parent_id.error }</HelpBlock> }
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
