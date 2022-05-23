import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Table, Input, Space, Button, Form, DatePicker, Divider, } from "antd";
import moment from "moment";
import DisplayConsultHistoryService from "services/IntroductionLetter/IntroduceLetterExtract/DisplayConsultHistory";
import PropTypes from 'prop-types';

class WS0900001_DisplayConsultHistory extends React.Component {
  static propTypes = {
    LnkIn_Dks160PersonalId: PropTypes.string,
    LnkOt_Dks160Course: PropTypes.string,
    LnkOt_Dks160ConsultNum: PropTypes.number,
    LnkOt_Dks160Date: PropTypes.instanceOf(Date)
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'SK0004002:照会:受診履歴';
    this.state = {
      loading: false,
      tableData: [],
      selectedRowKeys: [],
      selectedRows: []
    };
  }

  componentDidMount() {
  }

  getDisplayConsultHistory = (value) => {
    this.setState({
      loading: true,
    })
    let GpersonalNum = value;
    DisplayConsultHistoryService.onGetDisplayConsultHistory({ GpersonalNum })
      .then(res => {
        this.setState({
          tableData: res.data
        })
      })
      .catch(error =>
        console.log(error)
      )
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }
  onPasstoPropsComponent = () => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        LnkOt_Dks160Course: this.state.selectedRows[0].visit_course,
        LnkOt_Dks160ConsultNum: this.state.selectedRows[0].receipt_number,
        LnkOt_Dks160Date: this.state.selectedRows[0].visit_date_on,
      })
    }
  }
  render() {
    return (
      <div className="display-consult-history">
        <Space>
          <Card title="SK0004002:照会:受診履歴">
            <Form
              ref={this.formRef}>
              <Form.Item name="kanji_name" className="mb-3">
                <Input.Search maxLength={40} onSearch={(value) => { this.getDisplayConsultHistory(value) }} />
              </Form.Item>
              <Table
                size="small"
                rowKey={(record) => record.id}
                pagination={false}
                bordered={true}
                dataSource={this.state.tableData}
                loading={this.state.loading}
                rowSelection={{
                  type: 'radio',
                  selectedRowKeys: this.state.selectedRowKeys,
                  onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({
                      selectedRowKeys: selectedRowKeys,
                      selectedRows: selectedRows
                    })
                  }
                }}
              >
                <Table.Column title="受　診　日" dataIndex="visit_date_on" width='120px' render={(value, record, index) => {
                  return <Form.Item name={['tableData', index, "visit_date_on"]}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef}
                      format="YYYY/MM/DD"
                      style={{ width: '100%', border: 'none' }}
                      defaultValue={moment(record.visit_date_on, 'YYYY/MM/DD')}
                    />
                  </Form.Item>
                }} />
                <Table.Column title="受付Ｎｏ" dataIndex="receipt_number" width="100px" render={(value, record, index) => {
                  return <Form.Item name={['tableData', index, "receipt_number"]} style={{ textAlign: 'right' }}>
                    <span>{record.receipt_number}</span>
                  </Form.Item>
                }} />
                <Table.Column title="コ　ー　ス" dataIndex="contract_short_name" width="400px" render={(value, record, index) => {
                  return <Form.Item name={['tableData', index, "contract_short_name"]}>
                    <span>{record.contract_short_name}</span>
                  </Form.Item>
                }} />
                <Table.Column title="判定" dataIndex="" width="70px" align="center" render={(value, record, index) => {
                  return <span>{record.Expresstion_3}</span>
                }}
                />
              </Table>
              <Divider />
              <Space style={{ float: "right" }}>
                <Button type="primary" onClick={this.onPasstoPropsComponent}>
                  選　択
                </Button>
              </Space>
            </Form>
          </Card>
        </Space>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0900001_DisplayConsultHistory);
