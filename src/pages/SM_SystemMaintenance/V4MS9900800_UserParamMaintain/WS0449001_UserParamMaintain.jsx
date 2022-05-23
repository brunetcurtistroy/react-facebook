import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input, Button, message } from "antd";
import UserParamMaintainService from 'redux/SystemMaintenance/UserParamMaintain/UserParamMaintain.actions'
class WS0449001_UserParamMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS06400:ユーザーパラメータ保守';

    this.state = {
      isLoading: false,
      arrCheck: []
    };
  }
  componentDidMount() {
    this.getInit()
  }
  getInit() {
    this.setState({ isLoading: true })
    UserParamMaintainService.getInit().then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res ? res : []
      })
      this.forceUpdate()
    })
      .finally(() => this.setState({ isLoading: false }))
  }
  save() { 
    let dataSave = [];
    if (this.state.arrCheck.length > 0) {
      this.formRef.current?.getFieldValue("tableData")?.map(value => {
        if (this.state.arrCheck.indexOf(value.id) > -1) {
          dataSave.push(value)
        }
      })
      if (dataSave.length === this.state.arrCheck.length) {
        UserParamMaintainService.save(dataSave).then(res => {
          message.success(res.message)
          this.getInit()
        })
      }
    }
  }
  onFinish(values) { }
  render() {
    return (
      <div className="user-param-maintain">
        <Card title="V4-VNS06400:ユーザーパラメータ保守">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            autoComplete="off">
            <div style={{ display: 'none' }}>
              <Form.Item name="MetabolicSyndromeHierarchicalOb"><Input /></Form.Item>
            </div>
            <Table
              dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
              size="small"
              pagination={false}
              loading={this.state.isLoading}
              rowKey={(record) => record.id}
              bordered={true}
              scroll={{ y: 680 }}
            >
              <Table.Column title="ＦＯＲＭＡＴ" dataIndex="format" />
              <Table.Column title="備　　考" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'remarks']} style={{ marginBottom: '0px' }}><Input style={{ border: 'none' }}
                  onChange={(val) => {
                    let data = [...this.state.arrCheck];
                    if (record.remarks !== val.target.value) {
                      if (data.indexOf(record.id) < 0) {
                        data.push(record.id)
                        this.setState({
                          arrCheck: data
                        })
                      }
                    }
                  }}
                /></Form.Item>
              }} />
            </Table>
            <Button type="primary" style={{ float: 'right', marginTop: '1em' }} onClick={() => this.save()} >SAVE</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0449001_UserParamMaintain);
