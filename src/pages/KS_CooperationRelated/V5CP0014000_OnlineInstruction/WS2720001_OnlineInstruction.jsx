import React from "react";
import { connect } from "react-redux";

import { Button, Card, Space, Table, Dropdown, Menu, Modal } from "antd";

import { MoreOutlined } from "@ant-design/icons";
import OnlineInstructionAction from "redux/CooperationRelated/OnlineInstruction/OnlineInstruction.action";
import WS2720007_Configuration from "./WS2720007_Configuration";
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2720001_OnlineInstruction extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'オンライン指示';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: true,
      rowSelect: {},
      selectedRowKey: []
    };
  }

  componentDidMount() {
    this.getListData();
  }

  getListData() {
    this.setState({
      isLoadingTable: true
    })

    OnlineInstructionAction.GetListData()
      .then((res) => {
        this.setState({
          dataSource: res,
          selectedRowKey: [],
          rowSelect: {},
          isLoadingTable: false
        })
      })
      .finally(() => {
        this.setState({
          isLoadingTable: false
        })
      })
  }

  render() {
    return (
      <div className="online-instruction">
        <Card title='オンライン指示' style={{ width: 700 }}>
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  ...this.state,
                  childModal: {
                    width: "80%",
                    visible: true,
                    component: (
                      <WS2720007_Configuration
                        onFinishScreen={() => { }}
                      />
                    ),
                  },
                });
              }}
            >各種設定
            </Button>
          </Space>
          <hr style={{ margin: '15px 0' }} />
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={this.state.dataSource?.length > 10 ? true : false}
            rowKey={(record) => record.id}
            bordered
            scroll={{ x: 600 }}
            rowSelection={{
              type: "radio",
              selectedRowKeys: this.state.selectedRowKey,
              onSelect: async (record, selected, selectedRows) => {
                await this.setState({
                  rowSelect: selectedRows[0],
                  selectedRowKey: selectedRows.map(x => x.id),
                });
              },
            }}
          >
            <Table.Column title="状態" dataIndex="Expression_12" width={100}
              render={(value, record) => {
                return (
                  <span style={{ color: Color(record.Expression_13)?.Foreground }}>{value}</span>
                )
              }}
            />
            <Table.Column title="常駐プログラム" dataIndex="name" />
            <Table.Column title="起動" dataIndex="Expression_14" width={70} align='center'
              render={(value, record, index) => value?.substr(0, 5)} />
            <Table.Column title="停止" dataIndex="stop_time_at" width={70} align='center'
              render={(value, record, index) => value?.substr(0, 5)} />
            <Table.Column title="ﾀｲﾑｽﾀﾝﾌﾟ" dataIndex="Expression_15" width={100} align='center' />
            {/* <Table.Column width={60} align='center'
              render={(value, record) => {
                return (
                  <Dropdown
                    overlay={() => (
                      <Menu>
                        <Menu.Item hidden={!record.text}>
                          起　動
                        </Menu.Item>
                        <Menu.Item>
                          停　止
                        </Menu.Item>
                        <Menu.Item>
                          再表示
                        </Menu.Item>
                        <Menu.Item>
                          ローカル起動
                        </Menu.Item>
                      </Menu>
                    )}
                  >
                    <Button size='small' icon={<MoreOutlined />}></Button>
                  </Dropdown>
                );
              }}
            /> */}
          </Table>
          <Space style={{ float: 'right', margin: '10px 0' }}>
            <Button type="primary">再表示</Button>
            <Button type="primary" disabled={!this.state.rowSelect.text}>起　動</Button>
            <Button type="primary">停　止</Button>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2720001_OnlineInstruction);
