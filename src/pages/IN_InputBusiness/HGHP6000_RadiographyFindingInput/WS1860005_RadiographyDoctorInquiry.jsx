import React from "react";
import { connect } from "react-redux";

import { Card, Form, Col, Row, Table, Button } from "antd";
import RadiographyDoctorInquiryAction from "redux/InputBusiness/RadiographyFindingInput/RadiographyDoctorInquiry.action";

class WS1860005_RadiographyDoctorInquiry extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "読影者照会";

    this.state = {
      selectedRowTableFirst: 0,
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
    };
  }
  componentDidMount() {
    this.getListDataRadiographyDoctorInquiry();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getListDataRadiographyDoctorInquiry();
    }
  }
  getListDataRadiographyDoctorInquiry() {
    this.setState({ isLoadingtable: true });
    RadiographyDoctorInquiryAction.getListDataRadiographyDoctorInquiryAction()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingtable: false,
          rowSelected: res ? res : [],
        });
      })
      .finally(() => this.setState({ isLoadingTable: false }));
  }

  handleSelectRowsTableFirst = (selectedRowTableFirst) => {
    this.setState({ selectedRowTableFirst: selectedRowTableFirst });
  };
  doctorCode() {
    console.log(this.state.rowSelected);
  }

  render() {
    const { selectedRowTableFirst } = this.state;

    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst,
    };
    return (
      <div className="radiography-doctor-inquiry">
        <Card title="読影者照会">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            rowKey={(record) => record.doctor_code}
            // rowSelection={{
            //   type: "radio",
            //   fixed: "left",
            //   selectedRowKeys: this.state.selectedRowKeys,
            //   onSelect: (record, selected, selectedRows) => {
            //     this.setState({
            //       rowSelected: selectedRows,
            //       selectedRowKeys: selectedRows.map((x) => x.doctor_code),
            //     });
            //   },
            // }}
            className="mb-3"
            scroll={{ y: "600px" }}
          >
            <Table.Column title="コード" dataIndex="doctor_code" />
            <Table.Column  width={200} title="名称" dataIndex="user_name" />
            <Table.Column
           
              title="区分"
              dataIndex="interpretation_division"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    style={{ textAlign: "end" }}
                    name="interpretation_division"
                  >
                    <span>{record.interpretation_division}</span>
                  </Form.Item>
                );
              }}
            />
            <Table.Column
              render={(value, record) => {
                console.log(111111,record)
                return (
                  <Button
                    type="primary"
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          Lio_DoctorCode: record.doctor_code,
                          Lio_UserName: record.user_name,
                        });
                      }
                    }}
                  >
                    選択
                  </Button>
                );
              }}
            />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS1860005_RadiographyDoctorInquiry);
