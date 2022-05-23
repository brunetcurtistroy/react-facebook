import React from "react";
import { connect } from "react-redux";
import InspectItemSearchQueryMultipleChoiceAction from 'redux/IntroductionLetter/IntroduceLetterMasterMaintain/InspectItemSearchQueryMultipleChoice.action'
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Checkbox, Select, Button, Table, Row, Col, Space, Modal, Pagination } from "antd";
import WS2716001_InspectItemInfoMaintain from "pages/MS_InspectionMaintenance/V4MS0103000_InspectItemInfoMaintain/WS2716001_InspectItemInfoMaintain";

const examData = [

]
const examData2 = [

]
class WS0270001_InspectItemSearchQueryMultipleChoice extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査項目検索・照会(複数選択)';

    this.state = {
      rowSelected: [],
      selectedRowKeys: [],
      indexTable: 0,
      rowSelected2: [],
      selectedRowKeys2: [],
      indexTable2: 0,
      Pattern_List: [],
      isLoading: false,
      isLoading2: false,
      isLoading3: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      current_page: 1,
      pageSize: 15,
    };
  }
  componentDidMount() {
    this.getScreenData()
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData()
    }
  }
  getScreenData() {
    const params = {
      Li_UnusedInspectDisplay: this.props.Li_UnusedInspectDisplay || 0,
    }
    InspectItemSearchQueryMultipleChoiceAction.getScreenData(params).then(res => {
      if (res) {
        this.setState({
          Pattern_List: res && res.Pattern_List,
        })
        this.formRef?.current?.setFieldsValue({ StsUseInspect: res && res.StsUseInspect })
        this.formRef?.current?.setFieldsValue({ SearchChar: res && res.Search })
        this.formRef?.current?.setFieldsValue({ Type: res && res.Type })
        this.inspect()
        this.category()
        this.subdisplaytable()
      }
    })
  }
  closeScreen(StsSelect) {
    const params = {
      StsSelect: StsSelect,
    }
    InspectItemSearchQueryMultipleChoiceAction.closeScreen(params).then(res => {
    })
  }
  inspect() {
    this.setState({ isLoading3: true })
    const params = {
      Pattern: this.formRef?.current?.getFieldValue('Pattern') || '0000-000',
      category_code: this.state.rowSelected[0]?.category_code
    }
    InspectItemSearchQueryMultipleChoiceAction.inspect(params).then(res => {
      this.formRef?.current?.setFieldsValue({ tableData3: res })
    }).finally(() => { this.setState({ isLoading3: false }) })
  }
  category() {
    this.setState({ isLoading2: true })
    const params = {
      Pattern: this.formRef?.current?.getFieldValue('Pattern') || '0000-000',
    }
    InspectItemSearchQueryMultipleChoiceAction.category(params).then(res => {
      this.formRef?.current?.setFieldsValue({ tableData2: res })
      if (res) {
        this.setState({
          rowSelected: [res[0]],
          selectedRowKeys: [res[0]?.id],
          indexTable: 0
        });
      }
    }).finally(() => { this.setState({ isLoading2: false }) })
  }
  subdisplaytable() {
    this.setState({ isLoading: true })
    const params = {
      StsUseInspect: this.formRef?.current?.getFieldValue('StsUseInspect') ? 1 : 0,
      Type: this.formRef?.current?.getFieldValue('Type'),
      SearchChar: this.formRef?.current?.getFieldValue('SearchChar') || ''
    }
    InspectItemSearchQueryMultipleChoiceAction.subdisplaytable(params).then(res => {
      this.formRef?.current?.setFieldsValue({ tableData: res })
    }).finally(() => { this.setState({ isLoading: false }) })
  }
  f11() {
    InspectItemSearchQueryMultipleChoiceAction.f11().then(res => {
      if (res && res.message == 'Call Screen WS2716001') {
        this.InspectItemInfoMaintain()
      }
    })
  }
  selectAll() {
    const params = {
      ...this.state.rowSelected2
    }
    InspectItemSearchQueryMultipleChoiceAction.selectAll(params).then(res => {
      this.subdisplaytable()
    })
  }
  selectOne() {
    const params = {
      ...this.state.rowSelected2
    }
    InspectItemSearchQueryMultipleChoiceAction.selectOne(params).then(res => {
      this.subdisplaytable()
    })
  }
  handleSelected = (value) => {
    // if (value !== 1) {
    //   this.formRef.current.setFieldsValue({
    //     tableData: [],
    //     tableData2: examData2,
    //   });
    //   console.log(this.formRef.current.getFieldValue());
    // } else {
    //   this.formRef.current.setFieldsValue({
    //     tableData: examData,
    //     tableData2: [],
    //   })
    // }
    this.category()
    this.subdisplaytable()
    this.forceUpdate();
  }
  changeRow = (selectedRows) => {
    this.formRef.current.setFieldsValue({
      tableData: [],
      tableData3: selectedRows[0].subData
    })
  }
  InspectItemInfoMaintain = (condition = null) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS2716001_InspectItemInfoMaintain
            onFinishScreen={(output) => {
              this.setDataOutput(condition, output)
              this.closeModal()
            }}
          />
        ),
      },
    });

  }
  onSubmit() {
    const { onFinishScreen } = this.props;
    if (onFinishScreen) {
      onFinishScreen({ recordData: '1' })
    }
  }
  getDataThisComponent = (current = this.state.current_page, pageSize = this.state.pageSize, name) => {
    return this.formRef?.current?.getFieldValue(name)?.slice((current - 1) * pageSize, current * pageSize);
  }
  onFinish(values) {

  }

  render() {
    return (
      <div className="inspect-item-search-query-multiple-choice">
        <Card title="検査項目検索・照会(複数選択)">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={[6, 6]} className="mb-3">
              <Col span={24}>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => this.f11()}
                  >
                    F11
                  </Button>
                </Space>
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Form.Item
                    name="Search"
                    label="略名検索"
                    style={{ width: '40%' }}
                  >
                    <Input.Search
                      size="small"
                      type="text"
                      allowClear
                      autoFocus={true}
                      onSearch={(value) => {
                        if (value.length > 0) {
                          console.log('search text: ', value)
                        }
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="StsUseInspect"
                    label="使用"
                    valuePropName="checked"
                  >
                    <Checkbox></Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="Pattern"
                    style={{ width: '40%' }}
                  >
                    <Select defaultValue={'0000-000'} onChange={(value) => this.handleSelected(value)}>
                      {this.state.Pattern_List.map(value => (
                        <Select.Option value={value.LinkedField}>{value.DisplayField}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Row>
              </Col>

              <Col span={24}>
                <div hidden={!this.formRef?.current?.getFieldValue("tableData")?.length > 0}>
                  <Table
                    scroll={{ y: 500 }}
                    size="small"
                    bordered
                    rowClassName={(record, index) => record.id === this.state.rowSelected2[0]?.id ? 'table-row-light' : ''}
                    loading={this.state.isLoadding}
                    dataSource={this.formRef.current ? this.formRef.current.getFieldValue(
                      "tableData"
                    )
                      : []}
                    rowKey={(record) => record.id}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: () => {
                          this.setState({
                            rowSelected2: [record],
                            selectedRowKeys2: [record.id],
                            indexTable2: rowIndex
                          });
                          this.inspect();
                        }
                      };
                    }}
                  >

                    <Table.Column
                      title={(<div style={{ textAlign: 'center' }}>
                        <Form.Item name={['tableData', 0 , 'StsSelectAll']}>
                          <Checkbox></Checkbox></Form.Item>
                      </div>)}
                      dataIndex="" key="" render={(value, record, index) => {
                        return <Form.Item name={['tableData', index, 'W1_valid_invalid_1']}>
                          <Checkbox></Checkbox></Form.Item>
                      }} />



                    <Table.Column title="コード" dataIndex="" key="" width={"150px"} render={(value, record, index) => {
                      return <Form.Item name={['tableData', index, 'test_item_code']}>
                        <Input type="number" readOnly />
                      </Form.Item>
                    }} />
                    <Table.Column title="名　称" dataIndex="" key="" render={(value, record, index) => {
                      return <Form.Item name={['tableData', index, 'exam_name']}>
                        <span>{record.exam_name}</span>
                      </Form.Item>
                    }} />
                    <Table.Column title="略　名" dataIndex="" key="" render={(value, record, index) => {
                      return <Form.Item name={['tableData', index, 'exam_short_name']}>
                        <span>{record.exam_short_name}</span>
                      </Form.Item>
                    }} />
                    <Table.Column title="タイプ" dataIndex="" key="" render={(value, record, index) => {
                      return <Form.Item name={['tableData', index, 'exam_type']}>
                        <span>{record.exam_type}</span>
                      </Form.Item>
                    }} />
                    <Table.Column title="使用" dataIndex="" key="" width="50px" align={'center'} render={(value, record, index) => {
                      return <span>O</span>
                    }} />
                  </Table>
                </div>

              </Col>

              <Col span={6}>
                <div hidden={this.formRef?.current?.getFieldValue("tableData")?.length > 0}>
                  <Table
                    size="small"
                    rowClassName={(record, index) => record.id === this.state.rowSelected[0]?.id ? 'table-row-light' : ''}
                    bordered
                    pagination={false}
                    scroll={{ y: 500 }}
                    loading={this.state.isLoading2}
                    dataSource={this.formRef.current ? this.formRef.current.getFieldValue('tableData2') : []}
                    rowKey={(record) => record.id}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: () => {
                          this.setState({
                            rowSelected: [record],
                            selectedRowKeys: [record.id],
                            indexTable: rowIndex
                          });
                          this.inspect();
                        }
                      };
                    }}>
                    <Table.Column title="名　称" dataIndex="" key="" render={(value, record, index) => {
                      return (
                        <Form.Item name={['tableData2', index, 'category_name']} >
                          <Input readOnly value={record.category_name} />
                        </Form.Item>
                      )
                    }} />
                  </Table>
                </div>
              </Col>

              <Col span={18}>
                <div hidden={this.formRef?.current?.getFieldValue("tableData")?.length > 0}>
                  <Table
                    size="small"
                    bordered

                    dataSource={this.formRef?.current?.getFieldValue('tableData3')}
                    loading={this.state.isLoading3}
                  // rowSelection={{
                  // }}
                  >
                    <Table.Column title="" dataIndex="" key="" width={"50px"} align="center" render={(value, record, index) => {
                      return (
                        <Form.Item name={['tableData3', index, 'W1_valid_invalid_1']}>
                          <Checkbox></Checkbox>
                        </Form.Item>
                      )
                    }} />
                    <Table.Column title="コード" dataIndex="" key="" width={"150px"} render={(value, record, index) => {
                      return (
                        <Form.Item name={['tableData3', index, 'test_item_code']}>
                          <Input type="number" value={record.test_item_code} readOnly />
                        </Form.Item>
                      )
                    }} />
                    <Table.Column title="名　称" dataIndex="" render={(value, record, index) => {
                      return (
                        <Form.Item name={['tableData3', index, 'exam_name']}>
                          <span>{record.exam_name}</span>
                        </Form.Item>
                      )
                    }} />
                    <Table.Column title="略　名" dataIndex="" render={(value, record, index) => {
                      return (
                        <Form.Item name={['tableData3', index, 'exam_short_name']}>
                          <span>{record.exam_short_name}</span>
                        </Form.Item>
                      )
                    }} />
                    <Table.Column title="タイプ" dataIndex="" render={(value, record, index) => {
                      return (
                        <Form.Item name={['tableData3', index, 'exam_type']}>
                          <span>{record.exam_type}</span>
                        </Form.Item>
                      )
                    }} />
                  </Table>
                </div>
              </Col>
            </Row>

            <Space style={{ float: 'right' }}>
              <Form.Item>
                {/** Link to other component */}
                <Button type="primary" onClick={() => this.f11()}>保　守</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={() => this.onSubmit()}>選　択</Button>
              </Form.Item>
            </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0270001_InspectItemSearchQueryMultipleChoice);
