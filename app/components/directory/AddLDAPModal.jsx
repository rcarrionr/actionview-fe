import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, Form, FormControl, FormGroup, Col, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

import Tabs, { TabPane } from 'rc-tabs';

const img = require('../../assets/images/loading.gif');

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Be required';
  }
  if (!values.host) {
    errors.host = 'Be required';
  }
  if (!values.port) {
    errors.port = 'Be required';
  } else if (values.port && !/^[1-9][0-9]*$/.test(values.port)) {
    errors.port = 'Must enter positive integers';
  }
  if (!values.admin_username) {
    errors.admin_username = 'Be required';
  }
  if (!values.id && !values.admin_password) {
    errors.admin_password = 'Be required';
  }
  if (!values.base_dn) {
    errors.base_dn = 'Be required';
  }
  if (!values.user_object_class) {
    errors.user_object_class = 'Be required';
  }
  if (!values.user_object_filter) {
    errors.user_object_filter = 'Be required';
  }
  if (!values.user_name_attr) {
    errors.user_name_attr = 'Be required';
  }
  if (!values.user_email_attr) {
    errors.user_email_attr = 'Be required';
  }
  if (!values.group_object_class) {
    errors.group_object_class = 'Be required';
  }
  if (!values.group_object_filter) {
    errors.group_object_filter = 'Be required';
  }
  if (!values.group_name_attr) {
    errors.group_name_attr = 'Be required';
  }
  if (!values.groupuser_attr) {
    errors.groupuser_attr = 'Be required';
  }
  if (!values.usergroup_attr) {
    errors.usergroup_attr = 'Be required';
  }
  return errors;
};

@reduxForm({
  form: 'ldap',
  fields: [ 
    'id',
    'name', 
    'host', 
    'port', 
    'encryption',
    'admin_username', 
    'admin_password', 
    'base_dn', 
    'additional_user_dn', 
    'additional_group_dn', 
    'user_object_class', 
    'user_object_filter', 
    'user_name_attr', 
    'user_email_attr', 
    'group_object_class',
    'group_object_filter',
    'group_name_attr', 
    'groupuser_attr',
    'usergroup_attr'
  ],
  validate
})
export default class AddLDAPModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, activeKey: '1', passwordShow: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    options: PropTypes.object,
    data: PropTypes.object,
    initializeForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    edit: PropTypes.func,
    create: PropTypes.func
  }

  async handleSubmit() {
    const { values, create, edit, close } = this.props;
    let ecode = 0;
    if (values.id) {
      ecode = await edit(values.id, _.omit(values.admin_password ? values : _.omit(values, [ 'admin_password' ]), [ 'id' ]));
      if (ecode === 0){
        close();
        notify.show('updated.', 'success', 2000);
      }
    } else {
      ecode = await create(_.omit(values, [ 'id' ]));
      if (ecode === 0){
        close();
        notify.show('added.', 'success', 2000);
      }
    }
    this.setState({ ecode });
  }

  handleCancel() {
    const { close, submitting } = this.props;
    if (submitting) {
      return;
    }
    this.setState({ ecode: 0 });
    close();
  }

  onTabChange(activeKey) {
    this.setState({ activeKey });
  }

  componentWillMount() {
    const { initializeForm, data={} } = this.props;

    if (data.id) {
      this.state.passwordShow = false;
    }

    let newData= _.clone(data);
    if (newData.configs) {
      newData = { id: newData.id, name: newData.name, ...newData.configs };
    } 
    if (!newData.id) {
      newData.port = 389;
      newData.user_object_class = 'inetOrgPerson';
      newData.user_object_filter = '(objectClass=inetOrgPerson)';
      newData.user_name_attr = 'cn';
      newData.user_email_attr = 'mail';
      newData.group_object_class = 'groupOfUniqueNames';
      newData.group_object_filter = '(objectClass=groupOfUniqueNames)';
      newData.group_name_attr = 'cn';
      newData.groupuser_attr = 'uniqueMember';
      newData.usergroup_attr = 'memberOf';
    }
    newData.admin_password = '';
    initializeForm(newData);
  }

  render() {
    const { 
      i18n: { errMsg }, 
      fields: { 
        id,
        name,
        host,
        port,
        encryption,
        admin_username,
        admin_password,
        base_dn,
        additional_user_dn,
        additional_group_dn,
        user_object_class,
        user_object_filter,
        user_name_attr,
        user_email_attr,
        group_object_class,
        group_object_filter,
        group_name_attr,
        groupuser_attr,
        usergroup_attr
      }, 
      handleSubmit, 
      invalid, 
      dirty,
      submitting, 
      options,
      data } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>{ !data.id ? 'Add toLDAP' : ('editLDAP - ' + data.name) }</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <FormControl type='hidden' { ...id }/>
        <Modal.Body style={ { height: '420px', overflow: 'auto' } }>
          <Tabs
            activeKey={ this.state.activeKey }
            onChange={ this.onTabChange.bind(this) } >
            <TabPane tab='server' key='1'>
              <div style={ { paddingTop: '15px' } }>
                <FormGroup controlId='formControlsText' validationState={ name.touched && name.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Directory name</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...name } placeholder='Directory name'/>
                  { name.touched && name.error && <HelpBlock style={ { float: 'right' } }>{ name.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText' validationState={ host.touched && host.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>CPU name</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...host } placeholder='CPU name'/>
                  { host.touched && host.error && <HelpBlock style={ { float: 'right' } }>{ host.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText' validationState={ port.touched && port.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>port</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...port } placeholder='port'/>
                  { port.touched && port.error && <HelpBlock style={ { float: 'right' } }>{ port.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsSelect'>
                  <ControlLabel>encryption</ControlLabel>
                  <Select
                    disabled={ submitting }
                    clearable={ false }
                    searchable={ false }
                    options={ [ { value: '', label: 'none' }, { value: 'tls', label: 'TLS' }, { value: 'ssl', label: 'SSL' } ] }
                    value={ encryption.value || '' }
                    onChange={ newValue => { encryption.onChange(newValue) } }
                    placeholder='please choose'/>
                </FormGroup>
                <FormGroup controlId='formControlsText' validationState={ admin_username.touched && admin_username.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>username</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...admin_username } placeholder='username(Such as:cn=admin,dc=actionview,dc=cn)'/>
                  { admin_username.touched && admin_username.error && <HelpBlock style={ { float: 'right' } }>{ admin_username.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText' validationState={ !id.value && admin_password.touched && admin_password.error ? 'error' : null }>
                  <ControlLabel>
                    { !id.value ? <span className='txt-impt'>*</span> : <span/> }
                    password
                    { id.value &&
                    <a style={ { fontWeight: 'normal', fontSize: '12px', cursor: 'pointer', marginLeft: '5px' } }
                      onClick={ (e) => { e.preventDefault(); if (this.state.passwordShow) { admin_password.onChange('') } this.setState({ passwordShow: !this.state.passwordShow }) } }>
                      { this.state.passwordShow ? 'Cancel' : 'set up' }
                    </a> }
                  </ControlLabel>
                  { this.state.passwordShow && <FormControl disabled={ submitting } type='text' { ...admin_password } placeholder='password'/> }
                  { !id.value && admin_password.touched && admin_password.error && <HelpBlock style={ { float: 'right' } }>{ admin_password.error }</HelpBlock> }
                </FormGroup>
              </div>
            </TabPane>
            <TabPane tab='DN' key='2'>
              <div style={ { paddingTop: '15px' } }>
                <FormGroup controlId='formControlsText' validationState={ base_dn.touched && base_dn.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Base DN</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...base_dn } placeholder='base DN(Such as:dc=actionview,dc=cn)'/>
                  { base_dn.touched && base_dn.error && <HelpBlock style={ { float: 'right' } }>{ base_dn.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText'>
                  <ControlLabel>Additional User DN</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...additional_user_dn } placeholder='additional user DN(Such as:ou=dev)'/>
                </FormGroup>
                <FormGroup controlId='formControlsText'>
                  <ControlLabel>Additional Group DN</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...additional_group_dn } placeholder='additional group DN(Such as:ou=dev)'/>
                </FormGroup>
              </div>
            </TabPane>
            <TabPane tab='user' key='3'>
              <div style={ { paddingTop: '15px' } }>
                <FormGroup controlId='formControlsText' validationState={ user_object_class.touched && user_object_class.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Object class</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...user_object_class } placeholder='Object class'/>
                  { user_object_class.touched && user_object_class.error && <HelpBlock style={ { float: 'right' } }>{ user_object_class.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText' validationState={ user_object_filter.touched && user_object_filter.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Object filtering</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...user_object_filter } placeholder='Object filtering'/>
                  { user_object_filter.touched && user_object_filter.error && <HelpBlock style={ { float: 'right' } }>{ user_object_filter.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText' validationState={ user_name_attr.touched && user_name_attr.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>User name properties</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...user_name_attr } placeholder='User name properties'/>
                  { user_name_attr.touched && user_name_attr.error && <HelpBlock style={ { float: 'right' } }>{ user_name_attr.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText' validationState={ user_email_attr.touched && user_email_attr.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Mailbox attribute</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...user_email_attr } placeholder='Mailbox attribute'/>
                  { user_email_attr.touched && user_email_attr.error && <HelpBlock style={ { float: 'right' } }>{ user_email_attr.error }</HelpBlock> }
                </FormGroup>
              </div>
            </TabPane>
            <TabPane tab='user group' key='4'>
              <div style={ { paddingTop: '15px' } }>
                <FormGroup controlId='formControlsText' validationState={ group_object_class.touched && group_object_class.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Object class</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...group_object_class } placeholder='Object class'/>
                  { group_object_class.touched && group_object_class.error && <HelpBlock style={ { float: 'right' } }>{ group_object_class.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText' validationState={ group_object_filter.touched && group_object_filter.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Object filtering</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...group_object_filter } placeholder='Object filtering'/>
                  { group_object_filter.touched && group_object_filter.error && <HelpBlock style={ { float: 'right' } }>{ group_object_filter.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText' validationState={ group_name_attr.touched && group_name_attr.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Group name properties</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...group_name_attr } placeholder='Group name properties'/>
                  { group_name_attr.touched && group_name_attr.error && <HelpBlock style={ { float: 'right' } }>{ group_name_attr.error }</HelpBlock> }
                </FormGroup>
              </div>
            </TabPane>
            <TabPane tab='Group member' key='5'>
              <div style={ { paddingTop: '15px' } }>
                <FormGroup controlId='formControlsText' validationState={ groupuser_attr.touched && groupuser_attr.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Group member attribute(Used when adding members)</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...groupuser_attr } placeholder='Group member attribute'/>
                  { groupuser_attr.touched && groupuser_attr.error && <HelpBlock style={ { float: 'right' } }>{ groupuser_attr.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText' validationState={ usergroup_attr.touched && usergroup_attr.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Member group attribute(Members look up in groups)</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...usergroup_attr } placeholder='Member group attribute'/>
                  { usergroup_attr.touched && usergroup_attr.error && <HelpBlock style={ { float: 'right' } }>{ usergroup_attr.error }</HelpBlock> }
                </FormGroup>
              </div>
            </TabPane>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button disabled={ !dirty || submitting || invalid } type='submit'>Sure</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>Cancel</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
