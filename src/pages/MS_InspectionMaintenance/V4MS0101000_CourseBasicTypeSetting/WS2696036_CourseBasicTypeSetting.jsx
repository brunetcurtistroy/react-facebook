import React from "react";
import { connect } from "react-redux";

import { Card, Dropdown, Form, Input, Menu, Select, Space, Table, message, Modal, Pagination } from "antd";
import {
  getScreenDataCourseBasicTypeSettingAction, getCourseBasicTypeSettingAction, deleteCourseBasicTypeSettingAction,
  EnableCourseBasicTypeSettingAction, DisableCourseBasicTypeSettingAction
} from "redux/InspectionMaintenance/CourseBasicTypeSetting/CourseBasicTypeSetting.actions";
import WS2696052_RegisterModification from "./WS2696052_RegisterModification";
import WS2696008_ContractInfoList from "./WS2696008_ContractInfoList";
import Color from "constants/Color";
import WS2705001_AnotherInspectItemSettingCategory from "../V4KB0011000_AnotherInspectItemSettingCategory/WS2705001_AnotherInspectItemSettingCategory";
import WS0306001_ContractInfoMaintain from "pages/BS_BasicInfo/V4KB0201000_ContractInfoMaintain/WS0306001_ContractInfoMaintain";
import WS2702007_ReservesDisplayItemSetting from "pages/SM_SystemMaintenance/V4SM0001000_ReservesDisplayItemSetting/WS2702007_ReservesDisplayItemSetting";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import Menubar from "components/Commons/Menubar";

class WS2696036_CourseBasicTypeSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'コース基本種別設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      initParams: {
        SearchChar: '',
        ReserveItem: 0,
        Pattern: '',
        Enable_Disable: 'tru'
      },
      dataSource: [],
      rowSelect: {},
      isLoading: true,
      current_page: 1,
      pageSize: 15,
      menuItems: [
        { id: 1, label: '新規', handleClick: this.eventF4 },
        { id: 2, label: '予約項目', handleClick: this.eventF9 },
        { id: 3, label: 'ｶﾃｺﾞﾘ別検査', handleClick: this.eventF10 },
        { id: 4, label: '契約登録', handleClick: this.eventF11 },
      ],
    };
  }

  componentDidMount = () => {
    this.loadInitData()
  }

  loadInitData = () => {
    getScreenDataCourseBasicTypeSettingAction()
      .then(res => {
        if (res) {
          this.setState({
            ReserveItem: res.data.ReserveItem,
            Pattern: res.data.Pattern,
          });
          this.loadData(this.state.initParams);
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadData = (params) => {
    this.setState({ isLoading: true });
    getCourseBasicTypeSettingAction(params)
      .then(res => {
        if (res?.data) {
          this.setState({
            dataSource: res.data,
            rowSelect: res.data.length > 0 ? res.data[0] : {},
          })
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  getDataThisComponent = (current = this.state.current_page, pageSize = this.state.pageSize) => {
    return this.state.dataSource.slice((current - 1) * pageSize, current * pageSize);
  }

  renderMenuRightClick = (record) => (
    <Menu>
      <Menu.Item onClick={() => this.callModal(
        {
          Li_Action: 'create', // create new and save at screen WS2696052_RegisterModification
          Li_CourseCode: record.course_code
        },
        500,
        'WS2696052_RegisterModification'
      )}>新規</Menu.Item>
      <Menu.Item onClick={() => this.callModal(
        {
          Li_Action: 'edit', // edit and save at screen WS2696052_RegisterModification
          Li_CourseCode: record.course_code
        },
        500,
        'WS2696052_RegisterModification'
      )}>修正</Menu.Item>
      <Menu.Item onClick={() => {
        const params = {
          id: record.id,
          course_code: record.course_code
        }
        Modal.confirm({
          content: "削除を行いますか",
          okText: 'は　い',
          cancelText: 'いいえ',
          onOk: () => {
            deleteCourseBasicTypeSettingAction(params)
              .then(() => {
                message.success('正常に削除されました');
                this.loadData(this.state.initParams);
              })
              .catch(() => message.error('契約に使用中のコースは削除できません。'))
          }
        })
      }}>削除</Menu.Item>
      <Menu.Item onClick={() => {
        let content = record.medical_exam_dates === 0
          ? 'コースを有効にします。よろしいですか？'
          : 'コースを無効にします。よろしいですか？'
        Modal.confirm({
          content: content,
          okText: 'は い',
          cancelText: 'いいえ',
          onOk: () => {
            if (record.medical_exam_dates === 0) {
              EnableCourseBasicTypeSettingAction({ id: record.id })
                .then(() => this.loadData(this.state.initParams))
                .catch(() => message.error('処理中にエラーが発生しました'))
            } else {
              DisableCourseBasicTypeSettingAction({ id: record.id })
                .then(() => this.loadData(this.state.initParams))
                .catch(() => message.error('処理中にエラーが発生しました'))
            }
          }
        })
      }}>
        {record.medical_exam_dates === 0 ? '有効にする' : '無効にする'}
      </Menu.Item>
      <Menu.Item onClick={() => this.callModal(
        {
          Li_MedicalExamCourse: record.course_code
        },
        900,
        'WS2696008_ContractInfoList'
      )}>使用契約</Menu.Item>
    </Menu>
  )

  handleSearch = (value, name) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        [name]: value,
      }
    }, () => this.loadData(this.state.initParams));
  }

  ReturnComponent = (component) => {
    let components = {
      WS2705001_AnotherInspectItemSettingCategory,
      WS2702007_ReservesDisplayItemSetting,
      WS0306001_ContractInfoMaintain,
      WS2696052_RegisterModification,
      WS2696008_ContractInfoList
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
              if (nameScreen === 'WS2696052_RegisterModification') {
                this.loadData(this.state.initParams)
              }
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

  eventF4 = () => this.callModal({ Li_CourseCode: '' }, 500, 'WS2696052_RegisterModification')

  eventF9 = () => this.callModal(null, '80%', 'WS2702007_ReservesDisplayItemSetting')

  eventF10 = () => this.callModal(null, '80%', 'WS2705001_AnotherInspectItemSettingCategory')

  eventF11 = () => this.callModal(null, '80%', 'WS0306001_ContractInfoMaintain')

  render() {
    return (
      <div className="course-basic-type-setting">
        <Card title="コース基本種別設定">
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={this.state.initParams}>
            <Menubar items={this.state.menuItems} />
            <div className='mt-3'>
              <Space >
                <Form.Item name="SearchChar" label="検索" >
                  <Input style={{ width: 300 }} maxLength={50} onChange={(e) => this.handleSearch(e.target.value, 'SearchChar')} />
                </Form.Item>
                <Form.Item name="ReserveItem" label="予約項目" >
                  <Select style={{ width: 120 }} onChange={(value) => this.handleSearch(value, 'ReserveItem')}>
                    {this.state.ReserveItem?.map((item, index) => (
                      <Select.Option key={index} value={item.key}>{item.key === 0 ? '　' : item.value}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="Pattern" label="パターン" >
                  <Select style={{ width: 120 }} onChange={(value) => this.handleSearch(value, 'Pattern')}>
                    <Select.Option value=""></Select.Option>
                    {this.state.Pattern?.map((item, index) => (
                      <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="Enable_Disable" label="有効/無効" >
                  <Select style={{ width: 100 }} onChange={(value) => this.handleSearch(value, 'Enable_Disable')}>
                    <Select.Option value="all">　　</Select.Option>
                    <Select.Option value="tru">有効</Select.Option>
                    <Select.Option value="fal">無効</Select.Option>
                  </Select>
                </Form.Item>
              </Space>
            </div>

            <Table
              bordered
              size='small'
              className='mt-3'
              dataSource={this.getDataThisComponent(this.state.current_page)}
              loading={this.state.isLoading}
              rowKey={(record) => record.id}
              pagination={false}
              rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
              onRow={(record, index) => ({
                onClick: event => this.setState({ rowSelect: record }),
                onDoubleClick: () => this.callModal({ Li_CourseCode: record.course_code }, 500, 'WS2696052_RegisterModification')
              })}
            >
              <Table.Column title="ｺｰｽ" dataIndex="course_code" width={80} render={(text, record) => (
                <Input
                  readOnly={record.Expression_8}
                  bordered={false}
                  value={text}
                  style={{ color: Color(record?.expression)?.Foreground }}
                />
              )} />
              <Table.Column title="コース略称" dataIndex="course_name_short_name" render={(text, record) => (
                <div style={{ color: Color(record?.expression)?.Foreground }}>{text}</div>
              )} />
              <Table.Column title="コース名称" dataIndex="course_name_formal" render={(text, record) => (
                <div style={{ color: Color(record?.expression)?.Foreground }}>{text}</div>
              )} />
              <Table.Column title="予約項目" dataIndex="reservation_display_item_number" render={(text, record) => (
                <div style={{ color: Color(record?.expression)?.Foreground }}>{text}</div>
              )} />
              <Table.Column title="ﾗﾍﾞﾙ" dataIndex="specimen_label_number" render={(text, record) => (
                <div style={{ textAlign: 'right', color: Color(record?.expression)?.Foreground }}>
                  {text === 0 ? null : text}
                </div>
              )} />
              <Table.Column title="日数" dataIndex="medical_exam_dates" render={(text, record) => (
                <div style={{ textAlign: 'right', color: Color(record?.expression)?.Foreground }}>
                  {text === 0 ? null : text}
                </div>
              )} />
              <Table.Column title="ﾊﾟﾀｰﾝ" dataIndex="pattern_code" render={(text, record) => (
                <div style={{ color: Color(record?.expression)?.Foreground }}>{text}</div>
              )} />
              <Table.Column title="判定ﾚﾍﾞﾙ" dataIndex="judgment_level_division" render={(text, record) => (
                <div style={{ color: Color(record?.expression)?.Foreground }}>{text}</div>
              )} />
              <Table.Column title="様式" dataIndex="StandardStyle" render={(text, record) => (
                <div style={{ color: Color(record?.expression)?.Foreground }}>{text}</div>
              )} />
              <Table.Column title="様式名" dataIndex="format_name" render={(text, record) => (
                <div style={{ color: Color(record?.expression)?.Foreground }}>{text}</div>
              )} />
              <Table.Column width={60} render={(text, record, index) => (
                <Dropdown.Button trigger='click' size='small' overlay={() => this.renderMenuRightClick(record)} />
              )} />
            </Table>
            <Form.Item>
              <Input.TextArea
                maxLength={200}
                readOnly
                autoSize={{ minRows: 2, maxRows: 2 }}
                value={this.state.rowSelect.option_remark}
              />
            </Form.Item>
            <Pagination
              size='small'
              hideOnSinglePage={this.state.dataSource.length > 15 ? false : true}
              style={{ margin: '10px 0', textAlign: 'right' }}
              total={this.state.dataSource.length}
              pageSize={this.state.pageSize}
              current={this.state.current_page}
              pageSizeOptions={[10]}
              onChange={(page) => {
                this.setState({ current_page: page }, () => this.getDataThisComponent(page))
              }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2696036_CourseBasicTypeSetting);
