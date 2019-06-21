import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Col, Row, Form, Tooltip } from 'antd';

export class FormBuilder extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    disabled: false,
    one: false,
    defaultLayout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
  };

  getFormMeta() {
    const { meta } = this.props;
    return  meta.elements ? meta : { elements: [meta] };
  }

  pickProps(source, props) {
    return props.reduce((prop, val) => (val in source && (prop[val] = source[val]), prop), {});
  }

  renderElement(elem) {
    const { defaultLayout, disabled } = this.props;
    const meta = this.getFormMeta();
    const label = elem.tooltip ? (
      <span>
        {elem.label}
        <Tooltip title={elem.tooltip}>
          {' '}<Icon type="question-circle-o"/>
        </Tooltip>
      </span>) : (
        elem.label
      );
    const formItemProps = {
      key: elem.key,
      colon: meta.colon,
      ...(meta.layout || (elem.label ? defaultLayout : null)),
      label,
      ...this.pickProps(elem, [
        'help',
        'extra',
        'labelCol',
        'wrapperCol',
        'colon',
        'hasFeedback',
        'validateStatus'
      ]),
      ...elem.itemProps
    };
    if (elem.render) {
      return elem.render.call(this, {
        formItemProps,
        elem,
        disabled
      });
    }
    let rules = elem.rules || [];
    if (elem.required) {
      rules = [
        ...rules,
        {
          required: true,
          message: `${elem.message} || ${elem.label || elem.key} is required.`
        }
      ]
    }
    const fieldProps = {
      ...this.pickProps(elem, [
        'getValueFromEvent',
        'initialValue',
        'normalize',
        'trigger',
        'valuePropName',
        'validateTrigger',
        'validateFirst'
      ]),
      rules,
      ...elem.fieldProps
    };
    const elemProps = {
      ...this.pickProps(elem, [
        'placeholder',
        'type',
        'className',
        'class'
      ]),
      ...(elem.elemProps || {}),
      disabled: elem.disabled || (elem.elemProps || {}).disabled || this.props.disabled
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <Form.Item {...formItemProps}>
        {
          getFieldDecorator(elem.id || elem.key, fieldProps)(
            <elem.elem {...itemProps}>
              {elem.children || null}
            </elem.elem>
          )
        }
      </Form.Item>
    );
  }

  renderLayout(elems) {
    const { meta } = this.props;
    const { columns = 1, gutter = 0 } = meta;
    if (columns === 1) return elems;

    const rows = [];
    const colspan = 24 / columns;
    for (let i = 0; i < elems.length; i += columns) {
      const cols = [];
      for (let j = 0; j < columns; j++) {
        cols.push(
          <Col key={j} span={colspan.toString()}>
            ${elems[i + j]}
          </Col>
        )
      }
      rows.push(
        <Row key={i} gutter={gutter}>{cols}</Row>
      )
    }
    return rows;
  }

  render() {
     return this.renderLayout(
       this.getFormMeta().elements.map(this.renderElement)
     );
  }
}
