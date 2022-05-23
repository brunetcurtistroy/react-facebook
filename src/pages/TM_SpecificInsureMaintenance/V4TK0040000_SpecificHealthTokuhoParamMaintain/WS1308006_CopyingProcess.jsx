import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Space, Modal, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { registerEventMetabolicSyndromeHierarchicalAction } from "redux/SpecificInsureMaintenance/SpecificHealthTokuhoParamMaintain/CopyingProcess.actions";

class WS1308006_CopyingProcess extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写処理';

    this.state = {
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.setFormFieldValue();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.setFormFieldValue();
    }
  }

  setFormFieldValue = () => {
    const params = {
      format: this.props.format,
      remarks: this.props.remarks,
      Format: '',
      Remarks: '',
    }
    this.formRef.current.setFieldsValue(params);
  }

  registerEventMetabolicSyndromeHierarchical = (params) => {
    registerEventMetabolicSyndromeHierarchicalAction(params)
      .then(() => message.success('成功'))
      .catch(() => message.error('エラー'))
  }

  onFinish(values) {
    if(!values.format || !values.remarks || !values.Format || !values.Remarks){
      Modal.error({
        content: '項目を設定してください。',
        icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
      });
    }else if(values.format === values.Format){
      Modal.error({
        content: 'すでに登録済みです。確認して下さい。',
        icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
      })
    }else if(this.props.onFinishScreen){
      Modal.confirm({
        content: '登録しますか？',
        okText: 'は い',
        cancelText: 'いいえ',
        onOk: () => {
          const params = {
            format: this.props.format,
            remarks: this.props.remarks,
            Format: values.Format,
            Remarks: values.Remarks,
          }
          this.registerEventMetabolicSyndromeHierarchical(params);
          this.props.onFinishScreen(true);
        }
      })
    }
  }

  render() {
    return (
      <div className="copying-process" style={{width: 450}}>
        <Card title="複写処理">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <div>
              <Space>
                <Form.Item name="format" label="複写元" >
                  <Input readOnly/>
                </Form.Item>
                <Form.Item name="remarks" >
                  <Input readOnly/>
                </Form.Item>
              </Space>
            </div>

            <div>
              <Space>
                <Form.Item name="Format" label="複写先" >
                  <Input />
                </Form.Item>
                <Form.Item name="Remarks" >
                  <Input />
                </Form.Item>
              </Space>
            </div>

            <Form.Item style={{float: 'right'}}>
              <Button type="primary" htmlType='submit'>実  行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1308006_CopyingProcess);
