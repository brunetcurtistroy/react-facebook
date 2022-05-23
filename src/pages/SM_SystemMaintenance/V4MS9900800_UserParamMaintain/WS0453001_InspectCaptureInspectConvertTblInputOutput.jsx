import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS0453001_InspectCaptureInspectConvertTblInputOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査取込検査変換テーブル入出力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="inspect-capture-inspect-convert-tbl-input-output">
        <Card title="検査取込検査変換テーブル入出力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="FORMAT"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="備考"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="入出力先"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="入出力"
            >
              <Select>
                <Select.Option value="">出力</Select.Option>
                <Select.Option value="">入力</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0453001_InspectCaptureInspectConvertTblInputOutput);
