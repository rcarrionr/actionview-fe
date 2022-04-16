import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FormGroup, FormControl, ButtonGroup, Button, Label, DropdownButton, MenuItem } from 'react-bootstrap';
import { AreaChart, Area } from 'recharts';
import Select from 'react-select';
import ApiClient from '../../../shared/api-client';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const $ = require('$');
const CreateModal = require('./CreateModal');
const EditModal = require('./EditModal');
const ArchiveNotify = require('./ArchiveNotify');
const loadingImg = require('../../assets/images/loading.gif');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      createModalShow: false, 
      editModalShow: false, 
      archiveNotifyShow: false, 
      operateShow: false, 
      hoverRowId: '', 
      willSetPrincipalPids: [], 
      settingPrincipalPids: [],
      principal: {},
      name: '', 
      mode: 'card',
      status: 'active' 
    };

    this.state.sortkey = window.localStorage && window.localStorage.getItem('myprojects-sortkey') || 'default';
    this.createModalClose = this.createModalClose.bind(this);
    this.editModalClose = this.editModalClose.bind(this);
    this.archiveNotifyClose = this.archiveNotifyClose.bind(this);
    this.entry = this.entry.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    increaseCollection: PropTypes.array.isRequired,
    selectedItem: PropTypes.object.isRequired,
    itemLoading: PropTypes.bool.isRequired,
    indexLoading: PropTypes.bool.isRequired,
    moreLoading: PropTypes.bool.isRequired,
    index: PropTypes.func.isRequired,
    more: PropTypes.func.isRequired,
    entry: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    reopen: PropTypes.func.isRequired,
    createIndex: PropTypes.func.isRequired,
    archive: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { index } = this.props;
    index({ status: this.state.status, sortkey: this.state.sortkey });
  }

  createModalClose() {
    this.setState({ createModalShow: false });
  }

  editModalClose() {
    this.setState({ editModalShow: false });
  }

  archiveNotifyClose() {
    this.setState({ archiveNotifyShow: false });
  }

  edit(id) {
    this.setState({ editModalShow: true });
    const { select } = this.props;
    select(id);
  }

  entry(key) {
    const { entry } = this.props;
    entry('/project/' + key); 
  }

  componentDidMount() {
    const self = this;
    $('#pname').bind('keypress',function(event){  
      if(event.keyCode == '13') {  
        const { index } = self.props;
        if (_.trim(self.state.name)) {
          index({ status: self.state.status, name: _.trim(self.state.name), sortkey: self.state.sortkey });
        } else {
          index({ status: self.state.status, sortkey: self.state.sortkey });
        }
      }
    });
  }

  archiveNotify(id) {
    this.setState({ archiveNotifyShow: true });
    const { select } = this.props;
    select(id);
  }

  async reopen(id) {
    const { select, reopen } = this.props;
    select(id);
    const ecode = await reopen(id);
    if (ecode === 0) {
      notify.show('The archive has been canceled.', 'success', 2000);    
    } else {
      notify.show('Open failed.', 'error', 2000);    
    }
  }

  async createIndex(id) {
    const { select, createIndex } = this.props;
    select(id);
    const ecode = await createIndex(id);
    if (ecode === 0) {
      notify.show('Index has been created.', 'success', 2000);
    } else {
      notify.show('Create a failure.', 'error', 2000);
    }
  }

  operateSelect(eventKey) {
    const { hoverRowId } = this.state;
    if (eventKey === '1') {
      this.edit(hoverRowId);
    } else if (eventKey === '2') {
      this.archiveNotify(hoverRowId);
    } else if (eventKey === '3') {
      this.reopen(hoverRowId);
    } else if (eventKey === '4') {
      this.createIndex(hoverRowId);
    }
  }

  more() {
    const { more, collection } = this.props;
    more({ status: this.state.status, name: this.state.name, sortkey: this.state.sortkey, offset_key: collection[collection.length - 1].key });
  }

  willSetPrincipal(pid) {
    this.state.willSetPrincipalPids.push(pid);
    this.setState({ willSetPrincipalPids: this.state.willSetPrincipalPids });
  }

  cancelSetPrincipal(pid) {
    const index = _.indexOf(this.state.willSetPrincipalPids, pid);
    this.state.willSetPrincipalPids.splice(index, 1);
    // clean permission in the state
    this.state.principal[pid] = undefined;

    this.setState({ willSetPrincipalPids: this.state.willSetPrincipalPids });
  }

  async setPrincipal(pid) {
    this.state.settingPrincipalPids.push(pid);
    this.setState({ settingPrincipalPids: this.state.settingPrincipalPids });

    const { update, collection } = this.props;
    const ecode = await update(pid, { principal: (this.state.principal[pid] || _.find(collection, { id: pid }).principal || {}).id });
    if (ecode === 0) {
      const willSetIndex = this.state.willSetPrincipalPids.indexOf(pid);
      this.state.willSetPrincipalPids.splice(willSetIndex, 1);

      const settingIndex = _.indexOf(this.state.settingPrincipalPids, pid);
      this.state.settingPrincipalPids.splice(settingIndex, 1);

      this.setState({ willSetPrincipalPids: this.state.willSetPrincipalPids, settingPrincipalPids: this.state.settingPrincipalPids });
      notify.show('Set the settings.', 'success', 2000);
    }else {
      const settingIndex = _.indexOf(this.state.settingPrincipalPids, pid);
      this.state.settingPrincipalPids.splice(settingIndex, 1);
      this.setState({ settingPrincipalPids: this.state.settingPrincipalPids });
      notify.show('Setup failed.', 'error', 2000);
    }
  }

  handlePrincipalSelectChange(pid, value) {
    this.state.principal[pid] = value;
    this.setState({ principal: this.state.principal });
  }

  async searchUsers(input) {
    input = input.toLowerCase();
    if (!input)
    {
      return { options: [] };
    }
    const api = new ApiClient;
    const results = await api.request( { url: '/user/search?s=' + input } );
    return { options: _.map(results.data, (val) => { val.nameAndEmail = val.name + '(' + val.email + ')'; return val; }) };
  }

  statusChange(newValue) {
    this.setState({ status: newValue }); 

    const { index } = this.props;
    if (_.trim(this.state.name)) {
      index({ status: newValue, name: _.trim(this.state.name), sortkey: this.state.sortkey });
    } else {
      index({ status: newValue, sortkey: this.state.sortkey });
    }
  }

  sortChange(newValue) {
    if (window.localStorage) {
      window.localStorage.setItem('myprojects-sortkey', newValue);
    }
    this.setState({ sortkey: newValue });

    const { index } = this.props;
    if (_.trim(this.state.name)) {
      index({ status: this.state.status, name: _.trim(this.state.name), sortkey: newValue });
    } else {
      index({ status: this.state.status, sortkey: newValue });
    }
  }

  async modeChange() {
    await this.setState({ mode: this.state.mode == 'list' ? 'card' : 'list' })
    this.setState({ mode: this.state.mode });
  }

  onRowMouseOver(rowData) {
    if (rowData.id !== this.state.hoverRowId) {
      this.setState({ operateShow: true, hoverRowId: rowData.id });
    }
  }

  onMouseLeave() {
    this.setState({ operateShow: false, hoverRowId: '' });
  }

  render() {
    const { 
      i18n, 
      user, 
      collection, 
      increaseCollection, 
      selectedItem, 
      indexLoading, 
      itemLoading, 
      moreLoading, 
      create, 
      archive, 
      update, 
      options={} 
    } = this.props;

    const { 
      hoverRowId, 
      operateShow,
      willSetPrincipalPids, 
      settingPrincipalPids 
    } = this.state;

    const sortOptions = [
      { value: 'default', label: 'default' },
      { value: 'activity', label: 'Activity' },
      { value: 'create_time_asc', label: 'Create time ↑' },
      { value: 'create_time_desc', label: 'Create time ↓' },
      { value: 'key_asc', label: 'Valuable value ↑' },
      { value: 'key_desc', label: 'Valuable value ↓' },
      { value: 'all_issues_cnt', label: 'All the number' },
      { value: 'unresolved_issues_cnt', label: 'No solution' },
      { value: 'assigntome_issues_cnt', label: 'Assign it to me' }
    ];

    const node = ( <span><i className='fa fa-cog'></i></span> );

    let chartWidth = 0;
    if ($('.cardContainer .card').length > 0) {
      chartWidth = $('.cardContainer .card').get(0).clientWidth - 10;
    }

    const projects = [];
    const projectNum = collection.length;
    for (let i = 0; this.state.mode == 'list' && i < projectNum; i++) {
      projects.push({
        id: collection[i].id,
        no: i + 1,
        name: ( 
          <div> 
            <a href='#' onClick={ (e) => { e.preventDefault(); this.entry(collection[i].key); } }>{ collection[i].name }</a>
            { collection[i].description && <span className='table-td-desc'>{ collection[i].description }</span> }
          </div> ),
        key: collection[i].key,
        principal: (
          collection[i].principal.id !== user.id ?
          <div>
            <span>{ collection[i].principal.name }</span>
          </div>
          : 
          <div>
          { _.indexOf(willSetPrincipalPids, collection[i].id) === -1 && _.indexOf(settingPrincipalPids, collection[i].id) === -1 ?
            <div className='editable-list-field'>
              <div style={ { display: 'table', width: '100%' } }>
              { collection[i].principal ?
                <span>
                  <div style={ { display: 'inline-block', float: 'left', margin: '4px' } }> 
                    { collection[i].principal.name || '-' }
                  </div>
                </span>
                :
                '-' }
                <span className='edit-icon-zone edit-icon' onClick={ this.willSetPrincipal.bind(this, collection[i].id) }>
                  <i className='fa fa-pencil'></i>
                </span>
              </div>
            </div>
            :
            <div>
              <Select.Async 
                clearable={ false } 
                disabled={ _.indexOf(settingPrincipalPids, collection[i].id) !== -1 && true } 
                options={ [] } 
                value={ this.state.principal[collection[i].id] || collection[i].principal } 
                onChange={ this.handlePrincipalSelectChange.bind(this, collection[i].id) } 
                valueKey='id' 
                labelKey='nameAndEmail' 
                loadOptions={ this.searchUsers } 
                placeholder='Please enter the user'/>
              <div className={ _.indexOf(settingPrincipalPids, collection[i].id) !== -1 ? 'hide' : 'edit-button-group' }>
                <Button className='edit-ok-button' onClick={ this.setPrincipal.bind(this, collection[i].id) }>
                  <i className='fa fa-check'></i>
                </Button>
                <Button className='edit-cancel-button' onClick={ this.cancelSetPrincipal.bind(this, collection[i].id) }>
                  <i className='fa fa-close'></i>
                </Button>
              </div>
            </div>
          }
          <img src={ loadingImg } style={ { float: 'right' } } className={ _.indexOf(settingPrincipalPids, collection[i].id) !== -1 ? 'loading' : 'hide' }/>
          </div>
        ),
        status: collection[i].status == 'active' ? <span className='project-inprogress-label'>In the event</span> : <span className='project-close-label'>Filed</span>,
        issues: (
          <ul style={ { marginBottom: '0px', paddingLeft: '0px', listStyle: 'none' } }>
            <li>All questions - <Link to={ '/project/' + collection[i].key + '/issue' }>{ collection[i].stats ? collection[i].stats.all : '' }</Link></li>
            <li>have not decide - <Link to={ '/project/' + collection[i].key + '/issue?resolution=Unresolved' }>{ collection[i].stats ? collection[i].stats.unresolved : '' }</Link></li>
            <li>Allocated to me - <Link to={ '/project/' + collection[i].key + '/issue?resolution=Unresolved&assignee=me' }>{ collection[i].stats ? collection[i].stats.assigntome : '' }</Link></li>
          </ul>
        ),
        operation: (
          collection[i].principal.id === user.id &&
          <div>
          { operateShow 
            && collection[i].status == 'active'
            && hoverRowId === collection[i].id 
            && !itemLoading &&
            <DropdownButton 
              pullRight 
              bsStyle='link' 
              style={ { textDecoration: 'blink' ,color: '#000' } } 
              key={ i } 
              title={ node } 
              id={ `dropdown-basic-${i}` } 
              onSelect={ this.operateSelect.bind(this) }>
              <MenuItem eventKey='1'>edit</MenuItem>
              <MenuItem eventKey='2'>Archive</MenuItem>
              {/* collection[i].status == 'active' ? <MenuItem eventKey='2'>Archive</MenuItem> : <MenuItem eventKey='3'>Cancel archive</MenuItem> */}
              {/* collection[i].status == 'active' && <MenuItem eventKey='4'>Reconstruction index</MenuItem> */}
            </DropdownButton> }
            <img src={ loadingImg } className={ (itemLoading && selectedItem.id === collection[i].id) ? 'loading' : 'hide' }/>
          </div>
        )
      });
    }

    const opts = {};
    if (indexLoading) {
      opts.noDataText = ( <div><img src={ loadingImg } className='loading'/></div> );
    } else {
      opts.noDataText = ( <div>No data display<br/><br/>You can create a project or Contact additional project administrators add you to project members</div> ); 
    } 

    opts.onRowMouseOver = this.onRowMouseOver.bind(this);

    return (
      <div>
        <div style={ { marginTop: '5px', height: '40px' } }>
          <FormGroup>
            { options.allow_create_project === 1 && 
            <span style={ { float: 'left', width: '20%' } }>
              <Button onClick={ () => { this.setState({ createModalShow: true }); } } disabled={ indexLoading }><i className='fa fa-plus'></i>&nbsp;New Project</Button>
            </span> }
            <span style={ { float: 'right' } }>
              <Button onClick={ this.modeChange.bind(this) }><i className={ this.state.mode == 'list' ? 'fa fa-th' : 'fa fa-list' }></i></Button>
            </span>
            <span style={ { float: 'right', marginRight: '10px' } }>
              <DropdownButton
                pullRight
                title='Sort'
                onSelect={ this.sortChange.bind(this) }>
                  { _.map(sortOptions, (v, i) =>
                    <MenuItem key={ i } eventKey={ v.value }>
                      <div style={ { display: 'inline-block', width: '20px', textAlign: 'left' } }>
                        { this.state.sortkey == v.value && <span><i className='fa fa-check'></i></span> }
                      </div>
                      <span>{ v.label }</span>
                    </MenuItem> ) }
              </DropdownButton>
            </span>
            <span style={ { float: 'right', width: '90px', marginRight: '10px' } }>
              <Select
                simpleValue
                clearable={ false }
                placeholder='project status'
                value={ this.state.status }
                onChange={ this.statusChange.bind(this) }
                options={ [{ value: 'all', label: 'all' }, { value: 'active', label: 'In the event' }, { value: 'archived', label: 'Filed' }] }/>
            </span>
            <span style={ { float: 'right', width: '22%', marginRight: '10px' } }>
              <FormControl
                type='text'
                id='pname'
                style={ { height: '36px' } }
                value={ this.state.name }
                onChange={ (e) => { this.setState({ name: e.target.value }) } }
                placeholder={ 'Name, key value query...' } />
            </span>
          </FormGroup>
        </div>
        <div className='clearfix' style={ { marginLeft: this.state.mode === 'card' ? '-15px' : 0 } }>
          { this.state.mode === 'list' &&
            <BootstrapTable data={ projects } bordered={ false } hover options={ opts } trClassName='tr-top'>
              <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
              <TableHeaderColumn width='50' dataField='no'>NO</TableHeaderColumn>
              <TableHeaderColumn dataField='name'>name</TableHeaderColumn>
              <TableHeaderColumn dataField='key' width='150'>Key value</TableHeaderColumn>
              <TableHeaderColumn dataField='principal' width='280'>Responsible</TableHeaderColumn>
              <TableHeaderColumn dataField='issues' width='170'>Count number</TableHeaderColumn>
              <TableHeaderColumn dataField='status' width='80'>state</TableHeaderColumn>
              <TableHeaderColumn width='60' dataField='operation'/>
            </BootstrapTable> }
          { this.state.mode === 'card' && indexLoading &&
            <div style={ { marginTop: '50px', marginBottom: '50px', textAlign: 'center' } }>
              <img src={ loadingImg } className='loading'/>
            </div> }
          { this.state.mode === 'card' && !indexLoading && collection.length <= 0 &&
            <div style={ { marginTop: '50px', marginBottom: '50px', textAlign: 'center' } }>
              No data display<br/><br/>
              You can create a project or Contact additional project administrators add you to project members
            </div> }
          { this.state.mode === 'card' && !indexLoading && collection.length > 0 &&
            collection.map((model, i) => {
              return (
              <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 cardContainer' key={ i }>
                <div className='card'>
                  <div className='content'>
                    <div className='title'>
                      <p className='name'><a href='#' title={ model.name } onClick={ (e) => { e.preventDefault(); this.entry(model.key); } }>{ model.key + ' - ' + model.name }</a></p>
                    </div>
                    { !model.stats ?
                      <div style={ { marginTop: '60px', textAlign: 'center' } }>
                        <img src={ loadingImg } className='loading'/>
                      </div>
                      :
                      <AreaChart
                        width={ chartWidth }
                        height={ 80 }
                        data={ model.stats.trend || [] }
                        style={ { margin: '40px auto' } }>
                        <Area type='monotone' dataKey='new' stroke={ model.status !== 'active' ? '#aaa' : '#337ab7' } fill={ model.status !== 'active' ? '#aaa' : '#337ab7' } strokeWidth={ 1 } />
                      </AreaChart> }
                    <div className='stats-cnt'>
                      <div className='stats-cnt-cell'>
                        all<br/>
                        { !model.stats ? 
                          <img style={ { height: '12px', width: '12px' } } src={ loadingImg } className='loading'/> 
                          : 
                          <Link to={ '/project/' + model.key + '/issue' }>{ model.stats.all }</Link> }
                      </div>
                      <div className='stats-cnt-cell'>
                        unsolved<br/>
                        { !model.stats ? 
                          <img style={ { height: '12px', width: '12px' } } src={ loadingImg } className='loading'/> 
                          : 
                          <Link to={ '/project/' + model.key + '/issue?resolution=Unresolved' }>{ model.stats.unresolved }</Link> }
                      </div>
                      <div className='stats-cnt-cell'>
                        Assign it to me<br/>
                        { !model.stats ? 
                          <img style={ { height: '12px', width: '12px' } } src={ loadingImg } className='loading'/> 
                          : 
                          <Link to={ '/project/' + model.key + '/issue?assignee=me&resolution=Unresolved' }>{ model.stats.assigntome }</Link> }
                      </div>
                    </div>
                  </div>
                  <div className='leader'>
                    <span>principal: { model.principal.name }</span>
                  </div>
                  { model.status !== 'active' &&
                  <div className='statuss'><span className='project-close-label'>Filed</span></div> }
                  { model.principal.id === user.id && 
                  <div className='btns'>
                    { model.status == 'active' && 
                      <span style={ { marginLeft: '5px' } } title='edit' onClick={ this.edit.bind(this, model.id) } className='comments-button'><i className='fa fa-edit' aria-hidden='true'></i></span> }
                    {/* model.status == 'active' && 
                      <span style={ { marginLeft: '3px' } } title='Reconstruction index' onClick={ this.createIndex.bind(this, model.id) } className='comments-button'><i className='fa fa-refresh' aria-hidden='true'></i></span> */}
                    { model.status === 'active' && 
                      <span style={ { marginLeft: '5px' } } title='Archive' onClick={ this.archiveNotify.bind(this, model.id) } className='comments-button'><i className='fa fa-archive' aria-hidden='true'></i></span> }
                  </div> }
                </div>
              </div>
            ) }) }
          { this.state.editModalShow && 
            <EditModal 
              show 
              close={ this.editModalClose } 
              update={ update } 
              data={ selectedItem } 
              i18n={ i18n }/> }
          { this.state.createModalShow && 
            <CreateModal 
              show 
              close={ this.createModalClose } 
              create={ create } 
              i18n={ i18n }/> }
          { this.state.archiveNotifyShow && 
            <ArchiveNotify 
              show 
              close={ this.archiveNotifyClose } 
              data={ selectedItem } 
              archive={ archive }/> }
        </div>
        { increaseCollection.length > 0 && increaseCollection.length % (options.limit || 4) === 0 && 
          <ButtonGroup vertical block style={ { marginTop: '15px' } }>
            <Button onClick={ this.more.bind(this) }>{ <div><img src={ loadingImg } className={ moreLoading ? 'loading' : 'hide' }/><span>{ moreLoading ? '' : 'More...' }</span></div> }</Button>
          </ButtonGroup> }
      </div>
    );
  }
}
