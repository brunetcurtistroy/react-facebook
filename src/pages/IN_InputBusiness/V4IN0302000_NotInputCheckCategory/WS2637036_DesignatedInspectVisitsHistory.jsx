import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DesignatedInspectVisitsHistoryAction from "redux/InputBusiness/NotInputCheckCategory/DesignatedInspectVisitsHistory.action";
import Color from "constants/Color";

import { Card, Table, Form, Input, Tooltip, InputNumber } from "antd";


class WS2637036_DesignatedInspectVisitsHistory extends React.Component {
  static propTypes = {
    Li_PersonalNum: PropTypes.any,

  };


  constructor(props) {
    super(props);

    // document.title = '指定検査受診履歴';

    this.state = {
      isLoading: false,
      dataSource: []
    };
  }
  componentDidMount() {
    this.getListData()
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getListData()
    }
  }
  getListData() {
    this.setState({ isLoading: true })
    DesignatedInspectVisitsHistoryAction.GetListData({ Li_PersonalNum: this.props.Li_PersonalNum }).then(s => {
      this.setState({
        dataSource: s })
    }).finally(() => this.setState({ isLoading: false }))
  }
  render() {
    return (
      <div className="designated-inspect-visits-history">
        <Card title="指定検査受診履歴">
          <Form>
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={false}
              bordered={true}
              rowKey={(record) => record.key}
              // rowSelection={{
              //   type: 'radio',
              //   onChange: (selectedRowKeys, selectedRows) => {
              //     console.log('selectedRows: ', selectedRows);
              //   }
              // }}
            >
              <Table.Column title="受診日" dataIndex="W1_consult_date"
                 render={(item, record, index) => (
                  record.Expression_11 === 1 ? <div>{record.W1_consult_date}</div> : ''
                )}
              />

              <Table.Column title="受付No"  dataIndex="W1_receipt_num"
                render={(item, record, index) => (

                  record.Expression_11 === 1 ? <div style={{ textAlign: "right" }}>{record.W1_receipt_num}</div> : ''
                )}
              />
              <Table.Column title="ｺｰｽ" dataIndex="W1_course_cd"
                render={(item, record, index) => (

                  record.Expression_11 === 1 ? <div>{record.W1_course_cd}</div> : ''
                )}
              />
              <Table.Column title="契約名称" dataIndex="contract_short_name" render={(item, record, index) => (

                record.Expression_11 === 1 ? <div>{record.contract_short_name}</div> : ''
              )}
              />
              <Table.Column title="検査略称" dataIndex=""
                render={(item, record, index) => (
                  record.Expression_11 === 1 ? <Tooltip title={record?.Expression_9}>
                    <span>{record.exam_short_name}</span>
                  </Tooltip> : ''

                )}
              />
              <Table.Column title="結果値" dataIndex="W1_result_val"
              render={(item, record, index) => (

                record.Expression_11 === 1 ? <div style={{ textAlign: 'right'}}><span>{record.W1_result_val}</span></div> : ''
              )}
              />
              <Table.Column title="判定" dataIndex="W1_determine_val"
                render={(item, record, index) => (
                  record.Expression_11 === 1 ?
                   <span style={{ color: Color(record.Expression_10) }}>{record.W1_determine_val}</span> : ''
                )}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2637036_DesignatedInspectVisitsHistory);
