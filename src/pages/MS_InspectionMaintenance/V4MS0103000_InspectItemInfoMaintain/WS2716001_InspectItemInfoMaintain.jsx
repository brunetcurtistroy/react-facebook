import React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { Card, Form, Input, Checkbox, Table, Row, Col, Space, Dropdown, Modal, Menu, message, InputNumber } from "antd";
import { getScreenDataAction, deleteDataAction } from "redux/InspectionMaintenance/InspectItemInfoMaintain/InspectItemInfoMaintain.actions";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS0253001_InternalInspectItemSearchQuery from 'pages/MS_InspectionMaintenance/V4MS0103000_InspectItemInfoMaintain/WS0253001_InternalInspectItemSearchQuery.jsx';
import WS2717011_InspectItem1ChangeSub from "./WS2717011_InspectItem1ChangeSub";
import WS2716057_InspectByPatternCategoryDisplay from "./WS2716057_InspectByPatternCategoryDisplay";
import WS0274001_InspectCmtSearchQuery from 'pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0274001_InspectCmtSearchQuery.jsx';
import Menubar from "components/Commons/Menubar";
import Color from "constants/Color";
import WS2705001_AnotherInspectItemSettingCategory from "../V4KB0011000_AnotherInspectItemSettingCategory/WS2705001_AnotherInspectItemSettingCategory";
import WS1043001_InspectRequestConvertMasterMaintain from "pages/KS_CooperationRelated/V4CP0002000_InspectRequestConvertMasterMaintain/WS1043001_InspectRequestConvertMasterMaintain";
import WS2700017_InspectItemConvertInternal from "pages/KS_CooperationRelated/V4CP0001000_InspectItemConvertInternal/WS2700017_InspectItemConvertInternal";
import WS0358001_InspectCmtInfoMaintain from "../V4MS0105000_ExamCmtInfoMaintain/WS0358001_InspectCmtInfoMaintain";

class WS2716001_InspectItemInfoMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査項目情報保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 13,
        size: 'small',
        showQuickJumper: true
      },
      initValue: {
        SearchChar: '',
        StsOnly: 0,
        InternalInspectCode: ''
      },
      dataSource: [],
      isLoadingPage: false,
      colorText: 208,

      menuItems: [
        { id: 1, label: '新規', handleClick: this.eventF4 },
        { id: 2, label: 'ｺﾒﾝﾄ情報保守', handleClick: this.eventF8 },
        { id: 3, label: 'ｶﾃｺﾞﾘ別検査項目設定', handleClick: this.eventF9 },
        { id: 4, label: '検査依頼変換', handleClick: this.eventF10 },
        { id: 5, label: '検査項目変換', handleClick: this.eventF11 },
      ]
    };
  }

  componentDidMount = () => {
    this.loadData(this.state.initValue)
  }

  loadData = (params) => {
    this.setState({ isLoadingPage: true });
    getScreenDataAction(params)
      .then(res => {
        if (res) {
          let data = res.data.map((item, index) => ({ ...item, id: index }))
          this.setState({ dataSource: data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoadingPage: false }))
  }

  handleChangeValue = (objChange) => {
    this.setState({
      initValue: {
        ...this.state.initValue,
        ...objChange
      }
    }, debounce(() => this.loadData(this.state.initValue), 500));
  }

  showWInternalInspectItemSearchQuery = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS0253001_InternalInspectItemSearchQuery
            Lio_InternalInspectCode={this.formRef.current?.getFieldValue("InternalInspectCode")}
            Li_Select={2}
            onFinishScreen={(output) => {
              this.formRef.current.setFieldsValue({
                internal_exam_code: output.Lio_InternalInspectCode,
                InternalInspectCode: output.Lio_InternalInspectCode,
                exam_name: output.recordData.exam_name
              })
              this.handleChangeValue({ InternalInspectCode: output.Lio_InternalInspectCode })
              // IF((InternalInspectCode MOD 100000)=0,253,IF((InternalInspectCode MOD 10000)=0,254,IF((InternalInspectCode MOD 1000)=0,255,208)))
              let colorText = 208;
              if (output.Lio_InternalInspectCode % 100000 === 0) {
                colorText = 253;
              } else if (output.Lio_InternalInspectCode % 10000 === 0) {
                colorText = 254;
              } else if (output.Lio_InternalInspectCode % 1000 === 0) {
                colorText = 255;
              }
              this.setState({ colorText })
              this.closeModal()
            }}
          />),
      },
    })
  }

  eventF4 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component: (
          <WS2717011_InspectItem1ChangeSub
            Lio_InspectCode={0}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />),
      },
    })
  }

  eventF8 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS0358001_InspectCmtInfoMaintain
            onFinishScreen={() => {
              this.closeModal()
            }}
          />),
      },
    })
  }

  eventF9 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS2705001_AnotherInspectItemSettingCategory
            onFinishScreen={() => {
              this.closeModal()
            }}
          />),
      },
    })
  }

  eventF10 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS1043001_InspectRequestConvertMasterMaintain
            onFinishScreen={() => {
              this.closeModal()
            }}
          />),
      },
    })
  }

  eventF11 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS2700017_InspectItemConvertInternal
            onFinishScreen={() => {
              this.closeModal()
            }}
          />),
      },
    })
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
      <div className="inspect-item-info-maintain">
        <Card title="検査項目情報保守">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <Menubar items={this.state.menuItems} />
            <Row className='mt-3'>
              <Col span={8} >
                <Form.Item name="SearchChar" label="検索">
                  <Input maxLength={256} onChange={(e) => this.handleChangeValue({ SearchChar: e.target.value })} />
                </Form.Item>
              </Col>
              <Col span={3} style={{ textAlign: 'center' }}>
                <Form.Item name="StsOnly" valuePropName="checked" >
                  <Checkbox onChange={(e) => this.handleChangeValue({ StsOnly: e.target.value ? 1 : 0 })}>使用</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Space>
                  <Form.Item name="InternalInspectCode" label="内部ｺｰﾄﾞ">
                    <InputNumber
                      maxLength={8}
                      onChange={(value) => {
                        this.formRef.current.setFieldsValue({ exam_name: '' })
                        this.handleChangeValue({ InternalInspectCode: value })
                      }}
                      onDoubleClick={this.showWInternalInspectItemSearchQuery}
                    />
                  </Form.Item>
                  <Form.Item name='exam_name'>
                    <Input bordered={false} readOnly style={{ color: Color(this.state.colorText).Foreground }} />
                  </Form.Item>
                </Space>
              </Col>
            </Row>
            <Table
              bordered
              className='mt-3'
              dataSource={this.state.dataSource}
              rowKey={(record) => record.id}
              pagination={this.state.pagination}
              size="small"
              loading={this.state.isLoadingPage}
            >
              <Table.Column title="コード" dataIndex="test_item_code" render={(value) => (
                <div style={{ textAlign: 'right' }}>{value === 0 ? null : value}</div>
              )} />
              <Table.Column title="略名" dataIndex="exam_short_name" />
              <Table.Column title="検査名称" dataIndex="exam_name" />
              <Table.Column title="タイプ" width={100} dataIndex="InspectType" />
              <Table.Column title="判定" dataIndex="StsJudgeCode" align='center' render={(value, record, index) => (
                <Checkbox checked={value} disabled />
              )} />
              <Table.Column title="日付" dataIndex="StsType" align='center' render={(value, record, index) => (
                <Checkbox checked={value} disabled />
              )} />
              <Table.Column title="コメント" dataIndex="exam_comment_code" render={(value) => (
                <div style={{ textAlign: 'right' }}>{value === 0 ? null : value}</div>
              )} />
              <Table.Column title="コメント内容" dataIndex="exam_comment_screen" />
              <Table.Column title="単位" dataIndex="unit" />
              <Table.Column title="内部ｺｰﾄﾞ" dataIndex="internal_exam_code" render={(value) => (
                <div style={{ textAlign: 'right' }}>{value === 0 ? null : value}</div>
              )} />
              <Table.Column title="内部検査名称" dataIndex="exam_name" />
              <Table.Column title="使用" align='center' dataIndex="Expression_15" />
              <Table.Column width={60} render={(text, record, index) => (
                <Dropdown.Button size='small' trigger='click' overlay={() => (
                  <Menu >
                    <Menu.Item onClick={() => (
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 600,
                          component: (
                            <WS2717011_InspectItem1ChangeSub
                              Lio_InspectCode={0}
                              onFinishScreen={() => {
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
                    )}>新規</Menu.Item>
                    <Menu.Item onClick={() => (
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          centered: true,
                          width: 600,
                          component: (
                            <WS2717011_InspectItem1ChangeSub
                              Lio_InspectCode={record.test_item_code}
                              onFinishScreen={() => {
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
                    )}>修正</Menu.Item>
                    <Menu.Item onClick={() => {
                      const params = {
                        StsCategoryInspectBreakdown: record.StsCategoryInspectBreakdown,
                        test_item_code: record.test_item_code
                      }
                      if (record.StsCategoryInspectBreakdown === 1) {
                        message.error('カテゴリに登録済みの検査は削除できません。');
                      } else {
                        Modal.confirm({
                          content: "削除を行いますか",
                          onOk: () => {
                            deleteDataAction(params)
                              .then(() => {
                                message.success('成功');
                                this.loadData(this.state.initValue);
                              })
                              .catch(() => message.success('エラー'))
                          }
                        })
                      }
                    }}>削除</Menu.Item>
                    <Menu.Item
                      style={{ display: record.exam_comment_code > 0 ? '' : 'none' }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            centered: true,
                            width: 600,
                            component: (
                              <WS0274001_InspectCmtSearchQuery
                                Lio_CmtClassify={record.exam_comment_code}
                                onFinishScreen={(data) => {
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
                      }}>コメント照会</Menu.Item>
                    <Menu.Item
                      style={{ display: record.StsCategoryInspectBreakdown ? '' : 'none' }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            centered: true,
                            width: '60%',
                            component: (
                              <WS2716057_InspectByPatternCategoryDisplay
                                Li_InspectCode={record.test_item_code}
                                onFinishScreen={(data) => {
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
                      }}>カテゴリ表示</Menu.Item>
                  </Menu>
                )}></Dropdown.Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2716001_InspectItemInfoMaintain);
