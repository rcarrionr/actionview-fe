import React, { PropTypes, Component } from 'react';
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import Card from '../share/Card';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

@DragDropContext(HTML5Backend)
export default class LayoutConfigModal extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = { cards: [], ecode: 0, addFieldIds: '', enableAdd: false };
    const fields = this.props.data.schema || [];
    const fieldNum = fields.length;
    for (let i = 0; i < fieldNum; i++) {
      this.state.cards.push({
        id: fields[i].id,
        text: fields[i].name
      });
    }
    this.state.strCards = JSON.stringify(this.state.cards);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    config: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired
  }

  async save() {
    const { close, config, data } = this.props;
    const values = { id: data.id, fields: _.map(this.state.cards, _.iteratee('id')) };
    const ecode = await config(values);
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('Configuration is done.', 'success', 2000);
    } else {
      this.setState({ ecode: ecode });
    }
  }

  cancel() {
    const { close, loading } = this.props;
    if (loading) {
      return;
    }
    close();
  }

  deleteCard(i) {
    this.state.cards.splice(i, 1);
    this.setState({ cards: this.state.cards });
  }

  handleChange(fields) {
    if (fields !== '') {
      this.setState({ addFieldIds: fields, enableAdd: true });
    } else {
      this.setState({ addFieldIds:'', enableAdd: false });
    }
  }

  add() {
    const { options } = this.props;
    const fids = this.state.addFieldIds.split(',');
    for (let i = 0; i < fids.length; i++) {
      const field = _.find(options.fields || [], function(o) { return o.id === fids[i]; });
      this.state.cards.push({ id: field.id, text: field.name });
    }
    this.setState({ cards: this.state.cards, addFieldIds: '', enableAdd: false });
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  }

  render() {
    const { cards, strCards, enableAdd } = this.state;
    const { i18n: { errMsg }, loading, options } = this.props;
    //let optionFields = [];
    const allFields = _.map(options.fields || [], function(val) {
      return { label: val.name, value: val.id };
    });

    return (
      <Modal show onHide={ this.cancel.bind(this) } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>{ 'Interface configuration - ' + this.props.data.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body style={ { height: '420px', overflow: 'auto' } }>
          <Form horizontal>
            <FormGroup controlId='formControlsText'>
              <Col sm={ 6 }>
                <Select 
                  simpleValue 
                  options={ _.reject(allFields, function(o) { return _.findIndex(cards, function(o2) { return o2.id === o.value; }) !== -1; }) } 
                  clearable={ false } 
                  value={ this.state.addFieldIds } 
                  onChange={ this.handleChange.bind(this) } 
                  placeholder='Select Add Field(Multiple choice)' 
                  multi/>
                <Button 
                  style={ { float: 'right', marginTop: '15px' } } 
                  onClick={ this.add.bind(this) } 
                  disabled={ !enableAdd }>Add to Interface list >> 
                </Button>
                <div style={ { float: 'right', marginTop: '15px' } }>
                  Notice:If this page will be created or edited as a problem, you should first "theme" Fields are added to the list and set it to the required field.
                </div>
              </Col>
              <Col sm={ 6 }>
                { cards.length > 0 && <div style={ { marginBottom: '8px' } }>Change the display order by dragging and drop up and down.</div> }
                { cards.length > 0 ?
                  cards.map((op, i) => {
                    return (
                      <Card key={ op.id }
                        index={ i }
                        id={ op.id }
                        text={ op.text }
                        moveCard={ this.moveCard }
                        deleteCard={ this.deleteCard.bind(this, i) }/>
                    );
                  }) 
                  :
                  <p>The list of interfaces is empty.</p>
                }  
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !loading && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ loading ? 'loading' : 'hide' }/>
          <Button disabled={ loading || strCards == JSON.stringify(cards) } onClick={ this.save.bind(this) }>Sure</Button>
          <Button bsStyle='link' disabled={ loading } onClick={ this.cancel.bind(this) }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
