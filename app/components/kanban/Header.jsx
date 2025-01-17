import React, { PropTypes, Component } from 'react';
import { Button, DropdownButton, ControlLabel, MenuItem, Nav, NavItem, ButtonGroup, OverlayTrigger, Popover, Grid, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';
 
const CreateIssueModal = require('../issue/CreateModal');
const CreateKanbanModal = require('./config/CreateModal');
const EditKanbanModal = require('./config/EditModal');
const CreateEpicModal = require('./epic/CreateModal');
const SortCardsModal = require('../share/SortCardsModal');
const MoreFilterModal = require('./MoreFilterModal');
const BurndownModal = require('./BurndownModal');

const $ = require('$');
const moment = require('moment');
const img = require('../../assets/images/loading.gif');

export default class Header extends Component {
  constructor(props) {
    super(props);

    const storage = window.localStorage;
    let ev = 'epic';
    if (storage && storage.getItem(props.project.key + '-backlog-filter-mode') === 'version') {
      ev = 'version';
    }

    this.state = { 
      query: {},
      hideHeader: false, 
      backlogFilterMode: ev,
      createIssueModalShow: false, 
      createKanbanModalShow: false, 
      createEpicModalShow: false, 
      sortCardsModalShow: false,
      burndownModalShow: false,
      moreFilterModalShow: false, 
      hisBurndownModalShow: false 
    };

    this.changeModel = this.changeModel.bind(this);
    this.changeFilterMode = this.changeFilterMode.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    const { index, changeModel, selectFilter, curKanban } = nextProps;
    if (this.props.curKanban.id != curKanban.id || !_.isEqual(this.props.curKanban.query, curKanban.query)) {
      await changeModel('issue');
      await selectFilter('all');
      this.state.query = {};
      index();
    }
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    changeModel: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    selectedFilter: PropTypes.string.isRequired,
    create: PropTypes.func.isRequired,
    addLabels: PropTypes.func.isRequired,
    createKanban: PropTypes.func.isRequired,
    getSprint: PropTypes.func.isRequired,
    createSprint: PropTypes.func.isRequired,
    createEpic: PropTypes.func.isRequired,
    setEpicSort: PropTypes.func.isRequired,
    project: PropTypes.object,
    curKanban: PropTypes.object,
    kanbans: PropTypes.array,
    completedSprintNum: PropTypes.number,
    selectedSprint: PropTypes.object,
    sprints: PropTypes.array,
    epics: PropTypes.array,
    versions: PropTypes.array,
    loading: PropTypes.bool,
    epicLoading: PropTypes.bool,
    indexEpicLoading: PropTypes.bool,
    getSprintLog: PropTypes.func,
    sprintLog: PropTypes.object,
    sprintLogLoading: PropTypes.bool,
    goto: PropTypes.func,
    gotoIssueList: PropTypes.func,
    gotoGantt: PropTypes.func,
    selectFilter: PropTypes.func,
    index: PropTypes.func,
    options: PropTypes.object
  }

  createIssueModalClose() {
    this.setState({ createIssueModalShow: false });
  }

  createKanbanModalClose() {
    this.setState({ createKanbanModalShow: false });
  }

  createEpicModalClose() {
    this.setState({ createEpicModalShow: false });
  }

  sortCardsModalClose() {
    this.setState({ sortCardsModalShow: false });
  }

  moreFilterModalClose() {
    this.setState({ moreFilterModalShow: false });
  }

  burndownModalClose() {
    this.setState({ burndownModalShow: false });
  }

  hisBurndownModalClose() {
    this.setState({ hisBurndownModalShow: false });
  }

  changeKanban(eventKey) {
    if (eventKey === 'create') {
      this.setState({ createKanbanModalShow: true });
    } else {
      const { goto } = this.props;
      goto(eventKey);
    }
  }

  moreSelect(eventKey) {
    const { sprints=[], gotoIssueList, gotoGantt } = this.props;
    if (eventKey === 'burndown') {
      this.setState({ burndownModalShow: true });
    } else if (eventKey === 'gotoIssue') {
      const activeSprint = _.find(sprints || [], { status: 'active' });
      if (activeSprint) {
        gotoIssueList({ sprints: activeSprint.no });
      }
    } else if (eventKey === 'gotoGantt') {
      const activeSprint = _.find(sprints || [], { status: 'active' });
      if (activeSprint) {
        gotoGantt({ sprints: activeSprint.no });
      }
    }
  }

  hisMoreSelect(eventKey) {
    const { selectedFilter, gotoIssueList, gotoGantt } = this.props;
    if (eventKey === 'burndown') {
      this.setState({ hisBurndownModalShow: true });
    } else if (eventKey === 'gotoIssue') {
      gotoIssueList({ sprints: selectedFilter });
    } else if (eventKey === 'gotoGantt') {
      gotoGantt({ sprints: selectedFilter });
    }
  }

  async handleSelect(selectedKey) {
    const { index, curKanban, selectFilter } = this.props;
    this.state.query = selectedKey === 'all' ? {} : curKanban.filters[selectedKey].query;
    await selectFilter(selectedKey);
    index(this.state.query);
  }

  showHeader() {
    this.setState({ hideHeader: false });
    const winHeight = $(window).height();
    $('.board-container').css('height', winHeight - 120 - 50);
  }

  hideHeader() {
    this.setState({ hideHeader: true });
    const winHeight = $(window).height();
    $('.board-container').css('height', winHeight - 28 - 50);
  }

  async changeModel(mode) {
    const { changeModel, selectFilter, index, curKanban, getSprint, completedSprintNum } = this.props;
    await changeModel(mode);
    if (mode == 'issue' || mode == 'backlog') {
      await selectFilter('all');
      this.state.query = {};
      index();
    } else if (mode == 'history') {
      await selectFilter(completedSprintNum + '');
      index({ sprints: completedSprintNum });
      getSprint(completedSprintNum);
    }
  }

  async handleSelectEV(key, mode) {
    if (mode) {
      this.state.backlogFilterMode = mode;
    }
    const { index, curKanban, selectFilter } = this.props;
    await selectFilter(key || 'all');
    index(key ? (this.state.backlogFilterMode === 'epic' ? { epic: key } : { resolve_version: key }) : {});
  }

  async handleSelectSprint(key) {
    const { index, selectFilter, completedSprintNum, getSprint } = this.props;
    await selectFilter(key || completedSprintNum);
    index({ sprints: key });
    getSprint(key);
  }

  async changeFilterMode() {

    await this.setState({ backlogFilterMode : this.state.backlogFilterMode === 'epic' ? 'version' : 'epic' });

    const { index, curKanban, selectFilter, selectedFilter, project } = this.props;
    const storage = window.localStorage;
    if (storage) {
      storage.setItem(project.key + '-backlog-filter-mode', this.state.backlogFilterMode);
    }

    await selectFilter('all');
    if (selectedFilter != 'all') {
      index();
    }
  }

  moreSearch(query) {
    const { index, selectFilter } = this.props;
    selectFilter(_.isEmpty(query) ? 'all' : 'more');
    this.setState({ query });
    index(query);
  }

  render() {
    const { 
      i18n, 
      changeModel, 
      mode, 
      selectFilter,
      selectedFilter,
      createKanban, 
      curKanban, 
      kanbans=[], 
      createSprint, 
      completedSprintNum=0,
      selectedSprint={},
      sprints=[],
      createEpic, 
      setEpicSort,
      epics=[],
      versions=[],
      loading, 
      epicLoading, 
      indexEpicLoading, 
      getSprintLog,
      sprintLog={},
      sprintLogLoading, 
      project, 
      index,
      create, 
      addLabels,
      goto, 
      options 
    } = this.props;

    const epicOptions = _.map(epics, (val) => { return { label: val.name, value: val.id } });
    const versionOptions = _.map(versions, (val) => { return { label: val.name, value: val.id } });

    const completedSprintOptions = _.map(_.filter(options.sprints, (v) => v.no <= completedSprintNum), (v) => { return { label: v.name, value: v.no + '' } });

    let popoverSprint = '';
    let hisPopoverSprint = '';
    let activeSprint = {};
    if (curKanban.type == 'scrum' && mode == 'issue') {
      activeSprint = _.find(sprints || [], { status: 'active' });
      if (activeSprint) {
        popoverSprint = (
          <Popover id='popover-trigger-click' style={ { maxWidth: '500px', padding: '15px 0px', lineHeight: '25px' } }>
            <Grid>
              <Row>
                <Col sm={ 3 } componentClass={ ControlLabel } style={ { textAlign: 'right' } }>Sprint No</Col>
                <Col sm={ 9 }>{ activeSprint.no || '' }</Col>
              </Row>
              <Row>
                <Col sm={ 3 } componentClass={ ControlLabel } style={ { textAlign: 'right' } }>name</Col>
                <Col sm={ 9 }>{ activeSprint.name || '' }</Col>
              </Row>
              <Row>
                <Col sm={ 3 } componentClass={ ControlLabel } style={ { textAlign: 'right' } }>Starting time</Col>
                <Col sm={ 9 }>{ moment.unix(activeSprint.start_time).format('YYYY/MM/DD') }</Col>
              </Row>
              <Row>
                <Col sm={ 3 } componentClass={ ControlLabel } style={ { textAlign: 'right' } }>End Time</Col>
                <Col sm={ 9 }>{ moment.unix(activeSprint.complete_time).format('YYYY/MM/DD') }</Col>
              </Row>
              <Row>
                <Col sm={ 3 } componentClass={ ControlLabel } style={ { textAlign: 'right' } }>describe</Col>
                <Col sm={ 9 } style={ { overflowY: 'scroll', maxHeight: '450px' } } dangerouslySetInnerHTML={ { __html: _.escape(activeSprint.description || '-').replace(/(\r\n)|(\n)/g, '<br/>') } }/>
              </Row>
            </Grid>
          </Popover>);
      }
    } else if (curKanban.type == 'scrum' && mode == 'history') {
      hisPopoverSprint = (
        <Popover id='popover-trigger-click' style={ { maxWidth: '500px', padding: '15px 0px', lineHeight: '25px' } }>
          <Grid>
            <Row>
              <Col sm={ 3 } componentClass={ ControlLabel } style={ { textAlign: 'right' } }>Sprint No</Col>
              <Col sm={ 9 }>{ selectedSprint.no || '' }</Col>
            </Row>
            <Row>
              <Col sm={ 3 } componentClass={ ControlLabel } style={ { textAlign: 'right' } }>name</Col>
              <Col sm={ 9 }>{ selectedSprint.name || '' }</Col>
            </Row>
            <Row>
              <Col sm={ 3 } componentClass={ ControlLabel } style={ { textAlign: 'right' } }>period</Col>
              <Col sm={ 9 }>
                { selectedSprint.start_time && moment.unix(selectedSprint.start_time).format('YYYY/MM/DD') }
                <span style={ { margin: '0 4px' } }>～</span>
                { selectedSprint.complete_time && moment.unix(selectedSprint.complete_time).format('YYYY/MM/DD') }
              </Col>
            </Row>
            <Row>
              <Col sm={ 3 } componentClass={ ControlLabel } style={ { textAlign: 'right' } }>The actual completion time</Col>
              <Col sm={ 9 }>{ selectedSprint.real_complete_time && moment.unix(selectedSprint.real_complete_time).format('YYYY/MM/DD HH:mm') }</Col>
            </Row>
            <Row>
              <Col sm={ 3 } componentClass={ ControlLabel } style={ { textAlign: 'right' } }>describe</Col>
              <Col sm={ 9 } style={ { overflowY: 'scroll', maxHeight: '450px' } } dangerouslySetInnerHTML={ { __html: _.escape(selectedSprint.description || '-').replace(/(\r\n)|(\n)/g, '<br/>') } }/>
            </Row>
          </Grid>
        </Popover>);
    }

    return (
      <div className='kanban-header'>
        <div style={ { height: '0px', display: this.state.hideHeader ? 'block' : 'none', textAlign: 'right' } }>
          <span title='Show watchboard'>
            <Button onClick={ this.showHeader.bind(this) } style={ { marginTop: '-37px' } }><i className='fa fa-angle-double-down' aria-hidden='true'></i></Button>
          </span>
        </div>
        <div id='main-header' style={ { height: '49px', display: this.state.hideHeader ? 'none': 'block' } }>
          <div style={ { display: 'inline-block', fontSize: '19px', marginTop: '5px' } }>
            { loading && <img src={ img } className='loading'/> } 
            { !loading && !_.isEmpty(curKanban) && curKanban.name || '' } 
            { !loading && _.isEmpty(curKanban) && kanbans.length > 0 && <span style={ { fontSize: '14px' } }>This board does not exist, please try again or choose other boards.</span> } 
            { !loading && _.isEmpty(curKanban) && kanbans.length <= 0 && 
            <span style={ { fontSize: '14px' } }>
              The project has not been defined by the board.
              { options.permissions && options.permissions.indexOf('manage_project') !== -1 ? <span>Please click <a href='#' onClick={ (e) => { e.preventDefault(); this.setState({ createKanbanModalShow: true }); } }>Create a board</a>.</span> : 'Please contact the project administrator to create.' }
            </span> } 
          </div>
          <div style={ { float: 'right', display: 'inline-block' } }>
            { options.permissions && options.permissions.indexOf('create_issue') !== -1 && !_.isEmpty(curKanban) && ((curKanban.type == 'kanban' && mode === 'issue') || mode === 'backlog') &&
            <Button style={ { marginRight: '10px' } } bsStyle='primary' onClick={ () => { this.setState({ createIssueModalShow: true }); } }><i className='fa fa-plus'></i> Create a problem</Button> }
            { !_.isEmpty(curKanban) &&
            <ButtonGroup style={ { marginRight: '10px' } }>
              { curKanban.type == 'kanban' && <Button style={ { backgroundColor: mode == 'issue' && '#eee' } } onClick={ () => { this.changeModel('issue') } }>signboard</Button> }
              { curKanban.type == 'scrum' && <Button style={ { backgroundColor: mode == 'epic' && '#eee' } } onClick={ () => { this.changeModel('epic') } }>Epic</Button> }
              { curKanban.type == 'scrum' && completedSprintNum > 0 && <Button style={ { backgroundColor: mode == 'history' && '#eee' } } onClick={ () => { this.changeModel('history') } }>Sprint history</Button> }
              { curKanban.type == 'scrum' && <Button style={ { backgroundColor: mode == 'backlog' && '#eee' } } onClick={ () => { this.changeModel('backlog') } }>Backlog</Button> }
              { curKanban.type == 'scrum' && <Button style={ { backgroundColor: mode == 'issue' && '#eee' } } onClick={ () => { this.changeModel('issue') } }>ActivitySprint</Button> }
              <Button style={ { backgroundColor: mode == 'config' && '#eee' } } onClick={ () => { this.changeModel('config') } }>Configure</Button>
            </ButtonGroup> }
            { kanbans.length > 0 && 
            <DropdownButton pullRight title='List' onSelect={ this.changeKanban.bind(this) }>
            { _.map(kanbans, (v, i) => ( 
              <MenuItem key={ i } eventKey={ v.id }>
                <div style={ { display: 'inline-block', width: '20px', textAlign: 'left' } }>
                  { curKanban.id === v.id && <i className='fa fa-check'></i> }
                </div>
                <span>{ v.name }</span>
              </MenuItem> ) ) }
            { options.permissions && options.permissions.indexOf('manage_project') !== -1 && <MenuItem divider/> }
            { options.permissions && options.permissions.indexOf('manage_project') !== -1 && 
              <MenuItem eventKey='create'>
                { kanbans.length > 0 && <div style={ { display: 'inline-block', width: '20px' } }/> }
                <span>Create a board</span>
              </MenuItem> }
            </DropdownButton> } 
          </div>
        </div>

        { mode === 'issue' && !loading && !_.isEmpty(curKanban) &&
        <div style={ { height: '45px', borderBottom: '2px solid #f5f5f5', display: this.state.hideHeader ? 'none': 'block' } }>
          { curKanban.type == 'scrum' && !_.isEmpty(activeSprint) &&
          <OverlayTrigger trigger='click' rootClose placement='bottom' overlay={ popoverSprint }>
            <div className='popover-active-sprint'>
              <div className='active-sprint-name' title={ activeSprint.name || '' }>{ activeSprint.name || '' } <i className='fa fa-caret-down' aria-hidden='true'></i></div> 
            </div> 
          </OverlayTrigger> }
          <span style={ { float: 'left', marginTop: '7px', marginRight: '5px' } }>
            filter:
          </span>
          <Nav bsStyle='pills' style={ { float: 'left', lineHeight: '1.0' } } activeKey={ selectedFilter } onSelect={ this.handleSelect.bind(this) }>
            <NavItem eventKey='all' href='#'>all</NavItem>
            { _.map(curKanban.filters || [], (v, i) => (<NavItem key={ i } eventKey={ i } href='#'>{ v.name }</NavItem>) ) }
          </Nav>
          <span style={ { float: 'right' } } title='Hidden view'>
            <Button onClick={ this.hideHeader.bind(this) }><i className='fa fa-angle-double-up' aria-hidden='true'></i></Button>
          </span>
          { curKanban.type == 'scrum' && !_.isEmpty(activeSprint) &&
          <span style={ { float: 'right', marginRight: '10px' } }>
            <DropdownButton pullRight title='More' onSelect={ this.moreSelect.bind(this) }>
              <MenuItem eventKey='burndown'>Burn out</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey='gotoIssue'>Jump to a list of questions</MenuItem>
              <MenuItem eventKey='gotoGantt'>Jump to Gantu</MenuItem>
            </DropdownButton>
          </span> }
          <span style={ { float: 'right', marginRight: '10px' } } title='Additional filtering'>
            <Button onClick={ () => { this.setState({ moreFilterModalShow: true }) } }><i className='fa fa-filter' aria-hidden='true'></i> Additional filtering{ !_.isEmpty(this.state.query) ? '...' : '' }</Button>
          </span>
        </div> }
        { mode === 'backlog' && !_.isEmpty(curKanban) &&
        <div style={ { height: '45px', borderBottom: '2px solid #f5f5f5', display: this.state.hideHeader ? 'none': 'block' } }>
          <div className='exchange-icon' style={ { float: 'left', marginTop: '7px' } } onClick={ this.changeFilterMode.bind(this) } title={ 'Switch to' + (this.state.backlogFilterMode == 'epic' ? 'Version' : 'Epic') }><i className='fa fa-retweet'></i></div>
          <span style={ { float: 'left', marginTop: '7px', marginRight: '5px' } }>{ this.state.backlogFilterMode === 'epic' ? 'Epic' : 'Version' }filter:</span>
          { this.state.backlogFilterMode === 'epic' ?
          <div style={ { display: 'inline-block', float: 'left', width: '28%' } }>
            <Select
              simpleValue
              options={ epicOptions }
              value={ selectedFilter == 'all' ? null : selectedFilter }
              onChange={ (newValue) => { this.handleSelectEV(newValue) } }
              placeholder='chooseEpic'/>
          </div>
          :
          <div style={ { display: 'inline-block', float: 'left', width: '28%' } }>
            <Select
              simpleValue
              options={ versionOptions }
              value={ selectedFilter == 'all' ? null : selectedFilter }
              onChange={ (newValue) => { this.handleSelectEV(newValue) } }
              placeholder='Select version'/>
          </div> }
          <span style={ { float: 'right' } } title='Hidden view'>
            <Button onClick={ this.hideHeader.bind(this) }><i className='fa fa-angle-double-up' aria-hidden='true'></i></Button>
          </span>
          { options.permissions && options.permissions.indexOf('manage_project') !== -1 &&
          <div style={ { display: 'inline-block', float: 'right', marginRight: '10px' } }> 
            <Button bsStyle='primary' onClick={ createSprint }><i className='fa fa-plus' aria-hidden='true'></i> createSprint</Button>
          </div> }
        </div> }

        { mode === 'history' && !_.isEmpty(curKanban) &&
        <div style={ { height: '45px', borderBottom: '2px solid #f5f5f5', display: this.state.hideHeader ? 'none': 'block' } }>
          <div className='exchange-icon' style={ { float: 'left', marginTop: '7px' } }>Sprint</div>
          <div style={ { display: 'inline-block', float: 'left', width: '28%' } }>
            <Select
              simpleValue
              clearable={ false }
              options={ completedSprintOptions }
              value={ selectedFilter == 'all' ? completedSprintNum : selectedFilter }
              onChange={ (newValue) => { this.handleSelectSprint(newValue) } }
              placeholder='chooseSprint'/>
          </div>
          { !_.isEmpty(selectedSprint) &&
          <OverlayTrigger trigger='click' rootClose placement='bottom' overlay={ hisPopoverSprint }>
            <div style={ { float: 'left', margin: '7px 10px', cursor: 'pointer' } }>
              <i className='fa fa-info-circle' aria-hidden='true'></i>
            </div>
          </OverlayTrigger> }
          <span style={ { float: 'right' } } title='Hidden view'>
            <Button onClick={ this.hideHeader.bind(this) }><i className='fa fa-angle-double-up' aria-hidden='true'></i></Button>
          </span>
          <span style={ { float: 'right', marginRight: '10px' } } title='Burn out'>
            <DropdownButton pullRight title='More' onSelect={ this.hisMoreSelect.bind(this) }>
              <MenuItem eventKey='burndown'>Burn out</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey='gotoIssue'>Jump to a list of questions</MenuItem>
              <MenuItem eventKey='gotoGantt'>Jump to Gantu</MenuItem>
            </DropdownButton>
          </span>
        </div> }

        { mode === 'epic' && !_.isEmpty(curKanban) && options.permissions && options.permissions.indexOf('manage_project') !== -1 && 
        <div style={ { height: '45px', display: this.state.hideHeader ? 'none': 'block' } }>
          <div style={ { display: 'inline-block', float: 'left', marginRight: '10px' } }>
            <Button disabled={ indexEpicLoading } onClick={ () => { this.setState({ createEpicModalShow: true }) } }>
              <i className='fa fa-plus' aria-hidden='true'></i> New constructionEpic
            </Button>
          </div>
          { !indexEpicLoading &&  
          <div style={ { display: 'inline-block', float: 'left', marginRight: '10px' } }>
            <Button onClick={ () => { this.setState({ sortCardsModalShow: true }) } }>
              <i className='fa fa-edit' aria-hidden='true'></i> Editing order
            </Button>
          </div> }
        </div> }
     
        { this.state.createKanbanModalShow &&
          <CreateKanbanModal
            show
            close={ this.createKanbanModalClose.bind(this) }
            create={ createKanban }
            goto={ goto }
            kanbans={ kanbans }
            i18n={ i18n }/> }
        { this.state.createIssueModalShow &&
          <CreateIssueModal
            show
            close={ this.createIssueModalClose.bind(this) }
            options={ options }
            create={ create }
            addLabels={ addLabels }
            loading={ loading }
            project={ project }
            i18n={ i18n }/> }
        { this.state.createEpicModalShow &&
          <CreateEpicModal
            show
            close={ this.createEpicModalClose.bind(this) }
            create={ createEpic }
            collection={ epics }
            i18n={ i18n }/> }
        { this.state.sortCardsModalShow &&
          <SortCardsModal
            show
            mode='Epic'
            close={ this.sortCardsModalClose.bind(this) }
            cards={ epics }
            setSort={ setEpicSort }
            sortLoading={ epicLoading }
            i18n={ i18n }/> }
        { this.state.burndownModalShow &&
          <BurndownModal
            show
            getSprintLog={ getSprintLog }
            loading={ sprintLogLoading }
            data={ sprintLog }
            close={ this.burndownModalClose.bind(this) }
            no={ activeSprint.no }/> }
        { this.state.moreFilterModalShow &&
          <MoreFilterModal
            show
            search={ this.moreSearch.bind(this) }
            query={ this.state.query }
            options={ options }
            close={ this.moreFilterModalClose.bind(this) }/> }
        { this.state.hisBurndownModalShow &&
          <BurndownModal
            show
            getSprintLog={ getSprintLog }
            loading={ sprintLogLoading }
            data={ sprintLog }
            close={ this.hisBurndownModalClose.bind(this) }
            no={ selectedFilter }/> }
      </div>
    );
  }
}
