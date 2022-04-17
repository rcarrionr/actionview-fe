import React, { PropTypes, Component } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

export default class WorkflowCommentsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: '' };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    doAction: PropTypes.func.isRequired,
    action_id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, data, doAction, action_id } = this.props;
    const ecode = await doAction(data.id, data.entry_id, { action_id, comments: this.state.comments });
    if (ecode === 0) {
      close();
      notify.show('Submitted.', 'success', 2000);
    } else {
      notify.show('Submission Failed.', 'error', 2000);
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Process comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            componentClass='textarea'
            style={ { height: '150px' } }
            onChange={ (e) => { this.setState({ comments: e.target.value }) } }
            placeholder='Enter a comment'
            value={ this.state.comments } />
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={ !this.state.comments } onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
