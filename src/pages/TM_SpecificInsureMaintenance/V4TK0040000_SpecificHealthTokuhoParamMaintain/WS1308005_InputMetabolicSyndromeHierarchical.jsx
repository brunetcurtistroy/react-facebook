import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, message, Form, Input, Modal, Button } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import {
  getDataInputMetabolicSyndromeHierarchicalAction, inspectCodeInputMetabolicSyndromeHierarchicalAction, 
  saveInputMetabolicSyndromeHierarchicalAction, deleteInputMetabolicSyndromeHierarchicalAction
} from "redux/SpecificInsureMaintenance/SpecificHealthTokuhoParamMaintain/InputMetabolicSyndromeHierarchical.actions";
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}
class WS1308005_InputMetabolicSyndromeHierarchical extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '入力[メタボ階層化]';

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
      Data: [],
      isLoading: true,
      rowSelect: {}
    };
  }

  componentDidMount = () => {
    const params = {
      format: this.props.format,
      remarks: this.props.remarks
    }
    this.getDataInputMetabolicSyndromeHierarchical(params);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      const params = {
        format: this.props.format,
        remarks: this.props.remarks
      }
      this.getDataInputMetabolicSyndromeHierarchical(params);
    }
  }

  getDataInputMetabolicSyndromeHierarchical = (params) => {
    this.setState({ isLoading: true });
    getDataInputMetabolicSyndromeHierarchicalAction(params)
      .then(res => {
        if (res) {
          this.setState({ Data: res.data.Data });
          this.formRef?.current?.setFieldsValue(res.data)
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  saveInputMetabolicSyndromeHierarchical = (record) => {
    const params = {
      ...record,
      id: record.id ?? '',
      format: this.props.format
    }
    saveInputMetabolicSyndromeHierarchicalAction(params)
      .then(res => {
        message.success('成功');
        this.getDataInputMetabolicSyndromeHierarchical({
          format: this.props.format,
          remarks: this.props.remarks
        });
      })
      .catch(() => message.error('エラー'))
  }

  deleteInputMetabolicSyndromeHierarchical = (record) => {
    if (record.id) {
      deleteInputMetabolicSyndromeHierarchicalAction({ id: record.id })
        .then(res => {
          message.success('成功');
          this.getDataInputMetabolicSyndromeHierarchical({
            format: this.props.format,
            remarks: this.props.remarks
          });
        })
        .catch(err => message.error('エラー'))
    } else {
      let arrTemp = [...this.state.Data];
      arrTemp.splice(arrTemp[0], 1);
      this.formRef.current.setFieldsValue({ 'Data': arrTemp });
      this.setState({ Data: arrTemp });
    }
  }

  inspectCodeInputMetabolicSyndromeHierarchical = (params) => {
    inspectCodeInputMetabolicSyndromeHierarchicalAction(params)
      .then(res => {
        message.success('成功');
        this.getDataInputMetabolicSyndromeHierarchical({
          format: this.props.format,
          remarks: this.props.remarks
        });
      })
      .catch(() => message.error('エラー'))
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  handleChangeInput = (event, record) => {
    let { value, name } = event.target;
    let arrTemp = [...this.state.Data];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      arrTemp[index] = objTemp
      this.setState({ Data: arrTemp })
      this.formRef.current.setFieldsValue({ 'Data': arrTemp });
    }
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  render() {
    return (
      <div className="input-metabolic-syndrome-hierarchical">
        <Card title="入力[メタボ階層化]">
          <Form ref={this.formRef}>
            <Table
              dataSource={this.state.Data}
              loading={this.state.isLoading}
              pagination={this.state.pagination}
              rowKey={(record) => record.id}
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
            >
              <Table.Column title="区分" dataIndex="division" width={120}
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.Data, record.id);
                  return (
                    <Form.Item name={['Data', index, 'division']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={6} onChange={(e) => this.handleChangeInput(e, record)} name='division' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="種  別" dataIndex="kind"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.Data, record.id);
                  return (
                    <Form.Item name={['Data', index, 'kind']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={10} onChange={(e) => this.handleChangeInput(e, record)} name='kind' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="検査コード" dataIndex="InspectCode" width={120}
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.Data, record.id);
                  return (
                    <Form.Item name={['Data', index, 'InspectCode']} style={styleFormItem}>
                      <Input style={styleInput} readOnly onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '60%',
                            component: (
                              <WS0271001_InspectItemSearchQuerySingle
                                Lio_InspectItemCode={record.InspectCode}
                                onFinishScreen={({ Lio_InspectItemCode, recordData }) => {
                                  if (record.id) {
                                    this.inspectCodeInputMetabolicSyndromeHierarchical({ id: record.id, InspectCode: Lio_InspectItemCode })
                                  }else{
                                    let value = '//検査=' + Lio_InspectItemCode.toString().padStart(8, '0');
                                    record = {
                                      ...record,
                                      option_remark: value
                                    }
                                    let arrTemp = [...this.state.Data];
                                    arrTemp[index] = record;
                                    this.setState({
                                      Data: arrTemp,
                                      rowSelect: record
                                    })
                                    this.formRef.current.setFieldsValue({
                                      Data: arrTemp
                                    })
                                  }
                                  record = {
                                    ...record,
                                    InspectCode: Lio_InspectItemCode,
                                    exam_short_name: recordData.exam_short_name
                                  }
                                  let arrTemp = [...this.state.Data];
                                  arrTemp[index] = record;
                                  this.setState({
                                    Data: arrTemp,
                                    rowSelect: record
                                  })
                                  this.formRef.current.setFieldsValue({
                                    Data: arrTemp
                                  })
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }} />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="検査略名" dataIndex="exam_short_name"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.Data, record.id);
                  return (
                    <Form.Item name={['Data', index, 'exam_short_name']} style={styleFormItem}>
                      <Input style={styleInput} readOnly />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="備　考" dataIndex="remarks"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.Data, record.id);
                  return (
                    <Form.Item name={['Data', index, 'remarks']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={20} onChange={(e) => this.handleChangeInput(e, record)} name='remarks' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="属性" dataIndex="attribute"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.Data, record.id);
                  return (
                    <Form.Item name={['Data', index, 'attribute']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={10} onChange={(e) => this.handleChangeInput(e, record)} name='attribute' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="設定" dataIndex="set_pattern"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.Data, record.id);
                  return (
                    <Form.Item name={['Data', index, 'set_pattern']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={10} onChange={(e) => this.handleChangeInput(e, record)} name='set_pattern' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="オプション" dataIndex="option_remark"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.Data, record.id);
                  return (
                    <Form.Item name={['Data', index, 'option_remark']} style={styleFormItem}>
                      <Input style={styleInput} readOnly={!record.id} onChange={(e) => this.handleChangeInput(e, record)} name='option_remark' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column align='center' width={80}
                title={() => (<Button size='small' type='primary'
                  icon={<PlusOutlined />} onClick={() => {
                    let arrTemp = [{}];
                    this.formRef.current.setFieldsValue({ 'Data': [...arrTemp, ...this.state.Data] });
                    this.setState({ Data: [...arrTemp, ...this.state.Data] });
                  }}></Button>)}
                render={(text, record, index) => (
                  <>
                    <Button size='small' style={{ border: 'none', }}
                      icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.saveInputMetabolicSyndromeHierarchical(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none', }}
                      danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => this.deleteInputMetabolicSyndromeHierarchical(record)
                        })
                      }}
                    ></Button>
                  </>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1308005_InputMetabolicSyndromeHierarchical);
