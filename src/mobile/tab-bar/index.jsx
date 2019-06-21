import React from 'react';
import PropTypes from 'prop-types';
import { TabBar as _TabBar } from 'antd-mobile';
import 'index.less';

export class TabBar extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    keyField: PropTypes.string,
    colors: PropTypes.object
  };

  static defaultProps = {
    keyField: 'url',
    colors: {
      unselectedTintColor: '#949494',
      tintColor: '#33a4f4',
      barTintColor: '#fff'
    }
  };

  renderIcon(url) {
    return (
      <img style={{width: 22, height: 22}} src={url} alt=""/>
    )
  }

  render() {
    const { items, keyField, colors } = this.props;

    return (
      <div className="tab-bar-container">
        {
          items.length ? (
            <_TabBar {...colors}>
              {
                items.map(item => (
                  <_TabBar.Item
                    key={item[keyField]}
                    title={item.title}
                    icon={this.renderIcon(item.icon)}
                    selectedIcon={this.renderIcon(item.selectedIcon)}
                    selected={location.hash === item.url}
                    onPress={() => location.hash = item.url}
                  />
                ))
              }
            </_TabBar>
          ) : ''
        }
      </div>
    )
  }
}
