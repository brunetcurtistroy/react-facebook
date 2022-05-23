/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Card, Table, Modal, Checkbox } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ConfirmAcquisitionTargetAction from "redux/CooperationRelated/OcrCaptureStartUp/ConfirmAcquisitionTarget.action";
import WS3108016_IdConsultDateModify from "./WS3108016_IdConsultDateModify";
import WS2584019_PersonalInfoInquirySub from "../V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS3108015_ConfirmAcquisitionTarget extends React.Component {

  static propTypes = {
    Li_GetTargetConfirm: PropTypes.any,
    Lo_StsDataUpdateRun: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '取込対象確認';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: []
    };
  }

  componentDidMount() {
    this.getlistData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getlistData();
    }
  }

  getlistData() {
    let params = {
      GetTargetConfirm: this.props.Li_GetTargetConfirm ? this.props.Li_GetTargetConfirm : ''
    }

    this.setState({ isLoadingTable: true })
    ConfirmAcquisitionTargetAction.getListData(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  updateExec() {
    let params = {
      Lo_StsDataUpdateRun: 1
    }

    ConfirmAcquisitionTargetAction.updateExec(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lo_StsDataUpdateRun: true,
          });
        }
      })
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
      <div className="confirm-acquisition-target">
        <Card title="取込対象確認">
          <Table
            size="small"
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            scroll={{ x: 1000, y: 700 }}
          >
            <Table.Column dataIndex="acquisition_target" width={35} align="center"
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'center' }} hidden={record.Expresion_16 === 0}>
                    <Checkbox checked={record.acquisition_target}></Checkbox>
                  </div>
                )
              }}
            />
            <Table.Column title="状態" dataIndex="Expresstion_5" width={40} align="center"
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'center', color: Color(record.Expression_7)?.Foreground }}>
                    <span> {record.Expresstion_5}</span>
                  </div>
                )
              }}
            />
            <Table.Column title="連番" width={100} align="center"
              render={(value, record, index) => {
                return (
                  <div>
                    <span>{record.serial_num}</span>
                    <span hidden={record.branch_num <= 0}> - </span>
                    <span hidden={record.branch_num <= 0}>{record.branch_num}</span>
                  </div>
                )
              }}

            />
            <Table.Column title="帳票" dataIndex="form_id" width={40} align="center"
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    <span> {record.form_id}</span>
                  </div>
                )
              }}
            />
            <Table.Column title="帳票名" dataIndex="remarks" />
            <Table.Column title="受診日" dataIndex="consult_date" width={85}
              render={(value, record, index) => {
                return (
                  <span> {record.consult_date?.replaceAll('-', '/')}</span>
                )
              }}
            />
            <Table.Column title="個人番号" dataIndex="person_num" width={95}
              render={(value, record, index) => {
                return (
                  <div>
                    <span> {parseInt(record.person_num)}</span>
                  </div>
                )
              }}
            />
            <Table.Column width={32}
              render={(value, record, index) => {
                let title = '個人情報照会SUB' + ' [' + record.person_num + ']'
                return (
                  <Button size='small'
                    icon={<MoreOutlined />}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '90%',
                          component: (
                            <Card title={title}>
                              <WS2584019_PersonalInfoInquirySub
                                Li_PersonalNum={parseInt(record.person_num)}
                              />
                            </Card>
                          ),
                        },
                      });
                    }}
                  >
                  </Button>
                )
              }}
            />
            <Table.Column title="氏名" dataIndex="kanji_name" />
            <Table.Column title="エラー内容" dataIndex="Expresstion_6" />
            <Table.Column width={60} align="center"
              render={(value, record, index) => (
                <Button size='small' type='primary'
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '95%',
                        component:
                          <WS3108016_IdConsultDateModify
                            Li_SerialNum={record.serial_num}
                            Li_BranchNum={record.branch_num}
                            Li_PersonalNum={parseInt(record.person_num)}
                            Li_Date={record.consult_date}
                            onFinishScreen={() => {
                              this.closeModal()
                            }}
                          />
                        ,
                      },
                    });
                  }}
                >
                  修正</Button>
              )}
            />
          </Table>
          <div style={{ textAlign: 'right', marginTop: 15 }}>
            <Button type="primary"
              onClick={() => {
                this.updateExec()
              }}
            >更 新</Button>
          </div>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS3108015_ConfirmAcquisitionTarget);
