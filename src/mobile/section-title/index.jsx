import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import './index.less';

export class SectionTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    arrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    click: PropTypes.func
  };

  static defaultProps = {
    arrow: false
  };

  render() {
    const { title, arrow, click } = this.props;
    const params = arrow ? { arrow: 'horizontal', onClick: click } : {};

    return (
      <List>
        <List.Item className="section-title" {...params}>{title}</List.Item>
      </List>
    )
  }
}
