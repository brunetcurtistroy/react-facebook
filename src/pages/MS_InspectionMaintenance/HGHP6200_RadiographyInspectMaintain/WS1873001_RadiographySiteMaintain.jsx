import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Table, Form, Input, Modal, Button, Menu } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";

class WS1873001_RadiographySiteMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "読影部位保守";

    this.state = {
      dataSource: [
        {
          id: 1,
          site_code: 1,
          site_name: "abc",
          site_classification_io: "abc",
          findings_classification_i: "abc",
          display_order: 1,
          OutputChar: "abc",
        },
        {
          id: 2,
          site_code: 1,
          site_name: "abc",
          site_classification_io: "abc",
          findings_classification_i: "abc",
          display_order: 1,
          OutputChar: "abc",
        },
      ],
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingTable: false,
    };
  }
  componentDidMount() {
    this.getScreen();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreen();
    }
  }

  getScreen() {
    const data = {}
    this.formRef.current?.setFieldsValue({ tableData: this.state.dataSource });
  }

  render() {
    return (
      <div className="radiography-site-maintain">
        <Menu mode="horizontal">
          <Menu.Item
            key="(F12)"
            // onClick={() => {
            //   this.setState({
            //     childModal: {
            //       ...this.state.childModal,
            //       visible: true,
            //       width: "80%",
            //       component: (
            //         // <WS2700099_InputForm
            //         //   Li_InspectCodeOut="0"
            //         //   onFinishScreen={() => {
            //         //     this.searchInspectItemConverseSub();
            //         //     this.setState({
            //         //       childModal: {
            //         //         ...this.state.childModal,
            //         //         visible: false,
            //         //       },
            //         //     });
            //         //   }}
            //         // />
            //       ),
            //     },
            //   });
            // }}
          >
            新規
          </Menu.Item>
        </Menu>
        <Card title="読影部位保守">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            rowKey={(record) => record.id}
            scroll={{ y: "323px" }}
          >
            <Table.Column
              title="部位ｺｰﾄﾞ"
              dataIndex="site_code"
              render={(row, record, index) => {
                return (
                  <Form.Item name={["tableData", index, "site_code"]}>
                    <Input style={{textAlign: 'right'}} name="site_code"  type="number" />
                  </Form.Item>
                );
              }}
            />
            <Table.Column
              title="部位名称"
              dataIndex="site_name"
              render={(row, record, index) => {
                return (
                  <Form.Item>
                    <Input style={{textAlign: 'left'}} value={record.site_name} />
                  </Form.Item>
                );
              }}
            />
            <Table.Column
              title="部位分類1"
              dataIndex="site_classification_io"
              render={(row, record, index) => {
                return (
                  <Form.Item>
                    <Input style={{textAlign: 'left'}} value={record.site_classification_io} />
                  </Form.Item>
                );
              }}
            />
            <Table.Column
              title="所見分類"
              dataIndex="findings_classification_i"
              render={(row, record, index) => {
                return (
                  <Form.Item>
                    <Input style={{textAlign: 'left'}} value={record.findings_classification_i} />
                  </Form.Item>
                );
              }}
            />
            <Table.Column
              title="表示順"
              dataIndex="display_order"
              render={(row, record, index) => {
                return (
                  <Form.Item>
                    <Input style={{textAlign: 'right'}} type="number" value={record.display_order} />
                  </Form.Item>
                );
              }}
            />
            <Table.Column
              title="出力文字"
              dataIndex="OutputChar"
              render={(row, record, index) => {
                return (
                  <Form.Item>
                    <Input style={{textAlign: 'left'}} value={record.OutputChar} />
                  </Form.Item>
                );
              }}
            />
            <Table.Column
              align="center"
              width={100}
              title={() => (
                <Button
                  size="small"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    let arrTemp = [];
                    this.formRef.current.setFieldsValue({
                      tableData: [...arrTemp, ...this.state.dataSource],
                    });
                    this.setState({
                      dataSource: [...arrTemp, ...this.state.dataSource],
                    });
                  }}
                ></Button>
              )}
              render={(text, record, index) => (
                <>
                  <Button
                    size="small"
                    style={{ border: "none" }}
                    icon={<SaveOutlined style={{ color: "green" }} />}
                    onClick={() => this.saveDataUp(record)}
                  ></Button>
                  <Button
                    size="small"
                    style={{ border: "none" }}
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      Modal.confirm({
                        content: "消去してもよろしいですか？",
                        okText: "は　い",
                        cancelText: "いいえ",
                        onOk: () => this.deleteData(record),
                      });
                    }}
                  ></Button>
                </>
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
)(WS1873001_RadiographySiteMaintain);
