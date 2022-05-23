/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import PropTypes, { any } from 'prop-types';
import { Card, Table, Button, Modal, Form, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS3074001_AcceptanceProcessMenu from 'pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS3074001_AcceptanceProcessMenu.jsx';
import WS2584019_PersonalInfoInquirySub from 'pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx';
import AcceptanceNumberSelectAction from 'redux/basicInfo/ConsultInfoReconstruction/AcceptanceNumberSelect.actions'
class WS2786013_AcceptanceNumberSelect extends React.Component {
  static propTypes = {
    Li_Date: PropTypes.any,
    Lio_AcceptNum: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '受付番号選択';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRow: {},
      isLoadding: false,
      dataSource: []

    };

  }
  componentDidMount() {
    this.GetListData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.GetListData()
    }
  }

  GetListData() {
    this.setState({ isLoadding: true })
    let data = {
      DateTChar: this.props.Li_Date ? this.props.Li_Date : "",
      ReceiptNumT: this.props.Lio_AcceptNum ? this.props.Lio_AcceptNum : ""
    }
    AcceptanceNumberSelectAction.GetListData(data)
      .then(res => {
        this.setState({ dataSource: res ? res : [] })
      })
      .catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ isLoadding: false }))
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  ShowPersonalInfoInquirySub(record) {
    let title = '個人情報照会SUB' + ' [' + record.personal_number_id + ']'
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "90%",
        component: (
          <Card title={title}>
            <WS2584019_PersonalInfoInquirySub
              Li_PersonalNum={record?.personal_number_id}
              onFinishScreen={(output) => {
                this.closeModal()
              }}
            />
          </Card>
        ),
      },
    });
  }
  render() {
    return (
      <div className="acceptance-number-select">
        <Card title="受付番号選択">
          <Form ref={this.formRef}>
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoadding}
              pagination={false}
              size="small"
              bordered={true}
              rowKey={(record) => record.id}
            >
              <Table.Column title="受付No" dataIndex="receipt_number"
                render={(value, record) => {
                  return (
                    <div style={{ textAlign: 'right' }}>
                      <span>{record.receipt_number}</span>
                    </div>
                  )
                }} />
              <Table.Column title="個人番号" dataIndex="personal_number_id"
                render={(value, record) => {
                  return (
                    <div style={{ textAlign: 'right' }}>
                      <span>{record.personal_number_id}</span>
                    </div>
                  )
                }} />
              <Table.Column title="メモ" width={45} align='center'
                render={(value, record) => {
                  return (
                    <Button
                      size="small"
                      icon={<MoreOutlined></MoreOutlined>}
                      onClick={() => {
                        if (!this.isEmpty(record?.personal_number_id)) {
                          this.ShowPersonalInfoInquirySub(record)
                        }
                      }}
                    ></Button>
                  )
                }}
              />
              <Table.Column title="氏名" dataIndex="kanji_name" />
              <Table.Column title="" dataIndex="visit_course" render={(value, record, index) => {
                return <span>{value}&emsp;{record?.contract_short_name}</span>
              }} />
              <Table.Column width={60}
                render={(value, record) => {
                  return (
                    <div style={{ textAlign: 'center' }}>
                      <Button type="primary"
                        onClick={() => {
                          if (this.props.onFinishScreen) {
                            this.props.onFinishScreen({ Lio_AcceptNum: record.receipt_number })
                          }
                          //   this.setState({
                          //     childModal: {
                          //       ...this.state.childModal,
                          //       visible: true,
                          //       width: 300,
                          //       component: (
                          //         <WS3074001_AcceptanceProcessMenu
                          //           onFinishScreen={(output) => {
                          //             this.closeModal()
                          //           }}
                          //         />
                          //       ),
                          //     },
                          //   });
                        }}
                      >選択</Button>
                    </div>
                  )
                }}
              />
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2786013_AcceptanceNumberSelect);
