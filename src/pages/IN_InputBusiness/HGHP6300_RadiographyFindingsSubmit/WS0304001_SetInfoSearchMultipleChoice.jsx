import React from "react";
import { connect } from "react-redux";

import { Card, Col, Form, Input, Row, Select, Table, Button} from "antd";
import {LeftOutlined, RightOutlined, DoubleLeftOutlined, DoubleRightOutlined} from "@ant-design/icons";
class WS0304001_SetInfoSearchMultipleChoice extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'セット情報検索[複数選択]';

    this.state = {
      selectedRowTableFirst: [],
    };
  }

  onFinish(values) {

  }

  handleSelectRowsTableFirst = selectedRowTableFirst => {
    console.log(selectedRowTableFirst);
    this.setState({ selectedRowTableFirst });
  };

  render() {
    const { selectedRowTableFirst } = this.state

    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst
    }

    const dataSource = [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
    ];

    return (
      <div className="set-info-search-multiple-choice">
        <Card title="セット情報検索[複数選択]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item
                  name=""
                  label="セット識別"
                >
                  <Select>
                    <Select.Option value="">コース</Select.Option>
                    <Select.Option value="">セット</Select.Option>
                    <Select.Option value="">オプション</Select.Option>
                    <Select.Option value="">単品</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name=""
                  label="セット略名"
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name=""
                  label="検索略名"
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name=""
                  label="契約情報"
                >
                  <span>30</span>
                </Form.Item>
              </Col>
            </Row>

          </Form>

          <Table
            pagination={false}
            dataSource={dataSource}
            rowKey="name"
            className="mb-3"
            bordered={true}
            rowSelection={{ type: "checkbox", ...rowSelectionTableFirst }}
          >
            <Table.Column title="コード" dataIndex="age" key="" />
            <Table.Column title="セット名称" dataIndex="" key="" />
            <Table.Column title="セット略名" dataIndex="" key="" />
            <Table.Column title="検索略名" dataIndex="" key="" />
            <Table.Column title="性別" dataIndex="" key="" />
            <Table.Column title="続柄" dataIndex="" key="" />
            <Table.Column title="年齢" dataIndex="" key="" />
            <Table.Column title="年齢計算" dataIndex="" key="" />
            <Table.Column title="単価" dataIndex="name" key="" />
            <Table.Column title="保険者" dataIndex="" key="" />
            <Table.Column title="事業所" dataIndex="" key="" />
            <Table.Column title="他団体" dataIndex="" key="" />
            <Table.Column title="個人１" dataIndex="address" key="" />
            <Table.Column title="個人２" dataIndex="" key="" />
            <Table.Column title="個人３" dataIndex="" key="" />

          </Table>
          <Row gutter={24}>
            <Col span={10}>
            
            <Button type="primary" style={{ float: "right" }}><LeftOutlined/></Button>
            <Button type="primary" style={{ float: "right", marginRight: "10px" }}><DoubleLeftOutlined/></Button>
            </Col>
            <Col span={4}></Col>
            <Col span={10}>
            <Button type="primary" style={{ float: "left", marginRight: "10px" }}><RightOutlined/></Button>
            <Button type="primary" style={{ float: "left" }}><DoubleRightOutlined/></Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0304001_SetInfoSearchMultipleChoice);
