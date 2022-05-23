import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Table, Button, Space, Modal, Dropdown, Menu } from "antd";

import WS0855001_PrintParamMaintain from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0855001_PrintParamMaintain.jsx';
import PrintStyleInquiryAction from "redux/ResultOutput/BindingModeSetting/PrintStyleInquiry.action.js";
class WS0286001_PrintStyleInquiry extends React.Component {

  static propTypes = {
    Li_UsuallyWrenRoster: PropTypes.any,
    Lio_StyleCode: PropTypes.any,
    Lo_FormatName: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '印刷様式照会';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      selectedRows: [],
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true,
        pageSizeOptions: [10, 20, 50, 100]
      },
    };
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({ isLoading: true })
    PrintStyleInquiryAction.GetListData()
      .then(res => {
        this.setState({ dataSource: res })
      })
      .finally(() => this.setState({ isLoading: false }))
  }
  onSelectRecord(record) {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_StyleCode: record.style_code,
        Lo_FormatName: record.format_name,
        recordData: record
      })
    }
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  renderButton = (record) => (
    <Dropdown.Button type="primary" trigger='click'
      onClick={() => this.onSelectRecord(record)}
      overlay={(
        <Menu>
          <Menu.Item type="primary" onClick={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: true,
                width: 1500,
                component: (
                  <WS0855001_PrintParamMaintain
                    onFinishScreen={({ }) => {
                      this.closeModal()
                    }}
                  />
                ),
              },
            })
          }}>設定</Menu.Item>
        </Menu>)}
    >選択</Dropdown.Button>
  )
  render() {
    return (
      <div className="print-style-inquiry">
        <Card title="印刷様式照会">
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={{
              ...this.state.pagination,
              hideOnSinglePage: this.state.dataSource?.length > 10 ? false : true,
            }}
            bordered={true}
            rowKey={(record) => record.id}
            size="small"
          >
            <Table.Column title="様式" dataIndex="style_code" width={70} />
            <Table.Column title="様式名称" dataIndex="format_name"  />
            <Table.Column width={70} render={(text, record, index) => this.renderButton(record)} />
          </Table>
          <br></br>
          <Space style={{ float: 'right' }}>
            <Button
              hidden={true}
              type="primary"
              style={{ float: 'right' }}
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '800px',
                    component: (
                      <WS0855001_PrintParamMaintain
                        onFinishScreen={({ }) => {

                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }}>設定</Button>
            <Button
              hidden={true}
              type="primary"
              style={{ float: 'right' }}
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    Lio_StyleCode: this.state.selectedRows.length > 0 ? this.state.selectedRows[0].style_code : null,
                    Lo_FormatName: this.state.selectedRows.length > 0 ? this.state.selectedRows[0].format_name : null,
                  });
                }
              }}>選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0286001_PrintStyleInquiry);
