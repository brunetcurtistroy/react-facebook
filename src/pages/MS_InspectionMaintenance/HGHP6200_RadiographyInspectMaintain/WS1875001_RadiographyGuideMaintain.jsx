import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Table, Space, Button, Form, InputNumber, Input, Checkbox, Modal } from "antd";
import Color from "constants/Color";
import { DeleteOutlined, SaveOutlined, PlusOutlined } from "@ant-design/icons";
import WS1874003_FindingsClassifyInquiry from "pages/MS_InspectionMaintenance/HGHP6200_RadiographyInspectMaintain/WS1874003_FindingsClassifyInquiry.jsx"
import WS1874002_SiteClassifyInquiry from "pages/MS_InspectionMaintenance/HGHP6200_RadiographyInspectMaintain/WS1874002_SiteClassifyInquiry.jsx"
import WS1874004_FindingInquiry from "pages/MS_InspectionMaintenance/HGHP6200_RadiographyInspectMaintain/WS1874004_FindingInquiry.jsx"
const dataSource = [{
  id: 1, findings_code: '5', findings_name: '30', judgement: 12,
  site_classification_o1: 10, site_classification_o2: 10, site_classification_io: 10,
  normal_value_flag: 1, display_order: 1, OutputChar: '60'
},
{
  id: 2, findings_code: '4', findings_name: '35', judgement: 12,
  site_classification_o1: 10, site_classification_o2: 10, site_classification_io: 10,
  normal_value_flag: 0, display_order: 2, OutputChar: '70'
}
]
class WS1875001_RadiographyGuideMaintain extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_Division: PropTypes.any,
    Li_InspectClassifyCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);
    // document.title = '読影指導保守';
    this.state = {
      isLoading: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: [dataSource[0]],
      selectedRowKeys: [dataSource[0].id],
      tableIndex: 0,
      count: 1001
    };
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  showWS1874004_FindingInQuiry(record) {
    const { childModal } = this.state;
    this.setState({
      childModal: {
        ...childModal,
        visible: true,
        width: 900,
        component: (<WS1874004_FindingInquiry
          Li_InspectClassifyCode
          Li_Division={1}
          Li_FindingsClassifyCode={record.findings_classification_io}
          onFinishScreen={(data) => {
            this.setState({
              childModal: {
                ...childModal,
                visible: false,
              },
            });
          }}
        />),
      },
    })
  }
  showWS1874003_FindingsClassifyInquiry(record, findings_classification_name, division) {
    const { childModal } = this.state;
    this.setState({
      childModal: {
        ...childModal,
        visible: true,
        width: 800,
        component: (<WS1874003_FindingsClassifyInquiry
          Li_InspectClassifyCode
          Li_Division={division}
          Li_FindingsClassifyCode={record[findings_classification_name]}
          onFinishScreen={(data) => {
            this.setState({
              childModal: {
                ...childModal,
                visible: false,
              },
            });
          }}
        />),
      },
    })
  }
  showWS1874002_SiteClassifyInquiry(record, findings_classification_name, division) {
    const { childModal } = this.state;
    this.setState({
      childModal: {
        ...childModal,
        visible: true,
        width: 800,
        component: (<WS1874002_SiteClassifyInquiry
          Li_InspectClassifyCode
          Li_Division={division}
          Li_FindingsClassifyCode={record[findings_classification_name]}
          onFinishScreen={(data) => {
            this.setState({
              childModal: {
                ...childModal,
                visible: false,
              },
            });
          }}
        />),
      },
    })
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
      this.setFormFieldValue('dataSource', dataSource);
    }
  }
  componentDidMount() {
    this.setFormFieldValue('dataSource', dataSource);
  }
  getRawValue = (name) => this.formRef?.current?.getFieldValue(name)
  handleAdd() {
    const { count } = this.state;
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
    const params = {
      id: count,
      isNew: true,
      findings_code: '0',
      findings_name: '',
      judgement: '',
      site_classification_o1: '',
      site_classification_o2: '',
      findings_classification_io: '',
      normal_value_flag: 0,
      display_order: '',
      OutputChar: ''
    }
    let arr = [...data];
    arr.unshift(params)
    this.forceUpdate()
    this.setFormFieldValue('dataSource', arr)
    this.setState({
      count: count + 1,
      selectedRowKeys: arr.length > 0 ? [arr[0].id] : [],
      selectedRows: arr.length > 1 ? [arr[0]] : [],
      tableIndex: 0
    });
  }
  addRow() {
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
    let arr = [...data];
    if (arr.length === 0) {
      this.handleAdd();
    } else {
      for (let index = 0; index < arr.length; index++) {
        if (!!arr[index]['isNew']) {
          return
        }
        if (index === arr.length - 1) {
          this.handleAdd()
        }
      }
    }
  }
  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };
  removeRow(index) {
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
    const table = data.filter((item, i) => index !== i);
    setTimeout(() => {
      this.setState({
        selectedRows: table.length > 0 ? [table[0]] : [],
        selectedRowKeys: table.length > 0 ? [table[0]?.id] : [],
        tableIndex: 0
      })
    }, 300)
    this.setFormFieldValue('dataSource', table);
    this.forceUpdate()
  }
  deleteData(id) {
    //api => param @Id
  }
  onSave(index) {
    // click event save data
    const record = this.getRawValue('dataSource')[index]
    !!record.isNew ?
      this.insertData(record, index) : this.SaveRowData(record, false)
  }
  insertData(record, index) {
    // save data form FE
    const value = this.getRawValue('dataSource')[index]
    const isNew = true;
    this.SaveRowData(value, isNew)
  }
  SaveRowData(record, isNew) {
    // api
    // isNew => điều kiện check Thêm mới -ko truyền id # Update - Truyền id
  }
  onFinish = (values) => { }
  render() {
    let data = this.formRef?.current?.getFieldValue('dataSource');
    const { isLoading, childModal } = this.state;
    return (
      <div className="radiography-guide-maintain">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card title="読影指導保守">
            <Space>
              <Button onClick={() => { this.showWS1874004_FindingInQuiry(this.state.selectedRows[0]) }}>所見取込</Button>
            </Space>
            <hr style={{ border: "1px solid #F0F0F0", marginBottom: "1.2rem" }} />
            <Table
              bordered={true}
              rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
              size='small'
              scroll={{ y: 600 }}
              dataSource={data}
              loading={false}
              pagination={false}
              rowKey={(record) => record.id}
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    const selected = record;
                    this.setState({
                      selectedRowKeys: [selected.id],
                      selectedRows: [selected],
                      tableIndex: index,
                    })
                  },
                };
              }}
            >
              <Table.Column width={100} title="所見ｺｰﾄﾞ" dataIndex="findings_code"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'findings_code']}>
                    <InputNumber /></Form.Item>
                }}
              />
              <Table.Column width={180} title="所見名称" dataIndex="findings_name"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'findings_name']}>
                    <Input /></Form.Item>
                }}
              />
              <Table.Column width={70} title="判定" dataIndex="judgement"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'judgement']}>
                    <Input style={{ textAlign: 'center' }} /></Form.Item>
                }}
              />
              <Table.Column width={100} title="所見分類1" dataIndex="site_classification_o1"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'site_classification_o1']}>
                    <Input onDoubleClick={() => this.showWS1874002_SiteClassifyInquiry(record, 'site_classification_o1', 1)} style={{ color: Color(record?.Expression_15)?.Foreground }} /></Form.Item>
                }}
              />
              <Table.Column width={100} title="所見分類2" dataIndex="site_classification_o2"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'site_classification_o2']}>
                    <Input onDoubleClick={() => this.showWS1874002_SiteClassifyInquiry(record, 'site_classification_o2', 2)}  style={{ color: Color(record?.Expression_16)?.Foreground }} /></Form.Item>
                }}
              />
              <Table.Column width={100} title="所見分類3" dataIndex="findings_classification_io"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'site_classification_io']}>
                    <Input onDoubleClick={() => this.showWS1874003_FindingsClassifyInquiry(record, 'site_classification_io', 1)}  style={{ color: Color(record?.Expression_17)?.Foreground }} /></Form.Item>
                }}
              />
              <Table.Column width={60} title="正常" dataIndex="normal_value_flag"
                render={(item, record, index) => {
                  return <Form.Item style={{ textAlign: 'center' }} name={['dataSource', index, 'normal_value_flag']} valuePropName='checked'>
                    <Checkbox onChange={(e) => { }}></Checkbox></Form.Item>
                }}
              />
              <Table.Column width={100} title="表示順" dataIndex="display_order"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'display_order']}>
                    <Input style={{ textAlign: 'right' }} /></Form.Item>
                }}
              />
              <Table.Column width={200} title="出力文字" dataIndex="OutputChar"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'OutputChar']}>
                    <Input /></Form.Item>
                }}
              />
              <Table.Column width={100} dataIndex=""
                style={{ textAlign: 'center' }}
                title={(item, record, index) =>
                (<Button onClick={() => this.addRow()}
                  type='primary' icon={(<PlusOutlined />)}></Button>)}
                render={(item, record, index) => (
                  <div style={{ textAlign: 'center' }}>
                    <Button hidden={this.state.tableIndex !== this.findIndexByID(data, record.id)}
                      style={{ marginLeft: '5px', color: 'green' }} onClick={() =>
                        this.onSave(index)} icon={(< SaveOutlined />)}></Button>
                    <Button hidden={this.state.tableIndex !== this.findIndexByID(data, record.id)}
                      danger onClick={() => !!record?.isNew ? this.removeRow(index) : this.deleteData(record.id)} icon={(< DeleteOutlined />)}></Button>
                  </div>

                )}
              />
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1875001_RadiographyGuideMaintain);
