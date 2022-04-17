import React, { PropTypes, Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import _ from 'lodash';

const CreateModal = require('./CreateModal');
const img = require('../../assets/images/loading.gif');

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { createModalShow: false };
    this.createModalClose = this.createModalClose.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    isSysConfig: PropTypes.bool,
    options: PropTypes.object,
    create: PropTypes.func.isRequired
  }

  createModalClose() {
    this.setState({ createModalShow: false });
  }

  render() {
    const { i18n, isSysConfig, create, options } = this.props;

    return (
      <div>
        <div style={ { marginTop: '5px' } }>
          <Button className='create-btn' onClick={ () => { this.setState({ createModalShow: true }); } }>
            <i className='fa fa-plus'></i>&nbsp;New interface
          </Button>
        </div>
        <div className='info-col'>
          <div className='info-icon'><i className='fa fa-info-circle'></i></div>
          <div className='info-content'>
            <span>The interface is the arrangement layout and attribute definition of the field, is a page displayed when creating a problem, editing a problem, or performing a workflow process.<br/>If you define a problem creation or editing page, you should first add the topic field to the page and set it to the required field.<br/>Can only be deleted without association to problem type{ isSysConfig && '(Including each project custom problem type)' }And not applied to workflow{ isSysConfig && '(Including each project custom workflow)' }Interface.</span>
          </div>
        </div>
        { this.state.createModalShow && 
          <CreateModal 
            show 
            close={ this.createModalClose } 
            create={ create } 
            options={ options } 
            i18n={ i18n }/> }
      </div>
    );
  }
}
