import React, { PropTypes, Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, Label, DropdownButton, MenuItem } from 'react-bootstrap';
import _ from 'lodash';

const EditModal = require('./EditModal');
const DelNotify = require('./DelNotify');
const ConfigModal = require('./ConfigModal');
const BackTop = require('../share/BackTop');
const img = require('../../assets/images/loading.gif');

const sysEvents = [
  'create_issue',
  'edit_issue',
  'del_issue',
  'add_comments',
  'edit_comments',
  'del_comments',
  'add_worklog',
  'edit_worklog',
  'del_worklog',
  'resolve_issue',
  'close_issue',
  'start_progress_issue',
  'stop_progress_issue',
  'assign_issue',
  'move_issue',
  'reopen_issue',
  'normal'
];

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editModalShow: false, 
      configModalShow: false, 
      delNotifyShow: false, 
      resetNotifyShow: false, 
      operateShow: false, 
      hoverRowId: '' };
    this.editModalClose = this.editModalClose.bind(this);
    this.delNotifyClose = this.delNotifyClose.bind(this);
    this.resetNotifyClose = this.resetNotifyClose.bind(this);
    this.configModalClose = this.configModalClose.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    pkey: PropTypes.string.isRequired,
    collection: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    selectedItem: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    itemLoading: PropTypes.bool.isRequired,
    indexLoading: PropTypes.bool.isRequired,
    index: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    setNotify: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { index } = this.props;
    index();
  }

  editModalClose() {
    this.setState({ editModalShow: false });
  }

  delNotifyClose() {
    this.setState({ delNotifyShow: false });
  }

  resetNotifyClose() {
    this.setState({ resetNotifyShow: false });
  }

  configModalClose() {
    this.setState({ configModalShow: false });
  }

  edit(id) {
    this.setState({ editModalShow: true });
    const { select } = this.props;
    select(id);
  }

  delNotify(id) {
    this.setState({ delNotifyShow: true });
    const { select } = this.props;
    select(id);
  }

  resetNotify(id) {
    this.setState({ resetNotifyShow: true });
    const { select } = this.props;
    select(id);
  }

  config(id) {
    this.setState({ configModalShow: true });
    const { select } = this.props;
    select(id);
  }

  operateSelect(eventKey) {
    const { hoverRowId } = this.state;

    if (eventKey === '1') {
      this.edit(hoverRowId);
    } else if (eventKey === '2') {
      this.config(hoverRowId);
    } else if (eventKey === '3') {
      this.resetNotify(hoverRowId);
    } else if (eventKey === '4') {
      this.delNotify(hoverRowId);
    }
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
      pkey, 
      collection, 
      selectedItem, 
      loading, 
      indexLoading, 
      itemLoading, 
      del, 
      update, 
      setNotify,
      reset, 
      options } = this.props;
    const { hoverRowId, operateShow } = this.state;

    const node = ( <span><i className='fa fa-cog'></i></span> );

    const events = [];
    const eventNum = collection.length;
    for (let i = 0; i < eventNum; i++) {
      const isGlobal = pkey !== '$_sys_$' && collection[i].project_key === '$_sys_$';
      events.push({
        id: collection[i].id,
        name: (
          <div>
            <span className='table-td-title'>{ collection[i].name }{ isGlobal && <span style={ { fontWeight: 'normal' } }> (Global)</span> }</span>
            { collection[i].description && <span className='table-td-desc'>{ collection[i].description }</span> } 
          </div>
        ),
        notifications: (
          <ul style={ { marginBottom: '0px', paddingLeft: '0px', listStyle: 'none' } }>
            { _.isEmpty(collection[i].notifications) ? 
             '-' : 
              _.map(collection[i].notifications, function(v, i) { 
                let name = '';
                if (v == 'assignee') {
                  name = 'Current person in charge';
                } else if (v == 'reporter') {
                  name = 'Reporter';
                } else if (v == 'project_principal') {
                  name = 'Project manager';
                } else if (v == 'module_principal') {
                  name = 'Person in charge of the module';
                } else if (v == 'current_user') {
                  name = 'Current user';
                } else if (v == 'watchers') {
                  name = 'All paying attention';
                } else if (v.key == 'user' && v.value && v.value.name) {
                  name = 'Single user: ' + v.value.name;
                } else if (v.key == 'role' && v.value) {
                  const role = _.find(options.roles || [], { id: v.value });
                  if (role) {
                    name = 'Role: ' + role.name;
                  } else {
                    name = 'Role: unclear';
                  }
                } else if (v.key == 'single_user_field' && v.value) {
                  const role = _.find(options.single_user_fields || [], { id: v.value });
                  if (role) {
                    name = 'Single user field: ' + role.name;
                  } else {
                    name = 'Single user field: unclear';
                  }
                } else if (v.key == 'multi_user_field' && v.value) {
                  const role = _.find(options.multi_user_fields || [], { id: v.value });
                  if (role) {
                    name = 'Multi-user field: ' + role.name;
                  } else {
                    name = 'Multi-user field: unclear';
                  }
                }
                return (<li key={ i }>{ name }</li>) 
              }) }
          </ul>
        ),
        operation: (
          <div>
          { operateShow && hoverRowId === collection[i].id && !itemLoading &&
            <DropdownButton pullRight bsStyle='link' style={ { textDecoration: 'blink' ,color: '#000' } } key={ i } title={ node } id={ `dropdown-basic-${i}` } onSelect={ this.operateSelect.bind(this) }>
              { !isGlobal && sysEvents.indexOf(collection[i].key || '') === -1 && <MenuItem eventKey='1'>edit</MenuItem> }
              <MenuItem eventKey='2'>Notification setting</MenuItem>
              { isGlobal && <MenuItem eventKey='3'>Reset notification</MenuItem> }
              { !isGlobal && sysEvents.indexOf(collection[i].key || '') === -1 && <MenuItem eventKey='4'>delete</MenuItem> }
            </DropdownButton> }
            <img src={ img } className={ (itemLoading && selectedItem.id === collection[i].id) ? 'loading' : 'hide' }/>
          </div>
        )
      });
    }

    const opts = {};
    if (indexLoading) {
      opts.noDataText = ( <div><img src={ img } className='loading'/></div> );
    } else {
      opts.noDataText = 'No data is displayed yet.'; 
    } 

    opts.onRowMouseOver = this.onRowMouseOver.bind(this);
    // opts.onMouseLeave = this.onMouseLeave.bind(this);

    return (
      <div style={ { marginBottom: '30px' } }>
        <BackTop />
        <BootstrapTable data={ events } bordered={ false } hover options={ opts } trClassName='tr-top'>
          <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>name</TableHeaderColumn>
          <TableHeaderColumn dataField='notifications'>Notification setting</TableHeaderColumn>
          <TableHeaderColumn width='60' dataField='operation'/>
        </BootstrapTable>
        { this.state.editModalShow && 
        <EditModal 
          show close={ this.editModalClose } 
          update={ update } 
          data={ selectedItem } 
          collection={ collection } 
          i18n={ i18n }/> }
        { this.state.delNotifyShow && 
        <DelNotify 
          show 
          close={ this.delNotifyClose } 
          data={ selectedItem } 
          del={ del }/> }
        { this.state.resetNotifyShow && 
        <DelNotify 
          show 
          close={ this.resetNotifyClose } 
          data={ selectedItem } 
          reset={ reset }/> }
        { this.state.configModalShow && 
        <ConfigModal 
          show 
          loading={ loading } 
          close={ this.configModalClose } 
          data={ selectedItem } 
          setNotify={ setNotify } 
          options={ options } 
          i18n={ i18n }/> }
      </div>
    );
  }
}
