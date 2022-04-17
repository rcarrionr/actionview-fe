import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

export default class DelNotify extends Component {
  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    reset: PropTypes.func,
    del: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, del=null, reset=null, data } = this.props;
    let ecode = 0;
    close();
    if (reset) {
      ecode = await reset(data.id);
      if (ecode === 0) {
        notify.show('Reset completion.', 'success', 2000);    
      } else {
        notify.show('Reset failed.', 'error', 2000);    
      }
    } else {
      ecode = await del(data.id);
      if (ecode === 0) {
        notify.show('Delete is done.', 'success', 2000);    
      } else {
        notify.show('failed to delete.', 'error', 2000);    
      }
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { reset=null, del=null, data } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>{ reset ? 'Reset' : 'delete' }Role - { data.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { reset ? 'Confirm that the permissions to reset this role?' : 'Confirm that you want to delete this role?' }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
