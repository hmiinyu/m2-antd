import React from 'react';
import { Picker, List } from 'antd-mobile/lib/index';

class PickerItem extends React.Component {
  render() {
    const { data, field, label, getFieldProps, setFieldValue } = this.props;

    return (
      <Picker data={data} cols={1} {...getFieldProps(field)} className="forss"
              onOk={(val)=>setFieldValue(field, val[0])}>
        <List.Item arrow="down">{label}</List.Item>
      </Picker>
    );
  }
}

export default PickerItem;
