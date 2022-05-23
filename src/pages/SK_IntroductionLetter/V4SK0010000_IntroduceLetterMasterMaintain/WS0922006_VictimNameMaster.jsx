import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input } from "antd";

class WS0922006_VictimNameMaster extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '傷病名称マスタ';
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
      <div className="victim-name-master">
        <Card title="傷病名称マスタ">
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
              <Table.Column
                title="コード" dataIndex="" key="" width="100px" render={(value, record, index) => {
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
              <Table.Column title="傷　病　名" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'sick_name']}>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0922006_VictimNameMaster);
