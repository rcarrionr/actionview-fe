import React, { PropTypes, Component } from 'react';
import { Modal, Button, Checkbox } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

export default class ResetColumnsNotify extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, deleteFromProject: false };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired
  }

  async confirm() {
    const { close, reset } = this.props;
    const ecode = await reset({ delete_from_project: this.state.deleteFromProject });
    this.setState({ ecode: ecode });

    if (ecode === 0) {
      close();
      notify.show('Reset.', 'success', 2000);
    }
  }

  cancel() {
    const { loading, close } = this.props;
    if (loading) {
      return;
    }
    close();
  }

  render() {
    const { i18n: { errMsg }, loading, options } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Display column reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirm to reset the list display column?
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !loading && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ loading ? 'loading' : 'hide' }/>
          { options.permissions && options.permissions.indexOf('manage_project') !== -1 &&
          <Checkbox
            disabled={ loading }
            checked={ this.state.deleteFromProject }
            onClick={ () => { this.setState({ deleteFromProject: !this.state.deleteFromProject }) } }
            style={ { display: 'inline-block', marginRight: '20px', marginLeft: '10px' } }>
            Delete project default settings
          </Checkbox> }
          <Button disabled={ loading } onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' disabled={ loading } onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
