import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Row, Col, message, Modal } from "antd";

import Copy1543004Action from "redux/AdvancePreparation/DocumentManageMaintain/WS1543004_Copy.action";

class WS1543004_Copy extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_ManageNum: PropTypes.any,
    Li_MaterialPrintingType: PropTypes.any,
    Li_MaterialManageNum: PropTypes.any,
    Li_MaterialManageName: PropTypes.any,
    Lo_StsRun: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '複写';

    this.state = {
    };

    this.setFormValue = this.setFormValue.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.setFormValue();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setFormValue();
    }
  }

  setFormValue() {
    this.formRef.current?.setFieldsValue({
      Li_MaterialManageNum: this.props.Li_MaterialManageNum,
      Li_MaterialManageName: this.props.Li_MaterialManageName,
      MaterialManageNumAfter: this.props.Li_MaterialManageNum,
      MaterialManageNameAfter: this.props.Li_MaterialManageName
    })
  }

  onFinish(values) {
    let params = {
      ...values,
      management_division: this.props.Li_ManageNum,
      document_printing_type: this.props.Li_MaterialPrintingType,
      document_management_number: this.props.Li_MaterialManageNum,
      document_title: this.props.Li_MaterialManageName,
    }
    if (values.Li_MaterialManageNum === values.MaterialManageNumAfter) {
      message.error('複写元と複写先が同じです')
    } else {
      Modal.confirm({
        width: "300px",
        content: "複写処理を実行しますか ?",
        okText: "は　い",
        cancelText: "いいえ",
        onOk: () => {
          Copy1543004Action.copyData(params)
            .then(() => {
              if (this.props.onFinishScreen) {
                this.props.onFinishScreen({ 
                  Lo_StsRun: true
                });
              }
            })
        }
      })
    }
  }

  render() {
    return (
      <div className="copy">
        <Card title="複写">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={12} style={{ paddingRight: 0 }}>
                <Form.Item name="Li_MaterialManageNum" label="複写元">
                  <Input readOnly style={{ border: 'none', background: 'transparent' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="Li_MaterialManageName">
                  <Input readOnly style={{ border: 'none', background: 'transparent' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12} style={{ paddingRight: 0 }}>
                <Form.Item name="MaterialManageNumAfter" label="複写先" >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="MaterialManageNameAfter">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType='submit' style={{ float: "right" }}>複写</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1543004_Copy);
