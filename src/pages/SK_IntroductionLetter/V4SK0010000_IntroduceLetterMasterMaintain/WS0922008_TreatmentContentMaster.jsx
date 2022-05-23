import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input } from "antd";
import PropTypes from 'prop-types';
class WS0922008_TreatmentContentMaster extends React.Component {
  static propTypes = {

  }

  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '治療内容マスタ';
    this.formRef = React.createRef();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setFormValue('tableData', [])
  }

  setFormValue = (namePath, value) => {
    this.formRef.current.setFields([
      {
        name: namePath,
        value
      }
    ])
  }
  
  componentWillUnmount() {

  }

  onFinish = (value) => {

  }

  render() {
    return (
      <div className="treatment-content-master">
        <Card title="治療内容マスタ">
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
              <Table.Column title="検索キー" width="20%" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'search_key']}>
                    <Input maxLength={8} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="治  療  内  容" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'treatment_content']}>
                    <Input maxLength={30} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="備　　考" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'remarks']}>
                    <Input maxLength={40} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0922008_TreatmentContentMaster);
