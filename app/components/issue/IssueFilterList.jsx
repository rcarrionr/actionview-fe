import React, { PropTypes, Component } from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';

import Duration from '../share/Duration';
import Interval from '../share/Interval';

export class IssueFilterList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      unfolded: true, 
      baseFilterShow: true,
      memberFilterShow: false,
      timeFilterShow: false,
      agileFilterShow: false, 
      othersFilterShow: false 
    }
    this.state.values = {};

    this.onChange = this.onChange.bind(this);
    this.groupFields = this.groupFields.bind(this);
    this.removeCond = this.removeCond.bind(this);
    this.removeAllConds = this.removeAllConds.bind(this);
  }

  static propTypes = {
    removable: PropTypes.bool,
    foldable: PropTypes.bool,
    textInputChange: PropTypes.bool,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    onHide: PropTypes.func,
    columns: PropTypes.number,
    styles: PropTypes.object,
    values: PropTypes.object,
    visable: PropTypes.bool,
    notShowFields: PropTypes.array,
    notShowBlocks: PropTypes.array,
    notShowTypes: PropTypes.array,
    options: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    const newQuery = nextProps.values || {};
    if (_.isEmpty(newQuery)) {
      this.state.values = {};
    } else {
      this.state.values = {};
      _.forEach(newQuery, (v, key) => {
        this.state.values[key] = newQuery[key] ? newQuery[key] : '';
      });
    }
  }

  removeCond(field) {
    const { values={}, onChange } = this.props;

    const newQuery = _.assign({}, values);
    _.forEach(this.state.values, (v, key) => {
      if (key == field) {
        delete newQuery[key];
      } else {
        newQuery[key] = v;
      }
    });

    onChange && onChange(newQuery);
  }

  removeAllConds(keys) {
    const removableKeys = keys.concat([ 'orderBy' ]);

    const { values={}, onChange } = this.props;
    const tmpValues = {};
    _.forEach(values, (v, k) => {
      if (_.indexOf(removableKeys, k) === -1) {
        tmpValues[k] = v;
      }
    }); 
    onChange && onChange(tmpValues);
  }

  onChange() {
    const { values={}, onChange } = this.props;

    const newQuery = _.assign({}, values);
    _.forEach(this.state.values, (v, key) => {
      if (v) {
        newQuery[key] = v;
      } else {
        delete newQuery[key];
      }
    });

    onChange && onChange(newQuery);
  }

  groupFields(fields, columns=3) {
    const { textInputChange=false, values } = this.props;

    const filters = [];
    _.forEach(fields, (v) => {
      if (v.type === 'Text' || v.type === 'TextArea' || v.type === 'RichTextEditor' || v.type === 'Url') {
        filters.push(
          <div>
            <Col sm={ 1 } componentClass={ ControlLabel } style={ { color: this.state.values[v.key] ? '#ff0000' : '#333' } }>
              { v.name }
            </Col>
            <Col sm={ 12 / columns - 1 }>
              <FormControl
                type='text'
                value={ this.state.values[v.key] || '' }
                onBlur={ () => { this.state.values[v.key] != values[v.key] && this.onChange() } }
                onKeyDown={ (e) => { if (e.keyCode == '13') { this.onChange(); } } }
                onChange={ (e) => { this.state.values[v.key] = e.target.value; this.setState({ values: this.state.values }); if (textInputChange) { this.onChange(); } } }
                placeholder={ 'enter' + (v.desc || v.name) } />
            </Col>
          </div> );
      } else if ([ 'Select', 'MultiSelect', 'SingleUser', 'MultiUser', 'CheckboxGroup', 'RadioGroup', 'SingleVersion', 'MultiVersion' ].indexOf(v.type) !== -1) {
        filters.push(
          <div>
            <Col sm={ 1 } componentClass={ ControlLabel } style={ { color: this.state.values[v.key] ? '#ff0000' : '#333' } }>
              { v.name }
            </Col>
            <Col sm={ 12 / columns - 1 }>
              <Select
                simpleValue
                multi={ v.key !== 'sprints' && true }
                value={ this.state.values[v.key] || null }
                onChange={ (newValue) => { this.state.values[v.key] = newValue; this.onChange(); } }
                options={ _.map(v.optionValues, (val) => { return { label: val.name, value: val.id } }) }
                placeholder={ 'choose' +  v.name }/>
            </Col>
          </div> );
      } else if ([ 'DatePicker', 'DateTimePicker' ].indexOf(v.type) !== -1) {
        filters.push(
          <div>
            <Col sm={ 1 } componentClass={ ControlLabel } style={ { color: this.state.values[v.key] ? '#ff0000' : '#333' } }>
              { v.name }
            </Col>
            <Col sm={ 12 / columns - 1 }>
              <Duration
                value={ this.state.values[v.key] }
                onChange={ (newValue) => { this.state.values[v.key] = newValue; this.onChange(); } }/>
            </Col>
          </div> );
      } else if ([ 'Number', 'Integer', 'TimeTracking' ].indexOf(v.type) !== -1) {
        filters.push(
          <div>
            <Col sm={ 1 } componentClass={ ControlLabel } style={ { color: this.state.values[v.key] ? '#ff0000' : '#333' } }>
              { v.name }
            </Col>
            <Col sm={ 12 / columns - 1 }>
              <Interval
                value={ this.state.values[v.key] }
                onBlur={ () => { this.state.values[v.key] != values[v.key] && this.onChange() } }
                keyPress={ (e) => { if (e.keyCode == '13') { this.onChange(); } } }
                onChange={ (newValue) => { this.state.values[v.key] = newValue; this.setState({ values: this.state.values }); if (textInputChange) { this.onChange(); } } }/>
            </Col>
          </div> );
      }
    });

    const res = [];
    const len = filters.length;
    for (let i = 0; i < len; ) {
      const section = filters.slice(i, i + columns);
      res.push(section);
      i += columns;
    }
    return res;
  }

  render() {
    const { 
      foldable=false,
      removable=true,
      columns,
      styles={},
      values,
      visable=false, 
      notShowFields=[],
      notShowBlocks=[],
      notShowTypes=[],
      onHide,
      onSave,
      options,
      options: { types=[], states=[], priorities=[], resolutions=[], modules=[], versions=[], epics=[], sprints=[], labels=[], users=[], fields=[] } 
    } = this.props;

    const { unfolded } = this.state;

    const userOptions = _.map(users, (val) => { return { name: val.name + '(' + val.email + ')', id: val.id } });
    userOptions.unshift({ id: 'me', name: 'Current user' });
    const labelOptions = _.map(labels, (val) => { return { id: val.name, name: val.name } });
    const sprintOptions = _.map(sprints, (val) => { return { name: val.name, id: val.no + '' } });

    const baseFields = [
      { key: 'title', name: 'theme/NO', type: 'Text', desc: 'Theme keyword or number' },
      { key: 'type', name: 'type', type: 'MultiSelect', optionValues: types },
      { key: 'priority', name: 'priority', type: 'MultiSelect', optionValues: priorities },
      { key: 'state', name: 'state', type: 'MultiSelect', optionValues: states },
      { key: 'resolution', name: 'Solution', type: 'MultiSelect', optionValues: resolutions },
      { key: 'module', name: 'Module', type: 'MultiSelect', optionValues: modules },
      { key: 'resolve_version', name: 'Solution', type: 'MultiSelect', optionValues: versions },
      { key: 'effect_versions', name: 'Impact version', type: 'MultiSelect', optionValues: versions },
      { key: 'labels', name: 'Label', type: 'MultiSelect', optionValues: labelOptions }
    ];
    const baseFilterSections = this.groupFields(_.reject(baseFields, (v) => notShowFields.indexOf(v.key) !== -1 || notShowTypes.indexOf(v.type) !== -1), columns || 3);

    const memberFields = [
      { key: 'reporter', name: 'Reporter', type: 'MultiSelect', optionValues: userOptions },
      { key: 'assignee', name: 'principal', type: 'MultiSelect', optionValues: userOptions },
      { key: 'resolver', name: 'Solve', type: 'MultiSelect', optionValues: userOptions },
      { key: 'closer', name: 'Shuttle', type: 'MultiSelect', optionValues: userOptions },
      { key: 'watcher', name: 'Followers', type: 'MultiSelect', optionValues: [ { id: 'me', name: 'Current user' } ] }
    ];
    const memberFilterSections = this.groupFields(_.reject(memberFields, (v) => notShowFields.indexOf(v.key) !== -1), columns || 3);

    const timeFields = [
      { key: 'created_at', name: 'Create time', type: 'DateTimePicker' },
      { key: 'updated_at', name: 'Update time', type: 'DateTimePicker' },
      { key: 'resolved_at', name: 'Resolution time', type: 'DateTimePicker' },
      { key: 'closed_at', name: 'Closing time', type: 'DateTimePicker' },
      { key: 'expect_start_time', name: 'Plan to start', type: 'DatePicker' },
      { key: 'expect_complete_time', name: 'Plan to complete', type: 'DatePicker' }
    ];
    const timeFilterSections = this.groupFields(_.reject(timeFields, (v) => notShowFields.indexOf(v.key) !== -1), 2);

    const agileFields = [
      { key: 'epic', name: 'Epic', type: 'MultiSelect', optionValues: epics },
      { key: 'sprints', name: 'Sprint', type: 'Select', optionValues: sprintOptions  }
    ];
    const agileFilterSections = this.groupFields(_.reject(agileFields, (v) => notShowFields.indexOf(v.key) !== -1), columns || 3);

    const usedFieldKeys = _.reduce([ baseFields, memberFields, timeFields, agileFields ], (res, val) => { _.forEach(val, (v) => { res.push(v.key) }); return res; }, []);
    const othersFields = _.reject(fields, (v) => v.type === 'File' || usedFieldKeys.indexOf(v.key) !== -1);
    _.forEach(othersFields, (v) => { 
      if (v.type === 'SingleUser' || v.type === 'MultiUser') {
        v.optionValues = userOptions;
      } else if (v.type === 'SingleVersion' || v.type === 'MultiVersion') {
        v.optionValues = versions; 
      }
    });
    const othersFilterSections = this.groupFields(_.reject(othersFields, (v) => notShowFields.indexOf(v.key) !== -1 || notShowTypes.indexOf(v.type) !== -1), 2);

    const searchedFieldKeys = _.union(_.map(baseFields, v => v.key), _.map(memberFields, v => v.key), _.map(timeFields, v => v.key), _.map(agileFields, v => v.key), _.map(othersFields, v => v.key));
    const conds = _parseQuery(values, options);

    let buttonNum = 0;
    if (onHide) {
      buttonNum++;
    }
    if (removable && conds.length > 0) {
      buttonNum++;
    }
    if (onSave && conds.length > 0) {
      buttonNum++;
    }
    const condListStyle = 'cond-list-view-' + _.max([ buttonNum, 1 ]);

    return (
      <div 
        id='search-form' 
        style={ styles }
        className={ !visable && 'hide' }>
        <div className='cond-list-container'>
          <div className='cond-list-title'>
            Search condition:
          </div>
          <div className={ condListStyle }>
            { conds.length > 0 ?
              _.map(conds, (v) => 
                <div className='cond-list-label'>
                  { v.kname }: { v.value }  
                  <span style={ { color: '#aaa' } }> | </span>
                  <span onClick={ () => { this.removeCond(v.key) } } className='comments-button'><i className='fa fa-close'></i></span>
                </div>)
              : 
              'all' }
          </div>
          <div className='cond-list-opt'>
            { foldable && 
            <Button bsStyle='link' onClick={ () => { this.setState({ unfolded: !unfolded }) } } style={ { paddingTop: '0px' } }>
              { unfolded ? 'Put away' : 'Unfold' } <i className={ unfolded ? 'fa fa-angle-up' : 'fa fa-angle-down' }></i>
            </Button> }
            { removable && conds.length > 0 &&
            <Button bsStyle='link' onClick={ () => { this.removeAllConds(searchedFieldKeys) } } style={ { paddingTop: '0px' } }>
              Empty
            </Button> }
            { onSave && conds.length > 0 &&
            <Button bsStyle='link' onClick={ onSave } style={ { paddingTop: '0px' } }>
              keep
            </Button> }
            { onHide &&
            <Button bsStyle='link' onClick={ onHide } style={ { paddingTop: '0px' } }>
              hide 
            </Button> }
          </div>
        </div>
        <Form 
          style={ { borderTop: '1px dashed #dedede', paddingTop: '10px', marginTop: '5px' } }
          horizontal 
          className={ !this.state.unfolded && 'hide' }>
          { notShowBlocks.indexOf('base') === -1 &&
          <div style={ { width: '100%', textAlign: 'left' } }>
            <div style={ { color: '#aaa' } }>
              <span 
                className='direct-button' 
                onClick={ () => this.setState({ baseFilterShow: !this.state.baseFilterShow }) } 
                title={ this.state.baseFilterShow ? 'shrink' : 'Unfold' }>
                <span style={ { marginRight: '2px' } }>Basic field</span>
                { _.intersection(_.keys(values), _.map(baseFields, _.iteratee('key'))).length > 0 ? <span>...</span> : <span/> }
                { this.state.baseFilterShow ? <i className='fa fa-angle-up'></i> : <i className='fa fa-angle-down'></i> }
              </span>
            </div>
            { _.map(baseFilterSections, (v, i) => {
              return (
                <FormGroup key={ i } style={ { display: !this.state.baseFilterShow ? 'none' : '' } }>
                  { v }
                </FormGroup> )
            }) }
          </div> }
          { notShowBlocks.indexOf('member') === -1 &&
          <div style={ { width: '100%', textAlign: 'left' } }>
            <div style={ { color: '#aaa' } }>
              <span 
                className='direct-button' 
                onClick={ () => this.setState({ memberFilterShow: !this.state.memberFilterShow }) } 
                title={ this.state.memberFilterShow ? 'shrink' : 'Unfold' }>
                <span style={ { marginRight: '2px' } }>personnel</span>
                { _.intersection(_.keys(values), _.map(memberFields, _.iteratee('key'))).length > 0 ? <span>...</span> : <span/> }
                { this.state.memberFilterShow ? <i className='fa fa-angle-up'></i> : <i className='fa fa-angle-down'></i> }
              </span>
            </div>
            { _.map(memberFilterSections, (v, i) => {
              return (
                <FormGroup key={ i } style={ { display: !this.state.memberFilterShow ? 'none' : '' } }>
                  { v }
                </FormGroup> )
            }) }
          </div> }
          { notShowBlocks.indexOf('time') === -1 &&
          <div style={ { width: '100%', textAlign: 'left' } }>
            <div style={ { color: '#aaa' } }>
              <span 
                className='direct-button' 
                onClick={ () => this.setState({ timeFilterShow: !this.state.timeFilterShow }) } 
                title={ this.state.timeFilterShow ? 'shrink' : 'Unfold' }>
                <span style={ { marginRight: '2px' } }>time</span>
                { _.intersection(_.keys(values), _.map(timeFields, _.iteratee('key'))).length > 0 ? <span>...</span> : <span/> }
                { this.state.timeFilterShow ? <i className='fa fa-angle-up'></i> : <i className='fa fa-angle-down'></i> }
              </span>
            </div>
            { _.map(timeFilterSections, (v, i) => {
              return (
                <FormGroup key={ i } style={ { display: !this.state.timeFilterShow ? 'none' : '' } }>
                  { v }
                </FormGroup> )
            }) }
          </div> }
          { notShowBlocks.indexOf('agile') === -1 &&
          <div style={ { width: '100%', textAlign: 'left' } }>
            <div style={ { color: '#aaa' } }>
              <span 
                className='direct-button' 
                onClick={ () => this.setState({ agileFilterShow: !this.state.agileFilterShow }) } 
                title={ this.state.agileFilterShow ? 'shrink' : 'Unfold' }>
                <span style={ { marginRight: '2px' } }>Agile iteration</span> 
                { _.intersection(_.keys(values), _.map(agileFields, _.iteratee('key'))).length > 0 ? <span>...</span> : <span/> }
                { this.state.agileFilterShow ? <i className='fa fa-angle-up'></i> : <i className='fa fa-angle-down'></i> }
              </span>
            </div>
            { _.map(agileFilterSections, (v, i) => {
              return (
                <FormGroup key={ i } style={ { display: !this.state.agileFilterShow ? 'none' : '' } }>
                  { v }
                </FormGroup> )
            }) }
          </div> }
          { notShowBlocks.indexOf('others') === -1 &&
          <div style={ { width: '100%', textAlign: 'left' } }>
            <div style={ { color: '#aaa' } }>
              <span
                className='direct-button'
                onClick={ () => this.setState({ othersFilterShow: !this.state.othersFilterShow }) }
                title={ this.state.othersFilterShow ? 'shrink' : 'Unfold' }>
                <span style={ { marginRight: '2px' } }>Other fields</span>
                { _.intersection(_.keys(values), _.map(othersFields, _.iteratee('key'))).length > 0 ? <span>...</span> : <span/> }
                { this.state.othersFilterShow ? <i className='fa fa-angle-up'></i> : <i className='fa fa-angle-down'></i> }
              </span>
            </div>
            { _.map(othersFilterSections, (v, i) => {
              return (
                <FormGroup key={ i } style={ { display: !this.state.othersFilterShow ? 'none' : '' } }>
                  { v }
                </FormGroup> )
            }) }
          </div> }
      </Form>
    </div>);
  }
}

export function parseQuery(query, options) {
  const queryConds = _parseQuery(query, options);
  const tmpConds = [];
  _.forEach(queryConds, (v) => {
    tmpConds.push(v.kname + ': ' + v.value);
  });
  return tmpConds.length > 0 ? tmpConds.join(' | ') : '';
}

function _parseQuery(query, options) {

  const { types=[], states=[], priorities=[], resolutions=[], modules=[], versions=[], epics=[], sprints=[], users=[], fields=[] } = options;

  const userOptions = _.map(users, (val) => { return { name: val.name, id: val.id } });
  userOptions.unshift({ id: 'me', name: 'Current user' });

  const sprintOptions = _.map(sprints, (val) => { return { name: val.name, id: val.no + '' } });

  const sections = [
    { key: 'no', name: 'NO', type: 'Text' },
    { key: 'title', name: 'theme/NO', type: 'Text' },
    { key: 'type', type: 'MultiSelect', name: 'type', optionValues: types },
    { key: 'priority', type: 'MultiSelect', name: 'priority', optionValues: priorities },
    { key: 'state', type: 'MultiSelect', name: 'state', optionValues: states },
    { key: 'resolution', type: 'MultiSelect', name: 'Solution', optionValues: resolutions },
    { key: 'module', type: 'MultiSelect', name: 'Module', optionValues: modules },
    { key: 'resolve_version', type: 'MultiSelect', name: 'Solution', optionValues: versions  },
    { key: 'effect_versions', type: 'MultiSelect', name: 'Impact version', optionValues: versions },
    { key: 'labels', name: 'Label', type: 'MultiSelect' },
    { key: 'descriptions', name: 'describe', type: 'RichTextEditor' },
    { key: 'reporter', name : 'reporter', type: 'MultiSelect', optionValues: userOptions },
    { key: 'assignee', name: 'principal', type: 'MultiSelect', optionValues: userOptions },
    { key: 'watcher', name : 'Followers', type: 'MultiSelect', optionValues: userOptions },
    { key: 'resolver', name : 'Solve', type: 'MultiSelect', optionValues: userOptions },
    { key: 'closer', name : 'Shuttle', type: 'MultiSelect', optionValues: userOptions },
    { key: 'created_at', name: 'Create time', type: 'DateTimePicker' },
    { key: 'updated_at', name : 'Update time', type: 'DateTimePicker' },
    { key: 'resolved_at', name : 'Resolution time', type: 'DateTimePicker' },
    { key: 'closed_at', name : 'Closing time', type: 'DateTimePicker' },
    { key: 'expect_start_time', name : 'Expectation start time', type: 'DatePicker' },
    { key: 'expect_complete_time', name : 'Expectation completion time', type: 'DatePicker' },
    { key: 'epic', type: 'MultiSelect', name: 'Epic', optionValues: epics },
    { key: 'sprints', type: 'Select', name: 'Sprint', optionValues: sprintOptions }
  ];

  _.forEach(fields, (v) => {
    if (v.type !== 'File' && _.findIndex(sections, { key: v.key }) === -1) {
      if (v.type === 'SingleUser' || v.type === 'MultiUser') {
        v.optionValues = userOptions;
      } else if (v.type === 'SingleVersion' || v.type === 'MultiVersion') {
        v.optionValues = versions;
      }
      sections.push(v);
    }
  });

  const currentDurations = {
    '0d': 'On the same day',
    '0w': 'This week',
    '0m': 'Month',
    '0y': 'Current year'
  };

  const queryConds = [];
  const errorMsg = ' Retrieval value resolution fails, the conditions cannot be displayed normally.If the current retrieval has been saved as a filter, it is recommended to delete and save it again.';
  let index = -1;

  for(let i = 0; i < sections.length; i++) {
    let ecode = 0;
    const v = sections[i];
    if (query[v.key]) {
      if ('labels' == v.key || [ 'Text', 'TextArea', 'RichTextEditor', 'Url', 'Integer', 'Number', 'TimeTracking' ].indexOf(v.type) !== -1) {
        queryConds.push({ key: v.key, kname: v.name, value: query[v.key] });
      } else if ([ 'Select', 'MultiSelect', 'SingleUser', 'MultiUser', 'CheckboxGroup', 'RadioGroup', 'SingleVersion', 'MultiVersion' ].indexOf(v.type) !== -1) {
        const queryNames = [];
        const queryValues = query[v.key].split(',');
        for(let j = 0; j < queryValues.length; j++) {
          if ((index = _.findIndex(v.optionValues, { id: queryValues[j] })) !== -1) {
            queryNames.push(v.optionValues[index].name);
          } else {
            ecode = -1;
            _.remove(queryNames);
            queryNames.push('Resolution failure!');
            break;
          }
        }
        queryConds.push({ key: v.key, kname: v.name, value: queryNames.join(', '), ecode });
      } else if ([ 'DatePicker', 'DateTimePicker' ].indexOf(v.type) !== -1) {
        let cond = '', startCond = '', endCond = '';
        const timeUnits = { d: 'sky', w: 'week', m: 'Month', y: 'year' };
        const sections = query[v.key].split('~');
        if ([ '0d', '0w', '0m', '0y' ].indexOf(sections[0]) !== -1) {
          startCond = currentDurations[sections[0]];
        } else if ([ 'd', 'w', 'm', 'y' ].indexOf(sections[0].charAt(sections[0].length - 1)) !== -1) {
          const pattern = new RegExp('^(-?)(\\d+)(d|w|m|y)$');
          if (pattern.exec(sections[0])) {
            if (RegExp.$2 == '0') {
              startCond = 'On the same day';
            } else {
              startCond = RegExp.$2 + timeUnits[RegExp.$3] + (RegExp.$1 === '-' ? 'forward' : 'back');
            }
          } else {
            ecode = -1;
            startCond = 'Resolution failure!';
          }
        } else {
          startCond = sections[0];
        }

        if (sections[1]) {
          if ([ '0d', '0w', '0m', '0y' ].indexOf(sections[1]) !== -1) {
            endCond = currentDurations[sections[1]];
          } else if ([ 'd', 'w', 'm', 'y' ].indexOf(sections[1].charAt(sections[1].length - 1)) !== -1) {
            const pattern = new RegExp('^(-?)(\\d+)(d|w|m|y)$');
            if (pattern.exec(sections[1])) {
              if (RegExp.$2 == '0') {
                endCond = 'On the same day';
              } else {
                endCond = RegExp.$2 + timeUnits[RegExp.$3] + (RegExp.$1 === '-' ? 'forward' : 'back');
              }
            } else {
              ecode = -1;
              endCond = 'Resolution failure!';
            }
          } else {
            endCond = sections[1];
          }
        }

        if (sections.length > 1) {
          cond = startCond + '~' + endCond;
        } else {
          cond = startCond;
        }

        queryConds.push({ key: v.key, kname: v.name, value: cond, ecode });
      }
    }
  }

  const sections2 = []; 
  _.forEach(sections, (v) => { 
    if (v.type === 'TimeTracking') { 
      sections2.push(_.assign({}, v, { key: v.key + '_m' }));  
    } else { 
      sections2.push(v); 
    } 
  });
  const orderby = query['orderBy'];
  if (orderby) {
    const orderItems = [];
    const orderSections = orderby.split(',');
    _.forEach((orderSections), (v) => {
      let orderName = '';
      let orderField = '';
      const tmp = _.trim(v).replace(/\s+/g, ' ').split(' ');
      if (tmp.length === 2) {
        if (_.findIndex(sections2, { key: tmp[0] }) !== -1) {
          orderField = _.find(sections2, { key: tmp[0] }).name;
        } else {
          return;
        }
        if (tmp[1].toLowerCase() === 'asc') {
          orderName = '↑';
        } else if (tmp[1].toLowerCase() === 'desc') {
          orderName = '↓';
        } else {
          return;
        }
        orderItems.push(orderField + orderName);
      } 
    });
    if (orderItems.length > 0) {
      queryConds.push({ key: 'orderBy', kname: 'Sort', value: orderItems.join(', '), ecode: 0 });
    }
  }

  return queryConds;
}
