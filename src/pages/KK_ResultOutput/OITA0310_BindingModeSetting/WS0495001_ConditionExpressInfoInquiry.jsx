import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Button, Table, Modal, Space, message, Tooltip } from "antd";
import ModalDraggable from "components/Commons/ModalDraggable";
import WS0494001_ConditionInfoMaintain from "pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0494001_ConditionInfoMaintain.jsx";
import ConditionExpressInfoInquiryService from "services/ResultOutput/BindingModeSetting/ConditionExpressInfoInquiryService";
import ResizableColumn from "components/Commons/ResizableColumn";

class WS0495001_ConditionExpressInfoInquiry extends React.Component {
  static propTypes = {
    Lo_ConditionSerialNum: PropTypes.any,
    Lo_Name: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "条件式情報照会";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: false,
      columns: [
        {
          title: "連番",
          dataIndex: "serial_number",
          width: 235,
          render: (text) => (<div style={{ textAlign: 'right' }}>{text}</div>),
        },
        {
          title: "名称",
          dataIndex: "name",
          width: 235,
        },
        {
          title: "条件",
          dataIndex: "Expresstion_4",
          width: 235,
          render: (text, record) => (
            <Tooltip title={record.Expresstion_5}>
              <div>{text}</div>
            </Tooltip>
          ),
        },
        {
          title: "",
          dataIndex: "",
          width: 65,
          align: 'center',
          render: (text, record) => (
            <Button
              type="primary"
              size="small"
              onClick={() => this.handleRowSelected(record)}
            >
              選択
            </Button>
          ),
        },
      ]
    };
  }

  componentDidMount = () => {
    this.getListData();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) this.getListData();
  };
  getListData = () => {
    this.setState({ isLoadingTable: true });
    ConditionExpressInfoInquiryService.getListDataService()
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
    if (this.props.onFinishScreen && selectedRows) {
      this.props.onFinishScreen({
        Lo_ConditionSerialNum: selectedRows.serial_number,
        Lo_Name: selectedRows.name,
        recordData: selectedRows,
      });
    }
  };

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onFinish(values) {}

  components = {
    header: {
      cell: ResizableColumn,
    },
  };

  handleResize = (index) => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const tableColums = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return (
      <div className="condition-express-info-inquiry">
        <Card title="条件式情報照会">
          <Table
            size="small"
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.serial_number}
            scroll={{ y: "300" }}
            columns={tableColums}
            components={this.components}
          >
            <Table.Column
              width={50}
              title="連番"
              dataIndex="serial_number"
              key=""
              render={(text, record, index) => {
                return <div style={{ textAlign: "right" }}>{text}</div>;
              }}
            />
            <Table.Column title="名称" dataIndex="name" key="" />
            <Table.Column
              title="条件"
              dataIndex="Expresstion_4"
              key=""
              render={(text, record, index) => {
                return (
                  <Tooltip title={record.Expresstion_5}>
                    <span>{text}</span>
                  </Tooltip>
                );
              }}
            />
            <Table.Column
              width={70}
              align="center"
              title=""
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
              marginLeft: "-16px",
            }}
          >
            <Button
              type="primary"
              size="small"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "90%",
                    component: (
                      <WS0494001_ConditionInfoMaintain
                        onFinishScreen={({}) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              登録
            </Button>
          </Space>
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
)(WS0495001_ConditionExpressInfoInquiry);
