import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, Label, Nav, NavItem } from 'react-bootstrap';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import { notify } from 'react-notify-toast';
import _ from 'lodash';

const img = require('../../../assets/images/loading.gif');
const PropertiesModal = require('./PropertiesModal');
const TimeTrackModal = require('./TimeTrackModal');
const SmtpServerModal = require('./SmtpServerModal');
const SetSendMailModal = require('./SetSendMailModal');
const ResetPwdModal = require('./ResetPwdModal');
const SendTestMailModal = require('./SendTestMailModal');
const ConfigActorModal = require('./ConfigActorModal');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tabKey: 'properties', 
      propertiesModalShow: false, 
      timeTrackModalShow: false, 
      smtpServerModalShow: false, 
      sendTestMailModalShow: false, 
      setSendMailShow: false,
      configActorModalShow: false };

    this.propertiesModalClose = this.propertiesModalClose.bind(this);
    this.timeTrackModalClose = this.timeTrackModalClose.bind(this);
    this.smtpServerModalClose = this.smtpServerModalClose.bind(this);
    this.sendTestMailModalClose = this.sendTestMailModalClose.bind(this);
    this.setSendMailModalClose = this.setSendMailModalClose.bind(this);
    this.configActorModalClose = this.configActorModalClose.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    settings: PropTypes.object.isRequired,
    show: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    resetPwd: PropTypes.func.isRequired,
    sendTestMail: PropTypes.func.isRequired
  }

  propertiesModalClose() {
    this.setState({ propertiesModalShow: false });
  }

  timeTrackModalClose() {
    this.setState({ timeTrackModalShow: false });
  }

  smtpServerModalClose() {
    this.setState({ smtpServerModalShow: false });
  }

  sendTestMailModalClose() {
    this.setState({ sendTestMailModalShow: false });
  }

  setSendMailModalClose() {
    this.setState({ setSendMailShow: false });
  }

  configActorModalClose() {
    this.setState({ configActorModalShow: false });
  }

  handleTabSelect(tabKey) {
    this.setState({ tabKey });
  }

  componentWillMount() {
    const { show } = this.props;
    show();
  }

  render() {
    const { i18n, update, resetPwd, sendTestMail, loading, settings: { properties={}, timetrack={}, mailserver={}, sysroles={} } } = this.props;

    const styles = { marginTop: '10px', marginBottom: '10px' };
    const logsSaveOptions = { '0d': 'do not save', '3m': '3Month', '6m': '6Month', '1y': '1year', '2y': '2year' }; 
 
    const propertyItems = [];
    propertyItems.push({
      id: 'mail_domain',
      title: (
        <div>
          <span className='table-td-title'>Default login mailboad domain name</span>
        </div>
      ),
      contents: (
        <div>
          { properties.login_mail_domain || '-' }
        </div>
      )
    });
    propertyItems.push({
      id: 'allow_create_project',
      title: (
        <div>
          <span className='table-td-title'>Whether to allow users to create projects</span>
        </div>
      ),
      contents: (
        <div>
          { properties.allow_create_project === 1 ? 'Yes' : 'no' }
        </div>
      )
    });
    propertyItems.push({
      id: 'http_host',
      title: (
        <div>
          <span className='table-td-title'>System domain name</span>
          <span className='table-td-issue-desc'>Send the text of the mail, inform the message content</span>
        </div>
      ),
      contents: (
        <div>
          { properties.http_host || '-' }
        </div>
      )
    });
    propertyItems.push({
      id: 'allowed_login_num',
      title: (
        <div>
          <span className='table-td-title'>Enable secure login protection</span>
          <span className='table-td-issue-desc'>If this feature is opened, one, preventDDoSAttack; Second, the same user or the sameIP 15Continuous in minutes 5 Try login is not successful, the user or shouldIPWill be locked.</span>
        </div>
      ),
      contents: (
        <div>{ properties.enable_login_protection === 1 ? 'Yes' : 'no' }</div>
      )
    })
    propertyItems.push({
      id: 'default_locale',
      title: (
        <div>
          <span className='table-td-title'>default language</span>
          <span className='table-td-issue-desc'>This feature configuration is not supported</span>
        </div>
      ),
      contents: (
        <div>{ 'Chinese' }</div>
      )
    });
    {/* propertyItems.push({
      id: 'default_timezone',
      title: (
        <div>
          <span className='table-td-title'>Default user time zone</span>
          <span className='table-td-issue-desc'>This feature configuration is not supported</span>
        </div>
      ),
      contents: (
        <div>{ '(GMT+08:00) Shanghai' }</div>
      )
    }); */}
    propertyItems.push({
      id: 'ip',
      title: (
        <div>
          <span className='table-td-title'>Time tracking</span>
          <span className='table-td-issue-desc'>This feature is recommended to confirm this feature.If the change, it may affect the estimation of the original problem.</span>
        </div>
      ),
      contents: (
        <div>
          <ul className='list-unstyled clearfix' style={ { lineHeight: 2.0 } }>
            <li>Effective Work Day:{ properties.week2day ? (properties.week2day + 'sky') : '-' }</li>
            <li>Effective working hours per day:{ properties.day2hour ? (properties.day2hour + 'Hour') : '-' }</li>
          </ul>
        </div>
      )
    });

    propertyItems.push({
      id: 'logssave',
      title: (
        <div>
          <span className='table-td-title'>Log save</span>
          <span className='table-td-issue-desc'>It is not recommended to save too long, and the log saves is larger.</span>
        </div>
      ),
      contents: (
        <div>{ properties.logs_save_duration && logsSaveOptions[properties.logs_save_duration] || '6Month' }</div>
      )
    });

    const timeTrackItems = [];
    timeTrackItems.push({
      id: 'week2day',
      title: (
        <div>
          <span className='table-td-title'>Weekly effective working day</span>
        </div>
      ),
      contents: (
        <div>{ timetrack.week2day || 5 } sky</div>
      )
    });
    timeTrackItems.push({
      id: 'day2hour',
      title: (
        <div>
          <span className='table-td-title'>Effective working hours every day</span>
        </div>
      ),
      contents: (
        <div>{ timetrack.day2hour || 8 } Hour</div>
      )
    });

    const mailServerItems = [];
    mailServerItems.push({
      id: 'mail',
      title: (
        <div>
          <span className='table-td-title'>Send mailbox</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <ul className='list-unstyled clearfix' style={ { lineHeight: 2.0 } }>
            <li>Sending address:{ mailserver.send && mailserver.send.from || '-' }</li>
            <li>Email prefix:{ mailserver.send && mailserver.send.prefix || '-' }</li>
          </ul>
          <Button disabled={ loading } style={ { marginLeft: '15px' } } onClick={ () => { this.setState({ setSendMailShow: true }) } }>Edit mailbox</Button>
        </div>
      ) 
    });
    mailServerItems.push({
      id: 'smtp',
      title: (
        <div>
          <span className='table-td-title'>SMTPserver</span>
        </div>
      ),
      contents: (
        <div style={ styles }>
          <ul className='list-unstyled clearfix' style={ { lineHeight: 2.0 } }>
            <li>server:{ mailserver.smtp && mailserver.smtp.host || '-' }</li>
            <li>port:{ mailserver.smtp && mailserver.smtp.port || '-' }</li>
            <li>encryption:{ mailserver.smtp && mailserver.smtp.encryption || 'none' }</li>
            <li>account number:{ mailserver.smtp && mailserver.smtp.username || '-' }</li>
            <li>password:{ mailserver.smtp && mailserver.smtp.password || 'none' }</li>
          </ul>
          <Button disabled={ loading } style={ { marginLeft: '15px' } } onClick={ () => { this.setState({ smtpServerModalShow: true }) } }>Editing server</Button>
        </div>
      )
    });

    const permissionItems = [];
    permissionItems.push({
      id: 'sysadmin',
      title: (
        <div>
          <span className='table-td-title'>System administrator</span>
        </div>
      ),
      contents: (
        <div>
          <span>
          {/* _.map(sysroles.sys_admin || [], function(v){ return <div style={ { display: 'inline-block', float: 'left', margin: '3px' } }><Label style={ { color: '#007eff', border: '1px solid #c2e0ff', backgroundColor: '#ebf5ff', fontWeight: 'normal' } } key={ v.id }>{ v.name }</Label></div> }) */}
          { sysroles.sys_admin && sysroles.sys_admin.length > 0 ? _.map(sysroles.sys_admin || [], function(v, i){ if (i === 0) { return v.name } else { return ', ' + v.name } }) : '-' }
          </span>
        </div>
      )
    });

    let data = [];
    if (this.state.tabKey == 'properties') {
      data = propertyItems;
    } else if (this.state.tabKey == 'timetrack') {
      data = timeTrackItems;
    } else if (this.state.tabKey == 'mailserver') {
      data = mailServerItems;
    } else if (this.state.tabKey == 'sysroles') {
      data = permissionItems;
    }

    return (
      <div>
        <Nav bsStyle='pills' style={ { marginTop: '10px', float: 'left', lineHeight: '1.0' } } activeKey={ this.state.tabKey } onSelect={ this.handleTabSelect.bind(this) }>
          <NavItem eventKey='properties' href='#'>General setting</NavItem>
          {/*<NavItem eventKey='timetrack' href='#'>Time tracking</NavItem>*/}
          <NavItem eventKey='mailserver' href='#'>Mail Server</NavItem>
          <NavItem eventKey='sysroles' href='#'>System role</NavItem>
        </Nav>
        <BootstrapTable data={ data } bordered={ false } hover trClassName='tr-middle'>
          <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
          <TableHeaderColumn width='260' dataField='title'/>
          <TableHeaderColumn width='200' dataField='contents'/>
          <TableHeaderColumn dataField='blank'/>
        </BootstrapTable>
        { this.state.tabKey == 'properties' &&
        <div style={ { width: '100%', marginTop: '20px' } }>
          <Button disabled={ loading } onClick={ () => { this.setState({ propertiesModalShow: true }) } }>Modify settings</Button>
        </div> }
        { this.state.tabKey == 'mailserver' &&
        <div style={ { width: '100%', marginTop: '20px' } }>
          <Button disabled={ loading } onClick={ () => { this.setState({ sendTestMailModalShow: true }) } }>Send test mail</Button>
        </div> }
        { this.state.tabKey == 'sysroles' &&
        <div style={ { width: '100%', marginTop: '20px' } }>
          <Button disabled={ loading } onClick={ () => { this.setState({ configActorModalShow: true }) } }>Role configuration</Button>
        </div> }
        { this.state.propertiesModalShow && 
        <PropertiesModal 
          show 
          close={ this.propertiesModalClose } 
          update={ update } 
          data={ properties } 
          i18n={ i18n }/> }
        { this.state.timeTrackModalShow && 
        <TimeTrackModal 
          show 
          close={ this.timeTrackModalClose } 
          update={ update } 
          data={ timetrack } 
          i18n={ i18n }/> }
        { this.state.smtpServerModalShow && 
        <SmtpServerModal 
          show 
          close={ this.smtpServerModalClose } 
          update={ update } 
          data={ mailserver.smtp || {} } 
          i18n={ i18n }/> }
        { this.state.setSendMailShow && 
        <SetSendMailModal 
          show 
          close={ this.setSendMailModalClose } 
          update={ update } 
          data={ mailserver.send || {} } 
          i18n={ i18n }/> }
        { this.state.sendTestMailModalShow && 
        <SendTestMailModal 
          show 
          close={ this.sendTestMailModalClose } 
          sendMail={ sendTestMail } 
          i18n={ i18n }/> }
        { this.state.configActorModalShow && 
        <ConfigActorModal 
          show 
          close={ this.configActorModalClose } 
          update={ update } 
          data={ sysroles } 
          i18n={ i18n }/> }
      </div>
    );
  }
}
