import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Checkbox, Table, Row, Col, DatePicker, Dropdown, Menu, Modal, InputNumber, message, Button, Space } from "antd";
import { SaveOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS0483001_ConditionExpressCmtSub from 'pages/MS_InspectionMaintenance/V4MS0106300_ConditionExpressCmtSetting/WS0483001_ConditionExpressCmtSub.jsx';
import WS0482011_CmtContentModification from 'pages/MS_InspectionMaintenance/V4MS0106300_ConditionExpressCmtSetting/WS0482011_CmtContentModification.jsx';
import ConditionExpressCmtSettingAction from "redux/InspectionMaintenance/ConditionExpressCmtSetting/ConditionExpressCmtSetting.action";
import moment from "moment";
class WS0482001_ConditionExpressCmtSetting extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '条件式コメント設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      CommentGroup: [],

      dataSource: [],
      isLoadingTable: true,

    };
  }

  componentDidMount() {
    this.getCommentGroupCombBox();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getCommentGroupCombBox();
    }
  }


  getCommentGroupCombBox() {
    ConditionExpressCmtSettingAction.getCommentGroupCbx()
      .then((res) => {
        this.setState({
          CommentGroup: res ? res : []
        })

        this.formRef.current?.setFieldsValue({
          CommentGroup: res && res.length > 0 ? res[0].CommentGroup : ''
        })

        this.getDataTeachChingItemList();
      })
  }

  getDataTeachChingItemList() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      SpecifiedDateChar: this.formRef.current?.getFieldValue('SpecifiedDateChar')?.format("YYYY/MM/DD"),
      dataTableEnabled: []
    }

    this.setState({ isLoadingTable: true })
    ConditionExpressCmtSettingAction.getDataTeachChingItemList(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false
        })

        this.formRef.current?.setFieldsValue({
          dataTableEnabled: res ? res.map(x => x.StsEnable) : [],
        })
      })
      .finally(() => {
        this.setState({ isLoadingTable: false })
      })
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  updateDatasources(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });

    this.formRef.current?.setFieldsValue({
      dataTableEnabled: data ? data.map(x => x.StsEnable) : [],
    })
  }

  updateTeachChingItemList(index) {
    let param = {
      ...this.state.dataSource[index],
      StsEnable: this.state.dataSource[index].StsEnable ? 1 : 0
    }

    ConditionExpressCmtSettingAction.updateTeachChingItemList(param)
      .then(res => {
        message.success('更新しました。!');
        this.getDataTeachChingItemList();
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  deleteStartDateOn(index) {
    let param = {
      comment_code: this.state.dataSource[index].comment_code
    }

    ConditionExpressCmtSettingAction.deleteDateTeachChingItemList(param)
      .then(res => {
        message.success('正常に削除されました !');
        this.getDataTeachChingItemList();
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  onFinish(values) { }

  render() {
    return (
      <div className="condition-express-cmt-setting">
        <Form ref={this.formRef} onFinish={this.onFinish}
          initialValues={{
            SpecifiedDateChar: moment(new Date()),
            AlreadySet: 0
          }}>
          <Card title="条件式コメント設定" className="mb-3">
            <Row gutter={24} className='mb-3'>
              <Col span={8}>
                <div>
                <Form.Item name="SearchChar" style={{width: 'calc(100% - 75px)', float: 'left'}}>
                  <Input/>
                </Form.Item>
                <Button type="primary" style={{width: '70px', float: "right"}} onClick={() => {this.getDataTeachChingItemList()}}>検索</Button>
                </div>
              </Col>
              <Col span={5}>
                <Form.Item name="CommentGroup" label="ｺﾒﾝﾄ群" >
                  <Select onChange={(value) => { this.getDataTeachChingItemList() }}>
                    {this.state.CommentGroup?.map(value => (
                      <Select.Option key={"CommentGroup" + Math.random()} value={value.CommentGroup}>{value.CommentGroup}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="SpecifiedDateChar" label="指定日付" >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD' onChange={() => { this.getDataTeachChingItemList() }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="AlreadySet" label="設定" valuePropName="checked" >
                  <Checkbox onChange={(event) => {
                    this.formRef.current?.setFieldsValue({ AlreadySet: event.target.checked ? 1 : 0 });
                    this.getDataTeachChingItemList();
                  }} />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card>
            <Table size='small'
              bordered
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={true}
              rowKey={(record) => record.id}
            >
              <Table.Column title="条件" dataIndex="StsEnable"
                render={(value, record, index) => {
                  return (
                    <div>
                      {record.start_date_on ?
                        <Form.Item name={["dataTableEnabled", this.findIndexByID(this.state.dataSource, record.id), "StsEnable"]} style={{ marginBottom: 0 }}>
                          <Checkbox checked={record.StsEnable}
                            onChange={(event) => {
                              this.updateDatasources(this.findIndexByID(this.state.dataSource, record.id), "StsEnable", event.target.checked)
                            }}
                          ></Checkbox>
                        </Form.Item>
                        : ''
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="コード" dataIndex="comment_code" />
              <Table.Column title="指導内容" dataIndex="comment_content" />
              <Table.Column title="コメント群" dataIndex="comment_group"
                render={(value, record, index) => {
                  return (
                    <Input value={record.comment_group}
                      onChange={(event) => {
                        this.updateDatasources(this.findIndexByID(this.state.dataSource, record.id), "comment_group", event.target.value)
                      }}
                    />
                  )
                }} />
              <Table.Column title="重み" dataIndex="WeightOfJudge"
                render={(value, record, index) => {
                  return (
                    <InputNumber maxLength={4} min={0} value={record.WeightOfJudge}
                      formatter={value => `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      onChange={(value) => {
                        this.updateDatasources(this.findIndexByID(this.state.dataSource, record.id), "WeightOfJudge", value)
                      }}
                    />
                  )
                }}
              />
              <Table.Column title="優先" dataIndex="priority"
                render={(value, record, index) => {
                  return (
                    <InputNumber maxLength={4} min={0} value={record.priority}
                      formatter={value => `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      onChange={(value) => {
                        this.updateDatasources(this.findIndexByID(this.state.dataSource, record.id), "priority", value)
                      }}
                    />
                  )
                }}
              />
              <Table.Column title="適用日" dataIndex="start_date_on" />
              <Table.Column width={70} render={(text, record, index) => (
                <Dropdown.Button size='small' overlay={() => (
                  <Menu >
                    <Menu.Item onClick={() => (
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1500,
                          component: (
                            <WS0483001_ConditionExpressCmtSub
                              Li_GuideMattersCode={record.comment_code}
                              Li_AdoptionDate={record.start_date_on}
                              Li_CommentContent={record.comment_content}
                              onFinishScreen={(output) => {
                                this.getDataTeachChingItemList();
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      })
                    )}>条イ牛矮更</Menu.Item>
                    <Menu.Item onClick={() => {
                      if (record.start_date_on) {
                        Modal.confirm({
                          content: "削除を実行しますか ?",
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => {
                            this.deleteStartDateOn(this.findIndexByID(this.state.dataSource, record.id));
                          },
                        })
                      }
                    }}>条イ牛削除</Menu.Item>
                    <Menu.Item onClick={() => (
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          centered: true,
                          width: 500,
                          component: (
                            <WS0482011_CmtContentModification
                              Lio_CommentContent={record.comment_content}
                              onFinishScreen={({ Lio_CommentContent }) => {
                                this.updateDatasources(this.findIndexByID(this.state.dataSource, record.id), "comment_content", Lio_CommentContent)
                                this.updateTeachChingItemList(this.findIndexByID(this.state.dataSource, record.id))
                                this.closeModal()
                              }}
                            />
                          ),
                        },
                      })
                    )}>文言変吏</Menu.Item>

                  </Menu>
                )}></Dropdown.Button>
              )}
              />
              <Table.Column width={60} fixed={'right'}
                render={(text, record, index) => {
                  return <div style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => { this.updateTeachChingItemList(this.findIndexByID(this.state.dataSource, record.id)) }}
                      style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                      icon={<SaveOutlined />} >
                    </Button>
                  </div>
                }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0482001_ConditionExpressCmtSetting);
