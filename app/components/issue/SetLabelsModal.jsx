import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

@reduxForm({
  form: 'lables',
  fields: [ 'labels' ]
})
export default class SetLabelsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    issue: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    setLabels: PropTypes.func.isRequired,
    addLabels: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { values, addLabels, setLabels, close, issue } = this.props;

    let newLabels = [];
    let submitLabels = [];
    if (_.isArray(values.labels)) {
      newLabels = _.uniq(_.map(_.filter(values.labels, (v) => !!v.className), (v) => _.trim(v.value)));
      submitLabels = _.uniq(_.map(values.labels, (v) => _.trim(v.value))); 
    } else {
      submitLabels = values.labels ? values.labels.split(',') : [];
    }

    const ecode = await setLabels(issue.id, { labels: submitLabels });
    if (ecode === 0) {
      if (newLabels.length > 0) {
        addLabels(newLabels);
      }
      close();
      notify.show('Has been set.', 'success', 2000);
    }

    this.setState({ ecode: ecode });
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
    const { initializeForm, options, issue } = this.props;
    if (options.permissions && options.permissions.indexOf('manage_project') !== -1) {
      initializeForm({ labels: _.map(issue.labels || [], (v) => { return { value: v, label: v } }) });
    } else {
      initializeForm({ labels: (issue.labels || []).join(',') });
    }
  }

  render() {
    const { i18n: { errMsg }, fields: { labels }, handleSubmit, invalid, submitting, issue, options } = this.props;

    const labelOptions = _.map(options.labels || [], (val) => { return { label: val.name, value: val.name } });

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>{ 'Set label - ' + issue.no }</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>Label</ControlLabel>
            { options.permissions && options.permissions.indexOf('manage_project') !== -1 ?
            <CreatableSelect
              multi
              value={ labels.value }
              clearable={ false } 
              onChange={ newValue => { labels.onChange(newValue) } }
              options={ labelOptions }
              placeholder='Select or enter labels'/>
            : 
            <div>
              <Select 
                multi
                simpleValue 
                clearable={ false } 
                disabled={ submitting } 
                options={ labelOptions } 
                value={ labels.value } 
                onChange={ (newValue) => { labels.onChange(newValue) } } 
                placeholder='Select label'/>
              <div>
                <span style={ { fontSize: '12px' } }>Users with project management privileges can create new tags.</span>
              </div>
            </div> }
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
