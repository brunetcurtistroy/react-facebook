import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Table, Button, Space,Modal } from "antd";
import WS0968001_AccordingToVariousNameDefinitionTbl from "./WS0968001_AccordingToVariousNameDefinitionTbl";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0967003_BillingNameQuerySub extends React.Component {
  static propTypes = {
    Li_Classify: PropTypes.any,
    Lo_Code: PropTypes.any,
    Lo_Name: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "請求名称照会SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      selectedRow: [],
    };
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
      <div className="billing-name-query-sub">
        <Card title="請求名称照会SUB">
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            rowSelection={{
              type: "radio",
              onChange: async (selectedRowKeys, selectedRows) => {
                await this.setState({
                  selectedRow: selectedRows,
                });
              },
            }}
          >
            <Table.Column title="ｺｰﾄﾞ" dataIndex="code" width={130} />
            <Table.Column title="名  称" dataIndex="name" />
          </Table>
          <br></br>
          <Space style={{float: 'right'}}>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '60%',
                    component: (
                      <WS0968001_AccordingToVariousNameDefinitionTbl
                        Li_Classify = {this.props.Li_Classify}
                        onFinishScreen={(output) => {

                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }}
            >
              設定
            </Button>

            <Button
              type="primary"
              disabled={this.state.selectedRow.length === 0}
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    Lo_Code: this.state.selectedRow[0].code,
                    Lo_Name: this.state.selectedRow[0].name,
                  });
                }
              }}
            >
              選択
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
            this.closeModal()
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
)(WS0967003_BillingNameQuerySub);
