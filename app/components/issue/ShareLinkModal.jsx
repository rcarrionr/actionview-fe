import React, { PropTypes, Component } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';

const { BASENAME } = process.env;

export default class ShareLinkModal extends Component {
  constructor(props) {
    super(props);
    const protocol = window.location.protocol;
    const host = window.location.host;

    this.state = { url: protocol + '//' + host + BASENAME + '/project/' + props.project.key + '/issue?no=' + props.issue.no };
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    issue: PropTypes.object.isRequired
  }

  copy() {
    document.getElementById('url').select();
    document.execCommand('Copy');

    const { close } = this.props;
    close();
  }

  render() {
    const { issue, close } = this.props;

    return (
      <Modal show onHide={ close } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Share link - { issue.no }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            id='url'
            componentClass='textarea'
            style={ { height: '100px' } }
            value={ this.state.url } />
        </Modal.Body>
        <Modal.Footer>
          <span style={ { marginRight: '20px', fontSize: '12px' } }>If the current browser does not support this replication function, you can manually copy the above link.</span>
          <Button onClick={ this.copy.bind(this) }>copy</Button>
          <Button bsStyle='link' onClick={ close }>closure</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
