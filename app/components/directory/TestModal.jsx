import React, { PropTypes, Component } from 'react';
import { Modal, Button, Label } from 'react-bootstrap';

const img = require('../../assets/images/loading.gif');

export default class TestModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    test: PropTypes.func.isRequired,
    testInfo: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  handleCancel() {
    const { close, loading } = this.props;
    if (loading) {
      return;
    }

    this.setState({ ecode: 0 });
    close();
  }

  componentWillMount() {
    const { test, data } = this.props;
    test(data.id);
  }

  retest() {
    const { test, data } = this.props;
    test(data.id);
  }

  render() {
    const { loading, testInfo={}, data } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Catalog test - { data.name }</Modal.Title>
        </Modal.Header>
        { loading &&
        <Modal.Body style={ { height: '240px', overflow: 'auto' } }>
          <div style={ { textAlign: 'center', marginTop: '75px' } }>
            <img src={ img } className='loading'/><br/>
            testing...
          </div>
        </Modal.Body> }
        { !loading &&
        <Modal.Body style={ { height: '240px', overflow: 'auto' } }>
          <br/>
          <table style={ { marginLeft: '20px' } }>
            <tr>
              <td style={ { height: '35px', textAlign: 'right' } }>Server connection:</td>
              <td>{ testInfo.server_connect ? <Label bsStyle='success'>success</Label> : <Label bsStyle='danger'>fail</Label> }</td>
            </tr>
            <tr>
              <td style={ { height: '35px', textAlign: 'right' } }>Get users:</td>
              <td>{ testInfo.user_count || 0 } indivual</td>
            </tr>
            <tr>
              <td style={ { height: '35px', textAlign: 'right' } }>Get user groups:</td>
              <td>{ testInfo.group_count || 0 } indivual</td>
            </tr>
            {/* testInfo.group_count > 0 &&
            <tr>
              <td style={ { height: '35px', textAlign: 'right' } }>Get user group members:</td>
              <td>{ testInfo.group_membership ? <Label bsStyle='success'>success</Label> : <Label bsStyle='danger'>fail</Label> }</td>
            </tr> */}
          </table>
        </Modal.Body> }
        <Modal.Footer>
          <Button disabled={ loading } bsStyle='link' onClick={ this.retest.bind(this) }>retest</Button>
          <Button disabled={ loading } onClick={ this.handleCancel }>closure</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
