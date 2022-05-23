import React from "react";
import { connect } from "react-redux";

import { Card, Input, Table, Form, Modal, Button, message, InputNumber, Space, Dropdown, Menu, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { ModalCustom } from "components/Commons/ModalCustom";
import {
  getRadioGraphyInspectMaintainAction, saveAndUpdateRadioGraphyInspectMaintainAction, deleteRadioGraphyInspectMaintainAction
} from "redux/InspectionMaintenance/RadiographyInspectMaintain/RadiographyInspectMaintain.actions";
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS1871014_Copy from "./WS1871014_Copy";
import WS1872001_RadiographySiteFindingsMaintain from "./WS1872001_RadiographySiteFindingsMaintain";
import WS1875001_RadiographyGuideMaintain from "./WS1875001_RadiographyGuideMaintain";
import Menubar from "components/Commons/Menubar";
const { TextArea } = Input;

class WS1871001_RadiographyInspectMaintain extends React.Component {
  // formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '読影検査保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoading: true,
      rowSelect: {},
      isAddRow: false,
      current_page: 1,
      pageSize: 15,
      menuItems: [
        { id: 1, label: '指導', handleClick: this.eventF8 },
        { id: 2, label: '部位所見', handleClick: this.eventF9 },
        { id: 3, label: '複写', handleClick: this.eventF10 },
      ],
    };
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = () => {
    this.setState({ isLoading: true });
    getRadioGraphyInspectMaintainAction()
      .then(res => {
        if (res?.data) {
          this.setState({
            dataSource: res.data,
            rowSelect: res.data.length > 0 ? res.data[0] : {}
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  getDataThisComponent = (current = this.state.current_page, pageSize = this.state.pageSize) => {
    return this.state.dataSource.slice((current - 1) * pageSize, current * pageSize);
  }

  addRow = () => {
    this.setState({ isAddRow: true })
    if (!this.state.isAddRow) {
      let obj = {
        id: Math.round(Math.random() * 1000),
        isNew: true,
      };
      let arr = [...this.state.dataSource];
      let index = arr.findIndex(item => item.id === this.state.rowSelect.id);
      arr.splice(index + 1, 0, obj); // array.splice(startIndex, deleteCount, itemsNew)
      this.setState({ dataSource: arr, rowSelect: obj })
    }
  }

  renderSaveAndDeleteRecord = (record, index) => (
    <>
      <Button
        size='small'
        style={{ border: 'none' }}
        icon={<SaveOutlined style={{ color: 'green' }} />}
        onClick={() => this.createOrUpdateData(record)}
      />
      <Button
        size='small'
        style={{ border: 'none', }}
        danger icon={<DeleteOutlined />}
        onClick={() => {
          Modal.confirm({
            content: '消去してもよろしいですか？',
            okText: 'は　い',
            cancelText: 'いいえ',
            onOk: () => this.deleteData(record, index)
          })
        }}
      />
    </>
  )

  createOrUpdateData = (record) => {
    saveAndUpdateRadioGraphyInspectMaintainAction(record)
      .then(res => {
        this.loadData()
        this.setState({ isAddRow: false })
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  deleteData = (record, index) => {
    if (record.id && !record.isNew) {
      deleteRadioGraphyInspectMaintainAction({ id: record.id })
        .then(res => {
          this.loadData();
          this.setState({ isAddRow: false })
        })
        .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
    }
    let arrTemp = [...this.state.dataSource];
    arrTemp.splice(index, 1);
    this.setState({
      dataSource: arrTemp,
      rowSelect: arrTemp.length > 0 ? arrTemp[0] : {},
      isAddRow: false
    });
  }

  onChangeInput = (value, name, record) => {
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.findIndex(item => item.id === record.id);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      arrTemp[index] = objTemp;
      this.setState({
        dataSource: arrTemp,
        rowSelect: objTemp
      })
    }
  }

  eventF8 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS1875001_RadiographyGuideMaintain
            Li_InspectClassifyCode={this.state.rowSelect.exam_classification_code}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  eventF9 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '85%',
        component: (
          <WS1872001_RadiographySiteFindingsMaintain
            Li_InspectClassifyCode={this.state.rowSelect.exam_classification_code}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  eventF10 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component: (
          <WS1871014_Copy
            Li_CopySource={this.state.rowSelect.interpretation_exam_item_code}
            Li_CopySourceName={this.state.rowSelect.interpretation_exam_name}
            Lo_Copy={''}
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

  render() {
    return (
      <div className="radiography-inspect-maintain">
        <Card title="読影検査保守">
          <Form>
            <Menubar items={this.state.menuItems} />
            <Table
              dataSource={this.getDataThisComponent(this.state.current_page)}
              loading={this.state.isLoading}
              size="small"
              className='mt-3'
              bordered
              pagination={false}
              rowKey={(record) => record.id}
              onRow={(record, index) => ({ onClick: e => this.setState({ rowSelect: record }) })}
            >
              <Table.Column title="読影ｺｰﾄﾞ" dataIndex="interpretation_exam_item_code" render={(value, record, index) => (
                <Input
                  value={value}
                  readOnly={!record.isNew}
                  bordered={record.id === this.state.rowSelect.id}
                  onChange={(e) => this.onChangeInput(e.target.value, 'interpretation_exam_item_code', record)}
                  onBlur={(e) => {
                    record = {
                      ...record,
                      modality_code: record.modality_code ? record.modality_code : record.interpretation_exam_item_code,
                      exam_classification_code: record.exam_classification_code ? record.exam_classification_code : record.interpretation_exam_item_code,
                    }
                    let arrTemp = [...this.state.dataSource];
                    arrTemp[index] = record;
                    this.setState({
                      rowSelect: record,
                      dataSource: arrTemp
                    });
                  }}
                />
              )} />
              <Table.Column title="検査ｺｰﾄﾞ" dataIndex="medical_exam_exam_code" render={(value, record, index) => (
                <InputNumber
                  value={value === 0 ? null : value}
                  bordered={record.id === this.state.rowSelect.id}
                  maxLength={8}
                  onChange={(value) => this.onChangeInput(value, 'medical_exam_exam_code', record)}
                  onDoubleClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '40%',
                        component: (
                          <WS0271001_InspectItemSearchQuerySingle
                            Lio_InspectItemCode={record.medical_exam_exam_code}
                            Li_UnusedInspectDisplay={''}
                            onFinishScreen={({ Lio_InspectItemCode, recordData }) => {
                              record = {
                                ...record,
                                medical_exam_exam_code: Lio_InspectItemCode,
                                interpretation_exam_short_name: record.interpretation_exam_short_name 
                                  ? record.interpretation_exam_short_name 
                                  : recordData.exam_short_name,
                                interpretation_exam_name: record.interpretation_exam_name 
                                  ? record.interpretation_exam_name
                                  : recordData.exam_name
                              }
                              let arrTemp = [...this.state.dataSource];
                              arrTemp[index] = record;
                              this.setState({
                                rowSelect: record,
                                dataSource: arrTemp
                              });
                              this.closeModal();
                            }}
                          />),
                      },
                    })
                  }} />
              )} />
              <Table.Column title="読影略称" dataIndex="interpretation_exam_short_name" render={(value, record, index) => (
                <Input
                  value={value}
                  bordered={record.id === this.state.rowSelect.id}
                  onChange={(e) => this.onChangeInput(e.target.value, 'interpretation_exam_short_name', record)}
                />
              )} />
              <Table.Column title="読影名称" dataIndex="interpretation_exam_name" render={(value, record, index) => (
                <Input
                  value={value}
                  bordered={record.id === this.state.rowSelect.id}
                  onChange={(e) => this.onChangeInput(e.target.value, 'interpretation_exam_name', record)}
                />
              )} />
              <Table.Column title="ﾓﾀﾞﾘﾃｨ" dataIndex="modality_code" render={(value, record, index) => (
                <Input
                  value={value}
                  bordered={record.id === this.state.rowSelect.id}
                  onChange={(e) => this.onChangeInput(e.target.value, 'modality_code', record)}
                />
              )} />
              <Table.Column title="検査項目群" dataIndex="exam_item_group" render={(value, record, index) => (
                <Input
                  value={value}
                  bordered={record.id === this.state.rowSelect.id}
                  onChange={(e) => this.onChangeInput(e.target.value, 'exam_item_group', record)}
                />
              )} />
              <Table.Column title="ﾏｽﾀ分類" dataIndex="exam_classification_code" render={(value, record, index) => (
                <Input
                  value={value}
                  bordered={record.id === this.state.rowSelect.id}
                  onChange={(e) => this.onChangeInput(e.target.value, 'exam_classification_code', record)}
                />
              )} />
              <Table.Column title="前回分類" dataIndex="group" render={(value, record, index) => (
                <Input
                  value={value}
                  bordered={record.id === this.state.rowSelect.id}
                  onChange={(e) => this.onChangeInput(e.target.value, 'group', record)}
                />
              )} />
              <Table.Column title="医師" dataIndex="doctor_persons" render={(value, record, index) => (
                <InputNumber
                  value={value === 0 ? null : value}
                  bordered={record.id === this.state.rowSelect.id}
                  maxLength={3}
                  onChange={(value) => this.onChangeInput(value, 'doctor_persons', record)}
                />
              )} />
              <Table.Column title="技師" dataIndex="technician_persons" render={(value, record, index) => (
                <InputNumber
                  value={value === 0 ? null : value}
                  bordered={record.id === this.state.rowSelect.id}
                  maxLength={3}
                  onChange={(value) => this.onChangeInput(value, 'technician_persons', record)}
                />
              )} />
              <Table.Column
                align='center'
                width={70}
                title={<Button size='small' type='primary' icon={<PlusOutlined />} disabled={this.state.isAddRow} onClick={this.addRow} />}
                render={(text, record, index) => this.renderSaveAndDeleteRecord(record, index)}
              />
            </Table>
            <Form.Item>
              <TextArea
                maxLength={1024}
                value={this.state.rowSelect?.options}
                autoSize={{ minRows: 4, maxRows: 4 }}
                onChange={(e) => this.onChangeInput(e.target.value, 'options', this.state.rowSelect)}
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
        {ModalCustom({
          width: this.state.childModal.width,
          visible: this.state.childModal.visible,
          component: this.state.childModal.component,
          destroyOnClose: false,
          onCancel: this.closeModal
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1871001_RadiographyInspectMaintain);
