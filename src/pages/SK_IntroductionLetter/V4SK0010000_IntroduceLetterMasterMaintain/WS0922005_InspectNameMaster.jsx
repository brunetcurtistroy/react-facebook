import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input } from "antd";

class WS0922005_InspectNameMaster extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    // document.title = '検査名称マスタ';

    this.state = {
    };
  }
  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        //pass value
      })
    }
  }
  onFinish = (val) => {
    console.log(val);
  }
  render() {
    return (
      <div className="inspect-name-master">
        <Card title="検査名称マスタ">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              size="small"
              bordered
              dataSource={[{}]}
              loading={false}
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
                    <Input type="number" />
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
              <Table.Column title="検査内容" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'exam_content']}>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0922005_InspectNameMaster);
