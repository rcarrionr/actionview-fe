import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

const moment = require('moment');

export default class CheckoutNotify extends Component {
  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, checkout, data } = this.props;
    close();
    const ecode = await checkout(data.id);
    if (ecode === 0) {
      notify.show('Unlocked.', 'success', 2000);    
    } else {
      notify.show('Unlock failed.', 'error', 2000);    
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
          <Modal.Title id='contained-modal-title-la'>Document unlock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { 'This document[' + data.name + ']quilt ' + ( data.checkin.user ? data.checkin.user.name : '' ) + ' At ' + ( data.checkin.at ? moment.unix(data.checkin.at).format('YYYY/MM/DD HH:mm') : '' ) + ' locking.' }
          <br/>

          Confirm that you want to unlock?<br/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
