import React, { PropTypes, Component } from 'react';
import { Modal, Button, FormGroup, Radio, Checkbox } from 'react-bootstrap';
import Select from 'react-select';
import { notify } from 'react-notify-toast';
import _ from 'lodash';

const loadimg = require('../../assets/images/loading.gif');

export default class ReleaseModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, operate_flg: '0', swapVersion: '', isSendMsg: true };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    release: PropTypes.func.isRequired,
    versions: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, release, data } = this.props;
    const ecode = await release(_.extend({}, { id: data.id }, { status: data.status === 'released' ? 'unreleased' : 'released', operate_flg: this.state.operate_flg, swap_version: this.state.swapVersion, isSendMsg: this.state.isSendMsg }));
    if (ecode === 0) {
      close();
      if (data.status === 'released') {
        notify.show('Release completion.', 'success', 2000);    
      } else {
        notify.show('It has been set.', 'success', 2000);    
      }
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
    const { i18n: { errMsg }, data, versions, loading } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Version{ data.status === 'released' ? 'Cancel release' : 'release' } - { data.name }</Modal.Title>
        </Modal.Header>
        { data.status !== 'released' &&
        <Modal.Body>
          { data.unresolved_cnt > 0 ?
          <div className='info-col' style={ { marginTop: '5px' } }>
            <div className='info-icon'><i className='fa fa-info-circle'></i></div>
            <div className='info-content'>This version has <span style={ { color: 'red', fontWeight: 600 } }>{ data.unresolved_cnt }</span> I have not been resolved.</div>
          </div>
          :
          <div className='info-col' style={ { marginTop: '5px' } }>
            <div className='info-icon'><i className='fa fa-info-circle'></i></div>
            <div className='info-content'>This version has no problem unresolved.</div>
          </div> }
          { data.unresolved_cnt > 0 &&
          <div style={ { margin: '20px 10px 10px 10px' } }>
            <div style={ { display: 'inline-block', verticalAlign: 'top', fontWeight: 600 } }>Unresolved problem</div>
            <div style={ { display: 'inline-block', marginLeft: '20px' } }>
              <FormGroup>
                <Radio 
                  inline
                  name='swap' 
                  onClick={ () => { this.setState({ operate_flg : '1' }) } }
                  checked={ this.state.operate_flg === '1' }> 
                  Move to the version
                </Radio>
                <div style={ { width: '300px', margin: '5px 5px 10px 18px' } }>
                  <Select
                    simpleValue
                    clearable={ false }
                    disabled={ this.state.operate_flg !== '1' }
                    options={ _.map(_.reject(versions, { id: data.id } ), (v) => ({ value: v.id, label: v.name }) ) }
                    value={ this.state.swapVersion }
                    onChange={ (newValue) => { this.setState({ swapVersion: newValue }) } }
                    placeholder='Select version'/>
                </div>
                <Radio 
                  inline
                  name='ignore' 
                  onClick={ () => { this.setState({ operate_flg : '2' }) } }
                  checked={ this.state.operate_flg === '2' }> 
                  Ignore continued release
                </Radio>
              </FormGroup>
            </div>
          </div> }
        </Modal.Body> }
        { data.status === 'released' &&
        <Modal.Body>
          Is this version confirmed to cancel it??
        </Modal.Body> }
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !loading && errMsg[this.state.ecode] }</span>
          <img src={ loadimg } className={ loading ? 'loading' : 'hide' }/>
          { data.status !== 'released' &&
          <Checkbox
            disabled={ loading }
            checked={ this.state.isSendMsg }
            onClick={ () => { this.setState({ isSendMsg: !this.state.isSendMsg }) } }
            style={ { display: 'inline-block', marginRight: '20px', marginLeft: '10px' } }>
            Notifying item members
          </Checkbox> }
          <Button 
            onClick={ this.confirm } 
            disabled={ loading || (data.status !== 'released' && data.unresolved_cnt > 0 && this.state.operate_flg === '0') || (data.status !== 'released' && this.state.operate_flg === '1' && !this.state.swapVersion) }>
            Sure
          </Button>
          <Button bsStyle='link' disabled={ loading } onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
