import React from "react";

import { Card, Form, Input, Modal, Table, Row, Col, Space, InputNumber, message, Button, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import {
  getInspectRequestConvertMasterMaintainAction, saveAndUpdateInspectRequestConvertMasterMaintainAction, deleteInspectRequestConvertMasterMaintainAction
} from "redux/CooperationRelated/InspectRequestConvertMasterMaintain/InspectRequestConvertMasterMaintain.actions";
import WS1043008_CsvCaptureScreen from "./WS1043008_CsvCaptureScreen";
import ModalDraggable from "components/Commons/ModalDraggable";
import Menubar from "components/Commons/Menubar";

class WS1043001_InspectRequestConvertMasterMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査依頼変換マスタ保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      initParams: {
        SearchChar: '',
        InternalCode: '',
        ExternalCode: ''
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      isAddRow: false,
      current_page: 1,
      pageSize: 15,
      menuItems: [
        // { id: 1, label: '複写', handleClick: this.eventF7 },
      ],
      menus: [{ id: 1, label: '取込', handleClick: this.VariousSetting01 }]
    };
  }

  componentDidMount = () => {
    this.loadData(this.state.initParams)
  }

  loadData = (params) => {
    this.setState({ isLoading: true });
    getInspectRequestConvertMasterMaintainAction(params)
      .then(res => {
        if (res?.data) {
          let data = res.data;
          this.setState({
            dataSource: data,
            rowSelect: data.length > 0 ? data[0] : {},
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
    const params = {
      ...record,
      id: record.isNew ? '' : record.id,
      exam_code_internal: this.state.rowSelect.exam_code_internal ?? '',
      exam_code_external: record.exam_code_external ?? '',
      exam_name_external_kana: record.exam_name_external_kana ?? '',
      exam_kanji_name_external: record.exam_kanji_name_external ?? '',
      parent_exam_code_external_1: record.parent_exam_code_external_1 ?? '',
      parent_check_code_external_2: record.parent_check_code_external_2 ?? '',
      parent_exam_code_external_3: record.parent_exam_code_external_3 ?? '',
      parent_check_code_external_4: record.parent_check_code_external_4 ?? '',
      parent_check_code_external_5: record.parent_check_code_external_5 ?? '',
      remarks: record.remarks ?? '',
    }
    saveAndUpdateInspectRequestConvertMasterMaintainAction(params)
      .then(res => {
        message.success('成功');
        this.loadData();
        this.setState({ isAddRow: false })
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  deleteData = (record, index) => {
    if (record.id && !record.isNew) {
      deleteInspectRequestConvertMasterMaintainAction({ id: record.id })
        .then(res => {
          message.success('成功');
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

  onChangeInput = (objChange, record) => {
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.findIndex(item => item.id === record.id);
    if (index !== -1) {
      let objTemp = {
        ...record,
        ...objChange
      }
      arrTemp[index] = objTemp
      this.setState({
        dataSource: arrTemp,
        rowSelect: objTemp
      })
    }
  }

  handleSearch = (e) => {
    let { value, id } = e.target;
    this.setState({
      initParams: {
        ...this.state.initParams,
        [id]: value
      }
    }, () => this.loadData(this.state.initParams))
  }

  VariousSetting01 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 700,
        component: (
          <WS1043008_CsvCaptureScreen
            onFinishScreen={(Lo_StsOutput) => {
              if (Lo_StsOutput) {
                this.loadData(this.state.initParams);
              }
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: false,
                },
              });
            }}
          />
        ),
      },
    })
  }

  render() {
    return (
      <div className="inspect-request-convert-master-maintain p-td">
        <Card title='検査依頼変換マスタ保守'>
          <Form ref={this.formRef} onFinish={this.onFinish} autoComplete='off'>
            <Menubar items={this.state.menuItems} menus={this.state.menus} />
            <Row gutter={24} className='mt-3'>
              <Col span={8}>
                <Form.Item name="SearchChar" label="検索">
                  <Input onBlur={this.handleSearch} maxLength={50} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="InternalCode" label="健診検査コード">
                  <Input.Search
                    onBlur={this.handleSearch}
                    maxLength={8}
                    className='floatRight'
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '60%',
                          component: (
                            <WS0271001_InspectItemSearchQuerySingle
                              Lio_InspectItemCode={this.formRef?.current?.getFieldValue('InternalCode')}
                              Li_UnusedInspectDisplay={''}
                              onFinishScreen={({ Lio_InspectItemCode, recordData }) => {
                                this.formRef.current.setFieldsValue({ InternalCode: Lio_InspectItemCode })
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                  initParams: {
                                    ...this.state.initParams,
                                    InternalCode: Lio_InspectItemCode
                                  }
                                }, () => this.loadData(this.state.initParams));
                              }}
                            />
                          ),
                        }
                      })
                    }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="ExternalCode" label="外部検査コード">
                  <Input onBlur={this.handleSearch} maxLength={6} />
                </Form.Item>
              </Col>
            </Row>
            <Table
              className='mt-3'
              size='small'
              dataSource={this.getDataThisComponent(this.state.current_page)}
              bordered
              scroll={{ y: '65vh' }}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => record.id}
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
            >
              <Table.Column width={300} title="健診検査" render={(text, record, index) => (
                <Space>
                  <InputNumber
                    bordered={this.state.rowSelect?.id === record.id}
                    style={{ width: '80px' }}
                    maxLength={8}
                    value={record.exam_code_internal === 0 ? null : record.exam_code_internal}
                    onChange={(value) => this.onChangeInput({ exam_code_internal: value }, record)}
                    onDoubleClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '60%',
                          component: (
                            <WS0271001_InspectItemSearchQuerySingle
                              Lio_InspectItemCode={record?.exam_code_internal}
                              Li_UnusedInspectDisplay={''}
                              onFinishScreen={({ Lio_InspectItemCode, recordData }) => {
                                record = {
                                  ...record,
                                  exam_code_internal: Lio_InspectItemCode === 0 ? '' : Lio_InspectItemCode,
                                  exam_short_name: recordData.exam_short_name,
                                  exam_kanji_name_external: record.exam_kanji_name_external ? record.exam_kanji_name_external : recordData.exam_name
                                }
                                let arrTemp = [...this.state.dataSource];
                                arrTemp[index] = record;
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                  dataSource: arrTemp,
                                  rowSelect: record
                                });
                              }}
                            />
                          ),
                        }
                      })
                    }}
                  />
                  <Input readOnly bordered={false} value={record.exam_short_name} />
                </Space>
              )} />
              <Table.Column title="依頼検査" render={(text, record, index) => (
                <Row gutter={10}>
                  <Col span={4}>
                    <Input
                      bordered={this.state.rowSelect?.id === record.id}
                      maxLength={6}
                      value={record.exam_code_external}
                      onChange={(e) => this.onChangeInput({ exam_code_external: e.target.value }, record)}
                    />
                  </Col>
                  <Col span={10}>
                    <Input
                      bordered={this.state.rowSelect?.id === record.id}
                      maxLength={20}
                      value={record.exam_name_external_kana}
                      onChange={(e) => this.onChangeInput({ exam_name_external_kana: e.target.value }, record)}
                    />
                  </Col>
                  <Col span={10}>
                    <Input
                      bordered={this.state.rowSelect?.id === record.id}
                      maxLength={30}
                      value={record.exam_kanji_name_external}
                      onChange={(e) => this.onChangeInput({ exam_kanji_name_external: e.target.value }, record)}
                    />
                  </Col>
                </Row>
              )} />
              <Table.Column title="親検査情報" render={(text, record, index) => (
                <Space>
                  <Input
                    bordered={this.state.rowSelect?.id === record.id}
                    maxLength={6}
                    value={record.parent_exam_code_external_1}
                    onChange={(e) => this.onChangeInput({ parent_exam_code_external_1: e.target.value }, record)}
                  />
                  <Input
                    bordered={this.state.rowSelect?.id === record.id}
                    maxLength={6}
                    value={record.parent_check_code_external_2}
                    onChange={(e) => this.onChangeInput({ parent_check_code_external_2: e.target.value }, record)}
                  />
                  <Input
                    bordered={this.state.rowSelect?.id === record.id}
                    maxLength={6}
                    value={record.parent_exam_code_external_3}
                    onChange={(e) => this.onChangeInput({ parent_exam_code_external_3: e.target.value }, record)}
                  />
                  <Input
                    bordered={this.state.rowSelect?.id === record.id}
                    maxLength={6}
                    value={record.parent_check_code_external_4}
                    onChange={(e) => this.onChangeInput({ parent_check_code_external_4: e.target.value }, record)}
                  />
                  <Input
                    bordered={this.state.rowSelect?.id === record.id}
                    maxLength={6}
                    value={record.parent_check_code_external_5}
                    onChange={(e) => this.onChangeInput({ parent_check_code_external_5: e.target.value }, record)}
                  />
                </Space>
              )} />
              <Table.Column
                align='center'
                width={70}
                title={<Button size='small' type='primary' icon={<PlusOutlined />} disabled={this.state.isAddRow} onClick={this.addRow} />}
                render={(text, record, index) => this.renderSaveAndDeleteRecord(record, index)}
              />
            </Table>
            <Form.Item className='mt-3'>
              <Input
                maxLength={1024}
                value={this.state.rowSelect.remarks}
                onChange={(e) => this.onChangeInput({ remarks: e.target.value }, this.state.rowSelect)}
              />
            </Form.Item>
            <Pagination
              size='small'
              hideOnSinglePage={this.state.dataSource.length > 15 ? false : true}
              style={{ margin: '10px 0', textAlign: 'right' }}
              total={this.state.dataSource.length}
              pageSize={this.state.pageSize}
              current={this.state.current_page}
              // pageSizeOptions={[10]}
              onChange={(page, pageSize) => {
                this.setState({ current_page: page, pageSize }, () => this.getDataThisComponent(page))
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

export default WS1043001_InspectRequestConvertMasterMaintain;
