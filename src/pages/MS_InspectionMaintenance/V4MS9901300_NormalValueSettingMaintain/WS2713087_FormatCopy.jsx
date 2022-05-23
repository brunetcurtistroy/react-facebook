import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Space, Row, Col, Modal } from "antd";
import { ArrowDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
class WS2713087_FormatCopy extends React.Component {
  static propTypes = {
    Li_FormatCopySource: PropTypes.string,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'フォーマット複写';

    this.state = {
      childModal: {
        width: 0,
        visible: false,
        component: null
      }
    };
  }
  onEventFormatDuplicationCheck = (FormatCopy) => {
    let xhtml = true;
    // Func
    // input : Li_FormatCopy
    // output: Lo_DuplicateCheck
    return xhtml;
  }
  // onEventCopy = () => {
  //   // input: Li_FormatCopySource , Li_FormatCopy, Li_Remarks
  // }
  onEventCopy = () => {
    const { FormatCopy } = this.formRef.current.getFieldsValue();
    console.log(FormatCopy);
    if (FormatCopy === undefined || FormatCopy === "") {
      return Modal.error({
        title: 'フォーマット名を入力してください。',
        icon: <ExclamationCircleOutlined />,
        okText: 'OK',
      })
    }
    const Lo_DuplicateCheck = this.onEventFormatDuplicationCheck(FormatCopy);
    if (Lo_DuplicateCheck) {
      console.log(Lo_DuplicateCheck)
      return Modal.error({
        title: 'フォーマット名を入力してください。',
        icon: <ExclamationCircleOutlined />,
        okText: 'OK',
      })
    }
  }
  onFinish(values) {
    console.log(values)
  }
  render() {
    return (
      <div className="format-copy">
        <Space direction="vertical">
          <Card title="フォーマット複写">
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              labelCol={{ span: 12 }}
            >

              <Form.Item
                name="FormatCopySource"
                label="フォーマット(複写元)"
              >
                <span>{this.formRef.current?.getFieldValue('FormatCopySource') || 'format copy source'}</span>
              </Form.Item>
              <Form.Item label={' '} >
                <span style={{ paddingLeft: 'calc(25% - 8px)', color: '#14468C' }}><ArrowDownOutlined /></span>
              </Form.Item>
              <Form.Item
                name="UseStartYearCopy"
                label="使用開始年"
              >
                <Input type="number" style={{ width: '50%' }} />
              </Form.Item>
              <Form.Item
                name="FormatCopy"
                label="フォーマット名"
              >
                <Input type="text" style={{ width: '75%' }} onChange={(e) => this.formRef.current.setFieldsValue({ FormatCopy: e.target.value })} />
              </Form.Item>
              <Form.Item
                name="Remarks"
                label="フォーマット正式名"
              >
                <Input type="text" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item style={{ float: 'right' }}>
                <Button type="primary" onClick={this.onEventCopy}>実行</Button>
              </Form.Item>


            </Form>
          </Card>
        </Space>

      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2713087_FormatCopy);
