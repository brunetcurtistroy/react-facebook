import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Table, Button, Space, Modal } from "antd";
import WS0460001_CsvCreateParamMaintain from "../V4MS9901100_CsvCreateParamMaintain/WS0460001_CsvCreateParamMaintain";
import FormInquiryAction from "redux/ResultOutput/MedicalExamDataOutputCsv/FormInquiry.action";
import { isNumber } from "lodash";
class WS0784003_FormInquiry extends React.Component {
  static propTypes = {
    Lo_Code: PropTypes.any,
    Lo_DocumentName: PropTypes.any,
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
      dataSource: [],
      selectedRows: [],
      isLoading: false,
      indexTable: 0,
      flg: 0,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }
  componentWillUnmount() {
    if (this.state.flg === 0) {
      if (this.props.onFinishScreen) {
        this.props.onFinishScreen({
          flg: 1,
        });
      }
    }
  }
  componentDidMount() {
    this.getScreenData();
  }
  getScreenData() {
    this.setState({ isLoading: true });
    FormInquiryAction.GetScreenData()
      .then((response) => {
        this.setState({
          dataSource: response,
          selectedRows: [response[0]],
          indexTable: 0,
        });
        document.getElementById('event_2').focus();
      })
      .finally(() => this.setState({ isLoading: false }));
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="form-inquiry">
        <Card title="帳票照会">
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            rowClassName={(record, index) =>
              record.id === this.state.selectedRows[0]?.id
                ? "table-row-light"
                : ""
            }
            scroll={{ y: "300" }}
            size="small"
            onRow={(record, index) => ({
              onKeyUp: (e) => {
                if (e.keyCode === 9) {
                  this.setState({
                    rowSelect: record,
                    indexTable: index,
                    selectedRows: [record],
                  });
                }
              },
            })}
          >
            <Table.Column title="No" dataIndex="Code" width={90} />
            <Table.Column title="帳  票  名" dataIndex="DocumentName" />
            <Table.Column
              width={70}
              title=""
              dataIndex=""
              render={(item, record, index) => {
                return (
                  <div style={{ textAlign: "center" }}>
                    <Button
                      id={`event_${record.id}`}
                      tabIndex={`${record.id}`}
                      style={{ marginLeft: "10px" }}
                      type="primary"
                      onClick={() => {
                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({
                            Lo_Code: record.Code,
                            Lo_DocumentName: record.DocumentName,
                            flg: 0,
                          });
                          this.setState({ flg: 1 });
                        }
                      }}
                    >
                      選択
                    </Button>
                  </div>
                );
              }}
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
              marginLeft: "-12px",
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "70%",
                    component: (
                      <WS0460001_CsvCreateParamMaintain
                        onFinishScreen={(output) => {
                          this.closeModal();
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
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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
)(WS0784003_FormInquiry);
