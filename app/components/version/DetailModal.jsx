import React, { PropTypes, Component } from 'react';
import { Modal, Button, Form, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import _ from 'lodash';

const moment = require('moment');

export default class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  handleCancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { data } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Version details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={ { maxHeight: '580px', overflow: 'auto' } }>
          <Form horizontal>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                name 
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.name || '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                Plan start time 
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.start_time ? moment.unix(data.start_time).format('YYYY/MM/DD') : '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                Plan completion time
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.end_time ? moment.unix(data.end_time).format('YYYY/MM/DD') : '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                release time
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.released_time ? moment.unix(data.released_time).format('YYYY/MM/DD') : '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                state 
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.status === 'released' ? 'Published' : 'Unpublished' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                describe
              </Col>
              <Col sm={ 9 }>
                <div style={ { whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginTop: '7px' } } dangerouslySetInnerHTML={ {  __html: _.escape(data.description || '-').replace(/(\r\n)|(\n)/g, '<br/>') } }/>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.handleCancel }>closure</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
