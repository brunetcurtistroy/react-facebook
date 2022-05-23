import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Checkbox, Select, Table, Row, Col, Button, Space, Dropdown, Menu, message, Modal } from "antd";

import WS2713087_FormatCopy from 'pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS2713087_FormatCopy.jsx';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS0285001_JudgeQuery from 'pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery.jsx';
import WS0274001_InspectCmtSearchQuery from 'pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0274001_InspectCmtSearchQuery.jsx';
import WS0178001_QuerySiteInfo from 'pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0178001_QuerySiteInfo.jsx';
import WS0179001_InquiryFindingInfo from 'pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0179001_InquiryFindingInfo.jsx';

const labelCol = {
  span: 4
}
const styleFormItem = {
  margin: 0,
}
class WS2713014_NormalValueSetting extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '正常値設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  onFinish(values) { }

  render() {
    return (
      <div className="normal-value-setting">
        <Card title="正常値設定">
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{ Pattern: 1 }}>
            <Row gutter={24} className='mb-3'>
              <Col span={8}>
                <Form.Item name="SearchChar" label="検索" >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item name="StsUse" label="使用" valuePropName="checked" >
                  <Checkbox />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item name="StsConfigured" label="設定済み" valuePropName="checked" >
                  <Checkbox />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="Pattern" label="パターン" >
                  <Select >
                    <Select.Option value="1"></Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={4} >
                <Table style={{ borderRight: '1px solid #F0F0F0' }} dataSource={[{}]} rowKey={record => record.id}>
                  <Table.Column title="フォーマット" dataIndex="format" />
                  <Table.Column title="使用中" dataIndex="Expression_10" />
                  <Table.Column render={(text, record, index) => (
                    <Dropdown.Button size='small' overlay={() => (
                      <Menu >
                        <Menu.Item onClick={() => {
                          if (record.format === 'UserFormat') {
                            message.error('使用中のフォーマットは削除できません');
                          } else {
                            Modal.confirm({
                              content: "削除を行いますか",
                              onOk: () => {
                                // do something
                              },
                              okText: 'は　い',
                              cancelText: 'いいえ',
                            })
                          }
                        }}>削除</Menu.Item>
                        <Menu.Item onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              centered: true,
                              width: '80%',
                              component: (
                                <WS2713087_FormatCopy
                                  Lio_FormatCopySource={record.format}
                                  onClick={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />
                              ),
                            },
                          })
                        }}>複写</Menu.Item>
                      </Menu>
                    )}></Dropdown.Button>
                  )}
                  />
                </Table>
                <Form.Item style={{ float: 'right', marginRight: '1rem' }} className='mt-3'>
                  <Button type='primary'>複写</Button>
                </Form.Item>
              </Col>
              <Col span={20}>
                <Row>
                  <Col span={16} >
                    <Table style={{ borderRight: '1px solid #F0F0F0' }} dataSource={[{}]} rowKey={record => record.id}>
                      <Table.Column title="検　査" dataIndex="InspectCodeTbl" />
                      <Table.Column title="名　称" dataIndex="InspectNameTbl" />
                      <Table.Column title="タイプ" dataIndex="TypeTbl" />
                      <Table.Column title="判定" dataIndex="Expression_49" />
                      <Table.Column title="規定値" dataIndex="Expression_50" />
                      <Table.Column title="使用" dataIndex="Expression_44" />
                    </Table>
                  </Col >
                  <Col span={8} style={{ paddingLeft: '7px' }}>
                    <Form.Item label='検査設定' labelCol={labelCol}>
                      <Button type='primary' style={{ float: 'right' }}>新規</Button>
                    </Form.Item>
                    <div style={{ border: '1px solid #F0F0F0', padding: '7px' }}>
                      <Form.Item label="検査" labelCol={labelCol} style={{ ...styleFormItem, marginTop: '1rem' }}>
                        <Space>
                          <Form.Item name="kind">
                            <Input.Search onSearch={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 500,
                                  component: (<WS0271001_InspectItemSearchQuerySingle
                                    Lio_InspectItemCode = {''}
                                    Li_UnusedInspectDisplay = {''}
                                    onFinishScreen={() => {
                                      this.formRef.current.setFieldsValue({
                                        Judge: ''
                                      });
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: false,
                                        }
                                      });
                                    }}
                                  />),
                                },
                              })
                            }} />
                          </Form.Item>
                          <Form.Item>
                            <span>remarks</span>
                          </Form.Item>
                        </Space>
                      </Form.Item>
                      <Form.Item label="タイプ" labelCol={labelCol} style={styleFormItem}>
                        <Space>
                          <Form.Item >
                            <span>Expression_48</span>
                          </Form.Item>
                          <Form.Item>
                            <span>exam_type</span>
                          </Form.Item>
                        </Space>
                      </Form.Item>
                    </div>

                    <Form.Item label='規定値設定' labelCol={{ span: 4 }} className='mt-3'></Form.Item>
                    <div style={{ border: '1px solid #F0F0F0', padding: '7px' }}>
                      <Form.Item name="Judge" label='判定' labelCol={labelCol} style={{ marginTop: '1rem' }}>
                        <Input.Search onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 500,
                              component: (<WS0285001_JudgeQuery
                                Li_JudgeLevel = {''}
                                Lio_Judge = {''}
                                onFinishScreen={() => {
                                  this.formRef.current.setFieldsValue({
                                    Judge: ''
                                  });
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    }
                                  });
                                }}
                              />),
                            },
                          })
                        }} />
                      </Form.Item>
                      <Form.Item name="InspectResults" label='検査結果' labelCol={labelCol}>
                        <Input.Search onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 500,
                              component: (<WS0274001_InspectCmtSearchQuery
                                Lio_CommentsClassify = {''}
                                LnkOutInspectCommentsScreen = {''}
                                onFinishScreen={() => {
                                  this.formRef.current.setFieldsValue({
                                    Judge: ''
                                  });
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    }
                                  });
                                }}
                              />),
                            },
                          })
                        }} />
                      </Form.Item>
                      <Form.Item label="部位" labelCol={labelCol} style={styleFormItem}>
                        <Space>
                          <Form.Item name="SiteCode">
                            <Input.Search onSearch={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 500,
                                  component: (<WS0178001_QuerySiteInfo
                                    Li_SiteClassify
                                    Lo_SiteCode
                                    onFinishScreen={() => {
                                      this.formRef.current.setFieldsValue({
                                        Judge: ''
                                      });
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: false,
                                        }
                                      });
                                    }}
                                  />),
                                },
                              })
                            }} />
                          </Form.Item>
                          <Form.Item>
                            <span>Expression_53</span>
                          </Form.Item>
                        </Space>
                      </Form.Item>
                      <Form.Item label="所見" labelCol={labelCol} style={styleFormItem}>
                        <Space>
                          <Form.Item name="FindingsCode">
                            <Input.Search onSearch={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 500,
                                  component: (<WS0179001_InquiryFindingInfo
                                    Li_FindingsClassify
                                    Lo_FindingsCode
                                    Lo_JudgeValue
                                    onFinishScreen={() => {
                                      this.formRef.current.setFieldsValue({
                                        Judge: ''
                                      });
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: false,
                                        }
                                      });
                                    }}
                                  />),
                                },
                              })
                            }} />
                          </Form.Item>
                          <Form.Item>
                            <span>Expression_54</span>
                          </Form.Item>
                        </Space>
                      </Form.Item>
                      <Form.Item label='規定値' labelCol={labelCol}>
                        <span>Expression_50</span>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2713014_NormalValueSetting);
