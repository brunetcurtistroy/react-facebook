import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Space, Table, Button, message, Form, Modal } from "antd";
import InspectCmtSearchQueryService from "services/InputBusiness/SpreadInput/InspectCmtSearchQueryService";
import PropTypes from "prop-types";
import WS0358001_InspectCmtInfoMaintain from "pages/MS_InspectionMaintenance/V4MS0105000_ExamCmtInfoMaintain/WS0358001_InspectCmtInfoMaintain";
class WS0274001_InspectCmtSearchQuery extends React.Component {
  static propTypes = {
    Lio_CmtClassify: PropTypes.any,
    LnkOutInspectCmtScreen: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = "検査コメント検索・照会";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: false,
      screenData: {},
    };
  }

  componentDidMount = () => {
    const { Lio_CmtClassify, LnkOutInspectCmtScreen } = this.props;
    this.getDataList(Lio_CmtClassify, LnkOutInspectCmtScreen);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      const { Lio_CmtClassify, LnkOutInspectCmtScreen } = this.props;
      this.getDataList(Lio_CmtClassify, LnkOutInspectCmtScreen);
    }
  };
  // componentWillUnmount() {
  //   if (this.props.onFinishScreen) {
  //     this.props.onFinishScreen({
  //       flg_724: 1,
  //     });
  //   }
  // }

  getDataList = (Lio_CmtClassify, LnkOutInspectCmtScreen) => {
    this.setState({ isLoadingTable: true, selectedRows: {} });
    InspectCmtSearchQueryService.GetListDataService({
      Lio_CmtClassify: Lio_CmtClassify,
      LnkOutInspectCmtScreen: LnkOutInspectCmtScreen,
    })
      .then((res) => {
        this.setState({ dataSource: res.data.ListData, screenData: res.data });
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
        Lio_CmtClassify: selectedRows.comment_division,
        LnkOutInspectCmtScreen: selectedRows.exam_comment_screen,
        recordData: selectedRows,
        flg_724: 1,
      });
    }
  };

  render() {
    return (
      <div className="inspect-cmt-search-query">
        <Form size="small">
          <Card title="検査コメント検索・照会">
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              rowKey={(record) => record.id}
              bordered
              pagination={false}
              size="small"
              scroll={{ y: "300px" }}
            >
              {this.state.screenData.Expression_10 && (
                <Table.Column
                  width={80}
                  align="center"
                  title="ｺﾒﾝﾄ区分"
                  dataIndex="comment_division"
                  key=""
                  render={(value, record, index) => (
                    <Form.Item style={{ textAlign: "right" }}>
                      <span>{record.comment_division}</span>
                    </Form.Item>
                  )}
                />
              )}
              <Table.Column
                width={80}
                align="center"
                title="コード"
                dataIndex="exam_comment_code"
                key=""
                render={(value, record, index) => (
                  <Form.Item style={{ textAlign: "right" }}>
                    <span>{record.exam_comment_code}</span>
                  </Form.Item>
                )}
              />
              <Table.Column
                width={100}
                align="center"
                title={this.state.screenData.Expression_6}
                dataIndex="exam_comment_screen"
                key=""
              />
              <Table.Column
                align="center"
                title={this.state.screenData.Expression_7}
                dataIndex="exam_comment_form"
                key=""
                render={(value, record, index) => (
                  <Form.Item style={{ textAlign: "left" }}>
                    <span>{record.exam_comment_form}</span>
                  </Form.Item>
                )}
              />
              <Table.Column
                width={70}
                title=""
                align="center"
                dataIndex=""
                render={(text, record, index) => (
                  <Space>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => this.handleRowSelected(record)}
                    >
                      選択
                    </Button>
                  </Space>
                )}
              />
            </Table>
            <Space
              style={{
                marginTop: "1em",
                float: "left",
                marginRight: "10px",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: "-17px",
              }}
            >
              <Button
                type="primary"
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: "50%",
                      component: (
                        <WS0358001_InspectCmtInfoMaintain
                          Lio_CmtClassify={
                            this.state.selectedRows?.comment_division
                          }
                        />
                      ),
                    },
                  });
                }}
              >
                設定
              </Button>
            </Space>
          </Card>
        </Form>
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
)(WS0274001_InspectCmtSearchQuery);
