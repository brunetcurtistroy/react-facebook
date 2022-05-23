import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Row, Col, Form, Input, Button, Space, Modal } from "antd";
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle";
import WS0887001_IntroduceLetterVariousMasterInquiry from "../V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry";
const dataSource = [
  {
    id: 1,
    comment_code: 60000,
    regional_insurer_group_classifi: 200,
    category_name: 'New cate 1',
  },
  {
    id: 2,
    comment_code: 60001,
    regional_insurer_group_classifi: 201,
    category_name: 'New cate 2',
  },
  {
    id: 3,
    comment_code: 60002,
    regional_insurer_group_classifi: 202,
    category_name: 'New cate 3',
  }
]
const formData = [
  {
    exam_code: 6801,
    fieldnothing: 'nothing 1',
    department_code: 10,
    department_name: 'text 1',
    remarks: 'no text here',
  },
  {
    exam_code: 6802,
    fieldnothing: 'nothing 2',
    department_code: 14,
    department_name: 'text 2',
    remarks: 'no text here',
  },
  {
    exam_code: 6803,
    fieldnothing: 'nothing 3',
    department_code: 14,
    department_name: 'text 3',
    remarks: 'no text here',
  },
  {
    exam_code: 6804,
    fieldnothing: 'nothing 4',
    department_code: 14,
    department_name: 'text 4',
    remarks: 'no text here',
  },
  {
    exam_code: 6805,
    fieldnothing: 'nothing 5',
    department_code: 310,
    department_name: 'text 5',
    remarks: 'no text here',
  }
]
class WS0920003_IntroduceLetterTargetCmtMaintainAmks extends React.Component {
  constructor(props) {
    super(props);
    // document.title = '紹介状対象コメント保守[AMKS]';
    this.formRef = React.createRef();
    this.state = {
      rowSelected: [],
      selectedRowKeys: [],
      loading: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  componentDidMount() {
    this.formRef.current.setFieldsValue({ tableData: dataSource })
    this.forceUpdate();
  }

  changeRow = () => {
    // Logic call api by params
    setTimeout(() => {
      this.setState({ loading: false });
      this.formRef.current.setFieldsValue({
        tableData2: formData
      })
      this.forceUpdate();
    }, 1000)
  }
  InspectItemSearchQuerySingle = (condition = null) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0271001_InspectItemSearchQuerySingle
            onFinishScreen={(output) => {
              this.setDataOutput(condition, output)
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  IntroduceLetterVariousMasterIn = (condition = null) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0887001_IntroduceLetterVariousMasterInquiry
            onFinishScreen={(output) => {
              this.setDataOutput(condition, output)
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  setDataOutput = (condition, output) => {
    console.log(condition, output)
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onFinish = (val) => {
    console.log('finish:', val)
  }



  F9 = () => {
    console.log('f9');
  }
  F11 = () => {
    console.log('f11');
  }
  render() {
    return (
      <div className="introduce-letter-target-cmt-maintain-amks">
        <Card title="紹介状対象コメント保守[AMKS]">
          <Space className="mb-3">
            <Button size="normal" type="primary" onClick={this.F9}>ｺﾒﾝﾄ一覧</Button>
            <Button size="normal" type="primary" onClick={this.F11}>検査項目</Button>
          </Space>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={6}>

              <Col span={8}>
                <Table
                  size="small"
                  bordered
                  dataSource={this.formRef.current ? this.formRef.current.getFieldValue('tableData') : []}
                  loading={this.state.loading}
                  pagination={false}
                  rowKey={(record) => record.id}
                  rowSelection={{
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKeys,
                    onSelect: (record, selected, selectedRows) => {
                      this.setState({
                        rowSelected: selectedRows,
                        selectedRowKeys: selectedRows.map(x => x.id),
                        loading: true,
                      });
                      this.changeRow();
                    },
                  }}
                >
                  <Table.Column title="連番" dataIndex="" key=""
                    render={(value, record, index) => {
                      return (
                        <Form.Item name={['tableData', index, 'comment_code']}>
                          <span>
                            {record.comment_code || 'Comment Code'}
                          </span>
                        </Form.Item>
                      )
                    }} />
                  <Table.Column title="カテゴリ" dataIndex="" key=""
                    render={(value, record, index) => {
                      return (
                        <Input.Group compact>
                          <Col span={8}>
                            <Form.Item name={['tableData', index, 'regional_insurer_group_classifi']} style={{ margin: 0 }}>
                              <Input type="number" readOnly />
                            </Form.Item>
                          </Col>
                          <Col span={16}>
                            <Form.Item name={['tableData', index, 'category_name']} style={{ margin: 0 }}>
                              <span style={{ paddingLeft: 5 }}>
                                {record.category_name || 'undefined'}
                              </span>
                            </Form.Item>
                          </Col>
                        </Input.Group>
                      )
                    }} />
                </Table>
              </Col>
              <Col span={16}>
                <Table
                  size="small"
                  bordered
                  dataSource={this.formRef.current ? this.formRef.current.getFieldValue('tableData2') : []}
                  loading={this.state.loading}
                >
                  <Table.Column title="検査情報" width="30%" dataIndex="" key="" render={(value, record, index) => {
                    return (
                      <Input.Group compact>
                        <Col span={10}>
                          <Form.Item name={['tableData2', index, 'exam_code']} style={{ margin: 0 }}>
                            <Input.Search
                              style={{ paddingLeft: 5, margin: 0, border: 'none' }}
                              readOnly
                              onSearch={() => this.InspectItemSearchQuerySingle()}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={14}>
                          <Form.Item name={['tableData2', index, 'fieldnothing']} style={{ margin: 0 }}>
                            <span style={{ paddingLeft: 5, margin: 0 }}>
                              {record.fieldnothing}
                            </span>

                          </Form.Item>
                        </Col>
                      </Input.Group>
                    )
                  }} />
                  <Table.Column title="診療科" width="30%" dataIndex="" key="" render={(value, record, index) => {
                    return (
                      <Input.Group compact>
                        <Col span={10}>
                          <Form.Item name={['tableData2', index, 'department_code']} style={{ margin: 0 }}>
                            <Input.Search
                              type="number"
                              style={{ paddingLeft: 5, margin: 0 }}
                              onSearch={() => this.IntroduceLetterVariousMasterIn()}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={14}>
                          <Form.Item name={['tableData2', index, 'department_name']} style={{ margin: 0 }}>
                            <span style={{ paddingLeft: 5, margin: 0 }}>
                              {record.department_name}
                            </span>
                          </Form.Item>
                        </Col>
                      </Input.Group>
                    )
                  }} />
                  <Table.Column title="備考" width="40%" dataIndex="" key="" render={(value, record, index) => {
                    return (
                      <Form.Item name={['tableData2', index, 'remarks']} style={{ margin: 0 }}>
                        <Input style={{ border: 0 }} />
                      </Form.Item>
                    )
                  }} />
                </Table>
              </Col>
            </Row>
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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0920003_IntroduceLetterTargetCmtMaintainAmks);
