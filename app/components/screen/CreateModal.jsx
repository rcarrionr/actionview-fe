import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, Form, FormControl, FormGroup, Col, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

import Tabs, { TabPane } from 'rc-tabs';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import Card from '../share/Card';

const img = require('../../assets/images/loading.gif');

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Be required';
  }

  return errors;
};

@reduxForm({
  form: 'screen',
  fields: [ 'name', 'description', 'required_fields' ],
  validate
})
@DragDropContext(HTML5Backend)
export default class CreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, activeKey: '1', cards: [], addFieldIds: '', enableAdd: false, removeIconShow: false, hoverId: '' };
    this.moveCard = this.moveCard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    options: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { values, create, close } = this.props;
    if (values.required_fields) {
      values.required_fields = _.filter(values.required_fields.split(','), (val) => { return _.findIndex(this.state.cards, { id: val }) !== -1 });
    }
    const ecode = await create(
      _.assign(values, 
        { fields: _.map(this.state.cards, _.iteratee('id')) }
      )
    );

    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('Newly created.', 'success', 2000);
    } else {
      this.setState({ ecode: ecode });
    }
  }

  handleCancel() {
    const { close, submitting } = this.props;
    if (submitting) {
      return;
    }
    this.setState({ ecode: 0 });
    close();
  }

  deleteCard(i) {
    const cardId = this.state.cards[i].id;

    this.state.cards.splice(i, 1);
    this.setState({ cards: this.state.cards });
  }

  handleChange(fields) {
    if (fields !== '') {
      this.setState ({ addFieldIds: fields, enableAdd: true });
    } else {
      this.setState ({ enableAdd: false });
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

  onTabChange(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    const { i18n: { errMsg }, fields: { name, description, required_fields }, handleSubmit, invalid, submitting, options } = this.props;

    const { cards, enableAdd } = this.state;
    const allFields = _.map(options.fields || [], function(val) {
      return { label: val.name, value: val.id };
    });

    const screenFields = _.map(cards || [], function(val) {
      return { label: val.text, value: val.id };
    });

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>New interface</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body style={ { height: '420px', overflow: 'auto' } }>
          <Tabs
            activeKey={ this.state.activeKey }
            onChange={ this.onTabChange.bind(this) } >
            <TabPane tab='Basic' key='1'>
              <div style={ { paddingTop: '15px' } }>
                <FormGroup controlId='formControlsText' validationState={ name.touched && name.error ? 'error' : null }>
                  <ControlLabel><span className='txt-impt'>*</span>Interface name</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...name } placeholder='Interface name'/>
                  { name.touched && name.error && <HelpBlock style={ { float: 'right' } }>{ name.error }</HelpBlock> }
                </FormGroup>
                <FormGroup controlId='formControlsText'>
                  <ControlLabel>describe</ControlLabel>
                  <FormControl disabled={ submitting } type='text' { ...description } placeholder='Description'/>
                </FormGroup>
              </div>
            </TabPane>
            <TabPane tab='Field configuration' key='2'>
              <div style={ { paddingTop: '15px' } }>
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
                        disabled={ !enableAdd }>
                        Add to Interface list >> 
                      </Button>
                      <div style={ { float: 'right', marginTop: '15px' } }>
                        Note: If this page will be created or edited as a problem, you should first "theme" Fields are added to the list and set it to the required field.
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
              </div>
            </TabPane>
            <TabPane tab='Required field' key='3'>
              <div style={ { paddingTop: '15px' } }>
                <FormGroup controlId='formControlsSelect'>
                  <ControlLabel>Required field</ControlLabel>
                  <Select 
                    simpleValue 
                    options={ screenFields } 
                    clearable={ false } 
                    value={ required_fields.value } 
                    onChange={ newValue => { required_fields.onChange(newValue) } } 
                    placeholder='Select required field(Multiple choice)' 
                    multi/>
                </FormGroup>
              </div>
            </TabPane>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button disabled={ submitting || invalid } type='submit'>Sure</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>Cancel</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
