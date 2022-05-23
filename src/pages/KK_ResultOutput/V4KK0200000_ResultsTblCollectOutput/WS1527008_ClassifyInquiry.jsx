import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button, message, Modal } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import ClassifyInquiryAction from "redux/ResultOutput/ResultsTblCollectOutput/SetupResultTblCollectOutput/ClassifyInquiry.action";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";

class WS1527008_ClassifyInquiry extends React.Component {

  static propTypes = {
    Lio_Division: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '区分照会';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
      selectedRows: []
    };
  }

  componentDidMount() {
    this.getScreenData(true);
  }

  // componentDidUpdate(PropPev) {
  //   if (this.props !== PropPev) {
  //     this.getScreenData(true);
  //   }
  // }

  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    ClassifyInquiryAction.getListData()
      .then((res) => {
        let data = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data,
          isLoadingTable: false,

          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,
        })
        console.log(this.state.dataSource)
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }
  checkIdTemp(id) {

    if (id === '') {
      return true
    }
    return false;
  }
  handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    data.splice(0, 1);
    this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : []
    });
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  deleteData(id) {
    let params = {
      id: id
    }
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 300,
        component:
          <WS0061015_CheckYesNoNo
            Li_Message={'削除を実行しますか ?'}
            onFinishScreen={(ouput) => {
              if (ouput.Lio_StsReturn) {
                ClassifyInquiryAction.deleteData(params)
                  .then(res => {
                    message.success('正常に削除されました!');
                    this.getDataTable(true)
                  })
                  .catch((err) => {
                    console.log(err)
                    const res = err.response;
                    if (!res || !res.data || !res.data.message) {
                      message.error("エラーが発生しました");
                      return;
                    }
                    message.error(res.data.message);
                  });
              }
              this.closeModal()
            }} />
      },
    });
  }
  render() {
    return (
      <div className="classify-inquiry">
        <Card title="区分照会">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            rowSelection={{
              type: 'radio',
              onChange: async (selectedRowKeys, selectedRows) => {
                await this.setState({
                  selectedRows: selectedRows
                })
              }
            }}
          >
            <Table.Column title="区分" dataIndex="Division" key="" />
            <Table.Column title="名称" dataIndex="item" key="" />
            <Table.Column
              render={(text, record, index) => {
                return <div style={{ textAlign: "center" }}>
                  <Button style={{ border: 'none' }}
                    onClick={() => {
                      this.checkIdTemp(record.id) ? this.handleDeleteRowTable() : this.deleteData(record.id)
                    }}
                    danger
                    icon={<DeleteOutlined />}
                  >
                  </Button>
                </div>;
              }}
            />

          </Table>
          <br></br>
          <Button type="primary" style={{ float: 'right' }}
            onClick={() => {
              if (this.props.onFinishScreen) {
                this.props.onFinishScreen({
                  Lio_Division: this.state.selectedRows.length > 0 ? this.state.selectedRows[0].Division : null,
                });
              }
            }}>選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1527008_ClassifyInquiry);
