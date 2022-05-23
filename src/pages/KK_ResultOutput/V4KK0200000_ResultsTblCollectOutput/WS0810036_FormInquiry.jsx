import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Space, Table, Button, Modal, message } from "antd";

import WS1527001_SetupResultTblCollectOutput from "pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS1527001_SetupResultTblCollectOutput.jsx";
import FormInquiryService from "services/ResultOutput/ResultsTblCollectOutput/FormInquiryService";
import ModalDraggable from "components/Commons/ModalDraggable";

class WS0810036_FormInquiry extends React.Component {
  static propTypes = {
    Lio_Style: PropTypes.any,
    Lo_Name: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "帳票照会";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: [],
      isLoadingTable: false,
      dataSource: [
        {
          id: 1,
          Code: "1-00",
          DocumentName: 80,
        },
      ],
    };
  }
  componentDidMount = () => {
    this.getDataList();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      this.getDataList();
    }
  };

  getDataList = () => {
    this.setState({ isLoadingTable: true });
    FormInquiryService.getListDataService()
      .then((res) => {
        this.setState({ dataSource: res.data });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  };

  handleRowSelected = (selectedRows) => {
    this.setState({ selectedRows: selectedRows });
    if (this.props.onFinishScreen && selectedRows) {
      this.props.onFinishScreen({
        Lio_Style: selectedRows.Lio_Style,
        Lo_Name: selectedRows.DocumentName,
        recordData: selectedRows,
      });
    }
  };

  render() {
    return (
      <div className="form-inquiry">
        <Card title="帳票照会">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            rowKey={(record) => record.id}
            size="small"
          >
            <Table.Column align="center" title="帳票" dataIndex="Code" key="" />
            <Table.Column
              align="left"
              title="帳  票  名"
              dataIndex="DocumentName"
              key=""
            />
            <Table.Column
              width={100}
              align="right"
              title=""
              dataIndex=""
              render={(text, record, index) => (
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => this.handleRowSelected(record)}
                  >
                    確 定
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "70%",
                          component: (
                            <WS1527001_SetupResultTblCollectOutput
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                });
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  >
                    設定
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0810036_FormInquiry);
