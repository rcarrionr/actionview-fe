import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

const img = require('../../assets/images/loading.gif');

export default class DelFileModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, del, data } = this.props;
    const ecode = await del(data.field_key, data.id);
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
    } else {
      this.setState({ ecode: ecode });
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { i18n: { errMsg }, data, loading } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Delete Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirm that you want to delete[{ data.name }]This file?
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !loading && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ loading ? 'loading' : 'hide' }/>
          <Button disabled={ loading } onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' disabled={ loading } onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
