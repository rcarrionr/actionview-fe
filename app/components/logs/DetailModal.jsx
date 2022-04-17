import React, { PropTypes, Component } from 'react';
import { Modal, Button, Form, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import _ from 'lodash';
import ReactJson from 'react-json-view';
import { FieldTypes } from '../share/Constants';

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
          <Modal.Title id='contained-modal-title-la'>Request details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={ { maxHeight: '580px', overflow: 'auto' } }>
          <Form horizontal>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                user
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.user && data.user.name || '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                askUrl 
              </Col>
              <Col sm={ 9 }>
                <div style={ { whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginTop: '7px' } }>
                  { data.request_url || '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                method
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.request_method || '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                sourceIP 
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.request_source_ip || '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                Starting time
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.requested_start_at ? moment(data.requested_start_at).format('YYYY/MM/DD HH:mm') : '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                End Time
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.requested_end_at ? moment(data.requested_end_at).format('YYYY/MM/DD HH:mm') : '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                Request time 
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.exec_time ? (data.exec_time + 'ms') : '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                User-Agent 
              </Col>
              <Col sm={ 9 }>
                <div style={ { whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginTop: '7px' } }>
                  { data.request_user_agent || '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                Body 
              </Col>
              <Col sm={ 9 }>
                <div style={ { whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginTop: '10px' } }>
                  { !_.isEmpty(data.request_body) ? 
                    <ReactJson 
                      collapsed 
                      src={ data.request_body }
                      onAdd={ false }
                      onEdit={ false }
                      onDelete={ false }
                      enableClipboard={ false }
                      displayDataTypes={ false }
                      displayObjectSize={ false } /> 
                    : 
                    '-' }
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={ 3 } componentClass={ ControlLabel }>
                Return status 
              </Col>
              <Col sm={ 9 }>
                <div style={ { marginTop: '7px' } }>
                  { data.response_status || '-' }
                </div>
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
