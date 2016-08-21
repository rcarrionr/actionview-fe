import React, { PropTypes, Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import Card from '../share/Card';
import Select from 'react-select';
import _ from 'lodash';

const img = require('../../assets/images/loading.gif');

@DragDropContext(HTML5Backend)
export default class LayoutConfigModal extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = { cards: [], ecode: 0, addFieldId: '', enableAdd: false };
    const fields = this.props.data.fields || [];
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
    loading: PropTypes.bool,
    config: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired
  }

  async save() {
    const { close, config, data } = this.props;
    let ecode = 0;
    const values = { id: data.id, fields: _.map(this.state.cards, _.iteratee('id')) };
    ecode = await config(values);

    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
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

  handleChange(field) {
    if (field !== '') {
      this.setState ({ addFieldId: field, enableAdd: true });
    } else {
      this.setState ({ enableAdd: false });
    }
  }

  add() {
    const { options } = this.props;
    const fid = this.state.addFieldId;
    const field = _.find(options.fields || [], function(o) { return o.id === fid; });
    this.state.cards.push({ id: field.id, text: field.name });
    this.setState({ cards: this.state.cards, addFieldId: '', enableAdd: false });
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
    const { loading, options } = this.props;
    //let optionFields = [];
    const allFields = _.map(options.fields || [], function(val) {
      return { label: val.name, value: val.id };
    });

    return (
      <Modal { ...this.props } onHide={ this.cancel.bind(this) } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>{ '界面配置 - ' + this.props.data.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { cards.length > 0 && <p>通过上下拖拽改变显示顺序。</p> }
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
            <p>此界面暂无字段。</p>
          }
          <FormGroup controlId='formControlsText' style={ { marginTop: '15px' } }>
            <div style={ { display: 'inline-block', width: '68%' } }>
              <Select simpleValue options={ _.reject(allFields, function(o) { return _.findIndex(cards, function(o2) { return o2.id === o.value; }) !== -1; }) } clearable={ false } value={ this.state.addFieldId } onChange={ this.handleChange.bind(this) } placeholder='请选择添加字段'/>
            </div>
            <Button onClick={ this.add.bind(this) } disabled={ !enableAdd } style={ { display: 'inline-block', margin: '3px 0 0 10px', position: 'absolute' } }>添加字段</Button>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !loading && 'aaaa' }</span>
          <image src={ img } className={ loading ? 'loading' : 'hide' }/>
          <Button className='ralign' disabled={ loading || strCards == JSON.stringify(cards) } onClick={ this.save.bind(this) }>确定</Button>
          <Button disabled={ loading } onClick={ this.cancel.bind(this) }>取消</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}