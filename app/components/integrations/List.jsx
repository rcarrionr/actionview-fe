import React, { PropTypes, Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, Label, Panel } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import _ from 'lodash';

const SettingPwdModal = require('./SettingPwdModal');
const EnableNotify = require('./EnableNotify');
const img = require('../../assets/images/loading.gif');

const { API_BASENAME } = process.env;

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mode: '',
      user: {},
      pwdModalShow: false, 
      enableNotifyShow: false };
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    pkey: PropTypes.string.isRequired,
    collection: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    itemLoading: PropTypes.bool.isRequired,
    indexLoading: PropTypes.bool.isRequired,
    index: PropTypes.func.isRequired,
    handle: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { index } = this.props;
    index();
  }

  render() {
    const { 
      i18n, 
      pkey, 
      collection, 
      indexLoading, 
      itemLoading, 
      handle } = this.props;

    const statusStyles = { 
      unused: { style: 'danger', name: 'nonactivated' }, 
      enabled: { style: 'success', name: 'activated' }, 
      disabled: { style: 'danger', name: 'disabled' } 
    };

    const users = {
      github: { key: 'github', name: 'GitHub' },
      gitlab: { key: 'gitlab', name: 'GitLab' }
    };

    const github = _.find(collection, { user: 'github' }) || {};
    const gitlab = _.find(collection, { user: 'gitlab' }) || {};

    const gitHubHeader = (
      <span style={ { fontWeight: 600 } }>
        GitHub 
      </span>
    );
    const gitLabHeader = (
      <span style={ { fontWeight: 600 } }>
        GitLab
      </span>
    );

    return (
      <div style={ { marginTop: '15px', marginBottom: '30px' } }>
        <div className='info-col' style={ { marginBottom: '15px' } }>
          <div className='info-icon'><i className='fa fa-info-circle'></i></div>
          <div className='info-content'>
            <span>
              External users only support:GitHub、GitLab。
            </span>
            <span>
              <br/>
              <b>Submitted:</b>
              <br/>
              <span style={ { marginLeft: '15px' } }>Trigger events Please select:Push Event;</span>
              <br/>
              <span style={ { marginLeft: '15px' } }>GitThere are two forms in the form of submitting code:git commit -m 'xx-yy dddd' and git commit -m 'xx-yy-zz dddd'The latter can change the problem.</span>
              <br/>
              <span style={ { marginLeft: '15px' } }>in,xx: Project health,yy: Question number, zz: actionID(The process preview map can be viewed),dddd: Describe the text.</span>
              <br/>
              <span style={ { marginLeft: '15px' } }>PushAfter the code, the detailed page of the problem will appear"Gitsubmit"Tag, you can see the corresponding submission record, whereActionViewThe operation of the user is displayed by the code submitterEmailIdentify.</span>
            </span>
          </div>
        </div>
        <Panel header={ gitHubHeader } style={ { textAlign: 'center' } }>
          <div>
            <b>Request Url:</b> { 'http://www.example.com' + API_BASENAME + '/webhook/github/project/' + pkey } { !indexLoading && <Label bsStyle={ statusStyles[github.status] && statusStyles[github.status].style || 'default' }>{ statusStyles[github.status] && statusStyles[github.status].name || 'nonactivated' }</Label> }
          </div>
          { indexLoading || (itemLoading && this.state.user.key == 'github' && (this.state.mode == 'enable' || this.state.mode == 'disable')) ?
          <div style={ { marginTop: '10px' } }>
            <img src={ img } className='loading'/>
          </div>
          :
          <div style={ { marginTop: '10px' } }>
            { (!github.status || github.status === 'unused') && <Button bsStyle='primary' onClick={ () => { this.setState({ mode: 'use', user: users['github'], pwdModalShow: true }) } }>Open</Button> }
            { github.status === 'disabled' && <Button bsStyle='primary' onClick={ () => { this.setState({ mode: 'enable', user: users['github'], enableNotifyShow: true }) } }>Enable</Button> }
            { github.status === 'enabled' && <Button bsStyle='link' onClick={ () => { this.setState({ mode: 'resetPwd', user: users['github'], pwdModalShow: true }) } }>reset Password</Button> }
            { github.status === 'enabled' && <Button bsStyle='link' onClick={ () => { this.setState({ mode: 'disable', user: users['github'], enableNotifyShow: true }) } }>Disable</Button> }
          </div> }
        </Panel>
        <Panel header={ gitLabHeader } style={ { textAlign: 'center' } }>
          <div>
            <b>Request Url:</b> { 'http://www.example.com' + API_BASENAME + '/webhook/gitlab/project/' + pkey } { !indexLoading && <Label bsStyle={ statusStyles[gitlab.status] && statusStyles[gitlab.status].style || 'default' }>{ statusStyles[gitlab.status] && statusStyles[gitlab.status].name || 'nonactivated' }</Label> }
          </div>
          { indexLoading || (itemLoading && this.state.user.key == 'gitlab' && (this.state.mode == 'enable' || this.state.mode == 'disable')) ?
          <div style={ { marginTop: '10px' } }>
            <img src={ img } className='loading'/>
          </div>
          :
          <div style={ { marginTop: '10px' } }>
            { (!gitlab.status || gitlab.status === 'unused') && <Button bsStyle='primary' onClick={ () => { this.setState({ mode: 'use', user: users['gitlab'], pwdModalShow: true }) } }>Open</Button> }
            { gitlab.status === 'disabled' && <Button bsStyle='primary' onClick={ () => { this.setState({ mode: 'enable', user: users['gitlab'], enableNotifyShow: true }) } }>Enable</Button> }
            { gitlab.status === 'enabled' && <Button bsStyle='link' onClick={ () => { this.setState({ mode: 'resetPwd', user: users['gitlab'], pwdModalShow: true }) } }>reset Password</Button> }
            { gitlab.status === 'enabled' && <Button bsStyle='link' onClick={ () => { this.setState({ mode: 'disable', user: users['gitlab'], enableNotifyShow: true }) } }>Disable</Button> }
          </div> }
        </Panel>
        { this.state.pwdModalShow &&
          <SettingPwdModal
            show
            close={ () => { this.setState({ pwdModalShow: false }) } }
            user={ this.state.user }
            mode={ this.state.mode }
            handle={ handle }
            i18n={ i18n }/> }
        { this.state.enableNotifyShow &&
          <EnableNotify
            show
            close={ () => { this.setState({ enableNotifyShow: false }) } }
            user={ this.state.user }
            mode={ this.state.mode }
            handle={ handle }/> }
      </div>
    );
  }
}
