import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Table, Space } from "antd";
import PropTypes from 'prop-types';

const examData = [
  {
    id: 1,
    various_codes: 10,
    department_name: 'department name 1'
  },
  {
    id: 2,
    various_codes: 20,
    department_name: 'department name 2'
  },
  {
    id: 3,
    various_codes: 30,
    department_name: 'department name 3'
  }
]

class WS0927005_DepartmentInquiry extends React.Component {
  static propTypes = {
    Li_RequiredTreatmentList: PropTypes.string,
    Li_RequiredAccuracyInspectList: PropTypes.string,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '診療科照会';

    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      loading: false,
    };
  }

  getScreenData = (value) => {
    this.formRef.current.setFieldsValue({ tableData: examData })
    this.setState({
      loading: false,
    })
  }

  setFormValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value
      }
    ])
  }

  onFinish() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_DepartmentCode: this.state.selectedRows[0].various_codes
      })
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="department-inquiry">
        <Card title="診療科照会">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="Search"
              className="mb-3"
            // label="検索"
            >
              <Input.Search type="text" onSearch={(value) => {
                this.setState({
                  loading: true
                })
                this.getScreenData(value)
              }} />
            </Form.Item>
            <Table
              size="small"
              className="mb-3"
              loading={this.state.loading}
              bordered
              pagination={false}
              dataSource={this.formRef.current ? this.formRef.current.getFieldValue('tableData') : []}
              rowKey={(record) => record.id}
              rowSelection={{
                type: 'radio',
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({
                    selectedRows: selectedRows,
                    selectedRowKeys: selectedRowKeys
                  });
                },
              }}
            >
              <Table.Column title="診療コード" width="30%" dataIndex="various_codes" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'various_codes']} style={{ textAlign: "right" }}>
                    <span>{record.various_codes}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="診療名" dataIndex="department_name" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'department_name']}>
                    <span>{record.department_name}</span>
                  </Form.Item>
                )
              }} />

            </Table>
            <Space style={{ float: 'right' }}>
              <Form.Item
              >
                <Button type="primary">閉じる</Button>
              </Form.Item>
              <Form.Item
              >
                <Button type="primary" htmlType="submit">選択</Button>
              </Form.Item>
            </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0927005_DepartmentInquiry);
