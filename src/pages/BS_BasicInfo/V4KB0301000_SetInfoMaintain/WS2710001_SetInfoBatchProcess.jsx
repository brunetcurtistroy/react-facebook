import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Checkbox, Button, Table, Row, Col, Space, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import WS2710022_SetIdentificationChange from "./WS2710022_SetIdentificationChange.jsx";
import WS2710014_StartDateSelect from "./WS2710014_StartDateSelect.jsx";
import WS2710017_InspectAddDelete from "./WS2710017_InspectAddDelete.jsx";
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx";
import SetInfoBatchProcessAction from "redux/basicInfo/SetInfoMaintain/SetInfoBatchProcess.action.js";
import WS0333001_SetIncludesQuery from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0333001_SetIncludesQuery.jsx";
import moment from "moment";
import { number_format } from "helpers/CommonHelpers.js";
import Color from "constants/Color.js";

const { Option } = Select;

class WS2710001_SetInfoBatchProcess extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lo_stsChangeValue: PropTypes.any,

    onChangeValue: PropTypes.func,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "セット情報一括処理";

    this.state = {
      dataSource: [],
      isLoadingTable: false,
      selectedRowOnly: {},
      selectedRows: [],
      selectedRowKeys: [],
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      valueIdentificationChange: "",
      valueStartDateSelect: "",
      valueInspectAddDelete: [],
      showDatePicker: false,

      InspectCode: ''
    };
    this.handleUpdateType = this.handleUpdateType.bind(this);
    this.handleCreateHistory = this.handleCreateHistory.bind(this);
    this.handleAddChecking = this.handleAddChecking.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    // this.onSearch(this.formRef.current.getFieldValue());
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onSearch = (values) => {
    this.setState({
      isLoadingTable: true,
      selectedRows: [],
      selectedRowKeys: []
    });
    SetInfoBatchProcessAction.searchInfo(values)
      .then((res) => {
        let data = res ? res.filter((x) => x.W1_enabled_disabled) : []
        this.setState({
          dataSource: res ? res : [],
          selectedRowOnly: res && res.length > 0 ? res[0] : {},
          selectedRowKeys: data.map(x => x.id),
          selectedRows: data,
          isLoadingTable: false
        });
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  };

  GetNameInspectCode() {
    let params = {
      InspectCode: this.formRef.current?.getFieldValue('InspectCode')
    }
    SetInfoBatchProcessAction.GetNameInspectCode(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          exam_name: res?.data?.exam_name,
        });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  onFinish(values) {
    let data = {
      ...values,
      StartDateDateChars: this.state.showDatePicker ? values.StartDateDateChars?.format("YYYY/MM/DD") : ''
    }
    this.onSearch(data);
  }

  handleUpdateType() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component: (
          <WS2710022_SetIdentificationChange
            Li_SetCode={this.state.selectedRows.map(x => (x.W1_set_cd))}
            onFinishScreen={(value) => {
              this.setState({
                valueIdentificationChange: value,
              });

              if (this.props.onChangeValue) {
                this.props.onChangeValue({
                  Lo_stsChangeValue: true,
                });
              }

              this.onSearch(this.formRef.current.getFieldValue());

              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  handleCreateHistory() {
    console.log(this.state.selectedRows)
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component: (
          <WS2710014_StartDateSelect
            Li_SetCode={this.state.selectedRows.map(x => (x.W1_set_cd))}
            onFinishScreen={(value) => {
              this.setState({
                valueStartDateSelect: value,
              });

              if (this.props.onChangeValue) {
                this.props.onChangeValue({
                  Lo_stsChangeValue: true,
                });
              }

              this.onSearch(this.formRef.current.getFieldValue());

              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  handleAddChecking = (record) => {
    this.setState({
      childModal: {
        ...this.state,
        visible: true,
        width: "50%",
        component: (
          <WS2710017_InspectAddDelete
            Li_SetCode={record.W1_set_cd}
            Li_start_date_on={record.Expresstion_1}
            onFinishScreen={(value) => {
              this.setState({ valueInspectAddDelete: value });

              // this.onSearch(this.formRef.current.getFieldValue());

              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  render() {
    return (
      <div className="set-info-batch-process">
        <Card title="セット情報一括処理" className='mb-3'>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              SetIdentify: "All",
              StsLainspectOnly: 1,
              StartDateDateChars: moment(new Date())
            }}
          >
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item name="SetIdentify" label="識別">
                  <Select
                    value="All"
                    onChange={(value) => {
                      this.onSearch(this.formRef.current.getFieldValue());
                    }}
                  >
                    <Option value="All">全て</Option>
                    <Option value="Cos">コース</Option>
                    <Option value="Opt">オプション</Option>
                    <Option value="Set">セット</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Form.Item
                name="StsLainspectOnly"
                label="履歴"
                valuePropName="checked"
              >
                <Checkbox checked={!this.state.showDatePicker}
                  onChange={(event) => {
                    this.setState({
                      showDatePicker: !event.target.checked
                    });

                    this.formRef.current?.setFieldsValue({
                      StsLainspectOnly: event.target.checked ? 1 : 0
                    })
                  }}
                >
                  最新のみ
                </Checkbox>
              </Form.Item>
              <Form.Item
                name="StartDateDateChars"
                label=""
                hidden={!this.state.showDatePicker}
              >
                <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
              </Form.Item>
              <Form.Item style={{ marginLeft: '5px' }}
                label="まで"
                hidden={!this.state.showDatePicker}
              ></Form.Item>
            </Row>
            <Row >
              <Form.Item name="InspectCode" label="検査" style={{ width: 178 }}>
                <Input.Search
                  type="number"
                  maxLength={8}
                  onSearch={() => {
                    this.setState({
                      childModal: {
                        ...this.state,
                        visible: true,
                        width: "70%",
                        component: (
                          <WS0271001_InspectItemSearchQuerySingle
                            Lio_InspectItemCode={this.formRef.current?.getFieldValue("InspectCode")}
                            onFinishScreen={(output) => {
                              this.formRef.current?.setFieldsValue({
                                InspectCode: output.Lio_InspectItemCode,
                                exam_name: output.recordData.exam_name,
                              });

                              this.setState({
                                InspectCode: output.Lio_InspectItemCode,
                              })
                              this.closeModal();
                            }}
                          />
                        ),
                      },
                    });
                  }}

                  onBlur={(e) => {
                    this.setState({
                      InspectCode: e.target.value,
                    })
                    if (e.target.value) {
                      if (this.state.InspectCode !== e.target.value) {
                        this.GetNameInspectCode()
                      }
                    } else {
                      this.formRef.current?.setFieldsValue({
                        exam_name: '',
                      });
                    }
                  }}
                />
              </Form.Item>

              <Form.Item name="exam_name" label="" style={{ width: 'calc(100% - 178px)' }}>
                <Input readOnly
                  type="text"
                  style={{ border: "none", background: "transparent" }}
                />
              </Form.Item>
            </Row>

            <Row gutter={24}>
              <Col span={15}>
                <Form.Item name="Search" label="検索">
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={9} style={{ textAlign: "right" }}>
                <Button htmlType="submit"
                  style={{ color: Color(163).Foreground, fontWeight: 500 }}
                ><SearchOutlined />検　　索
                </Button>
              </Col>
            </Row>

          </Form>
        </Card>
        <Card>
          <Table
            size='small'
            rowClassName={(record, index) => record.id === this.state.selectedRowOnly?.id ? 'table-row-light' : ''}
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            scroll={{ y: 600 }}
            rowKey={(record) => record.id}
            bordered
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows, nativeEvent) => {
                let arrTemp = [...this.state.selectedRowKeys];
                let arrTempRecord = [...this.state.selectedRows];
                let idx = arrTemp.indexOf(record.id);
                if (idx === -1) {
                  arrTemp.push(record.id);
                  arrTempRecord.push(record)
                  this.setState({
                    selectedRowKeys: arrTemp,
                    selectedRows: arrTempRecord
                  });
                } else {
                  arrTemp.splice(idx, 1);
                  arrTempRecord.splice(idx, 1);
                  this.setState({
                    selectedRowKeys: arrTemp,
                    selectedRows: arrTempRecord
                  });
                }
              },
              onSelectAll: (selected, selectedRows, changeRows) => {
                if (selected) {
                  let arrTemp = this.state.dataSource.map(item => item.id);
                  let arrTempRecord = this.state.dataSource;
                  this.setState({
                    selectedRowKeys: arrTemp,
                    selectedRows: arrTempRecord
                  });
                } else {
                  this.setState({
                    selectedRowKeys: [],
                    selectedRows: []
                  });
                }
              }
            }}

            onRow={(record, rowIndex) => {
              return {
                onClick: async () => {
                  this.setState({
                    selectedRowOnly: record
                  });
                },

                onDoubleClick: () => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: "60%",
                      component: (
                        <WS0333001_SetIncludesQuery
                          Li_StartDate={record.Expresstion_1}
                          Li_SetCode={record.W1_set_cd}

                          onFinishScreen={(obj) => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                },
              };
            }}
            style={{ cursor: "pointer" }}
          >
            <Table.Column title="コード" dataIndex="W1_set_cd" width={130} />
            <Table.Column title="セット略称" dataIndex="set_short_name" />
            <Table.Column title="開始日" dataIndex="Expresstion_1" width={120} align='center' />
            <Table.Column title="金額" dataIndex="Expresstion_4" width={150}
              render={(value, record) => {
                return (
                  <div style={{ textAlign: 'right' }}>{value == 0 ? '' : number_format(value)}</div>
                )
              }}
            />
            {/* <Table.Column width={125} align='center'
              render={(value, record) => {
                return (
                  <Button type="primary" onClick={() => this.handleAddChecking(record)}>
                    検査追加
                  </Button>
                )
              }}
            /> */}
          </Table>
          <Row>
            <Col span={24} style={{ textAlign: "right", marginTop: "2em" }}>
              <Space>
                <Button type="primary" onClick={this.handleUpdateType} disabled={this.state.selectedRows.length === 0}>
                  識別変更
                </Button>
                <Button type="primary" onClick={this.handleCreateHistory} disabled={this.state.selectedRows.length === 0}>
                  履歴作成
                </Button>
                <Button type="primary" disabled={Object.keys(this.state.selectedRowOnly).length === 0}
                  onClick={() => this.handleAddChecking(this.state.selectedRowOnly)}>
                  検査追加
                </Button>
              </Space>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS2710001_SetInfoBatchProcess);
