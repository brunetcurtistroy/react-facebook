import React from "react";
import { connect } from "react-redux";

import { Card, Form, Checkbox, Space } from "antd";
const examData = [
  { name: 'Display01', value: 1 },
  { name: 'Display02', value: 0 },
  { name: 'Display03', value: 1 },
  { name: 'Display04', value: 0 },
  { name: 'Display05', value: 0 },
  { name: 'Display06', value: 0 },
  { name: 'Display07', value: 1 },
  { name: 'Display08', value: 0 },
  { name: 'Display09', value: 0 },
  { name: 'Display10', value: 1 },
  { name: 'Display11', value: 1 },
  { name: 'Display12', value: 0 },
  { name: 'Display13', value: 0 },
  { name: 'Display14', value: 1 },
  { name: 'Display15', value: 0 },
  { name: 'Display16', value: 1 },
  { name: 'Display17', value: 1 },
]
class WS0930006_DisplayContentChange extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '表示内容変更';

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.getScreenData();
    this.forceUpdate();
  }

  getScreenData = () => {
    // Call api here
    examData.map(item => this.setFormValue(item.name, item.value))
    this.setState({
      loading: false,
    })
  }

  setFormValue = (namePath, value) => {
    this.formRef.current.setFields([
      {
        name: namePath,
        value
      }
    ])
  }

  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_DisplayContent: this.formRef.current.getFieldsValue()
      })
    }
  }
  
  onFinish(values) {

  }

  render() {
    return (
      <div className="display-content-change">
        <Space>
          <Card title="表示内容変更">
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <Form.Item name="Display01" valuePropName="checked">
                <Checkbox>状態</Checkbox>
              </Form.Item>
              <Form.Item name="Display02" valuePropName="checked">
                <Checkbox >受診日</Checkbox>
              </Form.Item>
              <Form.Item name="Display03" valuePropName="checked">
                <Checkbox >時間帯</Checkbox>
              </Form.Item>
              <Form.Item name="Display04" valuePropName="checked">
                <Checkbox >個人番号</Checkbox>
              </Form.Item>
              <Form.Item name="Display05" valuePropName="checked">
                <Checkbox >メモ</Checkbox>
              </Form.Item>
              <Form.Item name="Display06" valuePropName="checked">
                <Checkbox >ｶﾅ氏名</Checkbox>
              </Form.Item>
              <Form.Item name="Display07" valuePropName="checked">
                <Checkbox >漢字氏名</Checkbox>
              </Form.Item>
              <Form.Item name="Display08" valuePropName="checked">
                <Checkbox >性別</Checkbox>
              </Form.Item>
              <Form.Item name="Display09" valuePropName="checked">
                <Checkbox >年齢</Checkbox>
              </Form.Item>
              <Form.Item name="Display10" valuePropName="checked">
                <Checkbox >生年月日</Checkbox>
              </Form.Item>
              <Form.Item name="Display11" valuePropName="checked">
                <Checkbox >受付No</Checkbox>
              </Form.Item>
              <Form.Item name="Display12" valuePropName="checked">
                <Checkbox >契約情報</Checkbox>
              </Form.Item>
              <Form.Item name="Display13" valuePropName="checked">
                <Checkbox >事業所情報</Checkbox>
              </Form.Item>
              <Form.Item name="Display14" valuePropName="checked">
                <Checkbox >協会けんぽ請求情報</Checkbox>
              </Form.Item>
              <Form.Item name="Display15" valuePropName="checked">
                <Checkbox >予約番号</Checkbox>
              </Form.Item>
              <Form.Item name="Display16" valuePropName="checked">
                <Checkbox >総合判定</Checkbox>
              </Form.Item>
              <Form.Item name="Display17" valuePropName="checked">
                <Checkbox >指導事項</Checkbox>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0930006_DisplayContentChange);
