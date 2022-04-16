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
    renew: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    invalidate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, operate, renew, del, invalidate, data } = this.props;
    close();

    let ecode = 0, msg = '';
    if (operate === 'renew') {
      ecode = await renew(data.id);
      msg = 'The password has been reset.'; 
    } else if (operate === 'del') {
      ecode = await del(data.id);
      msg = 'The user has been deleted.'; 
    } else if (operate === 'validate') {
      ecode = await invalidate(data.id, 0);
      msg = 'The user is enabled.'; 
    } else if (operate === 'invalidate') {
      ecode = await invalidate(data.id, 1);
      msg = 'The user is disabled.'; 
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
          <Modal.Title id='contained-modal-title-la'>{ operateTitle }</Modal.Title>
        </Modal.Header>
        { operate === 'renew' && 
        <Modal.Body>
          Will it [{ data.first_name }] This user password reset?
        </Modal.Body> }
        { operate === 'del' && 
        <Modal.Body>
          After the user is deleted, the user in the project is also deleted at the same time.<br/>
          delete or not【{ data.first_name }] This user?
        </Modal.Body> }
        { operate === 'validate' &&
        <Modal.Body>
          Whether to enable【{ data.first_name }] This user?
        </Modal.Body> }
        { operate === 'invalidate' &&
        <Modal.Body>
          Is it disabled?{ data.first_name }] This user?
        </Modal.Body> }
        <Modal.Footer>
          <Button onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
