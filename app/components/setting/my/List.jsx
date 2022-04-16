import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, Label, Nav, NavItem } from 'react-bootstrap';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import { notify } from 'react-notify-toast';
import _ from 'lodash';

const no_avatar = require('../../../assets/images/no_avatar.png');
const img = require('../../../assets/images/loading.gif');
const AvatarEditModal = require('./AvatarEditModal');
const EditModal = require('./EditModal');
const ResetPwdModal = require('./ResetPwdModal');

const { API_BASENAME } = process.env;

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tabKey: 'account', 
      editModalShow: false, 
      avatarEditModalShow: false, 
      resetPwdModalShow: false, 
      accounts: {}, 
      favorites: {}, 
      notifications: {} 
    };

    this.avatarEditModalClose = this.avatarEditModalClose.bind(this);
    this.editModalClose = this.editModalClose.bind(this);
    this.resetPwdModalClose = this.resetPwdModalClose.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    setAvatar: PropTypes.func.isRequired,
    updAvatar: PropTypes.func.isRequired,
    avatarLoading: PropTypes.bool.isRequired,
    reLogin: PropTypes.func.isRequired,
    resetPwd: PropTypes.func.isRequired,
    updAccount: PropTypes.func.isRequired,
    updNotify: PropTypes.func.isRequired,
    updFavorite: PropTypes.func.isRequired,
    accountLoading: PropTypes.bool.isRequired,
    accounts: PropTypes.object.isRequired,
    notifyLoading: PropTypes.bool.isRequired,
    notifications: PropTypes.object.isRequired,
    favoriteLoading: PropTypes.bool.isRequired,
    favorites: PropTypes.object.isRequired
  }

  avatarEditModalClose() {
    this.setState({ avatarEditModalShow: false });
  }

  editModalClose() {
    this.setState({ editModalShow: false });
  }

  resetPwdModalClose() {
    this.setState({ resetPwdModalShow: false });
  }

  handleTabSelect(tabKey) {
    this.setState({ tabKey });
  }

  async notifyChange(values) {
    const { updNotify } = this.props;
    const ecode = await updNotify(values);
    if (ecode === 0) {
      notify.show('Set the settings.', 'success', 2000);
    } else {
      const { notifications } = this.props;
      this.setState({ notifications });
      notify.show('Setup failed.', 'error', 2000);
    }
    return ecode;
  }

  mailNotifyChange(newValues) {
    this.state.notifications.mail_notify = newValues.length > 0 && true; 
    this.setState({ notifications: this.state.notifications });
    this.notifyChange({ mail_notify: newValues.length > 0 });
  }

  mobileNotifyChange(newValues) {
    this.state.notifications.mobile_notify = newValues.length > 0 && true; 
    this.setState({ notifications: this.state.notifications });
    this.notifyChange({ mobile_notify: newValues.length > 0 });
  }

  dailyNotifyChange(newValues) {
    this.state.notifications.daily_notify = newValues.length > 0 && true; 
    this.setState({ notifications: this.state.notifications });
    this.notifyChange({ daily_notify: newValues.length > 0 });
  }

  weeklyNotifyChange(newValues) {
    this.state.notifications.weekly_notify = newValues.length > 0 && true; 
    this.setState({ notifications: this.state.notifications });
    this.notifyChange({ weekly_notify: newValues.length > 0 });
  }

  async languageChange(newValue) {
    _.extend(this.state.favorites, { language: newValue });
    this.setState({ favorites: this.state.favorites });
    const ecode = await this.favoriteChange({ language: newValue });
    if (ecode === 0) {
    //fix me
    }
  }

  async favoriteChange(values) {
    const { updFavorite } = this.props;
    const ecode = await updFavorite(values);
    if (ecode === 0) {
    } else {
      const { favorites } = this.props;
    }
    return ecode;
  }

  async componentWillMount() {
    const { getUser } = this.props;
    await getUser();

    const { accounts={}, notifications={}, favorites={} } = this.props;
    this.setState({ accounts, notifications, favorites });
  }

  render() {

    const styles = { marginLeft: '20px', marginTop: '10px', marginBottom: '10px' };
 
    const startStyles = { color: '#54d09f', fontSize: '12px' };
    const closeStyles = { color: '#da4f4a', fontSize: '12px' };

    const { 
      i18n, 
      accounts, 
      setAvatar, 
      updAvatar, 
      avatarLoading, 
      accountLoading, 
      notifyLoading, 
      favoriteLoading, 
      updAccount, 
      reLogin, 
      resetPwd 
    } = this.props;
    const { notifications, favorites } = this.state;

    const accountItems = [];
    accountItems.push({
      id: 'avatar',
      title: (
        <div>
          <span className='table-td-title'>avatar</span>
          <span className='table-td-issue-desc'>Choose a personal photo as an avatar, so that other members easier to know you.</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <img src={ accounts.avatar ? API_BASENAME + '/getavatar?fid=' + accounts.avatar : no_avatar } className='big-avatar'/>
          <Button style={ { marginLeft: '15px' } } onClick={ () => { this.setState({ avatarEditModalShow: true }) } }>Set Avatar</Button>
        </div>
      )
    });

    accountItems.push({
      id: 'basic',
      title: (
        <div>
          <span className='table-td-title'>personal information</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <ul className='list-unstyled clearfix' style={ { lineHeight: 2.0 } }>
            <li>Name:{ accounts.first_name || '-' }</li>
            <li>department:{ accounts.department || '-' }</li>
            <li>Position:{ accounts.position || '-' }</li>
          </ul>
          <Button style={ { marginLeft: '15px' } } onClick={ () => { this.setState({ editModalShow: true }) } }>edit information</Button>
        </div>
      )
    });

    accountItems.push({
      id: 'email',
      title: (
        <div>
          <span className='table-td-title'>email address</span>
          <span className='table-td-issue-desc'>The mailbox address that the account binding cannot be changed.</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          The current mailbox address is:{ accounts.email || '-' }
        </div>
      )
    });

    accountItems.push({
      id: 'password',
      title: (
        <div>
          <span className='table-td-title'>login password</span>
          <span className='table-td-issue-desc'>You need to enter the current password when you change your password; it is recommended that you regularly replace your password to make sure your account is secure.</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <Button style={ { marginLeft: '15px' } } onClick={ () => { this.setState({ resetPwdModalShow: true }) } }>change Password</Button>
        </div>
      )
    });

    accountItems.push({
      id: 'phone',
      title: (
        <div>
          <span className='table-td-title'>Binding mobile phone number</span>
          <span className='table-td-issue-desc'>Modify the phone ActionView Will send text messages to new mobile phone numbers, modify your mobile number by modifying your mobile number in accordance with the verification code in the text message.</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <div>The current mobile phone number is:{ accounts.phone || 'Not set' }</div>
          <div style={ { marginTop: '10px' } }>
            <Button style={ { marginLeft: '15px' } } onClick={ () => { notify.show('This feature is not supported yet.', 'warning', 2000); } }>{ accounts.phone && 'Revise' }Binding mobile phone number</Button>
          </div>
        </div>
      )
    });

    const favoriteItems = [];
    favoriteItems.push({
      id: 'language',
      title: (
        <div>
          <span className='table-td-title'>language settings</span>
          <span className='table-td-issue-desc'>Please select your favorite language(This feature is not supported)</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <div style={ { margin: '3px' } }>Chinese</div>
        </div>
      )
    });

    const notificationItems = [];
    notificationItems.push({
      id: 'mail_notify',
      title: (
        <div>
          <span className='table-td-title'>E-mail notification</span>
          <span className='table-td-issue-desc'>When the problem is important, send a reminder message to you according to the corresponding notification scheme.</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <CheckboxGroup name='mail_notify' value={ notifications.mail_notify ? [ 'mail_notify' ] : [] } onChange={ this.mailNotifyChange.bind(this) }>
            <Checkbox disabled={ notifyLoading } value='mail_notify'/>
            <span> Open email notification</span><br/>
            { notifications.mail_notify ?
            <span style={ startStyles }>activated</span>
            :
            <span style={ closeStyles }>closed</span> }
          </CheckboxGroup>
        </div>
      )
    });

    notificationItems.push({
      id: 'mobile_notify',
      title: (
        <div>
          <span className='table-td-title'>Mobile notification</span>
          <span className='table-td-issue-desc'>When the problem has important operation, it will be pushed according to the corresponding notification scheme. ActionView mobile client</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <CheckboxGroup name='mobile_notify' value={ notifications.mobile_notify ? [ 'mobile_notify' ] : [] } onChange={ this.mobileNotifyChange.bind(this) }> 
            <Checkbox disabled={ notifyLoading } value='mobile_notify'/>
            <span> Turn on the mobile notification</span><br/>
            { notifications.mobile_notify ? 
            <span style={ startStyles }>activated</span>
            :
            <span style={ closeStyles }>closed</span> }
          </CheckboxGroup>
        </div>
      )
    });

    notificationItems.push({
      id: 'daily_notify',
      title: (
        <div>
          <span className='table-td-title'>Daily reminder</span>
          <span className='table-td-issue-desc'>Send you an email that contains work content on the day every day.</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <CheckboxGroup name='daily_notify' value={ notifications.daily_notify ? [ 'daily_notify' ] : [] } onChange={ this.dailyNotifyChange.bind(this) }>
            <Checkbox disabled={ notifyLoading } value='daily_notify'/>
            <span> Receive daily email reminder</span><br/>
            { notifications.daily_notify ?
            <span style={ startStyles }>activated</span>
            :
            <span style={ closeStyles }>closed</span> }
          </CheckboxGroup>
        </div>
      )
    });

    notificationItems.push({
      id: 'weekly_notify',
      title: (
        <div>
          <span className='table-td-title'>Weekly reminder</span>
          <span className='table-td-issue-desc'>Send you a message of work content this week every week.</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <CheckboxGroup name='weekly_notify' value={ notifications.weekly_notify ? [ 'weekly_notify' ] : [] } onChange={ this.weeklyNotifyChange.bind(this) }>
            <Checkbox disabled={ notifyLoading } value='weekly_notify'/>
            <span> Receive a weekly email reminder</span><br/>
            { notifications.weekly_notify ? 
            <span style={ startStyles }>activated</span>
            :
            <span style={ closeStyles }>closed</span> }
          </CheckboxGroup>
        </div>
      )
    });

    const records = [];

    let data = [];
    if (this.state.tabKey == 'account') {
      data = accountItems;
    } else if (this.state.tabKey == 'favorite') {
      data = favoriteItems;
    } else if (this.state.tabKey == 'notification') {
      data = notificationItems;
    } else if (this.state.tabKey == 'record') {
      data = records;
    }

    return (
      <div>
        <Nav 
          bsStyle='pills' 
          style={ { marginTop: '10px', float: 'left', lineHeight: '1.0' } } 
          activeKey={ this.state.tabKey } 
          onSelect={ this.handleTabSelect.bind(this) }>
          <NavItem eventKey='account' href='#'>Account information</NavItem>
          <NavItem eventKey='favorite' href='#'>Personal preference</NavItem>
          <NavItem eventKey='notification' href='#'>message notification</NavItem>
          {/*<NavItem eventKey='record' href='#'>Login log</NavItem>*/}
        </Nav>
        <BootstrapTable data={ data } bordered={ false } hover trClassName='tr-top'>
          <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
          <TableHeaderColumn width='260' dataField='title'/>
          <TableHeaderColumn width='200' dataField='contents'/>
          <TableHeaderColumn dataField='blank'/>
        </BootstrapTable>
        { this.state.avatarEditModalShow && 
          <AvatarEditModal 
            show 
            close={ this.avatarEditModalClose } 
            loading={ avatarLoading } 
            setAvatar={ setAvatar } 
            updAvatar={ updAvatar } 
            data={ accounts } 
            i18n={ i18n }/> }
        { this.state.editModalShow && 
          <EditModal  
            show 
            close={ this.editModalClose } 
            update={ updAccount } 
            data={ accounts } 
            i18n={ i18n }/> }
        { this.state.resetPwdModalShow && 
          <ResetPwdModal 
            show 
            close={ this.resetPwdModalClose } 
            reLogin={ reLogin } 
            resetPwd={ resetPwd } 
            i18n={ i18n }/> }
      </div>
    );
  }
}
