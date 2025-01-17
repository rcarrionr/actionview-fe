import React, { PropTypes, Component } from 'react';
import { Modal, Button, Checkbox } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import _ from 'lodash';

const img = require('../../assets/images/loading.gif');

export default class CompleteNotify extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, isSendMsg: true };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    sprintNo: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    completedIssues: PropTypes.func.isRequired,
    complete: PropTypes.func.isRequired
  }

  async confirm() {
    const { close, complete, sprintNo, completedIssues } = this.props;
    const ecode = await complete({ completed_issues: _.map(completedIssues, (v) => v.no), isSendMsg: this.state.isSendMsg }, sprintNo);
    this.setState({ ecode: ecode });

    if (ecode === 0) {
      close();
      notify.show('Sprint ' + sprintNo + ' It has been set.', 'success', 2000);
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { i18n: { errMsg }, total, completedIssues, loading } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>
            FinishSprint
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { total - completedIssues.length > 0 && 'besides ' + (total - completedIssues.length) + ' The problem is not completed.' }
          Confirm that the setting is completedSprint? <br/>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !loading && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ loading ? 'loading' : 'hide' }/>
          <Checkbox
            disabled={ loading }
            checked={ this.state.isSendMsg }
            onClick={ () => { this.setState({ isSendMsg: !this.state.isSendMsg }) } }
            style={ { display: 'inline-block', marginRight: '20px', marginLeft: '10px' } }>
            Notifying item members
          </Checkbox>
          <Button disabled={ loading } onClick={ this.confirm }>Sure</Button>
          <Button bsStyle='link' disabled={ loading } onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
