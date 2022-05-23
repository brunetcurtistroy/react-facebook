import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Space, Modal, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { CopyPatternAction } from "redux/InspectionMaintenance/AnotherInspectItemSettingCategory/CopyPattern.actions";

class WS2705076_CopyPattern extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写ﾊﾟﾀｰﾝ';

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
      Li_CopySourcePatternCode: this.props.Li_CopySourcePatternCode,
      pattern_name: this.props.pattern_name,
      CopyPatternCode: '',
      CopyPatternName: '',
    }
    this.formRef.current.setFieldsValue(params);
  }

  CopyPattern = (params) => {
    CopyPatternAction(params)
      .then(() => message.success('成功'))
      .catch(() => message.error('エラー'))
  }

  onFinish(values) {
    let index = this.props.dataSource.findIndex(item => item.pattern_code === values.CopyPatternCode);
    if(!values.CopyPatternCode){
      Modal.error({
        content: 'コードを入力してください。',
        icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
      });
    }else if(index !== -1){
      Modal.error({
        content: '複写先のｺｰﾄﾞは既に存在します',
        icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
      })
    }else if(this.props.onFinishScreen){
      Modal.confirm({
        content: '複写を実行しますか',
        okText: 'は　い',
        cancelText: 'いいえ',
        onOk: () => {
          const params = {
            Li_CopySourcePatternCode: this.props.Li_CopySourcePatternCode,
            pattern_name: this.props.pattern_name,
            CopyPatternCode: values.CopyPatternCode,
            CopyPatternName: values.CopyPatternName,
          }
          this.CopyPattern(params);
          this.props.onFinishScreen(true);
        }
      })
    }
  }

  render() {
    return (
      <div className="copy-pattern">
        <Card title="複写ﾊﾟﾀｰﾝ">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <div>
              <Space>
                <Form.Item name="Li_CopySourcePatternCode" label="複写元ｺｰﾄﾞ・名称" >
                  <Input readOnly />
                </Form.Item>
                <Form.Item name="pattern_name" >
                  <Input readOnly style={{width: '250px'}}/>
                </Form.Item>
              </Space>
            </div>

            <div>
              <Space>
                <Form.Item name="CopyPatternCode" label="複写先ｺｰﾄﾞ・名称" >
                  <Input maxLength={8}/>
                </Form.Item>
                <Form.Item name="CopyPatternName" >
                  <Input style={{width: '250px'}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2705076_CopyPattern);
