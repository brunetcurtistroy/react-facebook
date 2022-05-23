import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Form, Input, Modal, Button, message } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import SpecificHealthTokuhoParamMaintainAction from 'redux/SpecificInsureMaintenance/SpecificHealthTokuhoParamMaintain/SpecificHealthTokuhoParamMaintain.actions'
import WS1308005_InputMetabolicSyndromeHierarchical from 'pages/TM_SpecificInsureMaintenance/V4TK0040000_SpecificHealthTokuhoParamMaintain/WS1308005_InputMetabolicSyndromeHierarchical.jsx';
import WS1308004_InputSupportPlanEtc from "./WS1308004_InputSupportPlanEtc";
import WS1308006_CopyingProcess from "./WS1308006_CopyingProcess";
import Menubar from "components/Commons/Menubar";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}
class WS1308001_SpecificHealthTokuhoParamMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'V4-TMS00020:特健特保パラメータ保守';

    this.state = {
      isLoading: true,
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
      rowSelect: {},
      menuItems: [
        { id: 1, label: '複写', handleClick: this.eventF7 },
      ],
    };
  }
  componentDidMount() {
    SpecificHealthTokuhoParamMaintainAction.getInit().then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res ? res : []
      })
      this.setState({ dataSource: res })
      this.forceUpdate()
    }).finally(() => this.setState({ isLoading: false }))
  }
  onFinish(values) { }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  handleChangeInput = (event, record) => {
    let { value, name } = event.target;
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      arrTemp[index] = objTemp
      this.setState({ dataSource: arrTemp })
      this.formRef.current.setFieldsValue({ 'tableData': arrTemp });
    }
  }

  getDataSpecificHealthTokuhoParamMaintain = () => {
    this.setState({ isLoading: true })
    SpecificHealthTokuhoParamMaintainAction.getInit()
      .then(res => {
        if (res) {
          this.formRef.current?.setFieldsValue({ 'tableData': res })
          this.setState({ dataSource: res })
        }
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  saveAndUpdateSpecificHealthTokuhoParamMaintain = (params) => {
    SpecificHealthTokuhoParamMaintainAction.saveAndUpdateSpecificHealthTokuhoParamMaintainAction(params)
      .then(() => {
        message.success('成功');
        this.getDataSpecificHealthTokuhoParamMaintain();
      })
      .catch(() => message.error('エラー'))
  }

  deleteSpecificHealthTokuhoParamMaintain = (id) => {
    SpecificHealthTokuhoParamMaintainAction.deleteSpecificHealthTokuhoParamMaintainAction(id)
      .then(() => {
        message.success('成功');
        this.getDataSpecificHealthTokuhoParamMaintain();
      })
      .catch(() => message.error('値が存在しません'))
  }

  returnComponent = (component, params) => {
    // Correct! JSX type can be a capitalized variable.
    const components = {
      WS1308004_InputSupportPlanEtc,
      WS1308005_InputMetabolicSyndromeHierarchical,
    }
    const TempComponent = components[component];
    return (
      <TempComponent
        format={params.format}
        remarks={params.remarks}
        Li_Format={params.format}
        onFinishScreen={(output) => {
          this.closeModal()
        }}
      />
    );
  }

  inputEventSpecificHealthTokuhoParamMaintain = (params) => {
    SpecificHealthTokuhoParamMaintainAction.inputEventSpecificHealthTokuhoParamMaintainAction(params)
      .then((res) => {
        let screen = res.data.action;
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: '80%',
            component: this.returnComponent(screen, params),
          },
        });
      })
  }

  eventF7 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 450,
        component: (
          <WS1308006_CopyingProcess
            format={this.state.rowSelect.format}
            remarks={this.state.rowSelect.remarks}
            onFinishScreen={(isLoad) => {
              if (isLoad) {
                this.getDataSpecificHealthTokuhoParamMaintain();
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  render() {
    return (
      <div className="specific-health-tokuho-param-maintain">
        <Card title='4-TMS00020:特健特保パラメータ保守'>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            autoComplete="off"
          >
            <Menubar items={this.state.menuItems} />
            <Table
              className='mt-3'
              dataSource={this.formRef.current?.getFieldValue("tableData")}
              size="small"
              pagination={this.state.pagination}
              loading={this.state.isLoading}
              rowKey={(record) => record.id}
              bordered={true}
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
            >
              <Table.Column title="ＦＯＲＭＡＴ" width={400} dataIndex="format"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['tableData', index, 'format']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={12} readOnly={record.id}
                        onChange={(e) => this.handleChangeInput(e, record)} name='format' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="備　　考" dataIndex="remarks"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['tableData', index, 'remarks']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={20} onKeyDown={() => this.inputEventSpecificHealthTokuhoParamMaintain(record)}
                        onChange={(e) => this.handleChangeInput(e, record)} name='remarks' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column align='center' width={70}
                title={() => (<Button size='small' type='primary'
                  icon={<PlusOutlined />} onClick={() => {
                    let arrTemp = [{}];
                    this.formRef.current.setFieldsValue({ 'tableData': [...arrTemp, ...this.state.dataSource] });
                    this.setState({ dataSource: [...arrTemp, ...this.state.dataSource] });
                  }}></Button>)}
                render={(text, record, index) => (
                  <>
                    <Button size='small' style={{ border: 'none', }}
                      icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.saveAndUpdateSpecificHealthTokuhoParamMaintain(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none', }}
                      danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => this.deleteSpecificHealthTokuhoParamMaintain({ id: record.id })
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1308001_SpecificHealthTokuhoParamMaintain);
