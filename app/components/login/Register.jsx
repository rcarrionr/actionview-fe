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
  } else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(values.email)) {
    errors.email = 'Input format is incorrect';
  }
  if (!values.name) {
    errors.name = 'Name can\'t be empty';
  }
  if (!values.password) {
    errors.password = 'password can not be blank';
  }

  return errors;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

@connect(({ user }) => ({ user }), mapDispatchToProps)
@reduxForm({
  form: 'register',
  fields: [ 'email', 'name', 'password' ],
  validate
})
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, alertShow: false, emailShow: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  static propTypes = {
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
    $('input[name=name]').attr('autocomplete', 'Off');
    $('input[name=password]').attr('autocomplete', 'Off');

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

    notify.show('Enterprise users are generally system administrators unified maintenance through the background user management module, and user registration features are not supported.', 'warning', 5000);
    return;

    const { values, actions, user } = this.props;
    await actions.register(values);
    if (user.ecode === 0) {
      this.setState({ emailShow: false });
    } else {
      this.setState({ ecode: user.ecode, alertShow: true });
    }
  }

  render() {
    const { fields: { email, name, password }, handleSubmit, invalid, submitting } = this.props;

    return (
      <div className='login-panel'>
        <div className='login-form'>
          <div className='brand'>
            <img src={ brand } width={ 200 }/>
          </div>
          { this.state.emailShow ?
          <form onSubmit={ handleSubmit(this.handleSubmit) }>
            <FormGroup controlId='formControlsText' validationState={ email.touched && email.error ? 'error' : null }>
              <FormControl disabled={ submitting } type='text' { ...email } placeholder='Mail'/>
              { email.touched && email.error && <HelpBlock style={ { marginLeft: '5px' } }>{ email.error }</HelpBlock> }
            </FormGroup>
            <FormGroup controlId='formControlsText' validationState={ name.touched && name.error ? 'error' : null }>
              <FormControl disabled={ submitting } type='text' { ...name } placeholder='Name'/>
              { name.touched && name.error && <HelpBlock style={ { marginLeft: '5px' } }>{ name.error }</HelpBlock> }
            </FormGroup>
            <FormGroup controlId='formControlsText' validationState={ password.touched && password.error ? 'error' : null }>
              <FormControl disabled={ submitting } type='password' { ...password } placeholder='password'/>
              { password.touched && password.error && <HelpBlock style={ { marginLeft: '5px' } }>{ password.error }</HelpBlock> }
            </FormGroup>
            <Button bsStyle='success' disabled={ invalid || submitting } type='submit'>Note  book</Button>
          </form>
          :
          <div className='reset-pwd-msg'>
            <span>The account activation link has been sent to the mailbox.</span>
          </div> }
          <div style={ { textAlign: 'center', height: '40px' } }>
            <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
            { this.state.alertShow && !submitting && <div style={ { marginTop: '10px', color: '#a94442' } }>{ this.state.ecode === -10002 ? 'This mailbox has been registered.' : 'Sorry, registration failed, please try again.' }</div> }
          </div>
          <div className='login-footer'>
            <Link to='/login'>Return to login</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
