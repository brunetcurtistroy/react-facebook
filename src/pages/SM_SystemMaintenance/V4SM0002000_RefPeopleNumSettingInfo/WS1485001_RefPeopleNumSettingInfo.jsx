import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Button, Table, Row, Col, Space, DatePicker, Modal } from "antd";

import WS1485009_NewHistory from 'pages/SM_SystemMaintenance/V4SM0002000_RefPeopleNumSettingInfo/WS1485009_NewHistory.jsx';
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import WS1485016_HistorySelect from "./WS1485016_HistorySelect";

class WS1485001_RefPeopleNumSettingInfo extends React.Component {
  formRef = React.createRef();
  formRefTable = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '基準人数設定情報';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: false,
    };
  }

  loadData(values) {
    this.formRefTable.current.setFieldsValue({
      dataTable: [],
    });
  }

  onFinish(values) {

  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  customFieldHistory(value) {
    let date = value; // custom if needed
    this.formRef.current.getFieldValue({
      History: date
    })
  }

  render() {
    return (
      <div className="ref-people-num-setting-info">
        <Card title="基準人数設定情報">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              ManageDivision: 1
            }}
          >
            <Row gutter={24}>
              <Col span={5}>
                <Form.Item
                  name="ManageDivision"
                  label="管理区分">
                  <Select>
                    <Select.Option value={1}>ｺｰｽ</Select.Option>
                    <Select.Option value={2}>検査</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name="FacilityType"
                  label="施設区分">
                  <Select>
                    <Select.Option value=""></Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Space>
                  <Form.Item
                    name="History"
                    label="履歴">
                    <Input.Search type="text" readOnly
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 600,
                            component: (
                              <WS1485016_HistorySelect
                                Lio_History={this.formRef.current.getFieldValue('History')}
                                onFinishScreen={(output) => {
                                  this.customFieldHistory(output.Lio_History)
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary"
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 600,
                            component: (
                              <WS1485009_NewHistory
                                onFinishScreen={(output) => {

                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    >新規</Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary"
                      onClick={() => {
                        let date = this.formRef.current.getFieldValue('History')
                        if (!date || date === 0) {
                          let message = '「' + date + '」の履歴は削除できません'
                          Modal.error({
                            width: 350,
                            title: message,
                            okText: 'OK'
                          })
                        } else {
                          let message = '「' + date + '」の履歴を削除しますか？'
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 420,
                              component: (
                                <WS0061015_CheckYesNoNo
                                  Li_Title={'履歴削除'}
                                  Li_Message={message}
                                  onFinishScreen={(output) => {
                                    if (output.Lio_StsReturn) {
                                      // get api
                                    }
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }
                      }}
                    >削除</Button>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          </Form>
          <Form
            ref={this.formRefTable}
            onFinish={this.onFinish}
            initialValues={{
              ManageDivision: 1
            }}
          >
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={true}
              bordered={true}
              rowKey={(record) => record.id}
              scroll={{ x: 1000 }}
            >
              <Table.Column title="曜日" dataIndex="Expression_25" />
              <Table.Column title="時間帯" dataIndexlimit_02="time_type" />
              <Table.Column title="0001" dataIndex="limit_01"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_01"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0002" dataIndex="limit_02"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_02"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0003" dataIndex="limit_03"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_03"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0004" dataIndex="limit_04"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_04"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0005" dataIndex="limit_05"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_05"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0006" dataIndex="limit_06"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_06"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0007" dataIndex="limit_07"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_07"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0008" dataIndex="limit_08"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_08"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0009" dataIndex="limit_09"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_09"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0010" dataIndex="limit_10"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_10"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0011" dataIndex="limit_11"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_11"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0012" dataIndex="limit_12"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_12"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0013" dataIndex="limit_13"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_13"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0014" dataIndex="limit_14"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_14"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0015" dataIndex="limit_15"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_15"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0016" dataIndex="limit_16"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_16"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0017" dataIndex="limit_17"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_17"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0018" dataIndex="limit_18"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_18"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0019" dataIndex="limit_19"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_19"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="0020" dataIndex="limit_20"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "limit_20"]}>
                      <Input type="number" />
                    </Form.Item>
                  )
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
          destroyOnClose={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1485001_RefPeopleNumSettingInfo);
