import React from "react";
import { connect } from "react-redux";
import { Card, Table, Space, Button, Form, InputNumber, Input, Modal } from "antd";
import Color from "constants/Color";
import { DeleteOutlined, SaveOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from 'prop-types';
import WS1873003_SiteInquiry from 'pages/MS_InspectionMaintenance/HGHP6200_RadiographyInspectMaintain/WS1873003_SiteInquiry.jsx'
import WS1873002_SiteClassifyInquiry from 'pages/MS_InspectionMaintenance/HGHP6200_RadiographyInspectMaintain/WS1873002_SiteClassifyInquiry.jsx'
import  ModalDraggable  from "components/Commons/ModalDraggable";

const dataSource = [{
  id: 1, site_code: '5', site_name: '30',
  findings_classification_i: 10, site_classification_io: 10, display_order: 1, OutputChar: '60'
},
{
  id: 2, site_code: '6', site_name: '70',
  findings_classification_i: 10, site_classification_io: 10, display_order: 1, OutputChar: '30'
},
]
class WS1874001_RadiographyFindingsMaintain extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_Division: PropTypes.any,
    Li_InspectClassifyCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = '読影所見保守';

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
  getRawValue(name) {
    return this.formRef?.current?.getFieldValue(name)
  }

  showWS1873003_SiteInquiry(record) {
    const { childModal } = this.state;
    this.setState({
      childModal: {
        ...childModal,
        visible: true,
        width: 900,
        component: (<WS1873003_SiteInquiry
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
  showWS1873002_SiteClassifyInquiry(record) {
    if(this.props?.Li_Division == 2) {
      const { childModal } = this.state;
      this.setState({
        childModal: {
          ...childModal,
          visible: true,
          width: 900,
          component: (<WS1873002_SiteClassifyInquiry
            Li_InspectClassifyCode={this.props?.Li_InspectClassifyCode}
            Li_SiteClassifyCode={record?.site_classification_io}
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

  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  handleAdd() {
    const { count } = this.state;
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
    const params = {
      id: count,
      isNew: true,
      site_code: '0',
      site_name: '',
      findings_classification_i: '',
      site_classification_io: '',
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
      <div className="radiography-findings-maintain">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card title="読影所見保守">
            <Space>
              <Button onClick={() => { this.showWS1873003_SiteInquiry(this.state.selectedRows[0]) }}>部位取り込み</Button>
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
              <Table.Column width={100} title="部位ｺｰﾄﾞ" dataIndex="site_code"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'site_code']}>
                    <InputNumber /></Form.Item>
                }}
              />
              <Table.Column width={180} title="部位名称" dataIndex="site_name"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'site_name']}>
                    <Input /></Form.Item>
                }}
              />
              <Table.Column width={100} title="部位分類1" dataIndex="site_classification_io"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'site_classification_io']}>
                    <Input style={{ color: Color(record.Expression_12)?.Foreground }}
                     onDoubleClick={() => { this.showWS1873002_SiteClassifyInquiry(record)}} /></Form.Item>
                }}
              />
              <Table.Column width={100} title={'所見分類'} dataIndex="findings_classification_i"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'findings_classification_i']}>
                    <Input /></Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1874001_RadiographyFindingsMaintain);
