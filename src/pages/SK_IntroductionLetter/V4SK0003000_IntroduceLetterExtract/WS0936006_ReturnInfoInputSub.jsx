import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input, Select } from "antd";
const { Option } = Select;

class WS0936006_ReturnInfoInputSub extends React.Component {

  constructor(props) {
    super(props);
    // document.title = '返送情報入力SUB';
    this.state = {
    };
  }

  render() {

    return (
      <div className="return-info-input-sub">
        <Card title="返送情報入力SUB">
          <Form>
            <Table
              size="small"
              className="mb-3"
              loading={false}
              pagination={false}
              bordered={true}
              dataSource={[
                {
                  // seq: 1,
                  // remarks: 'String ... max Length 30',
                  // treatment_content: 'Link to other screen',
                },
                {}
              ]}
              rowKey={(record) => record.id}
            >
              <Table.Column title="連番" dataIndex="seq" key="" width="10%" sorter={true}
                render={(value, record, index) => {
                  return <Form.Item name="seq">
                    <Input type="number" style={{ border: 'none' }} />
                  </Form.Item>
                }} />

              <Table.Column title="備考" dataIndex="remarks" key="" width="60%" sorter={true}
                render={(value, record, index) => {
                  return <Form.Item name="remarks">
                    <Input maxLength={40} style={{ border: 'none' }} />
                  </Form.Item>
                }} />

              <Table.Column title="判定種別" dataIndex="treatment_content" key="" width="30%" sorter={true}
                render={(value, record, index) => {
                  return <Form.Item name="treatment_content">
                    {/** Link to other Screen 1*/}
                    <Input maxLength={20} style={{ border: 'none' }} />
                  </Form.Item>
                }} />

            </Table>
            <Table size="small"
              loading={false}
              pagination={false}
              bordered={true}
              dataSource={[
                {
                  general_comment_code: 1,
                  category_name: '',
                  old_insurance_precise_result_1d: [
                    { label: '1', value: 1 },
                    { label: '2', value: 2 },
                    { label: '3', value: 3 },
                  ],
                  id: 1,
                },
              ]}
              rowKey={(record) => record.id}
            >
              <Table.Column title="連番" dataIndex="general_comment_code" key="" width="10%" sorter={true}
                render={(value, record, index) => {
                  return <Form.Item name="general_comment_code">
                    <Input type="number" style={{ border: 'none' }} />
                  </Form.Item>
                }} />
              <Table.Column title="地域保健・老人保健" dataIndex="category_name" key="" width="60%" sorter={true}
                render={(value, record, index) => {
                  return <Form.Item name="category_name">
                    {/** Link to other Screen 2*/}
                    <Input maxLength={30} style={{ border: 'none' }} />
                  </Form.Item>
                }} />

              <Table.Column title="精密検査結果" dataIndex="old_insurance_precise_result_1d" key="" width="30%" sorter={true}
                render={(value, record, index) => {
                  return <Form.Item name="old_insurance_precise_result_1d">
                    <Select>
                      {value.length > 0 ? value.map(item => {
                        return <Option value={item.value}>{item.label}</Option>
                      }) : value}
                    </Select>
                  </Form.Item>
                }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0936006_ReturnInfoInputSub);
