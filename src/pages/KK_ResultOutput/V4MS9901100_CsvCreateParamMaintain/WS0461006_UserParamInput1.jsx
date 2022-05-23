import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Form, Input, Select, Checkbox, Row, Col, Space, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS0487001_ConditionExpressAddSub from 'pages/MS_InspectionMaintenance/V4MS0106300_ConditionExpressCmtSetting/WS0487001_ConditionExpressAddSub.jsx';
import WS0454003_ConvertTblSubInspect from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0454003_ConvertTblSubInspect.jsx';
import WS0454004_ConvertTblSubAll from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0454004_ConvertTblSubAll.jsx';
class WS0461006_UserParamInput1 extends React.Component {

  static propTypes = {
    Li_Format: PropTypes.any,
    Li_Name: PropTypes.any,

    Lio_Type: PropTypes.any,
    Lio_Attribute: PropTypes.any,
    Lio_NumOfDigits: PropTypes.any,
    Lio_Position: PropTypes.any,
    Lio_SetPattern: PropTypes.any,
    Lio_ErrorCheck: PropTypes.any,
    Lio_Option: PropTypes.any,

    Li_IndicationDivision: PropTypes.any,
    Li_ExcludedItems: PropTypes.any,
    Lio_StsChange: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'ユーザーパラメータ入力1';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRowsAdvanseting: [],
      selectedRowsOptionInput: [],
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

  render() {
    return (
      <div className="user-param-input1">
        <Card title="ユーザーパラメータ入力1">
          <Row gutter={24}>
            <Col span={14}>
              <Table
                dataSource={[{ id: 1, W1_serial_num: 10, W1_item: '所見', W1_content: 'AV4S01' }]}
                loading={false}
                pagination={false}
                bordered={true}
                rowKey={(record) => record.id}
                rowSelection={{
                  type: 'radio',
                  onChange: async (selectedRowKeys, selectedRows) => {
                    await this.setState({
                      selectedRowsAdvanseting: selectedRows
                    })
                  }
                }}
              >
                <Table.Column title="連番" dataIndex="W1_serial_num" key="" />
                <Table.Column title="項目" dataIndex="W1_item" key="" />
                <Table.Column title="内容" dataIndex="W1_content" key="" />

              </Table>
            </Col>
            <Col span={10}>
              <Form style={{marginBottom: '10px'}}>
                <Row gutter={24}>
                  <Col span={8} style={{ paddingRight: '0' }}>
                    <label>タイトル</label>
                  </Col>
                  <Col span={16} style={{ paddingLeft: '0' }}>
                    <Form.Item style={{marginBottom: '0'}}
                      name="Heading"
                      label=""
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8} style={{ paddingRight: '0' }}>
                    <Form.Item style={{marginBottom: '0'}}
                      name="Expression_15"
                      label=""
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={16} style={{ paddingLeft: '0' }}>
                    <Form.Item style={{marginBottom: '0'}}
                      name="Lio_SetPattern"
                      label=""
                    >
                      <Select>
                        <Select.Option value=""></Select.Option>

                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={8} style={{ paddingRight: '0' }}>
                    <Form.Item style={{marginBottom: '0'}}
                      name="Expression_16"
                      label=""
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={16} style={{ paddingLeft: '0' }}>
                    <Space>
                      <Form.Item style={{marginBottom: '0'}}
                        name="Expression_17"
                        label=""
                      >
                        <Input type="text" />
                      </Form.Item>
                      <Form.Item style={{marginBottom: '0'}}
                        name="check"
                        label=""
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
              </Form>

              <Table
                dataSource={[{ id: 1, seq: 10, Name: '所見', kind: 'AV4S01' }]}
                loading={false}
                pagination={false}
                bordered={true}
                rowKey={(record) => record.id}
                rowSelection={{
                  type: 'radio',
                  onChange: async (selectedRowKeys, selectedRows) => {
                    await this.setState({
                      selectedRowsOptionInput: selectedRows
                    })
                  }
                }}
              >
                <Table.Column title="順" dataIndex="seq" key="" />
                <Table.Column title="種別" dataIndex="kind" key="" />
                <Table.Column title="名称" dataIndex="Name" key=""
                  render={(value, record) => {
                    return (
                      <div>
                        <span style={{ cursor: 'pointer' }} onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '70%',
                              component: (
                                <WS0487001_ConditionExpressAddSub
                                  Lo_Setting={this.state.selectedRowsAdvanseting.W1_content}
                                  onFinishScreen={({ output }) => {


                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                        }}>{record.Name}</span>
                      </div>
                    )
                  }}
                />

              </Table>

              <TextArea name="remarks" rows={3} type="text" />
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0461006_UserParamInput1);
