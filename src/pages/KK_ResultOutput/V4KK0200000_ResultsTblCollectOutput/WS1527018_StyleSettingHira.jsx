import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { MoreOutlined, SaveOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import { Card, Table, Button, Modal, Input, Menu, message, Form, InputNumber } from "antd";
import StyleSettingHiraAction from "redux/ResultOutput/ResultsTblCollectOutput/StyleSettingHira.action"
import WS1527023_PrintStyleInquiry from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS1527023_PrintStyleInquiry.jsx';
import WS1527022_OfficeInquiry from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS1527022_OfficeInquiry.jsx';
import { wait } from "@testing-library/react";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1527018_StyleSettingHira extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_PatternClassify: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '様式設定[HIRA]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [
      ],
      isLoading: false,
      rowSelected: [],
      selectedRowKeys: [],
      indexTable: 0, count: 1001
    };
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  confirm(data) {
    Modal.confirm({
      content: data,
      okText: 'OK',
      cancelButtonProps: { hidden: true },
      onOk() {
        console.log("OK");
      },
    });
  }
  getListData(param, reload) {
    const params = {
      Division: param.Li_PatternClassify,
      DocumentName: param?.Li_record?.DocumentName
    }
    this.setState({ isLoading: true })
    StyleSettingHiraAction.getListData(params).then((res) => {
      if (res) {
        let data = res && res.data ? res.data : [];
        let index = reload ? 0 : this.state.indexTable;
        this.setState({
          dataSource: data,
          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index]?.id] : [],
          indexTable: index,
        })
        this.setFormFieldValue('dataSource', data)
      }

    }).catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    }).finally(() => { this.setState({ isLoading: false }) });
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getListData(this.props, true)
    }
  }
  componentDidMount() {
    this.getListData(this.props, true)
  }
  showBasicCourseInquiry(row, index) {

    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '600px',
        component: (
          <WS0265001_BasicCourseInquiry
            _Dks040StartUpFlag={2}
            _Dks040CourseCode={row.medical_exam_course}
            onFinishScreen={(output) => {
              let dataSource = this.formRef?.current?.getFieldValue('dataSource')
              if(dataSource.some(s => s.medical_exam_course  === output.Lo_CourseCode )) {
                Modal.error({content: '健診コースが既に存在しています' })
              } else {
                dataSource[index].medical_exam_course = output.Lo_CourseCode
                dataSource[index].MedicalExamCourseName = output.Lo_CourseName
                this.setFormFieldValue('dataSource', dataSource)
                this.setState({ dataSource: dataSource })
              }
              // dataSource[index].medical_exam_course = output.Lo_CourseCode
              // dataSource[index].MedicalExamCourseName = output.Lo_CourseName
              // this.setFormFieldValue('dataSource', dataSource)
              // this.setState({ dataSource: dataSource })
              this.forceUpdate()
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  showWS1527022_OfficeInquiry(index) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '800px',
        component: (
          <WS1527022_OfficeInquiry
            onFinishScreen={(output) => {
              let dataSource = this.formRef?.current?.getFieldValue('dataSource')
              dataSource[index].office_code = output.office_code
              dataSource[index].branch_store_code = output.v4_branch_store_code
              dataSource[index].OfficeDivision = output.recordData.office_kanji_name
              this.setFormFieldValue('dataSource', dataSource)
              this.setState({ dataSource: dataSource })
              this.forceUpdate()
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  handleAdd() {
    const { count } = this.state;
    const params = { id: count, isNew: true }
    let data = this.formRef.current?.getFieldValue('dataSource') ?
      this.formRef.current?.getFieldValue('dataSource') : [];
    let arr = [...data];
    arr.unshift(params)
    this.forceUpdate()
    this.setFormFieldValue('dataSource', arr)
    this.setState({ count: count + 1, dataSource: arr })
  }
  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }
  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkIdTemp(this.state.rowSelected[0].id)) {
        return true;
      } return false;
    } return false;
  }
   handleAddRowTable() {
    let newRow = {
      id: '', isNew: true,
      OfficeDivision: '【　共　通　】',
      MedicalExamCourseName: '【　デフォルト　】'
    };
    let data = [...this.formRef?.current?.getFieldValue('dataSource')];
    data.unshift(newRow);
     this.setState({
      dataSource: data,
      rowSelected: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });
    this.setFormFieldValue('dataSource', data)
    this.forceUpdate();
  }
   handleDeleteRowTable() {
    let arr = [...this.formRef?.current?.getFieldValue('dataSource')];
    let data = arr.filter(s => !s.isNew)
    this.setFormFieldValue('dataSource', data);
   
    setTimeout(() => this.setState({
      rowSelected: [data[0]],
      dataSource: data,
      selectedRowKeys: [data[0].id],
      indexTable: 0
    }), 500)
    this.forceUpdate();
  }
  deleteData(id, props) {
    const params = {
      id: id,
      Division: props.Li_PatternClassify,
      DocumentName: props.Li_record.DocumentName
    }
    StyleSettingHiraAction.deleteData(params).then((res) => {
      this.getListData(this.props, true)
    }).catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    }).finally(() => { });
  }
  saveData(index, isNew) {
    let data = this.formRef.current?.getFieldValue('dataSource')[index]
    let params = {}
    if (!!isNew) {
      params = {
        office_code: data?.office_code ? data?.office_code : '',
        branch_store_code: data?.branch_store_code ? data?.branch_store_code : '',
        medical_exam_course: data?.medical_exam_course ? data?.medical_exam_course : '',
        judgement: data?.judgement ? data?.judgement : '',
        style: data?.style ? data?.style : '',
        format_name: data?.format_name ? data?.format_name : '',
        Division: this.props.Li_PatternClassify
      }
    } else {
      params = {
        id: data?.id,
        office_code: data?.office_code,
        branch_store_code: data?.branch_store_code,
        medical_exam_course: data?.medical_exam_course,
        judgement: data?.judgement,
        style: data?.style,
        format_name: data?.format_name,
        Division: this.props.Li_PatternClassify
      }
    }
    StyleSettingHiraAction.saveData(params).then((res) => {
      this.getListData(this.props, true)
    }).catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error('健診コースが既に存在しています');
    }).finally(() => { });
  }
  f9(props) {
    const params = {
      Division: props?.Li_PatternClassify,
      DocumentName: props?.Li_record?.DocumentName
    }
    StyleSettingHiraAction.f9(params).then((res) => {
      if (res) {
        let data = res && res.data ? res.data : '';
        this.confirm(data.message)
      }
    }).catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    }).finally(() => { });
  }
  onFinish() { }
  render() {
    const { current } = this.state;
    let dataSource = this.formRef?.current?.getFieldValue('dataSource');
    return (
      <div className="style-setting-hira">
        <Form ref={this.formRef} onFinish={this.onFinish} >
          <Card title="様式設定[HIRA]">
            <Menu selectedKeys={[current]} mode="horizontal">
              <Menu.Item key="標準取込"
                onClick={() => this.f9(this.props)}>
                標準取込
              </Menu.Item>

            </Menu>

            <Card>
              <Table
                size="small"
                scroll={{ y: 600 }}
                dataSource={dataSource}
                loading={this.state.isLoading}
                rowClassName={(record, index) => record.id === this.state.rowSelected[0]?.id ? 'table-row-light' : ''}
                pagination={false}
                bordered={true}
                rowKey={(record) => record.id}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: async () => {
                      let index = dataSource.findIndex(x => x.id === record.id)
                      await this.setState({
                        rowSelected: [record],
                        selectedRowKeys: [record.id],
                        indexTable: index
                      });
                    }
                  }
                }}
              >
                <Table.Column width={100} title="事業所ｺｰﾄﾞ" dataIndex="office_code" render={(value, record, index) => {
                  return !!record?.isNew ?
                    <Form.Item name={['dataSource', index, 'office_code']}>
                      <InputNumber value={record.office_code}
                        onDoubleClick={() => this.showWS1527022_OfficeInquiry(index)}></InputNumber>
                    </Form.Item>
                    :
                    <div style={{ textAlign: 'right' }}>
                      <span>{record.office_code === 0 ? '' : record.office_code}</span>
                    </div>
                }} />
                <Table.Column width={70} title="支社店" dataIndex="branch_store_code" render={(value, record, index) => {
                  return !!record?.isNew ?
                    <Form.Item name={['dataSource', index, 'branch_store_code']}>
                      <InputNumber value={record.branch_store_code}></InputNumber>
                    </Form.Item> : <div style={{ textAlign: 'right' }}>
                      <span>{record.branch_store_code === 0 ? '' : record.branch_store_code}</span>
                    </div>
                }} />
                <Table.Column width={115} title="事  業  所  名" dataIndex="OfficeDivision" key="" />
                <Table.Column title="健診コース" dataIndex="medical_exam_course"
                  render={(item, record, index) => {
                    return <Form.Item name={['dataSource', index, 'medical_exam_course']}>
                      <Input value={record.medical_exam_course} style={{ width: '20%', cursor: 'pointer' }} onDoubleClick={() => {
                        this.showBasicCourseInquiry(record, index)
                      }}></Input>
                      <span style={{ marginLeft: '2px' }}>{record.MedicalExamCourseName}</span>
                    </Form.Item>

                  }} />
                <Table.Column width={40} title="判定" dataIndex="judgement" render={(value, record, index) => {
                  return <Form.Item name={['dataSource', index, 'judgement']}><Input></Input></Form.Item>
                }} />
                <Table.Column title="印　刷　様　式" dataIndex="style"
                  render={(key, row, index) => {
                    return (
                      <Form.Item name={['dataSource', index, 'style']}>
                        <Input readOnly value={row.style} style={{ width: '20%', cursor: 'pointer' }} onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '600px',
                              component: (
                                <WS1527023_PrintStyleInquiry
                                  Li_parentScreen={"SettingHira"}
                                  onFinishScreen={(output) => {
                                    let dataSource = this.formRef?.current?.getFieldValue('dataSource')
                                    dataSource[index].style = output.style
                                    dataSource[index].format_name = output.format_name
                                    this.setFormFieldValue('dataSource', dataSource)
                                    this.setState({ dataSource: dataSource })
                                    this.forceUpdate()
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                        }}></Input>
                        <span>{row.format_name}</span>
                      </Form.Item>
                    )
                  }} />
                <Table.Column style={{ textAlign: 'center' }} width={120}
                  title={(<Button
                    type="primary"
                    disabled={this.checkDisabledBtnAdd()}
                    onClick={() => this.handleAddRowTable()}
                    icon={<PlusOutlined />}>
                  </Button>)}
                  render={(item, record, index) =>
                  (<div style={{ textAlign: 'center' }}>
                    <Button
                      hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                      onClick={() => this.saveData(index, record?.isNew)}
                      style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                      icon={<SaveOutlined />}></Button>
                    <Button
                      danger
                      onClick={() => {
                        this.checkIdTemp(record.id) ?  this.handleDeleteRowTable() : this.deleteData(record.id, this.props)
                      }}
                      icon={<DeleteOutlined />}></Button>
                  </div>)} />
              </Table>
            </Card>

          </Card>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1527018_StyleSettingHira);
