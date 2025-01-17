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
    collection: PropTypes.array.isRequired,
    isSysConfig: PropTypes.bool.isRequired,
    goConfig: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired
  }

  createModalClose() {
    this.setState({ createModalShow: false });
  }

  render() {
    const { i18n, isSysConfig, create, goConfig, collection } = this.props;

    return (
      <div>
        <div style={ { marginTop: '5px' } }>
          <Button 
            className='create-btn' 
            onClick={ () => { this.setState({ createModalShow: true }); } }>
            <i className='fa fa-plus'></i>&nbsp;New workflow
          </Button>
        </div>
        <div className='info-col'>
          <div className='info-icon'>
            <i className='fa fa-info-circle'></i>
          </div>
          <div className='info-content'>
            Can only be deleted without association to problem type{ isSysConfig && '(Including each project custom problem type)' }Workflow.
          </div>
        </div>
        { this.state.createModalShow && 
          <CreateModal 
            show 
            close={ this.createModalClose } 
            create={ create } 
            goConfig={ goConfig }
            data={ collection.length > 0 ? _.last(collection) : {} }
            i18n={ i18n }/> }
      </div>
    );
  }
}
