import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Table, } from "antd";

class WS2698022_PrinterInfoMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'プリンタ情報保守';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="printer-info-maintain">
        <Card title="プリンタ情報保守">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="検索文字"
            >
              <Input type="text" />
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="プリンタNo" dataIndex="" key="" />
            <Table.Column title="表示名称" dataIndex="" key="" />
            <Table.Column title="プリンター正式名" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2698022_PrinterInfoMaintain);
