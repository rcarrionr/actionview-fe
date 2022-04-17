import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Modal, ButtonGroup, Button } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import { notify } from 'react-notify-toast';
import _ from 'lodash';

const img = require('../../assets/images/loading.gif');

const series = [
  { name: 'Reference', stroke: '#999', data: [] },
  { name: 'Remainder', stroke: '#d04437', data: [] }
];

export default class PreviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = { display: [], mode: 'issueCount' };
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    getSprintLog: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    no: PropTypes.number.isRequired
  }

  handleCancel() {
    const { close } = this.props;
    close();
  }

  diplayChanged(newValue) {
    this.setState({ display: newValue });
  }

  async componentWillMount() {
    const { no, getSprintLog } = this.props;
    const ecode = await getSprintLog(no);
    if (ecode !== 0) {
      notify.show('Get data failed.', 'error', 2000);
    }
  }

  render() {
    const { no, data, loading } = this.props;

    let newData = {};
    if (!_.isEmpty(data)) {
      if (this.state.mode === 'storyPoints') {
        newData = data.story_points;
      } else {
        newData = data.issue_count;
      }

      if (_.indexOf(this.state.display, 'notWorkingShow') === -1) {
        series[0].data = _.reject(newData.guideline || [], { notWorking : 1 });
        series[1].data = _.reject(newData.remaining || [], { notWorking : 1 });
      } else {
        series[0].data = newData.guideline || [];
        series[1].data = newData.remaining || [];
      }
    }


    return (
      <Modal
        show 
        onHide={ this.handleCancel } 
        backdrop='static' 
        dialogClassName='custom-modal-90'
        aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton ref='header'>
          <Modal.Title id='contained-modal-title-la'>Burn out{ ' - ' + 'Sprint ' + no }</Modal.Title>
        </Modal.Header>
        { loading &&
        <Modal.Body style={ { height: '580px', overflow: 'auto' } }>
          <div style={ { textAlign: 'center', marginTop: '235px' } }>
            <img src={ img } className='loading'/>
          </div>
        </Modal.Body> }
        { !loading &&
        <Modal.Body style={ { height: '580px', overflow: 'auto' } }>
          <ButtonGroup style={ { float: 'right', marginRight: '55px' } }>
            <Button title='Count number' style={ { backgroundColor: this.state.mode == 'issueCount' && '#eee' } } onClick={ ()=>{ this.setState({ mode: 'issueCount' }) } }>Count number</Button>
            <Button title='Storypoint' style={ { backgroundColor: this.state.mode == 'storyPoints' && '#eee' } } onClick={ ()=>{ this.setState({ mode: 'storyPoints' }) } }>Story point</Button>
          </ButtonGroup> 
          <CheckboxGroup style={ { float: 'right', marginTop: '8px', marginRight: '10px' } } name='notifications' value={ this.state.display } onChange={ this.diplayChanged.bind(this) }>
            <label style={ { fontWeight: 400 } }>
              <Checkbox value='notWorkingShow'/>
              <span style={ { marginLeft: '3px' } }>Display non-working day</span>
            </label>
          </CheckboxGroup>
          <LineChart 
            height={ 500 } 
            width={ findDOMNode(this.refs.header).getBoundingClientRect().width - 80 }
            style={ { marginTop: '45px' } }>
            <XAxis dataKey='day' type='category' allowDuplicatedCategory={ false } />
            <YAxis dataKey='value'/>
            <CartesianGrid strokeDasharray='3 3'/>
            <Tooltip/>
            <Legend />
            { series.map(s => (
              <Line dataKey='value' data={ s.data } stroke={ s.stroke } name={ s.name } key={ s.name }/>
            )) }
          </LineChart>
        </Modal.Body> }
        <Modal.Footer>
          <Button onClick={ this.handleCancel }>closure</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
