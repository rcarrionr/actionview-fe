import React, { PropTypes, Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FormGroup, FormControl, ButtonGroup, Button, Label, DropdownButton, MenuItem } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const $ = require('$');
const CreateModal = require('./CreateModal');
const EditModal = require('./EditModal');
const TestModal = require('./TestModal');
const SyncModal = require('./SyncModal');
const OperateNotify = require('./OperateNotify');
const AddLDAPModal = require('./AddLDAPModal');

const img = require('../../assets/images/loading.gif');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      createModalShow: false, 
      editModalShow: false, 
      operateNotifyShow: false, 
      testModalShow: false, 
      syncModalShow: false, 
      addLDAPModalShow: false,
      editLDAPModalShow: false,
      operate: '',
      operateShow: false, 
      hoverRowId: '' }; 

    this.createModalClose = this.createModalClose.bind(this);
    this.editModalClose = this.editModalClose.bind(this);
    this.testModalClose = this.testModalClose.bind(this);
    this.syncModalClose = this.syncModalClose.bind(this);
    this.operateNotifyClose = this.operateNotifyClose.bind(this);
    this.addLDAPModalClose = this.addLDAPModalClose.bind(this);
    this.editLDAPModalClose = this.editLDAPModalClose.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    options: PropTypes.object,
    collection: PropTypes.array.isRequired,
    selectedItem: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    itemLoading: PropTypes.bool.isRequired,
    indexLoading: PropTypes.bool.isRequired,
    index: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    test: PropTypes.func.isRequired,
    testLoading: PropTypes.bool.isRequired,
    testInfo: PropTypes.object.isRequired,
    sync: PropTypes.func.isRequired,
    syncLoading: PropTypes.bool.isRequired,
    syncInfo: PropTypes.object.isRequired,
    invalidate: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { index } = this.props;
    index();
  }

  createModalClose() {
    this.setState({ createModalShow: false });
  }

  editModalClose() {
    this.setState({ editModalShow: false });
  }

  testModalClose() {
    this.setState({ testModalShow: false });
  }

  syncModalClose() {
    this.setState({ syncModalShow: false });
  }

  addLDAPModalClose() {
    this.setState({ addLDAPModalShow: false });
  }

  editLDAPModalClose() {
    this.setState({ editLDAPModalShow: false });
  }

  operateNotifyClose() {
    this.setState({ operateNotifyShow: false });
  }

  edit(id) {
    this.setState({ editModalShow: true });
    const { select } = this.props;
    select(id);
  }

  operateNotify(id) {
    this.setState({ operateNotifyShow: true });
    const { select } = this.props;
    select(id);
  }

  async operateSelect(eventKey) {
    const { hoverRowId } = this.state;
    const { sync, select } = this.props;
    if (eventKey === 'edit') {
      select(hoverRowId);
      this.setState({ editLDAPModalShow: true });
    } else if (eventKey === 'test') {
      select(hoverRowId);
      this.setState({ testModalShow: true });
    } else if (eventKey === 'sync') {
      select(hoverRowId);
      this.setState({ syncModalShow: true });
    } else {
      this.operateNotify(hoverRowId);
      this.setState({ operate: eventKey });
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
      collection, 
      selectedItem, 
      loading, 
      indexLoading, 
      itemLoading, 
      index, 
      create, 
      del, 
      test,
      testLoading,
      testInfo,
      sync,
      syncLoading,
      syncInfo,
      invalidate, 
      update, 
      options } = this.props;

    const { hoverRowId, operateShow } = this.state;

    const node = ( <span><i className='fa fa-cog'></i></span> );

    const directories = [];
    const directoryNum = collection.length;
    for (let i = 0; i < directoryNum; i++) {
      directories.push({
        id: collection[i].id,
        name: ( 
          <div>
            <span className='table-td-title'>{ collection[i].name || '-' }</span>
            { collection[i].description && <span className='table-td-desc'>{ collection[i].description }</span> }
          </div> ),
        type: collection[i].type || '-',
        status: collection[i].invalid_flag == 1 ? <Label>invalid</Label> : <Label bsStyle='success'>efficient</Label>,
        operation: (
          <div>
          { operateShow && hoverRowId === collection[i].id && !itemLoading &&
            <DropdownButton pullRight bsStyle='link' style={ { textDecoration: 'blink' ,color: '#000' } } key={ i } title={ node } id={ `dropdown-basic-${i}` } onSelect={ this.operateSelect.bind(this) }>
              <MenuItem eventKey='edit'>Edit</MenuItem>
              <MenuItem eventKey='test'>test</MenuItem>
              <MenuItem eventKey='sync'>Synchronous Data</MenuItem>
              { collection[i].invalid_flag == 1 ? <MenuItem eventKey='validate'>Enable</MenuItem> : <MenuItem eventKey='invalidate'>Disable</MenuItem> }
              <MenuItem eventKey='del'>delete</MenuItem>
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

    return (
      <div>
        <div style={ { marginTop: '5px', height: '40px' } }>
          <FormGroup>
            <Button 
              style={ { float: 'left', marginRight: '20px' } } 
              onClick={ () => { this.setState({ addLDAPModalShow: true }); } } 
              disabled={ indexLoading }>
              <i className='fa fa-plus'></i>&nbsp;Add toLDAP
            </Button>
          </FormGroup>
        </div>
        <div>
          <div className='info-col'>
            <div className='info-icon'><i className='fa fa-info-circle'></i></div>
            <div className='info-content'>
             <span>
               Only supportOpenLDAPDirectory user synchronization; group members are only supportedmemberOfmodel.<br/>
               After disabling the directory, the user will not automatically synchronize, and the login authentication will be invalid.<br/>
               The first data synchronization takes more time, please be patient.
             </span>
            </div>
          </div>
          <BootstrapTable data={ directories } bordered={ false } hover options={ opts } trClassName='tr-middle'>
            <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Directory name</TableHeaderColumn>
            <TableHeaderColumn dataField='type'>type</TableHeaderColumn>
            <TableHeaderColumn dataField='status'>state</TableHeaderColumn>
            <TableHeaderColumn width='60' dataField='operation'/>
          </BootstrapTable>
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
          { this.state.testModalShow && 
            <TestModal 
              show 
              data={ selectedItem }
              loading={ testLoading }
              close={ this.testModalClose } 
              test={ test } 
              testInfo={ testInfo } 
              i18n={ i18n }/> }
          { this.state.syncModalShow &&
            <SyncModal
              show
              data={ selectedItem }
              loading={ syncLoading }
              close={ this.syncModalClose }
              sync={ sync }
              syncInfo={ syncInfo } 
              i18n={ i18n }/> }
          { this.state.operateNotifyShow &&
            <OperateNotify
              show
              close={ this.operateNotifyClose }
              data={ selectedItem }
              operate={ this.state.operate }
              del={ del }
              invalidate={ invalidate }
              i18n={ i18n }/> }
          { this.state.addLDAPModalShow &&
            <AddLDAPModal
              show
              close={ this.addLDAPModalClose }
              data={ {} }
              create={ create }
              i18n={ i18n }/> }
          { this.state.editLDAPModalShow &&
            <AddLDAPModal
              show
              close={ this.editLDAPModalClose }
              data={ selectedItem }
              edit={ update }
              i18n={ i18n }/> }
        </div>
      </div>
    );
  }
}
