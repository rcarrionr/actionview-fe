import React, { PropTypes, Component } from 'react';
import { reduxForm, getValues } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Be required';
  } else if (_.findIndex(props.collection || [], { name: values.name }) !== -1) {
    errors.name = 'This name already exists';
  }

  if (values.bgColor) {
    const pattern = new RegExp(/^#[0-9a-fA-F]{6}$/);
    if (!pattern.test(values.bgColor)) {
      errors.bgColor = 'wrong format';
    }
  } else {
    errors.bgColor = 'required';
  }
  return errors;
};

@reduxForm({
  form: 'epic',
  fields: ['name', 'bgColor'],
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
    const { i18n: { errMsg }, fields: { name, bgColor }, handleSubmit, invalid, submitting } = this.props;

    const bgColors = [ '#815b3a', '#f79232', '#d39c3f', '#654982', '#4a6785', '#8eb021', '#3b7fc4', '#f15c75', '#ac707a' ];
    const bgColorOptions = _.map(bgColors, (v) => {
      return { value: v, label: (<span className='select-color' style={ { marginTop: '7px', backgroundColor: v } }></span>) }
    });
    
    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>createEpic</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ name.touched && name.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>name</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...name } placeholder='Epicname'/>
            { name.touched && name.error && <HelpBlock style={ { float: 'right' } }>{ name.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText' validationState={ bgColor.touched && bgColor.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>Background color</ControlLabel>
            <Select
              simpleValue
              disabled={ submitting }
              options={ bgColorOptions }
              clearable={ false }
              searchable={ false }
              value={ bgColor.value }
              onChange={ newValue => { bgColor.onChange(newValue) } }
              placeholder='Please select a background color'/>
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
