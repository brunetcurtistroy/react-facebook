import React from "react";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Modal, } from "antd";
import { basename } from "helpers/CommonHelpers";

class WS0432001_CsvConfirm extends React.Component {
  static propTypes = {
    Lio_Output: PropTypes.any,
    
    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'CSV確認';

    this.state = {
    };
  } 

  componentDidMount() {
    this.setFileName(this.props.Lio_Output);
  }

  componentDidUpdate(PreV) {
    if (PreV !== this.props) {
      this.setFileName(this.props.Lio_Output);
    }
  }

  setFileName = (name) => {
      this.formRef.current?.setFieldsValue({
        File: basename(name),
      });
  }

  onFinish = (values) => {
    Modal.confirm({
      title: '出力を実行しますか',
      onOk: () => {
        this.props.onFinishScreen({
          Lio_Output: values.File,
          Lo_StsOutput: true,
        });
      },
    });
  }

  render() {
    return (
      <div className="csv-confirm">
        <Card title="CSV確認">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            {/* <Form.Item name="" label="出力先">
              <Input type="text" />
            </Form.Item> */}
            <Form.Item name="File" label="ファイル名" rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" style={{float: "right", marginTop: 20}} htmlType="submit">出力</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default WS0432001_CsvConfirm;
