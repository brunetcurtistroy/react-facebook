import React from "react";
import PropTypes from "prop-types";

import { Card, Form, Table, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

import ContractNumberInquiryService from "services/basicInfo/ContractInfoMaintain/ContractNumberInquiryService";

/**
 * @extends {React.Component<{Li_ContractType:any, Li_ContractOrgCode:any, Li_ContractStartDate:any, Lo_ContractNum:any, onClickedSelect:any}>}
 */
class WS0315004_ContractNumberInquiry extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Lo_ContractNum: PropTypes.any,

    onClickedSelect: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // document.title = "契約番号照会";

    this.state = {
      dataTable: [],
      selectedRows: {},

      isLoadingList: false,
    };
    this.loadTermList = this.loadTermList.bind(this);
  }

  componentDidMount() {
    this.loadTermList();
  }

  loadTermList() {
    this.setState({ isLoadingList: true });

    ContractNumberInquiryService.getTermList({
      Li_ContractType: this.props.Li_ContractType,
      Li_ContractOrgCode: this.props.Li_ContractOrgCode,
      Li_ContractStartDate: this.props.Li_ContractStartDate,
    })
      .then((res) => {
        this.setState({
          dataTable: res.data,
        });
      })
      .catch((error) => {})
      .finally(() => this.setState({ isLoadingList: false }));
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          ...this.state,
          selectedRows: selectedRows[0],
        });
      },
    };
    return (
      <div className="contract-number-inquiry">
        <Card
          title={
            <>
              契約番号照会{" "}
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={() => this.loadTermList()}
                loading={this.state.isLoadingList}
                size="small"
              />
            </>
          }
        >
          <Table
            dataSource={this.state.dataTable}
            loading={this.state.isLoadingList}
            pagination={false}
            rowKey={(row) => row.id}
            size="small"
            scroll={{ y: "260px" }}
            bordered
          >
            <Table.Column
              width={40}
              title="番号"
              dataIndex="contract_number"
              render={(value, record, index) => (
                <Form.Item
                  style={{
                    textAlign: "right",
                  }}
                >
                  <span>{record.contract_number}</span>
                </Form.Item>
              )}
            />
            <Table.Column
              title="契約情報"
              dataIndex="contract_short_name"
              render={(value, record, index) => (
                <Form.Item
                  style={{
                    textAlign: "left",
                  }}
                >
                  <span>
                    {record.medical_exam_course} &nbsp;{" "}
                    {record.contract_short_name}
                  </span>
                </Form.Item>
              )}
            />
            <Table.Column
            width={80}
              render={(record) => (
                <Button
                  type="primary"
                  style={{ marginLeft:'15px', marginTop: "10px" }}
                  disabled={!(record.contract_number !== undefined)}
                  onClick={() => {
                    if (this.props.onClickedSelect) {
                      this.props.onClickedSelect({
                        Lo_ContractNum: record.contract_number,

                        recordData: record,
                      });
                    }
                  }}
                >
                  選択
                </Button>
              )}
            />
          </Table>
        </Card>
      </div>
    );
  }
}

export default WS0315004_ContractNumberInquiry;
