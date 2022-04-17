import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = 'Be required';
  } 

  if (!values.email) {
    errors.email = 'Be required';
  } else if (!/^(\w-*\.*)+@(\w+[\w|-]*)+(\.\w+[\w|-]*)*(\.\w{2,})+$/.test(values.email)) {
    errors.email = 'Format is incorrect';
  } 

  if (values.phone) {
    if (!/^1(3|4|5|6|7|8)\d{9}$/.test(values.phone)) {
      errors.phone = 'Format is incorrect';
    }
  }
  return errors;
};

@reduxForm({
  form: 'user',
  fields: [ 'first_name', 'email', 'phone' ],
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
      notify.show('Create.', 'success', 2000);
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
    const { i18n: { errMsg }, fields: { first_name, email, phone }, handleSubmit, invalid, submitting } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Add user</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ first_name.touched && first_name.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>Name</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...first_name } placeholder='Name'/>
            { first_name.touched && first_name.error && <HelpBlock style={ { float: 'right' } }>{ first_name.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText' validationState={ email.touched && email.error ? 'error' : null }>
            <ControlLabel><span className='txt-impt'>*</span>Mail</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...email } placeholder='Email'/>
            { email.touched && email.error && <HelpBlock style={ { float: 'right' } }>{ email.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText' validationState={ phone.touched && phone.error ? 'error' : null }>
            <ControlLabel>cell phone</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...phone } placeholder='phone number'/>
            { phone.touched && phone.error && <HelpBlock style={ { float: 'right' } }>{ phone.error }</HelpBlock> }
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
