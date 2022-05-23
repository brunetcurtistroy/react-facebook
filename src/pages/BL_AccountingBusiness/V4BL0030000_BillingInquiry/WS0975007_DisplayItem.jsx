import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Checkbox, Button, Row, Col } from "antd";

import DisplayItemAction from "redux/AccountingBusiness/DisplayItem/DisplayItem.action";

class WS0975007_DisplayItem extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_DisplayItems: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '表示項目';

    this.state = {
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    DisplayItemAction.getInit({Lio_DisplayItems: this.props.Lio_DisplayItems ? this.props.Lio_DisplayItems : "111110001111111"}).then((res) => {
      this.formRef.current.setFieldsValue(res)
    });
  }

  onFinish(values) {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_DisplayItems: values,
      })
    }

  }

  render() {
    return (
      <div className="display-item">
        <Card title="表示項目">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="_1"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>請求管理番号</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_2"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>請求先区分</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_3"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>統合区分</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_4"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>請求番号</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_5"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>請求日</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_6"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>請求発行日</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_7"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>受診開始日</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_8"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>受診終了日</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="_9"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>請求金額</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_10"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>入金額</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_11"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>未収金額</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_12"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>入出金日</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_13"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>宛先</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_14"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>ｺｰﾄﾞ</Checkbox>
                </Form.Item>
                <Form.Item
                  name="_15"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox>名称</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item >
              <Button type="primary" htmlType="submit" style={{ float: 'right', marginTop: '1em' }}>は い</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0975007_DisplayItem);
