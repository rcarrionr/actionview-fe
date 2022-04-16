import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

const logo = require('../../assets/images/brand.png');

export default class AboutModal extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired
  }

  handleCancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { close } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>about</Modal.Title>
        </Modal.Header>
        <Modal.Body style={ { overflow: 'auto' } }>
          <div style={ { margin: '20px 0px', textAlign: 'center' } }><img src={ logo } width={ 150 }/></div>
          <div style={ { textAlign: 'center' } }>
            <span>current version: 1.13.1</span>
            <a href='https://github.com/lxerxa/actionview/releases' target='_blank'><span style={ { marginLeft: '10px' } }>New version change</span></a>
          </div>
          <div style={ { marginTop: '30px' } }>
            <table style={ { width: '100%' } }>
              <tr>
                <td style={ { textAlign: 'right', paddingRight: '15px' } }>
                  <iframe
                    src='https://ghbtns.com/github-btn.html?user=lxerxa&repo=actionview&type=star&count=true'
                    frameBorder='0'
                    scrolling='0'
                    width='100px'
                    height='20px'>
                  </iframe>
                </td>
                <td style={ { textAlign: 'left', paddingLeft: '15px' } }>
                  <iframe
                    src='https://ghbtns.com/github-btn.html?user=lxerxa&repo=actionview&type=fork&count=true'
                    frameBorder='0'
                    scrolling='0'
                    width='100px'
                    height='20px'>
                  </iframe>
                </td>
              </tr>
            </table>
          </div>
          <div style={ { margin: '40px' } }>
            <span>A free, easy to use, easy to use, easy to use for SMEsJiraProblem requirement tracking tool.The goal is an important part of the company's open source research and development tool chain.</span>
          </div>
          <div style={ { margin: '40px', textAlign: 'center' } }>
            <span>Want to help?<a href='https://github.com/lxerxa/actionview' target='_blank'>Welcome!</a></span>
            <span>What is wrong or suggestions,<a href='https://github.com/lxerxa/actionview/issues' target='_blank'>Welcome!</a></span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href='https://github.com/lxerxa/actionview/blob/master/LICENSE.txt' target='_blank'>
            <span style={ { float: 'left', marginTop: '5px', marginLeft: '5px' } }>Authorization information</span>
          </a>
          <Button onClick={ this.handleCancel }>closure</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

