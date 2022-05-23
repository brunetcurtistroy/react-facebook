import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Checkbox, Button, } from "antd";

class WS0882001_CommunicationRosterOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '連名簿出力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="communication-roster-output">
        <Card title="連名簿出力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="様式コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="参照事業所"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="管掌[FROM]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="管掌[TO]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="事業所[FROM]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="支社店[FROM]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="支社店[TO]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日[FROM]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日[TO]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診コース[FROM]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診コース[TO]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受付番号[FROM]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受付番号[TO]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="出力順"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="抽出条件"
            >
              <Select>
                <Select.Option value="">全て</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="プレビュー指示[bool]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="プリンタ番号"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">抽出</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0882001_CommunicationRosterOutput);
