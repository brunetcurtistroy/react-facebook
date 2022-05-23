import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input, Button, Space, } from "antd";
import PropTypes from 'prop-types';
const tableData = [
  {
    id: 1,
    judgment_result: '111',
    judgment_name: '123',
  },
  {
    id: 2,
    judgment_result: '222',
    judgment_name: '234',
  },
  {
    id: 3,
    judgment_result: '333',
    judgment_name: '345',
  },
  {
    id: 4,
    judgment_result: '444',
    judgment_name: '456',
  },
  {
    id: 5,
    judgment_result: '555',
    judgment_name: '567',
  }
]
class WS0285001_JudgeQuery extends React.Component {

  static propTypes = {
    Li_JudgeLevel: PropTypes.number,
  }

  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '判定照会';

    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      tableData: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    })
    this.getScreenData();
  }

  getScreenData = () => {
    // call Api
    setTimeout(() => {
      this.setState({
        tableData: tableData,
        loading: false,
      })
    }, 500)
  }
  onFinish = () => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        // ...
        Lio_Judge: this.state.selectedRows[0].judgment_result
      })
    }
  }

  render() {
    return (
      <div className="judge-query">
        <Card title="判定照会">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              size="small"
              bordered
              className="mb-3"
              dataSource={this.state.tableData}
              loading={this.state.loading}
              pagination={false}
              rowKey={(record) => record.id}
              rowSelection={{
                type: 'radio',
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({
                    selectedRows: selectedRows,
                  });
                },
              }}
            >
              <Table.Column title="判定" dataIndex="judgment_result" key="" render={(value, record, index) => {
                return (
                  <span>{record.judgment_result}</span>
                )
              }} />
              <Table.Column title="内容" dataIndex="judgment_name" key="" render={(value, record, index) => {
                return (
                  <span>{record.judgment_name}</span>
                )
              }} />
            </Table>
            <Space style={{ float: 'right' }}>
              <Button type="primary" htmlType="submit">
                選択
              </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0285001_JudgeQuery);
