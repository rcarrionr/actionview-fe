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
    del: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, del, data } = this.props;
    close();
    const ecode = await del(data.id);
    if (ecode === 0) {
      notify.show('Delete is done.', 'success', 2000);
    } else {
      notify.show('failed to delete.', 'error', 2000);
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { data } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Delete field - { data.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          After this field is deleted, the relevant field information in the problem will be deleted and cannot be recoverable, please carefully.<br/>
          Confirm that you want to delete this field?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
