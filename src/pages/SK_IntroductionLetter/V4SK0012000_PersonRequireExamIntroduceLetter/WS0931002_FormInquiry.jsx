import React from "react";
import { connect } from "react-redux";
import WS0460001_CsvCreateParamMaintain from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0460001_CsvCreateParamMaintain.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Space, Button, Modal } from "antd";

class WS0931002_FormInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '帳票照会';

    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      loading: false,
      sourceData: [],
      childModal: {
        width: 0,
        visible: false,
        component: null
      }
    };
  }
  componentDidMount() {
    this.setState({
      loading: true,
    })
    this.getScreenData()
  }
  getScreenData = () => {
    setTimeout(() => {
      this.setState(
        {
          loading: false,
          sourceData: [
            { id: 1, 'Code': 1, 'DocumentName': 'text 1' },
            { id: 2, 'Code': 2, 'DocumentName': 'text 2' }
          ]
        }
      )
    }, 1000)

  }

  openModalCsvCreateParamMaintain = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        width: '80%',
        visible: true,
        component:
          <WS0460001_CsvCreateParamMaintain
            onFinishScreen={(output) => {
              console.log(output);
              this.closeModal()
            }}
          />
      }
    })
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }

  onFinish = () => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        //
        Code: this.state.selectedRows[0].Code,
        DocumentName: this.state.selectedRows[0].DocumentName
      })
    }
  }
  render() {
    return (
      <div className="form-inquiry">
        <Card title="帳票照会">
          <Table
            size="small"
            bordered
            className="mb-3"
            loading={this.state.loading}
            dataSource={this.state.sourceData}
            pagination={false}
            rowKey={(record) => record.id}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                  selectedRows,
                  selectedRowKeys
                })
              }
            }}
          >
            <Table.Column title="No" dataIndex="Code" key="" render={(value, record, index) => {
              return (
                <span>{value}</span>
              )
            }} />
            <Table.Column title="帳  票  名" dataIndex="DocumentName" key="" render={(value, record, index) => {
              return (
                <span>{value}</span>
              )
            }} />
            <Table.Column title="" dataIndex="" key="" />
          </Table>
          <Space style={{ float: 'right' }}>
            <Button type="primary" onClick={this.openModalCsvCreateParamMaintain}>
              設定
            </Button>
            <Button type="primary" onClick={this.onFinish}>
              確定
            </Button>
          </Space>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          destroyOnClose={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0931002_FormInquiry);
