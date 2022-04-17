import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

export default class MultiDelNotify extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    index: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    multiDel: PropTypes.func.isRequired,
    issueIds: PropTypes.array.isRequired
  }

  async confirm() {
    const { close, multiDel, issueIds, index, query } = this.props;
    const ecode = await multiDel({ method: 'delete', data: { ids: issueIds } });
    this.setState({ ecode: ecode });
    if (ecode === 0) {
      close();
      notify.show('The problem has been deleted.', 'success', 2000);
      index(query);
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { i18n: { errMsg }, issueIds, loading } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Batch deletion problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A total of choice <b>{ issueIds.length }</b> I have to delete these problems.?<br/><br/>
          If you have completed these questions, usually"solve"or"closure"Question, not delete.<br/>
          If deleted, the child problems of these issues will also be deleted.<br/> 
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
