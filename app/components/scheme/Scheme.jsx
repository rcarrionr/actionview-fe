import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

import * as SchemeActions from 'redux/actions/SchemeActions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SchemeActions, dispatch)
  };
}

@connect(({ session }) => ({ session }), mapDispatchToProps)
export default class Scheme extends Component {
  constructor(props) {
    super(props);
    this.key = '';
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    session: PropTypes.object.isRequired
  }

  render() {
    document.title = 'Global configuration solution - ActionView';

    const { session } = this.props;
    if (_.isEmpty(session.user)) {
      return (<div/>);
    } else if (!session.user.permissions || !session.user.permissions.sys_admin) {
      notify.show('Insufficient permissions.', 'warning', 2000);
      return (<div/>);
    }

    return (
      <div className='doc-container'>
      { this.props.children }
      </div>
    );
  }
}
