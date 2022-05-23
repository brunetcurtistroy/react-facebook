import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Form, Checkbox, Modal, Space, Button, Divider } from "antd";
import FormatSelectService from "services/IntroductionLetter/IntroduceLetterExtract/FormatSelect";
import PropTypes from 'prop-types';
import WS0433001_PrinterConfirm from "../V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm";
class WS2589011_FormatSelect extends React.Component {
  static propTypes = {
    Lio_PrinterNo: PropTypes.any,
    Lio_Preview: PropTypes.any,
  }
  constructor(props) {
    super(props);

    // document.title = '書式選択';

    this.state = {
      tableData: [],
      childModal: {
        visible: false,
        width: 0,
        component: null
      },
      loading: false
    };
  }
  componentDidMount() {
    this.getScreenData()
  }
  getScreenData = () => {
    this.setState({
      loading: true,
    })
    FormatSelectService.onFormatSelect()
      .then(res => {
        console.log(res)
        this.setState({
          tableData: res.data
        })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }
  openModalConfirm = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        width: '40%',
        visible: true,
        component: <WS0433001_PrinterConfirm
          {...this.props}
          onFinishScreen={(output) => {
            this.setDataOutput(output)
            this.closeModal()
          }}

        />
      }
    })
  }
  setDataOutput = output => {
    let Lio_Preview = output.Lo_Preview;
    let Lio_PrinterNo = output.Lo_PrinterNo;
    let Lo_StsEnter = output.Lo_StsOutput;
    if (Lo_StsEnter) {
      FormatSelectService.onConfirm({ StsEnter: Lo_StsEnter ? 1 : 0 })
        .then(res => {
          if (this.props.onFinishScreen) {
            this.props.onFinishScreen({
              Lo_Preview: Lio_Preview,
              Lo_PrinterNo: Lio_PrinterNo,
              Lo_StsOutput: (res.data?.StsOutput === 1 ? true : false),
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }
  render() {
    return (
      <div className="format-select">
        <Card title="書式選択">
          <Form>
            <Table
              size="small"
              bordered={true}
              loading={this.state.loading}
              dataSource={this.state.tableData}
              rowKey={(record) => record.id}
            >
              <Table.Column
                title="&nbsp;"
                dataIndex=""
                key=""
                render={(value, record, index) => {
                  return (
                    <Form.Item name={['tableData', index, '']}>
                      <span>{record.Expression_4}</span>
                    </Form.Item>
                  )
                }} />
              <Table.Column
                title=""
                dataIndex="W1_enabled_disabled"
                key=""
                width={30}
                align='center'
                render={(value, record, index) => {
                  return (
                    <Form.Item name={['tableData', index, 'W1_enabled_disabled']}
                      style={{ marginBottom: '0px' }}
                      onChange={(e) => { }} >
                      <Checkbox checked={record.W1_enabled_disabled}></Checkbox>
                    </Form.Item>
                  )
                }}
              />
            </Table>
            <Divider />
            <Space style={{ float: "right" }}>
              <Button type="primary" onClick={this.openModalConfirm}>
                確定
              </Button>
            </Space>
          </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2589011_FormatSelect);
