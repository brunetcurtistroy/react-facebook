import React from "react";
import { connect } from "react-redux";

import { Card, Table, Select, Form } from "antd";

class WS0688001_ContractInspectContentSelectSub extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '契約検査内容選択         SUB';

    this.state = {
      selectedRowTableFirst: [],
    };
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
      <div className="contract-inspect-content-select-sub">
        <Card title="契約検査内容選択         SUB">
          <Form>
            <Table
              pagination={false}
              dataSource={dataSource}
              rowKey="name"
              className="mb-3"
              bordered={true}
              rowSelection={{ type: "radio", ...rowSelectionTableFirst }}
            >
              <Table.Column title="区分" dataIndex="" key="1" width={100} align="center"
                render={() => (
                  <Form.Item name="">
                    <Select>
                      <Select.Option value="123">123</Select.Option>
                      <Select.Option value="123">123</Select.Option>
                    </Select>
                  </Form.Item>
                )}
              />
              <Table.Column title="セットコード" dataIndex="name" key="2" />
              <Table.Column title="セット名称" dataIndex="age" key="3" />
              <Table.Column title="金額" dataIndex="address" key="4" />

            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0688001_ContractInspectContentSelectSub);
