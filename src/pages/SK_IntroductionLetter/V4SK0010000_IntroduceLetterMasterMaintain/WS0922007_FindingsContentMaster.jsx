import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input } from "antd";

class WS0922007_FindingsContentMaster extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '所見内容マスタ';

    this.formRef = React.createRef();
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    // api
    this.setFieldByName('tableData', [])
  }
  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        // pass value
      })
    }
  }

  setFieldByName = (namePath, value) => {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      }
    ])
  }

  onFinish = val => {
    console.log(val);
  }
  render() {
    return (
      <div className="findings-content-master">
        <Card title="所見内容マスタ">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              size="small"
              bordered
              dataSource={[{}]}
              loading={this.state.loading}
              pagination={{
                defaultCurrent: 1,
                total: 1,
                pageSize: 1,
                showSizeChanger: true,
                onChange: (page, pageSize) => { },
                onShowSizeChange: (page, pageSize) => { },
              }}
              rowKey={(record) => record.id}
            >
              <Table.Column title="コード" width="100px" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'various_codes']}>
                    <Input type="number"/>
                  </Form.Item>
                )
              }} />
              <Table.Column title="検索キー" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'search_key']}>
                    <Input />
                  </Form.Item>
                )
              }} />
              <Table.Column title="所  見  内  容" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'findings_content']}>
                    <Input />
                  </Form.Item>
                )
              }} />
              <Table.Column title="備　　考" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'remarks']}>
                    <Input />
                  </Form.Item>
                )
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0922007_FindingsContentMaster);
