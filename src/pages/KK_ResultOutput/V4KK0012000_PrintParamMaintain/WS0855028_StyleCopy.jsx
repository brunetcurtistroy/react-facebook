import React from "react";
import { connect } from "react-redux";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, message, Row, Col } from "antd";
import StyleCopyAction from 'redux/ResultOutput/PrintParamMaintain/StyleCopy.action'
class WS0855028_StyleCopy extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = '様式複写';
    this.state = {
      formData: {
        format_name: "",
        style_code: "",
        CopyStyleCode: ""
      },
      format_name: ""
    };
  }
  componentDidMount() {
    this.state.formData.format_name = this.props.Li_FormatName
    this.state.formData.style_code = this.props.Li_StyleCode
    this.state.formData.CopyStyleCode = ""
    this.getScreenData();
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.state.formData.format_name = this.props.Li_FormatName
      this.state.formData.style_code = this.props.Li_StyleCode
      this.state.formData.CopyStyleCode = ""
      this.getScreenData();
    }
  }
  getScreenData() {
    this.formRef.current?.setFieldsValue(this.state.formData)
    this.setState({
      format_name: this.formRef.current?.getFieldValue("format_name")
    })
  }
  updateData(value) {
    this.state.formData.CopyStyleCode = value
  }
  render() {
    return (
      <div className="style-copy">
        <Card title="様式複写">
          <Form
            ref={this.formRef}
            onFinish={this.getScreenData}
          >
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '5px' }}>
              <Row>
                <Col span={6}>
                  <Form.Item name="style_code" label="複写元">
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={18} style={{ paddingTop: '0.3em' }}>
                  <span style={{ marginLeft: '0.5em', }}  >{this.state.format_name}</span>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <span style={{ paddingLeft: 65 }}><ArrowDownOutlined /></span>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item name="CopyStyleCode" label="複写先">
                    <Input maxLength={3} onChange={(event) => {
                      this.updateData(event.target.value)
                    }} />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Button type="primary" htmlType="submit" style={{ float: 'right', marginTop: '1em' }}
              onClick={() => {
                const func = this.props.onSelect || this.props.onFinishScreen;
                StyleCopyAction.CopyExec(this.state.formData)
                  .then((res) => {
                    func({
                      Lo_Message: res.data.message,
                    });
                    message.success('更新しました!')
                  })
                  .catch((err) => {
                    const res = err.response;
                    if (!res || !res.data || !res.data.message) {
                      message.error("エラーが発生しました");
                      return;
                    }
                    message.error(res.data.message);
                  });
              }}
            >実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0855028_StyleCopy);
