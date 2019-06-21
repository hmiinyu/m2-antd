import React from 'react';
import PropTypes from 'prop-types';
import { DataBus } from 'm2-core';
import { ListView, PullToRefresh } from 'antd-mobile';
import './index.less';

export class CardList extends React.Component {
  static propTypes = {
    loadData: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    renderRow: PropTypes.func.isRequired,
    eventType: PropTypes.string.isRequired,
    scrollSettings: PropTypes.object,
    loadingText: PropTypes.string,
    completedText: PropTypes.string,
    threshold: PropTypes.number
  };

  static defaultProps = {
    scrollSettings: {
      onScroll: () => {},
      scrollerOptions: { scrollbars: true },
      scrollRenderAheadDistance: 200,
      scrollEventThrottle: 20
    },
    threshold: 20,
    loadingText: '努力加载中...',
    completedText: '加载完毕'
  };

  fields = {
    dataList: [],
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  };

  state = {
    dataSource: this.fields.dataSource,
    refreshing: false,
    loading: true,
    hasMore: true
  };

  componentDidMount() {
    DataBus.on(this.props.eventType, this.renderList);
  }

  componentWillUnmount() {
    DataBus.off(this.props.eventType, this.renderList);
  }

  renderList = (res) => {
    const { params } = this.props;
    const { dataSource } = this.state;
    const { dataList } = this.fields;
    const items = res.data || [];

    this.setState({
      dataSource: dataSource.cloneWithRows(dataList.concat(items)),
      refreshing: false,
      loading: false,
      hasMore: items.length < params.paggeSize
    }, () => params.page++);
  }

  render() {
    const { renderRow, loadData, params, scrollSettings, threshold, loadingText, completedText } = this.props;
    const { dataSource, refreshing, loading, hasMore } = this.state;

    return (
      <ListView
        className="card-list-container"
        dataSource={dataSource}
        renderRow={renderRow}
        initialListSize={params.pageSize}
        pageSize={params.pageSize}
        useBodyScroll
        {...scrollSettings}
        onEndReachedThreshold={threshold}
        onEndReached={() => {
          if (loading && !hasMore) return false;
          this.setState({ loading: true });
          loadData(params);
        }}
        pullToRefresh={
          <PullToRefresh
            refreshing={refreshing}
            onRefresh={() => {
              if (!this.__manually_refresh) {
                this.setState({ refreshing: true });
              } else {
                this.__manually_refresh = false;
              }
              loadData({ ...params, page: 1});
            }}/>
        }
        renderFooter={() => <p>{ hasMore ? loadingText : completedText }</p>}
      />
    );
  }
}
