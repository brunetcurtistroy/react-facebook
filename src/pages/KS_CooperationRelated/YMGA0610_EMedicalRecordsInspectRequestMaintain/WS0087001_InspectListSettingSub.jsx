import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Form, InputNumber, Modal, message, Button } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import {
  getScreenDataInspectListSettingSubAction, getDataInspectListSettingSubAction, saveAndUpdateInspectListSettingSubAction,
  deleteInspectListSettingSubAction, localAcquisitionInspectListSettingSubAction
} from "redux/CooperationRelated/EMedicalRecordsInspectRequestMaintain/InspectListSettingSub.actions";

const styleFormItem = {
  margin: 0
}
class WS0087001_InspectListSettingSub extends React.Component {

  static propTypes = {
    Li_Title: PropTypes.any,
    Lio_ExamList: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '検査一覧設定SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoading: true,
      rowSelect: {},
      arrLo_ExamList: []
    };
  }

  componentDidMount = () => {
    const { Li_Title, Lio_ExamList, InspectOr } = this.props;
    this.loadInitData({
      Li_Title,
      Lio_ExamList,
      InspectOr
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      const { Li_Title, Lio_ExamList, InspectOr } = this.props;
      this.loadInitData({
        Li_Title,
        Lio_ExamList,
        InspectOr
      });
    }
  }

  returnData = () => {
    localAcquisitionInspectListSettingSubAction()
      .then(res => {
        if (this.props.onFinishScreen && res?.data) {
          this.props.onFinishScreen({
            Lio_ExamList: res.data.Lo_ExamList
          })
        }
      })
  }

  loadInitData = (params) => {
    getScreenDataInspectListSettingSubAction(params)
      .then((res) => this.loadData())
      .catch((err) => message.error('エラー'))
  }

  loadData = () => {
    this.setState({ isLoading: true });
    getDataInspectListSettingSubAction()
      .then(res => {
        if (res?.data) {
          this.setState({
            dataSource: res.data,
            arrLo_ExamList: res.data.map(item => item.W1_inspect_cd.toString().padStart(8, '0'))
          });
          this.formRef?.current?.setFieldsValue({ 'dataSource': res.data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  setDataToForm = ({ Lio_InspectItemCode, recordData }, record) => {
    let index = this.findIndexByID(this.state.dataSource, record.id);
    let arrTemp = [...this.state.dataSource];
    let arrTempLo_ExamList = [...this.state.arrLo_ExamList];
    let isAdd = arrTemp.findIndex(item => item.W1_inspect_cd === Lio_InspectItemCode);
    if (isAdd === -1) {
      record = {
        ...record,
        W1_inspect_cd: Lio_InspectItemCode,
        exam_short_name: recordData.exam_short_name,
        exam_name: recordData.exam_name,
        exam_type: recordData.exam_type
      }
      arrTempLo_ExamList[index] = Lio_InspectItemCode.toString().padStart(8, '0');
      this.createOrUpdateData(record);
    } else {
      message.error('データが存在します');
    }
    arrTemp[index] = record;
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
      dataSource: arrTemp,
      rowSelect: record,
      arrLo_ExamList: arrTempLo_ExamList
    });
    this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
  }

  createOrUpdateData = (params) => {
    saveAndUpdateInspectListSettingSubAction(params)
      .then(res => {
        message.success('成功');
        this.loadData();
      })
      .catch(err => message.error('エラー'))
  }

  deleteData = (record, index) => {
    if (record.id) {
      deleteInspectListSettingSubAction({ id: record.id })
        .then(res => {
          message.success('成功');
          this.loadData();
        })
        .catch(err => message.error('エラー'))
    } else {
      let arrTemp = [...this.state.dataSource];
      arrTemp.splice(index, 1);
      this.setState({ dataSource: arrTemp });
    }
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  }

  render() {
    return (
      <div className="inspect-list-setting-sub">
        <Card title="検査一覧設定SUB">
          <Form ref={this.formRef}>
            <Table
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
              }}
              rowKey={(record) => record.id}
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
            >
              <Table.Column title="検査コード" dataIndex="W1_inspect_cd" align="center" width={150}
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'W1_inspect_cd']} style={styleFormItem}>
                      <InputNumber
                        readOnly
                        maxLength={8}
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 900,
                              component:
                                <WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={({ Lio_InspectItemCode, recordData }) => {
                                    this.setDataToForm({ Lio_InspectItemCode, recordData }, record)
                                  }}
                                />
                              ,
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="略式名称" dataIndex="exam_short_name" />
              <Table.Column title="正式名称" dataIndex="exam_name" />
              <Table.Column title="タイプ" dataIndex="exam_type" />
              <Table.Column align='center' width={70}
                title={
                  <Button
                    size='small'
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => {
                      let arrTemp = [...this.state.dataSource];
                      arrTemp.push({});
                      this.formRef?.current?.setFieldsValue({ 'dataSource': arrTemp });
                      this.setState({ dataSource: arrTemp });
                    }}
                  />
                }
                render={(text, record, index) => (
                  <>
                    {/* <Button 
                      size='small' 
                      style={{ border: 'none', }}
                      icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.createOrUpdateData(record)}
                    /> */}
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
                )}
              />
            </Table>
            <Form.Item className='mt-3' style={{ float: 'right' }}>
              <Button type='primary' onClick={this.returnData}>選 択</Button>
            </Form.Item>
          </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0087001_InspectListSettingSub);
