import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

const loadimg = require('../../assets/images/loading.gif');

export default class SyncNotify extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    sync: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    year: PropTypes.string.isRequired
  }

  async confirm() {
    const { close, sync, year } = this.props;
    const ecode = await sync(year);
    if (ecode === 0) {
      close();
      notify.show('Synchronous completion.', 'success', 2000);    
    }
    this.setState({ ecode: ecode });
  }

  cancel() {
    const { close, loading } = this.props;
    if (loading) {
      return;
    }
    close();
  }

  render() {
    const { i18n: { errMsg }, year, loading } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Synchronous calendar - { year }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br/>Synchronous data comes to the interface:<a href={ 'https://actionview.cn/actionview/api/holiday/' + year } target='_blank'>{ 'https://actionview.cn/actionview/api/holiday/' + year }</a><br/><br/>
          After synchronization, the original set calendar will be overwritten, confirm that you want to synchronize?<br/><br/>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !loading && errMsg[this.state.ecode] }</span>
          <img src={ loadimg } className={ loading ? 'loading' : 'hide' }/>
          <Button onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
