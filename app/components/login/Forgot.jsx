import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

const brand = require('../../assets/images/brand.png');
const img = require('../../assets/images/loading.gif');
const $ = require('$');

import * as UserActions from 'redux/actions/UserActions';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'E-mail can not be empty';
  } else if (!/^(\w-*\.*)+@(\w+[\w|-]*)+(\.\w+[\w|-]*)*(\.\w{2,})+$/.test(values.email)) {
    errors.email = 'Input format is incorrect';
  }
  return errors;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

@connect(({ i18n, user }) => ({ i18n, user }), mapDispatchToProps)
@reduxForm({
  form: 'forgot',
  fields: [ 'email' ],
  validate
})
class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, alertShow: false, emailShow: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool,
    fields: PropTypes.object,
    values: PropTypes.object
  }

  componentDidMount() {
    $('input[name=email]').attr('autocomplete', 'Off');

    const self = this;
    $('input[name=email]').bind('keypress', function() {
      self.hideAlert();
    });
  }

  hideAlert() {
    this.setState({ alertShow: false });
  }

  async handleSubmit() {
    this.setState({ alertShow: false });

    const { values, actions } = this.props;
    await actions.resetpwdSendmail(values);
    const { user } = this.props;
    if (user.ecode === 0) {
      this.setState({ emailShow: false, ecode: 0 });
    } else {
      this.setState({ alertShow: true, ecode: user.ecode });
    }
  }

  render() {
    const {  i18n: { errMsg }, fields: { email }, handleSubmit, invalid, submitting, user } = this.props;

    return (
      <div className='login-panel'>
        <div className='login-form'>
          <div style={ { textAlign: 'center', marginTop: '15px', fontSize: '19px', marginBottom: '20px' } }>
            Retrieve password 
          </div>
          { this.state.emailShow ?
          <form onSubmit={ handleSubmit(this.handleSubmit) }>
            <FormGroup controlId='formControlsText' validationState={ email.touched && email.error ? 'error' : null }>
              <FormControl disabled={ submitting } type='text' { ...email } placeholder='Please enter a user mailbox'/>
              { email.touched && email.error && <HelpBlock style={ { marginLeft: '5px' } }>{ email.error }</HelpBlock> }
            </FormGroup>
            <Button bsStyle='success' disabled={ invalid || submitting } type='submit'>{ submitting ? 'sending ...' : 'Send reset password mail' }</Button>
          </form>
          :
          <div className='reset-pwd-msg'>
            <span>Reset password link has been sent to the mailbox { user.item && user.item.sendto_email || '' }, Valid24Hour.</span>
          </div> }
          <div style={ { textAlign: 'center', marginBottom: '30px' } }>
            { this.state.alertShow && !submitting && errMsg[this.state.ecode] && <div style={ { marginTop: '10px', color: '#a94442' } }>Feel sorry,{ errMsg[this.state.ecode] }.</div> }
          </div>
          <div style={ { textAlign: 'left', marginLeft: '5px', marginBottom: '25px' } }>
          1. System administrator Please enter:admin@action.viewThe reset password link will be sent to the configured associated mailbox.
          <br/>
          2. Only the password of the internal maintenance account in this system is retrieved, and the external synchronization account is not supported.
          </div>
          <div className='login-footer'>
            <Link to='/login'>Return to login</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Forgot;
