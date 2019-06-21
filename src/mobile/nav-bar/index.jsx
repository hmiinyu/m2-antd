import React from 'react';
import PropTypes from 'prop-types';
import { Icon, NavBar as _NavBar } from 'antd-mobile';

export class NavBar extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    left: PropTypes.object,
    backUrl: PropTypes.string,
    right: PropTypes.object,
    mode: PropTypes.string
  };

  static defaultProps = {
    left: <Icon type="left" />,
    backUrl: '',
    mode: 'dark',
    right: ''
  };

  render() {
    const { left, right, title, mode, backUrl } = this.props;
    const onLeftClick = () => backUrl ? location.hash = backUrl : history.back();

    return (
      <_NavBar mode={mode} onLeftClick={onLeftClick} icon={left} rightContent={right}>{title}</_NavBar>
    )
  }
}
