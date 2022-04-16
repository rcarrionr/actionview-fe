import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

export default class MultiOperateNotify extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    ids: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    operate: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    cancelSelected: PropTypes.func.isRequired,
    multiRenew: PropTypes.func.isRequired,
    multiInvalidate: PropTypes.func.isRequired,
    multiDel: PropTypes.func.isRequired
  }

  async confirm() {
    const { multiInvalidate, multiRenew, multiDel, cancelSelected, collection, ids=[], operate, close } = this.props;

    if (ids.length <= 0) {
      return;
    }

    let ecode = 0, msg = '', newIds = [];
    if (operate == 'renew') {
      ecode = await multiRenew(ids);
      msg = 'The password has been reset.'; 
    } else if (operate == 'validate') {
      newIds = _.map(_.filter(collection, (v) => (!v.directory || v.directory == 'self') && v.status == 'invalid' && ids.indexOf(v.id) !== -1), (v) => v.id);
      ecode = await multiInvalidate(newIds, 0);
      msg = 'The user is enabled.'; 
    } else if (operate == 'invalidate') {
      newIds = _.map(_.filter(collection, (v) => (!v.directory || v.directory == 'self') && v.status == 'active' && ids.indexOf(v.id) !== -1), (v) => v.id);
      ecode = await multiInvalidate(newIds, 1);
      msg = 'The user is disabled.'; 
    } else if (operate == 'del') {
      newIds = _.map(_.filter(collection, (v) => (!v.directory || v.directory == 'self') && ids.indexOf(v.id) !== -1), (v) => v.id);
      ecode = await multiDel(newIds);
      msg = 'The user has been deleted.'; 
    }
    if (ecode === 0) {
      close();
      cancelSelected();
      notify.show(msg, 'success', 2000);    
    }
    this.setState({ ecode: ecode });
  }

  cancel() {
    const { close, loading } = this.props;
    if (loading) {
      return;
    }
    this.setState({ ecode: 0 });
    close();
  }

  render() {
    const { i18n: { errMsg }, operate, loading, collection, ids } = this.props;
    let operateTitle = '';
    if (operate === 'renew') {
      operateTitle = 'reset Password';
    } else if (operate === 'del') {
      operateTitle = 'User delete'
    } else if (operate === 'validate') {
      operateTitle = 'User is enabled';
    } else if (operate === 'invalidate') {
      operateTitle = 'User disabled';
    } else {
      return <div/>;
    }

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Batch user - { operateTitle }</Modal.Title>
        </Modal.Header>
        { operate === 'renew' && 
        <Modal.Body>
          Do you reset the password selected by the user?
        </Modal.Body> }
        { operate === 'invalidate' &&
        <Modal.Body>
          Collecting users <span style={ { fontWeight: 'bold' } }>{ ids.length }</span> indivual,
          Can be disabled <span style={ { fontWeight: 'bold', color: 'red' } }>{ _.filter(collection, (v) => (!v.directory || v.directory == 'self') && v.status == 'active' && ids.indexOf(v.id) !== -1).length }</span> indivual.<br/>
          Is it disabled?<br/><br/>
          Note: This action is invalid for users who come synchronize from the external user directory.
        </Modal.Body> }
        { operate === 'validate' &&
        <Modal.Body>
          Collecting users <span style={ { fontWeight: 'bold' } }>{ ids.length }</span> indivual,
          Among them, users can be enabled <span style={ { fontWeight: 'bold', color: 'red' } }>{ _.filter(collection, (v) => (!v.directory || v.directory == 'self') && v.status == 'invalid' && ids.indexOf(v.id) !== -1).length }</span> indivual.<br/>
          Whether to enable?<br/><br/>
          Note: This action is invalid for users who come synchronize from the external user directory.
        </Modal.Body> }
        { operate === 'del' && 
        <Modal.Body>
          After the user is deleted, the user in the project is also deleted at the same time.<br/>
          Collecting users <span style={ { fontWeight: 'bold' } }>{ ids.length }</span> indivual,
          Among them, it can be deleted <span style={ { fontWeight: 'bold', color: 'red' } }>{ _.filter(collection, (v) => (!v.directory || v.directory == 'self') && ids.indexOf(v.id) !== -1).length }</span> indivual.<br/>
          delete or not?<br/><br/>
          Note: This action is invalid for users who come synchronize from the external user directory.
        </Modal.Body> }
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !loading && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ loading ? 'loading' : 'hide' }/>
          <Button onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' disabled={ loading } onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
