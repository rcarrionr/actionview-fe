import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
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
    ids: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    operate: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    cancelSelected: PropTypes.func.isRequired,
    multiReopen: PropTypes.func.isRequired,
    multiArchive: PropTypes.func.isRequired,
    multiCreateIndex: PropTypes.func.isRequired
  }

  async confirm() {
    const { 
      multiArchive, 
      multiReopen, 
      multiCreateIndex, 
      cancelSelected, 
      ids=[], 
      operate, 
      close 
    } = this.props;

    if (ids.length <= 0) {
      return;
    }

    let ecode = 0, msg = '';
    if (operate == 'reopen') {
      ecode = await multiReopen(ids);
      msg = 'The archive has been canceled.'; 
    } else if (operate == 'archive') {
      ecode = await multiArchive(ids);
      msg = 'The project has been archived.'; 
    } else if (operate == 'create_index') {
      ecode = await multiCreateIndex(ids);
      msg = 'Index has been created.'; 
    }
    if (ecode === 0) {
      close();
      cancelSelected();
      notify.show(msg, 'success', 2000);    
    } else {
      notify.show('operation failed.', 'error', 2000);    
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
    const { i18n: { errMsg }, operate, loading } = this.props;
    const operateTitle = operate === 'reopen' ? 'Cancel archive' : (operate === 'create_index' ? 'Reinterpret' : 'Archive');

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Batch project - { operateTitle }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { 'Confirm ' + operateTitle + ' Selected item?' }
        </Modal.Body>
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
