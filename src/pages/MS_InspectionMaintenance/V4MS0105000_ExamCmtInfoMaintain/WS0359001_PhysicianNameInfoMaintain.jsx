import React from "react";
import { connect } from "react-redux";
import { DeleteOutlined, SaveOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Card, Input, Form, Button, Table, Checkbox, Upload } from "antd";
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
const dataSource = [{
  id: 1, exam_comment_code: '5', exam_comment_screen: '30', exam_comment_form: 12,
  Imprint: 'r1111',
  StsEnable: 1
},
{
  id: 2, exam_comment_code: '4', exam_comment_screen: '12', exam_comment_form: 12,
  Imprint: 'r',
  StsEnable: 0,
}
]
const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};
class WS0359001_PhysicianNameInfoMaintain extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_CmtClassify: PropTypes.any,
    Li_Ctxgetname: PropTypes.any,
    Li_Title: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = '医師名情報保守';

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
      count: 1001,
      fileUpload: [],
      fileUploadIndex: 0,
    };
  }
  componentDidMount() {
    this.setFormFieldValue('dataSource', dataSource)
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  handleAdd() {
    const { count } = this.state;
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
    const params =
    {
      isNew: true, id: count, exam_comment_code: '',
      exam_comment_screen: '', exam_comment_form: '',
      Imprint: '',
      stsEnable: 0,
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
    // save data from FE
    const value = this.getRawValue('dataSource')[index]
    const isNew = true;
    this.SaveRowData(value, isNew)
  }
  SaveRowData(record, isNew) {
    // call api
    //if isNew => Thêm mới -ko truyền id else Update - Truyền id
  }
  getRawValue = (name) => this.formRef?.current?.getFieldValue(name)
  onFinish = (value) => { }
  checkUpload(event) {
    let data = this.getRawValue('dataSource');
    data[this.state.fileUploadIndex].Imprint = event.name
    data[this.state.fileUploadIndex].originFileObj = event
    this.setFormFieldValue('dataSource', data);
    this.forceUpdate()
  }
  // when use api then request data to Server
  convertFormData() {
    let data = this.getRawValue('dataSource');
    let arrTemp = data.map(item => item.originFileObj)
    let formData = new FormData();
    for (var i = 0; i < arrTemp.length; i++) {
      if (arrTemp[i].originFileObj !== '') {
        formData.append('files[]', arrTemp[i]);
      }
    }
  }
  idUpload1() {
    return (<div hidden>
      <Upload id={`idUpload1`}
        accept=".bmp"
        listType="text"
        headers={{
          'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN'),
        }}
        beforeUpload={(event) => {
          this.checkUpload(event)
        }}
      ><span hidden></span>
      </Upload>

    </div>)
  }
  render() {
    let data = this.getRawValue('dataSource');
    return (
      <div className="physician-name-info-maintain">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card title={this.props?.Li_Title ? this.props.Li_Title : '医師名情報保守'}>
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
              <Table.Column width={60} title="" dataIndex="StsEnable"
                render={(item, record, index) => {
                  return <Form.Item style={{ textAlign: 'center' }} name={['dataSource', index, 'StsEnable']} valuePropName='checked'>
                    <Checkbox onChange={(e) => { }}></Checkbox></Form.Item>
                }}
              />
              <Table.Column width={150} title="入力値" dataIndex="exam_comment_code"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'exam_comment_code']}>
                    <Input /></Form.Item>
                }}
              />
              <Table.Column width={150} title="略名" dataIndex="exam_comment_screen"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'exam_comment_screen']}>
                    <Input /></Form.Item>
                }}
              />
              <Table.Column title="正式名(印字）" dataIndex="exam_comment_form"
                render={(item, record, index) => {
                  return <Form.Item name={['dataSource', index, 'exam_comment_form']}>
                    <Input /></Form.Item>
                }}
              />
              <Table.Column width={210} title="印影" dataIndex="Imprint"
                render={(item, record, index) => {
                  return <Form.Item {...grid}
                    name={['dataSource', index, 'Imprint']}>
                    <Input addonAfter={<div style={{ textAlign: 'center', marginLeft: '10px' }}>
                        <UploadOutlined style={{ color: '#096dd9', marginRight: '10px', }}
                          onClick={(e) => {
                            this.setState({ fileUploadIndex: index })
                            document.getElementById("idUpload1").click()
                          }} /></div>} />
                  </Form.Item>
                }}
              />
              <Table.Column width={100} dataIndex=""
                style={{ textAlign: 'center' }}
                title={(item, record, index) =>
                (<Button onClick={() => this.addRow()}
                  type='primary'
                  icon={(<PlusOutlined />)}></Button>)}
                render={(item, record, index) => (
                  <div style={{ textAlign: 'center' }}>
                    <Button
                      hidden={this.state.tableIndex !== this.findIndexByID(data, record.id)}
                      style={{ marginLeft: '5px', color: 'green' }}
                      onClick={() => this.onSave(index)} icon={(< SaveOutlined />)}>
                    </Button>
                    <Button
                      hidden={this.state.tableIndex !== this.findIndexByID(data, record.id)}
                      danger
                      onClick={() => !!record?.isNew ? this.removeRow(index) : this.deleteData(record.id)}
                      icon={(< DeleteOutlined />)}>
                    </Button>
                  </div>

                )}
              />
            </Table>
            {this.idUpload1()}
          </Card>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0359001_PhysicianNameInfoMaintain);
