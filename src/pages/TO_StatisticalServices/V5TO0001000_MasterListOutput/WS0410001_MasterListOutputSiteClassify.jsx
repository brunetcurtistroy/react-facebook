import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Table, } from "antd";

class WS0410001_MasterListOutputSiteClassify extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'マスタ一覧出力[部位分類]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="master-list-output-site-classify">
        <Card title="マスタ一覧出力[部位分類]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="部位分類コード[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="部位分類コード[T]"
            >
              <Input type="text" />
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="部位分類コード" dataIndex="" key="" />
            <Table.Column title="部位分類名称" dataIndex="" key="" />

          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0410001_MasterListOutputSiteClassify);
