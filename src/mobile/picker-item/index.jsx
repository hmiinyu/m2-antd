import React from 'react';
import PropTypes from 'prop-types';
import { Picker, List } from 'antd-mobile/lib/index';

class PickerItem extends React.Component {
  render() {
    const { data, field, label, config, getFieldProps, setFieldValue } = this.props;

    return (
      <Picker data={data} cols={1} {...getFieldProps(field)} {...config}
              onOk={(val)=>setFieldValue(field, val[0])}>
        <List.Item arrow="down">{label}</List.Item>
      </Picker>
    );
  }
}

PickerItem.propTypes = {
  data: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  getFieldProps: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  config: PropTypes.object
};

export default PickerItem;
