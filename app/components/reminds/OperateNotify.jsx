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
    update: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, operate, del, update, data } = this.props;
    close();

    let ecode = 0, msg = '';
    if (operate === 'del') {
      ecode = await del(data.id);
      msg = 'deleted.'; 
    } else if (operate === 'enable') {
      ecode = await update({ id: data.id, status: 'enabled' });
      msg = 'activated.'; 
    } else if (operate === 'disable') {
      ecode = await update({ id: data.id, status: 'disabled' });
      msg = 'disabled.'; 
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
      operateTitle = 'Reminder removal'
    } else if (operate === 'enable') {
      operateTitle = 'Reminder';
    } else if (operate === 'disable') {
      operateTitle = 'Reminder';
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
          delete or not[{ data.name }]Reminder?
        </Modal.Body> }
        { operate === 'enable' &&
        <Modal.Body>
          Whether to enable[{ data.name }]Reminder?
        </Modal.Body> }
        { operate === 'disable' &&
        <Modal.Body>
          Is it disabled?[{ data.name }]Reminder?
        </Modal.Body> }
        <Modal.Footer>
          <Button onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
