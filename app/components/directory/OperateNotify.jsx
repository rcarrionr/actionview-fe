import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

export default class OperateNotify extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    operate: PropTypes.string.isRequired,
    del: PropTypes.func.isRequired,
    invalidate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, operate, del, invalidate, data } = this.props;
    close();

    let ecode = 0, msg = '';
    if (operate === 'del') {
      ecode = await del(data.id);
      msg = 'The directory has been deleted.'; 
    } else if (operate === 'validate') {
      ecode = await invalidate(data.id, 0);
      msg = 'The directory is enabled.'; 
    } else if (operate === 'invalidate') {
      ecode = await invalidate(data.id, 1);
      msg = 'The directory is disabled.'; 
    } else {
      return;
    }
    if (ecode === 0) {
      notify.show(msg, 'success', 2000);    
    } else {
      notify.show('operation failed.', 'error', 2000);    
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { operate, data } = this.props;
    let operateTitle = '';
    if (operate === 'del') {
      operateTitle = 'Catalog delete'
    } else if (operate === 'validate') {
      operateTitle = 'Catalog is enabled';
    } else if (operate === 'invalidate') {
      operateTitle = 'Directory disabled';
    } else {
      return <div/>;
    }

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>{ operateTitle }</Modal.Title>
        </Modal.Header>
        { operate === 'del' && 
        <Modal.Body>
          After the directory is deleted, the synchronized user information will also be deleted.<br/>
          delete or not[{ data.name }] This directory?
        </Modal.Body> }
        { operate === 'validate' &&
        <Modal.Body>
          Whether to enable[{ data.name }] This directory?
        </Modal.Body> }
        { operate === 'invalidate' &&
        <Modal.Body>
          After disabling the directory, the user will not automatically synchronize, and the login authentication will be invalid.<br/>
          Is it disabled?{ data.name }] This directory?
        </Modal.Body> }
        <Modal.Footer>
          <Button onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
