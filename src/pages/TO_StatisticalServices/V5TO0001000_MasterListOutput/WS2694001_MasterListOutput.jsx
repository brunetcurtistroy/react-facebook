import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, } from "antd";

class WS2694001_MasterListOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'マスタ一覧出力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="master-list-output">
        <Card title="マスタ一覧出力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
            >
              <Button type="primary">個　人</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">事業所</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">保険者</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">カテゴリ</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">検　査</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">部位分類</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">部　位</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">所　見</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">指　導</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">判　定</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2694001_MasterListOutput);
