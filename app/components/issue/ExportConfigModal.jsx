import React, { PropTypes, Component } from 'react';
import { Modal, Button, Checkbox as BootstrapCheckbox } from 'react-bootstrap';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import _ from 'lodash';

export default class ConfigModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      fields: [ 
        'no', 
        'title', 
        'type', 
        'priority', 
        'state', 
        'resolution', 
        'assignee', 
        'reporter', 
        'resolver', 
        'closer', 
        'created_at',  
        'updated_at', 
        'resolved_at', 
        'closed_at' 
      ] 
    };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    exportExcel: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired
  }

  confirm() {
    const { exportExcel, close } = this.props;
    exportExcel(this.state.fields);
    close();
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  fieldsChanged(newValues) {
    this.setState({
      fields: newValues
    });
  }

  render() {
    const { i18n: { errMsg }, options } = this.props;

    const defined_field_keys = [];
    _.forEach(options.fields || [], (f) => {
      if (f.type !== 'File') {
        defined_field_keys.push(f.key);
      }
    });

    const field_keys = [ 
      'no', 
      'title', 
      'type', 
      'priority', 
      'state', 
      'resolution', 
      'assignee', 
      'reporter', 
      'resolver', 
      'closer', 
      'created_at', 
      'updated_at', 
      'resolved_at', 
      'closed_at', 
      'epic', 
      'sprints' 
    ];
    const diff_field_keys = _.difference(defined_field_keys, field_keys);
    const sorted_field_keys = field_keys.concat(diff_field_keys);

    const special_fields = [
      { key: 'no', name: 'NO' },
      { key: 'type', name: 'type' },
      { key: 'state', name: 'state' },
      { key: 'reporter', name: 'Reporter' },
      { key: 'resolver', name: 'Solve' },
      { key: 'closer', name: 'Shuttle' },
      { key: 'created_at', name: 'Create time' },
      { key: 'updated_at', name: 'Update time' },
      { key: 'resolved_at', name: 'Resolution time' },
      { key: 'closed_at', name: 'Closing time' },
      { key: 'epic', name: 'Epic' },
      { key: 'sprints', name: 'Sprint' }
    ];

    const fields = [];
    _.forEach(sorted_field_keys, (k) => {
      let i = _.findIndex(options.fields, { key: k });
      if (i !== -1) {
        fields.push(options.fields[i]);
        return;
      }

      i = _.findIndex(special_fields, { key: k });
      if (i !== -1) {
        fields.push(special_fields[i]);
        return;
      }
    });

    const rows = [];
    for(let i = 0; i < fields.length; i = i + 2) {
      rows.push(
        <li style={ { height: '30px' } }>
          <div style={ { width: '50%', display: 'inline-block' } }>
            <label style={ { fontWeight: 400 } }>
              <Checkbox value={ fields[i].key }/>
              <span> { fields[i].name || '' }</span>
            </label>
          </div>
          <div style={ { width: '50%', display: 'inline-block' } }>
            <label style={ { fontWeight: 400 } }>
              { fields[i + 1] && <Checkbox value={ fields[i + 1].key }/> }
              <span> { fields[i + 1] && fields[i + 1].name || '' }</span>
            </label>
          </div>
        </li>);
    }

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-la'>Export column selection</Modal.Title>
        </Modal.Header>
        <Modal.Body style={ { maxHeight: '580px', overflow: 'auto' } }>
          <div>Please select the following list:</div>
          <div style={ { padding: '5px 0px 0px 5px' } }>
            <CheckboxGroup name='field' value={ this.state.fields } onChange={ this.fieldsChanged.bind(this) }>
              <ui className='list-unstyled clearfix'>
                { _.map(rows, (v) => v) }
              </ui>
            </CheckboxGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BootstrapCheckbox
            checked={ fields.length == this.state.fields.length }
            onClick={ () => { 
              if (this.state.fields.length === fields.length) { 
                this.setState({ fields: [] });
              } else { 
                this.setState({ fields: _.map(fields, (v) => v.key) }); 
              } } 
            }
            style={ { float: 'left', margin: '5px 5px' } }>
            All Selection
          </BootstrapCheckbox>
          <Button onClick={ this.confirm } disabled={ this.state.fields.length <= 0 }>Export</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
