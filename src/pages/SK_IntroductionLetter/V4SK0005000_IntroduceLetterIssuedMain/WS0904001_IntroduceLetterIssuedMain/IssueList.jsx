import React from "react";
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Button, Radio, Checkbox, Table, Row, Col, DatePicker, Space, Modal, message, Dropdown, Menu } from "antd";
import {
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import axios from 'configs/axios';
import WS0898001_IntroduceLetterExtractMaintain from 'pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS0898001_IntroduceLetterExtractMaintain.jsx';
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";

class IssueList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      mainSourceData: [],
      isLoading: false,
      listID: [],
    };
  }

  componentDidMount() {
    this.loadTableData();
  }

  loadTableData = () => {
    this.setState({ isLoading: true });

    axios.get('/api/introduce-letter-issued-main/introduce-letter-issued-main/issue-list')
      .then(res => {
        if (res?.data) {
          let arrID = [];
          if (res.data.length > 0) {
            res.data.forEach(element => {
              if (element.W1_instruction_flg) arrID.push(element.id)
            });
          }
          this.setState({
            listID: arrID,
            mainSourceData: res.data,
          });
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  Change = (params) => {
    axios.post('/api/introduce-letter-issued-main/introduce-letter-issued-main/w1-instruction-flg', {
      ...params,
    })
      .then(() => this.loadTableData())
  }

  ReturnComponent = (component) => {
    let components = {
      WS0898001_IntroduceLetterExtractMaintain,
      WS2583001_ConsultInquirySub,
      WS2584019_PersonalInfoInquirySub
    };
    return components[component];
  }

  callModal = (props, width, nameScreen) => {
    let Component = this.ReturnComponent(nameScreen);
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: width,
        component: (
          <Component
            {...props}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  renderRightClick = (record) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            this.callModal({ Li_MenuOption: '', Li_PersonalNum: record.W1_person_id, Li_ReserveNum: record.W1_reserve_num }, '70%', 'WS0898001_IntroduceLetterExtractMaintain')
          }}
        >変更</Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            this.callModal({ Li_ReserveNum: record.W1_reserve_num }, '70%', 'WS2583001_ConsultInquirySub')
          }}
        >照会</Menu.Item>
      </Menu >
    )
  }

  render() {
    return (
      <div>
        <Table
          dataSource={this.state.mainSourceData}
          rowKey={(record) => record.id}
          size="small"
          loading={this.state.isLoading}
          rowSelection={{
            selectedRowKeys: this.state.listID,
            onChange: (selectedRowKeys, selectedRows) => this.setState({ listID: selectedRowKeys }),
            onSelect: (record, selected) => this.Change({ id: record.id, W1_instruction_flg: selected ? 1 : 0 }),
            onSelectAll: (selected) => this.Change({ W1_instruction_flg: selected ? 1 : 0 })
          }}
        >
          {/* <Table.Column title="#" dataIndex="W1_instruction_flg" render={(value, record, index) => (<>
          <Form.Item name={['mainSourceData', index, 'id']} style={{ display: 'none' }}>
            <Checkbox />
          </Form.Item>
          <Form.Item name={['mainSourceData', index, 'W1_instruction_flg']} valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </>)} /> */}
          <Table.Column title="受診日" dataIndex="W1_consult_date"
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.Expression_11)?.Foreground }}>{value}</div>
              )
            }} />
          <Table.Column title="受付No" dataIndex="W1_receipt_no"
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.Expression_11)?.Foreground, textAlign: 'right' }}>{value}</div>
              )
            }} />
          <Table.Column title="個人番号" dataIndex="personal_number_id"
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.Expression_11)?.Foreground, textAlign: 'right' }}>{value}</div>
              )
            }} />
          <Table.Column title="メモ" dataIndex="Expression_16"
            render={(text, record) => {
              let icon = null;
              switch (record.Expression_16) {
                case 1:
                  icon = (
                    <InfoCircleOutlined
                      style={{ fontSize: 20, color: "#1890ff" }}
                    />
                  );

                case 3:
                  icon = (
                    <WarningOutlined
                      style={{ fontSize: 20, color: "#faad14" }}
                    />
                  );

                case 5:
                  icon = (
                    <CloseCircleOutlined
                      style={{ fontSize: 20, color: "#ff4d4f" }}
                    />
                  );

                default:
                  icon = <MoreOutlined style={{ fontSize: 20 }} />;
              }
              return (<Button
                style={{ color: Color(record.Expression_11)?.Foreground }}
                onClick={() => this.callModal({ Li_PersonalNum: record.personal_number_id }, '70%', 'WS2584019_PersonalInfoInquirySub')}
                icon={icon}
              />);
            }}
          />
          <Table.Column title="氏名" dataIndex="kanji_name"
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.Expression_11)?.Foreground }}>{value}</div>
              )
            }} />
          <Table.Column title="診療科"
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.Expression_11)?.Foreground }}>{record.W1_depart + " - " + record.department_name}</div>
              )
            }} />
          <Table.Column title="契約情報" render={(value, record, index) => {
            return (
              <div style={{ color: Color(record.Expression_11)?.Foreground }}>{record.medical_exam_course + "  " + record.contract_short_name}</div>
            )
          }} />
          <Table.Column title="発行" dataIndex="Expresstion_13"
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.Expression_11)?.Foreground }}>{value}</div>
              )
            }} />
          <Table.Column width={60} render={(value, record) => (
            <Dropdown.Button
              trigger='click'
              size='small'
              icon={<MoreOutlined />}
              overlay={() => this.renderRightClick(record)}
            ></Dropdown.Button>
          )}
          />
        </Table>
        
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

export default IssueList;
