import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Space, Button, Modal } from "antd";

import WS0855001_PrintParamMaintain from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0855001_PrintParamMaintain.jsx';
import PrintStyleInquiryAction from "redux/ResultOutput/ResultsTblCollectOutput/SetupResultTblCollectOutput/PrintStyleInquiry.action.js";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1527023_PrintStyleInquiry extends React.Component {

  static propTypes = {
    Li_parentScreen: PropTypes.any,
    Lo_StyleCode: PropTypes.any,
    Lo_FormatName: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '印刷様式照会';

    this.state = {
      dataSource:[],
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true,
        pageSizeOptions: [10, 20, 50, 100]
      },
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: []
    };
  }
  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({ isLoading: true })
    PrintStyleInquiryAction.GetListData()
      .then(res => {
        // let data = res.data.map(item=>({
        //   ...item,
        //   branch_store_code: item.branch_store_code === 0 ? "" : item.branch_store_code
        // }));
        this.setState({ dataSource: res.data })
      })
      .finally(() => this.setState({ isLoading: false }))
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
          >
            <Table.Column title="様式" dataIndex="style_code" />
            <Table.Column title="様  式  名" dataIndex="format_name" />
            <Table.Column width={100} align="center"
              render={(value, record) => (
                <Button size="small" type="primary"  onClick={() => {
                  this.props.onFinishScreen({
                    style:record.style_code,
                    format_name:record.format_name,
                    recordData: record,
                  });
                }}>選択</Button>
              )} />
          </Table>
          <br></br>
          <Space style={{ float: 'right' }} hidden={true}>
            <Button type="primary" hidden={this.props.Li_parentScreen === 'SettingHira'}
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '600px',
                    component: (
                      <WS0855001_PrintParamMaintain
                        onFinishScreen={(output) => {
                          this.onFinish()

                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }} >設定</Button>
            <Button type="primary"
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    Lo_StyleCode: this.state.selectedRows.length > 0 ? this.state.selectedRows[0].style_code : null,
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1527023_PrintStyleInquiry);
