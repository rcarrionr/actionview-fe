import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

export default class EnableNotify extends Component {
  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    mode: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    handle: PropTypes.func.isRequired
  }

  async confirm() {
    const { close, handle, user, mode } = this.props;
    close();
    const ecode = await handle({ user: user.key, mode });
    if (ecode === 0) {
      if (mode == 'enable') {
        notify.show('activated.', 'success', 2000);
      } else if (mode == 'disable') {
        notify.show('disabled.', 'success', 2000);
      }
    } else {
      if (mode == 'enable') {
        notify.show('Enable failed.', 'error', 2000);
      } else if (mode == 'disable') {
        notify.show('Disable failure.', 'error', 2000);
      }
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { user, mode } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>{ mode == 'enable' ? 'User is enabled' : 'User disabled' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirm{ mode == 'enable' ? 'Enable' : 'Disable' }[{ user.name }]This user?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
