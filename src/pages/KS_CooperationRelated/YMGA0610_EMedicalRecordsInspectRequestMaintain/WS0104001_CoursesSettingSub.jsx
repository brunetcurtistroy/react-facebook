import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, message, Table, Modal, Button, Input, Form } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import {
  getDataCoursesSettingSubAction, saveAndUpdateCoursesSettingSubAction, deleteDataCoursesSettingSubAction, localAcquisitionCoursesSettingSubAction, getScreenCoursesSettingSubAction
} from "redux/CooperationRelated/EMedicalRecordsInspectRequestMaintain/CoursesSettingSub.actions";

const styleFormItem = {
  margin: 0
}
class WS0104001_CoursesSettingSub extends React.Component {

  static propTypes = {
    Li_Title: PropTypes.any,
    Lio_CourseList: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'コース 一覧設定SUB';

    this.formRef = React.createRef();
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      arrCourseList: []
    };
  }

  componentDidMount = () => {
    this.loadInitData({
      Li_Title: this.props.Li_Title,
      CourseOr: this.props.Lio_CourseList,
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.loadInitData({
        Li_Title: this.props.Li_Title,
        CourseOr: this.props.Lio_CourseList,
      });
    }
  }

  returnData = () => {
    localAcquisitionCoursesSettingSubAction()
      .then(res => {
        if (this.props.onFinishScreen && res?.data) {
          this.props.onFinishScreen({
            Lio_CourseList: res.data.Lo_CourseList
          })
        }
      })
  }

  loadInitData = (params) => {
    getScreenCoursesSettingSubAction(params)
      .then((res) => this.loadData())
      .catch((err) => message.error('エラー'))
  }

  loadData = () => {
    this.setState({ isLoading: true });
    getDataCoursesSettingSubAction()
      .then(res => {
        if (res) {
          this.setState({ dataSource: res.data });
          this.formRef?.current?.setFieldsValue({ 'dataSource': res.data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  setDataToForm = ({ Lo_CourseCode, recordData }, record) => {
    let index = this.findIndexByID(this.state.dataSource, record.id);
    let arrTemp = [...this.state.dataSource];
    let arrTempCourseList = [...this.state.arrCourseList];
    let isAdd = arrTemp.findIndex(item => item.W1_course_cd?.replace('-', '') === Lo_CourseCode);
    if (isAdd === -1) {
      record = {
        ...record,
        W1_course_cd: Lo_CourseCode,
        course_name_short_name: recordData.course_name_short_name,
        course_name_formal: recordData.course_name_formal,
      }
      arrTempCourseList[index] = Lo_CourseCode
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
      arrCourseList: arrTempCourseList
    });
    this.formRef?.current?.setFieldsValue({ 'dataSource': arrTemp });
  }

  createOrUpdateData = (record) => {
    saveAndUpdateCoursesSettingSubAction(record)
      .then(res => {
        message.success('成功');
        this.loadData();
      })
      .catch(err => message.error('エラー'))
  }

  deleteData = (record, index) => {
    if (record.id) {
      deleteDataCoursesSettingSubAction({ id: record.id })
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

  findIndexByID = (arrayData, recordID) => arrayData.findIndex((item) => recordID === item.id);

  render() {
    return (
      <div className="courses-setting-sub">
        <Card title={`${this.props.Li_Title}`}>
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
              <Table.Column title="ｺｰｽ" dataIndex="W1_course_cd" align="center" width={150}
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'W1_course_cd']} style={styleFormItem}>
                      <Input
                        readOnly
                        maxLength={8}
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 900,
                              component:
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={({ Lo_CourseCode, recordData }) => {
                                    this.setDataToForm({ Lo_CourseCode, recordData }, record)
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
              <Table.Column title="略式名称" dataIndex="course_name_short_name" />
              <Table.Column title="正式名称" dataIndex="course_name_formal" />
              <Table.Column align='center' width={70}
                title={
                  <Button
                    size='small'
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => {
                      let arrTemp = [...this.state.dataSource];
                      arrTemp.push({});
                      this.setState({ dataSource: arrTemp });
                      this.formRef?.current?.setFieldsValue({ 'dataSource': arrTemp });
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
                      danger
                      icon={<DeleteOutlined />}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0104001_CoursesSettingSub);
