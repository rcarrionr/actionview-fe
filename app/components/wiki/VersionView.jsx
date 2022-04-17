import React, { PropTypes, Component } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import _ from 'lodash';

const moment = require('moment');

export default class VersionViewModal extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    versions: PropTypes.array.isRequired
  }

  handleCancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { versions, select, close } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>historic version</Modal.Title>
        </Modal.Header>
        <Modal.Body style={ { height: '420px', overflow: 'auto' } }>
          <Table hover responsive>
            <thead>
              <tr>
                <th>version number</th>
                <th>Detailed record</th>
              </tr>
            </thead>
            <tbody>
            { _.map(versions || [], (v, key) => {
              return (<tr key={ key }>
                <td>
                  <div style={ { float: 'left' } }>
                    <a href='#' onClick={ (e) => { e.preventDefault(); select(v.version); close(); } }>{ v.version }</a>
                  </div>
                </td>
                <td>
                  <div style={ { float: 'left' } }>
                    { v.editor && v.editor.name ? v.editor.name : (v.creator && v.creator.name || '') }At { v.updated_at ? moment.unix(v.updated_at).format('YYYY/MM/DD HH:mm') : moment.unix(v.created_at).format('YYYY/MM/DD HH:mm') } { v.version == 1 ? 'create' : 'edit' }.
                  </div>
                </td>
              </tr>); }) }
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.handleCancel }>closure</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

