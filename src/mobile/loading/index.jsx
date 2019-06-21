import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'antd-mobile';

export class Loading extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string
  };

  static defaultProps = {
    id: 'indicator',
    text: '正在加载中...'
  };

  render() {
    const { id, text } = this.props;

    return ReactDOM.createPortal(
      <ActivityIndicator toast text={text} animating={true}/>,
      document.getElementById(id)
    )
  }
}
