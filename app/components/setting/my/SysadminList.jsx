import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, Label, Nav, NavItem } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import _ from 'lodash';

const no_avatar = require('../../../assets/images/no_avatar.png');
const img = require('../../../assets/images/loading.gif');
const AvatarEditModal = require('./AvatarEditModal');
const ResetPwdModal = require('./ResetPwdModal');
const BindEmailModal = require('./BindEmailModal');

const { API_BASENAME } = process.env;

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { avatarEditModalShow: false, resetPwdModalShow: false, bindEmailModalShow: false };
    this.avatarEditModalClose = this.avatarEditModalClose.bind(this);
    this.resetPwdModalClose = this.resetPwdModalClose.bind(this);
    this.bindEmailModalClose = this.bindEmailModalClose.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    setAvatar: PropTypes.func.isRequired,
    updAvatar: PropTypes.func.isRequired,
    updAccount: PropTypes.func.isRequired,
    avatarLoading: PropTypes.bool.isRequired,
    accounts: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    resetPwd: PropTypes.func.isRequired
  }

  avatarEditModalClose() {
    this.setState({ avatarEditModalShow: false });
  }

  resetPwdModalClose() {
    this.setState({ resetPwdModalShow: false });
  }

  bindEmailModalClose() {
    this.setState({ bindEmailModalShow: false });
  }

  componentWillMount() {
    const { getUser } = this.props;
    getUser();
  }

  render() {

    const styles = { marginLeft: '20px', marginTop: '10px', marginBottom: '10px' };
    const { i18n, accounts, updAccount, setAvatar, updAvatar, avatarLoading, resetPwd } = this.props;

    const accountItems = [];
    accountItems.push({
      id: 'avatar',
      title: (
        <div>
          <span className='table-td-title'>avatar</span>
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
            <li>{ accounts.first_name || '-' }</li>
          </ul>
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
      id: 'bindemail',
      title: (
        <div>
          <span className='table-td-title'>Related mailbox</span>
          <span className='table-td-issue-desc'>The reset link will be sent to the mailbox when the password is retrieved.</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          { accounts.bind_email ?
          <div>The current binding mailbox is:{ accounts.bind_email }</div>
          :
          <div style={ { color: 'red' } }>Strongly recommended to configure this mailbox, Convenient password to use.</div> }
          <Button style={ { marginLeft: '15px', marginTop: '10px' } } onClick={ () => { this.setState({ bindEmailModalShow: true }) } }>Binding mailbox</Button>
        </div>
      )
    });

    return (
      <div>
        <Nav bsStyle='pills' style={ { marginTop: '10px', float: 'left', lineHeight: '1.0' } } activeKey='account'>
          <NavItem eventKey='account' href='#'>Account information</NavItem>
        </Nav>
        <BootstrapTable data={ accountItems } bordered={ false } hover trClassName='tr-top'>
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
        { this.state.resetPwdModalShow && 
          <ResetPwdModal 
            show 
            close={ this.resetPwdModalClose } 
            resetPwd={ resetPwd }
            i18n={ i18n } /> }
        { this.state.bindEmailModalShow &&
          <BindEmailModal
            show
            close={ this.bindEmailModalClose }
            update={ updAccount }
            i18n={ i18n } /> }
      </div>
    );
  }
}
