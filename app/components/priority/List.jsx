import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, Label, DropdownButton, MenuItem } from 'react-bootstrap';

const EditModal = require('./EditModal');
const DelNotify = require('./DelNotify');
const ViewUsedModal = require('./ViewUsedModal');
const img = require('../../assets/images/loading.gif');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editModalShow: false, 
      delNotifyShow: false, 
      viewUsedShow: false, 
      operateShow: false, 
      hoverRowId: '' };

    this.editModalClose = this.editModalClose.bind(this);
    this.delNotifyClose = this.delNotifyClose.bind(this);
    this.viewUsedClose = this.viewUsedClose.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    pkey: PropTypes.string.isRequired,
    collection: PropTypes.array.isRequired,
    selectedItem: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    itemLoading: PropTypes.bool.isRequired,
    indexLoading: PropTypes.bool.isRequired,
    index: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    viewUsed: PropTypes.func.isRequired,
    usedProjects: PropTypes.array.isRequired,
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

  async edit(id) {
    this.setState({ editModalShow: true });
    const { select } = this.props;
    select(id);
  }

  delNotify(id) {
    this.setState({ delNotifyShow: true });
    const { select } = this.props;
    select(id);
  }

  viewUsedClose() {
    this.setState({ viewUsedShow: false });
  }

  viewUsed(id) {
    this.setState({ viewUsedShow: true });
    const { select } = this.props;
    select(id);
  }

  operateSelect(eventKey) {
    const { hoverRowId } = this.state;

    if (eventKey === '1') {
      this.edit(hoverRowId);
    } else if (eventKey === '2') {
      this.delNotify(hoverRowId);
    } else if (eventKey === '3') {
      this.viewUsed(hoverRowId);
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
      indexLoading, 
      itemLoading, 
      loading, 
      del, 
      update, 
      usedProjects, 
      viewUsed } = this.props;
    const { hoverRowId, operateShow } = this.state;

    const node = ( <span><i className='fa fa-cog'></i></span> );

    const priorities = [];
    const priorityNum = collection.length;
    for (let i = 0; i < priorityNum; i++) {
      const isGlobal = pkey !== '$_sys_$' && collection[i].project_key === '$_sys_$';

      priorities.push({
        id: collection[i].id,
        name: ( 
          <span className='table-td-title'>
            { collection[i].name }
            { isGlobal && <span style={ { fontWeight: 'normal' } }> (Global)</span> }
            { collection[i].default && <span style={ { fontWeight: 'normal' } }> (default)</span> }
          </span> ),
        color: ( <div className='circle' style={ { backgroundColor: collection[i].color || '#ccc' } } /> ),
        description: collection[i].description ? collection[i].description : '-',
        operation: !isGlobal ? (
          <div>
          { operateShow && hoverRowId === collection[i].id && !itemLoading &&
            <DropdownButton 
              pullRight 
              bsStyle='link' 
              style={ { textDecoration: 'blink' ,color: '#000' } } 
              key={ i } 
              title={ node } 
              id={ `dropdown-basic-${i}` } 
              onSelect={ this.operateSelect.bind(this) }>
              { !collection[i].key && <MenuItem eventKey='1'>edit</MenuItem> }
              { pkey === '$_sys_$' && <MenuItem eventKey='3'>View project application</MenuItem> }
              { !collection[i].is_used && <MenuItem eventKey='2'>delete</MenuItem> }
            </DropdownButton> }
            <img src={ img } className={ (itemLoading && selectedItem.id === collection[i].id) ? 'loading' : 'hide' }/>
          </div>
        ) : ( <div>&nbsp;</div> )
      });
    }

    const opts = {};
    if (indexLoading) {
      opts.noDataText = ( <div><img src={ img } className='loading'/></div> );
    } else {
      opts.noDataText = 'No data is displayed.'; 
    } 

    opts.onRowMouseOver = this.onRowMouseOver.bind(this);
    // opts.onMouseLeave = this.onMouseLeave.bind(this);

    return (
      <div style={ { marginBottom: '30px' } }>
        <BootstrapTable data={ priorities } bordered={ false } hover options={ opts } trClassName='tr-middle'>
          <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>name</TableHeaderColumn>
          <TableHeaderColumn width='200' dataField='color'>pattern</TableHeaderColumn>
          <TableHeaderColumn dataField='description'>describe</TableHeaderColumn>
          <TableHeaderColumn width='60' dataField='operation'/>
        </BootstrapTable>
        { this.state.editModalShow && 
          <EditModal 
            show 
            close={ this.editModalClose } 
            update={ update } 
            data={ selectedItem } 
            collection={ collection } 
            i18n={ i18n }/> }
        { this.state.viewUsedShow &&
          <ViewUsedModal
            show
            close={ this.viewUsedClose }
            view={ viewUsed }
            loading={ loading }
            data={ selectedItem }
            projects={ usedProjects }
            i18n={ i18n }/> }
        { this.state.delNotifyShow && 
          <DelNotify 
            show 
            close={ this.delNotifyClose } 
            data={ selectedItem } 
            del={ del }/> }
      </div>
    );
  }
}
