import React, { PropTypes, Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import _ from 'lodash';

const CreateModal = require('./CreateModal');
const img = require('../../assets/images/loading.gif');

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { createModalShow: false, skey: '' };
    this.createModalClose = this.createModalClose.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    isSysConfig: PropTypes.bool,
    indexLoading: PropTypes.bool,
    collection: PropTypes.array,
    options: PropTypes.object,
    search: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired
  }

  createModalClose() {
    this.setState({ createModalShow: false });
  }

  render() {
    const { 
      i18n, 
      isSysConfig, 
      create, 
      search, 
      indexLoading, 
      collection, 
      options 
    } = this.props;

    return (
      <div>
        <div style={ { marginTop: '5px' } }>
          <Button 
            className='create-btn' 
            onClick={ () => { this.setState({ createModalShow: true }); } } 
            disabled={ indexLoading }>
            <i className='fa fa-plus'></i>&nbsp;New field
          </Button>
          <span style={ { float: 'right', width: '22%', marginTop: '10px' } }>
            <FormControl
              disabled={ indexLoading }
              type='text'
              style={ { height: '36px' } }
              value={ this.state.skey }
              onChange={ (e) => { this.setState({ skey: e.target.value }) } }
              onKeyDown={ (e) => { if (e.keyCode == '13') { search(e.target.value) } } }
              placeholder={ 'Name, key value query...' } />
          </span>
        </div>
        <div className='info-col'>
          <div className='info-icon'><i className='fa fa-info-circle'></i></div>
          <div className='info-content'> 
            <span>The key value must be unique when creating a field, and the key value cannot be changed.<br/>Can only be deleted without applying to the interface{ isSysConfig && '(Including each project custom interface)' }The field.</span>
          </div>
        </div>
        { this.state.createModalShow && 
          <CreateModal 
            show 
            isSysConfig={ isSysConfig }
            close={ this.createModalClose } 
            create={ create } 
            collection={ collection } 
            options={ options } 
            i18n={ i18n }/> }
      </div>
    );
  }
}
