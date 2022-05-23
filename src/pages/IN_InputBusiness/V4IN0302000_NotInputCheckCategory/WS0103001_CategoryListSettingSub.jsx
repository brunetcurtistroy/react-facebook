import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CategoryListSettingSubAction from 'redux/InputBusiness/NotInputCheckCategory/CategoryListSettingSub.action'
import WS0267001_CategorySearchQuerySingle from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle.jsx';
import { Card, Table, Input, Form, Modal, Button, Footer } from "antd";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0103001_CategoryListSettingSub extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_Title: PropTypes.any,
    Lio_CategoryList: PropTypes.any,

  };

  constructor(props) {
    super(props);

    // document.title = 'カテゴリ一覧設定SUB';

    this.state = {
      dataSource: [],
      isLoading: false,
      selectedRows: [],
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      count: 1000
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadData()
    }
  }
  componentDidMount() {
    this.loadData()
  }
  loadData() {
    const params = {
      W2_multiple_categories: this.props.Lio_CategoryList
    }
    this.setState({ isLoading: true })
    CategoryListSettingSubAction.getListData(params)
      .then(res => {
        const data = res && res.length > 0 ? res : [{
          CategoryCode: null,
          category_name: '',
          id: ''
        }]
        this.setState({ dataSource: data })
        this.setFormFieldValue('tableData', data)
      })
      .finally(() => this.setState({ isLoading: false }))
  }
  saveListData() {
    const values = this.formRef.current.getFieldValue('tableData')
    const params = {
      W2_multiple_categories: this.props.W2_multiple_categories ? this.props.W2_multiple_categories : '',
      W2_category_cd: this.props.W2_category_cd,
      node_id: this.props.node_id,
      data: values
    }
    CategoryListSettingSubAction.saveListData(params).then((res) => {
      this.props.onFinishScreen({ load: true })
    })
  }
  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  handleAdd() {
    const { count } = this.state;
    const params = { id: count, CategoryCode: '', category_name: '', isNew: true }
    let data = this.formRef.current?.getFieldValue('tableData') ?
      this.formRef.current?.getFieldValue('tableData') : [];
    let arr = [...data];
    arr.unshift(params)
    this.forceUpdate()
    this.setFormFieldValue('tableData', arr)
    this.setState({ count: count + 1 })
  }
  addRow() {
    let data = this.formRef.current?.getFieldValue('tableData') ?
      this.formRef.current?.getFieldValue('tableData') : [];
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
  removeRow(index) {
    let data = this.formRef.current?.getFieldValue('tableData') ?
      this.formRef.current?.getFieldValue('tableData') : [];
    const table = data.filter((item, i) => index !== i );
    this.forceUpdate()
    this.setFormFieldValue('tableData', table)
    this.saveListData()
  }
  onFinish = () => {

  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  render() {
    const data = this.formRef.current?.getFieldValue('tableData') ?
      this.formRef.current?.getFieldValue('tableData') : []
    return (
      <div className="category-list-setting-sub">
        <Card title={!this.props.Li_Title ? "カテゴリ一覧設定SUB" : this.props.Li_Title}>
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              bordered={true}
              dataSource={data}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => record.id}
              // rowSelection={{
              //   type: 'radio',
              //   onChange: (selectedRowKeys, selectedRows) => {
              //     const checkId = data.some(s => s.id > 0)
              //     if (selectedRows.length > 0 && checkId) {
              //       this.saveListData()

              //     }
              //   }
              // }}
              onRow={(record, rowIndex) => {
                return {
                  onDoubleClick: event => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 500,
                        component:
                          <WS0267001_CategorySearchQuerySingle
                            Lio_CategoryCode={record.CategoryCode}
                            Li_UnusedInspectDisplay={false}
                            onFinishScreen={(s) => {
                              let data = {
                                id: s.id,
                                CategoryCode: s.Lio_CategoryCode,
                                category_name: s.recordData.category_name
                              }
                              let tableData = this.formRef.current?.getFieldValue('tableData') ?
                                this.formRef.current?.getFieldValue('tableData') : [];
                              tableData[rowIndex] = data
                              this.setFormFieldValue('tableData', tableData)
                              this.saveListData()
                              this.closeModal()
                              console.log(rowIndex)
                            }} />
                        ,
                      },
                    });
                  }, // double click row
                };
              }}

            >
              <Table.Column title="ｺｰﾄﾞ" dataIndex="CategoryCode"
                render={(text, record, index) => {
                  return (<Form.Item name={['tableData', index, 'CategoryCode']}>
                    <Input style={{ textAlign: 'right' }} type="number" readOnly value={record.CategoryCode} />
                  </Form.Item>)
                }}
              />
              <Table.Column title="名称" dataIndex="category_name"
                render={(text, record, index) => {
                  return (<Form.Item name={['tableData', index, 'category_name']}>
                    <Input readOnly value={record.category_name} />
                  </Form.Item>)
                }} />
              <Table.Column title={
                <Button size='small'
                  type='primary'
                  style={{ textAlign: 'center' }}
                  icon={<PlusOutlined />} onClick={() => { this.addRow() }}  ></Button>}
                render={(item, record, index) => {
                  return <Button style={{ textAlign: 'center' }} danger
                    icon={<DeleteOutlined />} type="primary" onClick={() => {this.removeRow(index);}}></Button>
                }}
              />
            </Table>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0103001_CategoryListSettingSub);
