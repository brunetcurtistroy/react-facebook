/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Form, Input, Select, Row, Col, Table, Checkbox, Modal, Space, Menu, Dropdown, Button, message } from "antd";
import { MoreOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx";
import WS2709008_SetInfoChangeSub from "pages/BS_BasicInfo/V4KB0301000_SetInfoMaintain/WS2709008_SetInfoChangeSub.jsx";
import WS2708010_CopySet from "pages/BS_BasicInfo/V4KB0301000_SetInfoMaintain/WS2708010_CopySet.jsx";
import WS0333001_SetIncludesQuery from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0333001_SetIncludesQuery";
import WS2710001_SetInfoBatchProcess from "./WS2710001_SetInfoBatchProcess";
import { WS0299006_ConfirmScreen } from "./WS0299006_ConfirmScreen";
import WS2708003_SetCsvCreate from 'pages/BS_BasicInfo/V4KB0301000_SetInfoMaintain/WS2708003_SetCsvCreate.jsx';

import SetInfoMaintainAction from "redux/basicInfo/SetInfoMaintain/SetInfoMaintain.action";

import { debounce } from "lodash";
import moment from "moment";

import SetInfoChangeSubAction from "redux/basicInfo/SetInfoMaintain/SetInfoChangeSub.action";
import WS0061009_CheckYesNoYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes";
import ConfirmScreenAction from "redux/basicInfo/SetInfoMaintain/ConfirmScreen.action";
import Color from "constants/Color";
import WS0431001_CsvPreviewConfirm from "pages/TO_StatisticalServices/V4TO0014000_OfficeVisitsAchievementSituation/WS0431001_CsvPreviewConfirm";
class WS2708001_SetInfoMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "セット情報保守";

    this.state = {
      dataSource: [],
      isLoading: true,
      selectedRowKeys: [],
      rowSelected: [],
      showLainspectOnly: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      lstSetIdentify: [],

      changeValueInfoChangeSub: false,
      stsChangeSub: '',
      dataInfoChangeSub: {},
    };
  }

  componentDidMount() {
    this.getListSetIdentify()
  }

  getListSetIdentify() {
    SetInfoMaintainAction.getListSetIdentify()
      .then((res) => {
        this.setState({
          lstSetIdentify: res ? res.ComboBox_SetIdentify : []
        })

        this.formRef.current?.setFieldsValue({
          SetIdentify: res && res.ComboBox_SetIdentify.length > 0 ? res.ComboBox_SetIdentify[0].LinkField : ''
        })

        this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true);
      })
  }

  getDataTableSubSet = (paramsSearch, reload) => {
    this.setState({ isLoading: true });
    SetInfoMaintainAction.getSetInfoTableDataSubSet(paramsSearch).then(
      (res) => {
        let index = reload ? 0 : res?.findIndex(x => x.id === this.state.rowSelected[0]?.id)
        this.setState({
          isLoading: false,
          dataSource: res ? res : [],
          rowSelected: res && res.length > 0 ? [res[index]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[index]?.id] : [],
        });
      }
    );
  };

  onChangeInput(event, values, field) {
    if (field === "DesignatedInspectCode") {
      if (event.target.value) {
        this.setState({ showLainspectOnly: true });
        this.formRef.current.setFieldsValue({
          exam_name: "",
        });
      } else {
        this.setState({ showLainspectOnly: false });
        this.formRef.current.setFieldsValue({
          exam_name: "",
          StsLainspectOnly: 0
        });
      }
    }

    this.getDataTableSubSet(this.formRef.current?.getFieldValue());
  }

  onFinish(values) {
    this.getDataTableSubSet(values);
  }

  changeDivision(id) {
    let params = {
      id: id
    }

    SetInfoMaintainAction.changeDivision(params)
      .then((res) => {
        this.getDataTableSubSet(this.formRef.current?.getFieldValue())
      })
  }

  deleteData(set_code, id) {
    let params = {
      id: id,
      set_code: set_code,
      SetIdentify: this.formRef.current.getFieldValue("SetIdentify")
    }

    let data = [...this.state.dataSource]
    let index = data.findIndex(x => x.id === id)

    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component: (
          <WS0061009_CheckYesNoYes
            Li_DisplayContent={"削除を実行しますか ?"}
            onFinishScreen={(output) => {
              if (output.Lio_StsReturn) {
                SetInfoMaintainAction.deleteData(params)
                  .then((res) => {
                    // this.getDataTableSubSet(this.formRef.current?.getFieldValue())
                    if (index > -1) {
                      data.splice(index, 1)
                      this.setState({
                        dataSource: data,
                        rowSelected: data.length > 0 ? [data[0]] : [],
                        selectedRowKeys: data.length > 0 ? [data[0].id] : [],
                      })
                    }
                    message.success('正常に削除されました !')
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
              this.closeModal()
            }}
          />),
      },
    })
  }

  callApiGetScreenDataConFirmScreen() {
    let params = {
      SetCode: this.state.dataInfoChangeSub.Li_SetCode,
      StartDate: this.state.dataInfoChangeSub.StartDate
    }
    ConfirmScreenAction.GetDataScreen(params)
      .then(async (res) => {
        if (res?.data && res?.data?.ContractInspection.length > 0) {
          this.showModalConFirmScreen(res?.data);
        } else {
          this.updateSetInfoChangeSub();
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => { })
  }

  showModalConFirmScreen(data) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS0299006_ConfirmScreen
            Li_SetCode={this.state.dataInfoChangeSub.Li_SetCode}
            Li_StartDate={this.state.dataInfoChangeSub.StartDate}
            Li_Values={this.state.dataInfoChangeSub}
            Li_DataScreen={data}
            onFinishScreen={() => {
              this.closeModal()
              this.getDataTableSubSet(this.formRef.current?.getFieldValue(), false);
            }}
          />
        ),
      },
    });
  }

  updateSetInfoChangeSub() {
    let params = {
      ...this.state.dataInfoChangeSub
    }
    SetInfoChangeSubAction.updateButton(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lo_SetIdentify: params.SetIdentify,
            Lio_SetCode: params.SetCode,
            Lio_start_date_on: params.StartDate,
          });
        }
        this.getDataTableSubSet(this.formRef.current?.getFieldValue(), false);
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

  createDataSetInfoChangeSub() {
    let params = {
      ...this.state.dataInfoChangeSub
    }
    SetInfoChangeSubAction.createData(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lo_SetIdentify: params.SetIdentify,
            Lio_SetCode: params.SetCode,
            Lio_start_date_on: params.StartDate,
          });
        }
        this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true);
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

  changeCondition(value) {
    let params = {
      Li_SetCode: value.Li_SetCode,
      SetCode: value.SetCode,
      ConditionEffective: value.ConditionEffective,
    }
    SetInfoChangeSubAction.changeCondition(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lo_SetIdentify: params.SetIdentify,
            Lio_SetCode: params.SetCode,
            Lio_start_date_on: params.StartDate,
          });
        }
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

  getExamName() {
    let params = {
      DesignatedInspectCode: this.formRef.current?.getFieldValue('DesignatedInspectCode')
    }

    SetInfoChangeSubAction.getExamName(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          exam_name: res?.data?.exam_name
        })
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

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
      changeValueInfoChangeSub: false
    });
  }

  BtnF09(data) {
    SetInfoMaintainAction.btnf09({ SetIdentify: data })
      .then(res => {
        this.CallScreenWS0431(res.data.variables)
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => { });
  }

  CallScreenWS0431(data) {
    this.setState({
      childModal: {
        visible: true,
        width: 400,
        component: (
          <WS0431001_CsvPreviewConfirm
            Lio_OutputMethod={data.Lio_OutputMethod}
            Lio_Output={data.Lio_Output}
            Lio_Preview={data.Lio_Preview}
            onFinishScreen={(output) => {
              let parram = {
                OutputMethod: output.Lio_OutputMethod,
                Output: output.Lio_Output,
                Preview: output.Lio_Preview,
                Li_SetIdentify: data.Li_SetIdentify,
                Li_SetCode: data.Li_SetCode,
              }
              this.OutBtnF09(parram)
              this.closeModal();
            }}
          />
        )
      }
    })
  }

  OutBtnF09(data) {
    let parram = {
      ...data,
      Li_SetCode: this.state.rowSelected[0]?.set_code ?? ""
    }
    SetInfoMaintainAction.outbtnf09(parram)
      .then(res => {
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => { });
  }
  render() {
    return (
      <div className="set-info-maintain">
        <Card className="mb-3" >
          <Space>
            <Button
              onClick={() => {
                let SetIdentify = this.formRef.current?.getFieldValue("SetIdentify")
                if (SetIdentify !== 'Tan') {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: "80%",
                      component: (
                        <WS2709008_SetInfoChangeSub
                          Lio_SetCode={''}
                          Li_SetIdentify={SetIdentify === 'Mij' ? 'Set' : SetIdentify}
                          Li_KyokaiAdjustmentsSetClassify={SetIdentify === 'Mij' ? 9 : 0}
                          Li_statusModal={'Create'}

                          onChangeValue={({ Lo_stsChangeValue, data }) => {
                            this.setState({
                              changeValueInfoChangeSub: Lo_stsChangeValue,
                              dataInfoChangeSub: data,
                              stsChangeSub: 'Create'
                            })
                          }}

                          onChangeStartDate={(obj) => {
                            this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true)
                          }}

                          onFinishScreen={(output) => {
                            this.closeModal();
                            this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true);
                          }}

                        />
                      ),
                    },
                  })
                } else {
                  Modal.error({
                    title: '検査単品の新規作成はできません。',
                    width: 350
                  })
                }
              }}>新規</Button>

            <Button
              disabled={this.formRef.current?.getFieldValue("SetIdentify") === 'Tan'}
              onClick={() => {
                if (this.state.rowSelected.length > 0) {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 500,
                      component: (
                        <WS2708010_CopySet
                          Li_SetIdentifyCopySource={this.formRef.current?.getFieldValue("SetIdentify")}
                          Li_CopySourceSetCode={this.state.rowSelected[0].set_code}
                          Li_SetName={this.state.rowSelected[0].set_name}
                          Li_start_date_on={this.state.rowSelected[0].start_date_on}

                          onFinishScreen={async (dataClone) => {
                            await this.closeModal();
                            await this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "80%",
                                component: (
                                  <WS2709008_SetInfoChangeSub
                                    Lio_SetCode={dataClone.CopySetCode}
                                    Lio_start_date_on={dataClone.start_date_on}

                                    onChangeValue={({ Lo_stsChangeValue, data }) => {
                                      this.setState({
                                        changeValueInfoChangeSub: Lo_stsChangeValue,
                                        dataInfoChangeSub: data,
                                        stsChangeSub: ''
                                      })
                                    }}

                                    onChangeStartDate={(obj) => {
                                      this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true)
                                    }}

                                    onFinishScreen={(output) => {
                                      this.closeModal();
                                      this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true);
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                        />
                      ),
                    },
                  })
                }
              }}
            >
              複写</Button>

            <Button
              onClick={() =>
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 550,
                    component: (
                      <WS2708003_SetCsvCreate
                        onFinishScreen={(output) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                })
              }>CSV
            </Button>

            <Button
              onClick={() => this.BtnF09(this.formRef.current?.getFieldValue("SetIdentify"))}>出力
            </Button>
            <Button
              onClick={() =>
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 800,
                    component: (
                      <WS2710001_SetInfoBatchProcess
                        onChangeValue={(obj) => {
                          if (obj.Lo_stsChangeValue) {
                            this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true)
                          }
                        }}

                        onFinishScreen={(output) => {
                          this.closeModal();
                          this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true);
                        }}
                      />
                    ),
                  },
                })
              }>一括処理
            </Button>
            <Button
              disabled={this.formRef.current?.getFieldValue("SetIdentify") !== 'Tan'}
              onClick={() =>
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "80%",
                    component: (
                      <WS2709008_SetInfoChangeSub
                        onChangeStartDate={(obj) => {
                          this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true)
                        }}
                        onFinishScreen={(output) => {
                          this.closeModal();
                          this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true);
                        }}
                      />
                    ),
                  },
                })
              }>再生成
            </Button>
          </Space>
        </Card>

        <Card className="mb-3">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              StsContract: 0,
              StsLainspectOnly: 0,
            }}
            onClick={() => this.setState({ rowSelected: [], selectedRowKeys: [] })}
          >
            <Row gutter={20}>
              <Col xl={4} lg={12}>
                <Form.Item name="SetIdentify" label="識別">
                  <Select style={{ width: '100%' }}
                    onChange={(value) => {
                      this.getDataTableSubSet(this.formRef.current.getFieldValue(), true);
                    }}
                  >
                    {this.state.lstSetIdentify.map((value) => (
                      <Select.Option key={"SetIdentify_" + Math.random()} value={value.LinkField}>{value.DisplayField}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={3} lg={12}>
                <Form.Item name="StsContract" valuePropName="checked">
                  <Checkbox
                    onChange={(e) => {
                      this.formRef.current.setFieldsValue({
                        StsContract: e.target.checked ? 1 : 0
                      })
                      this.getDataTableSubSet(this.formRef.current.getFieldValue(), true);
                    }}
                  >
                    共有のみ
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xl={6} lg={12}>
                <Form.Item name="Name" label="検索">
                  <Input
                    type="text"
                    onChange={debounce((event) => this.onChangeInput(event, this.formRef.current.getFieldValue(), "Name"), 300)}
                  />
                </Form.Item>
              </Col>
              <Col xl={10} lg={14}>
                <Row>
                  <Form.Item label="検査" name="DesignatedInspectCode" style={{ width: 160, marginRight: 5 }}>
                    <Input.Search type='number' min={0}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 800,
                            component: (
                              <WS0271001_InspectItemSearchQuerySingle
                                onFinishScreen={(output) => {
                                  this.formRef.current.setFieldsValue({
                                    DesignatedInspectCode: output.recordData.test_item_code,
                                    exam_name: output.recordData.exam_name,
                                  });

                                  if (output.recordData.test_item_code) {
                                    this.setState({ showLainspectOnly: true });
                                  }
                                  this.getDataTableSubSet(
                                    this.formRef.current.getFieldValue(), true
                                  );
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                      onChange={debounce((event) => {
                        this.onChangeInput(event, this.formRef.current.getFieldValue(), "DesignatedInspectCode")
                        this.getExamName()
                      }, 300)}
                    />
                  </Form.Item>
                  <Form.Item name="exam_name" style={{ width: 'calc(100% - 165px)' }}>
                    <Input
                      type="text"
                      readOnly
                      style={{ background: "transparent", border: "none" }}
                    />
                  </Form.Item>
                </Row>
              </Col>
              <Col xl={3} lg={12} hidden={!this.state.showLainspectOnly}>
                <Form.Item name="StsLainspectOnly" valuePropName="checked">
                  <Checkbox
                    onChange={(e) => {
                      this.formRef.current.setFieldsValue({
                        StsLainspectOnly: e.target.checked ? 1 : 0
                      })
                      this.getDataTableSubSet(this.formRef.current.getFieldValue(), true);
                    }}
                  >
                    最新のみ
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className="mb-3">
          <Table
            size='small'
            style={{ cursor: 'pointer' }}
            rowClassName={(record, index) => record.id === this.state.rowSelected[0]?.id ? 'table-row-light' : ''}
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={this.state.dataSource?.length > 10 ? true : false}
            rowKey={(record) => record.id}
            bordered
            onRow={(record, rowIndex) => {
              return {
                onDoubleClick: () => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: "80%",
                      component: (
                        <WS2709008_SetInfoChangeSub
                          Lio_SetCode={record.set_code}
                          Li_SetIdentify={this.formRef.current.getFieldValue("SetIdentify")}
                          Li_KyokaiAdjustmentsSetClassify={record.association_adjustments}
                          Li_SetName={record.set_name}
                          Li_SetShortName={record.set_short_name}
                          Li_checkCode={record.Expression_34}
                          Lio_start_date_on={record.start_date_on}
                          Li_association_adjustments={record.association_adjustments}
                          Li_statusModal={''}

                          onChangeValue={({ Lo_stsChangeValue, data }) => {
                            this.setState({
                              changeValueInfoChangeSub: Lo_stsChangeValue,
                              dataInfoChangeSub: data,
                              stsChangeSub: ''
                            })
                          }}

                          onChangeStartDate={(obj) => {
                            this.getDataTableSubSet(this.formRef.current?.getFieldValue(), false)
                          }}

                          onFinishScreen={(obj) => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                },
                onClick: () => {
                  this.setState({
                    rowSelected: [record],
                    selectedRowKeys: [record.id]
                  })
                }
              };
            }}
          // rowSelection={{
          //   type: "radio",
          //   selectedRowKeys: this.state.selectedRowKeys,
          //   onSelect: (record, selected, selectedRows) => {
          //     this.setState({
          //       rowSelected: selectedRows,
          //       selectedRowKeys: selectedRows.map(x => x.id),
          //     });
          //   },
          // }}
          >
            <Table.Column title="コード" dataIndex="set_code" width={100} />
            <Table.Column title="正式名称" dataIndex="set_name" />
            <Table.Column title="略式名称" dataIndex="set_short_name" />
            <Table.Column title="条" width={30} align='center' dataIndex="Expression_34"
              render={(value, record) => {
                return (
                  <div
                    style={{
                      background: Color(record.Expression_34).Background,
                      border: "1px solid",
                      borderColor: Color(record.Expression_34).Foreground,
                      textAlign: "center",
                      color: Color(record.Expression_34).Foreground,
                    }}
                  >
                    条
                  </div>
                );
              }}
            />
            <Table.Column title="単価" dataIndex="unit_price" width={120} align='center'
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    {value === 0 ? '' : value?.toLocaleString()}
                  </div>
                )
              }}
            />
            <Table.Column width={110} align='center'
              title="開始日"
              dataIndex="start_date_on"
              render={(date) => {
                let style = "";
                switch (date) {
                  case "0000-00-00":
                    style = "#D3D3D3";
                    break;
                  default:
                    style = "Black";
                }
                return <div style={{ color: style }}>{date ? date === '0000-00-00' ? '0000年00月' : moment(date).format('YYYY年MM月') : ''}</div>;
              }}
            />
            <Table.Column title="区分" dataIndex="Expresstion_32" width={80} align='center' />
            <Table.Column width={60} align='center'
              render={(value, record) => (
                <Dropdown
                  overlay={() => (
                    <Menu>
                      <Menu.Item
                        key="1"
                        onClick={() => {
                          let SetIdentify = this.formRef.current?.getFieldValue("SetIdentify")
                          if (SetIdentify !== 'Tan') {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "80%",
                                component: (
                                  <WS2709008_SetInfoChangeSub
                                    Lio_SetCode={''}
                                    Li_SetIdentify={SetIdentify === 'Mij' ? 'Set' : SetIdentify}
                                    Li_KyokaiAdjustmentsSetClassify={SetIdentify === 'Mij' ? 9 : 0}
                                    Li_statusModal={'Create'}

                                    onChangeValue={({ Lo_stsChangeValue, data }) => {
                                      this.setState({
                                        changeValueInfoChangeSub: Lo_stsChangeValue,
                                        dataInfoChangeSub: data,
                                        stsChangeSub: 'Create'
                                      })
                                    }}

                                    onChangeStartDate={(obj) => {
                                      this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true)
                                    }}

                                    onFinishScreen={(output) => {
                                      this.closeModal();
                                      this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true);
                                    }}

                                  />
                                ),
                              },
                            })
                          } else {
                            Modal.error({
                              title: '検査単品の新規作成はできません。',
                              width: 350
                            })
                          }
                        }}
                      >
                        新規
                      </Menu.Item>
                      <Menu.Item
                        key="2"
                        onClick={() =>
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "80%",
                              component: (
                                <WS2709008_SetInfoChangeSub
                                  Lio_SetCode={record.set_code}
                                  Li_SetIdentify={this.formRef.current.getFieldValue("SetIdentify")}
                                  Li_KyokaiAdjustmentsSetClassify={record.association_adjustments}
                                  Li_SetName={record.set_name}
                                  Li_SetShortName={record.set_short_name}
                                  Li_checkCode={record.Expression_34}
                                  Lio_start_date_on={record.start_date_on}
                                  Li_association_adjustments={record.association_adjustments}
                                  Li_statusModal={''}

                                  onChangeValue={({ Lo_stsChangeValue, data }) => {
                                    this.setState({
                                      changeValueInfoChangeSub: Lo_stsChangeValue,
                                      dataInfoChangeSub: data,
                                      stsChangeSub: ''
                                    })
                                  }}

                                  onChangeStartDate={(obj) => {
                                    this.getDataTableSubSet(this.formRef.current?.getFieldValue(), false)
                                  }}

                                  onFinishScreen={(output) => {
                                    this.closeModal();
                                    this.getDataTableSubSet(this.formRef.current?.getFieldValue(), false);

                                    // this.showModalConFirmScreen(output)
                                  }}
                                />
                              ),
                            },
                          })
                        }
                      >
                        修正
                      </Menu.Item>
                      <Menu.Item key="3"
                        onClick={() => this.deleteData(record.set_code, record.id)}
                      >削除</Menu.Item>
                      <Menu.Item
                        key="4"
                        hidden={this.formRef.current?.getFieldValue("SetIdentify") === 'Tan'}
                        onClick={() =>
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 500,
                              component: (
                                <WS2708010_CopySet
                                  Li_SetIdentifyCopySource={this.formRef.current.getFieldValue("SetIdentify")}
                                  Li_CopySourceSetCode={record.set_code}
                                  Li_SetName={record.set_name}
                                  Li_start_date_on={record.start_date_on}

                                  onFinishScreen={async (dataClone) => {
                                    await this.closeModal();
                                    await this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: "80%",
                                        component: (
                                          <WS2709008_SetInfoChangeSub
                                            Lio_SetCode={dataClone.CopySetCode}
                                            Lio_start_date_on={dataClone.start_date_on}

                                            onChangeValue={({ Lo_stsChangeValue, data }) => {
                                              this.setState({
                                                changeValueInfoChangeSub: Lo_stsChangeValue,
                                                dataInfoChangeSub: data,
                                                stsChangeSub: ''
                                              })
                                            }}

                                            onChangeStartDate={(obj) => {
                                              this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true)
                                            }}

                                            onFinishScreen={(output) => {
                                              this.closeModal();
                                              this.getDataTableSubSet(this.formRef.current?.getFieldValue(), true);

                                              // this.showModalConFirmScreen(output)
                                            }}
                                          />
                                        ),
                                      },
                                    })
                                  }}
                                />
                              ),
                            },
                          })
                        }
                      >
                        複写
                      </Menu.Item>
                      <Menu.Item key="5"
                        onClick={() =>
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '60%',
                              component: (
                                <WS0333001_SetIncludesQuery
                                  Li_SetCode={record.set_code}
                                  Li_CourseCode={record.set_code}
                                  Li_StartDate={record.start_date_on ? record.start_date_on.replaceAll('-', '/') : ''}

                                  onFinishScreen={(output) => {

                                  }}
                                />
                              ),
                            },
                          })
                        }
                      >照会</Menu.Item>
                      <Menu.Item key="6"
                        onClick={() =>
                          this.changeDivision(record.id)
                        }
                      > 区分変更
                      </Menu.Item>
                    </Menu>
                  )}
                >
                  <Button icon={<MoreOutlined />}></Button>
                </Dropdown>
              )}
            />
          </Table>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            if (this.state.changeValueInfoChangeSub) {
              Modal.confirm({
                width: 250,
                title: '更新しますか？',
                icon: <QuestionCircleOutlined style={{ fontSize: '25px', color: '#08c' }} />,
                onOk: () => {
                  if (this.state.stsChangeSub === 'Create') {
                    this.createDataSetInfoChangeSub()
                  } else {
                    this.callApiGetScreenDataConFirmScreen()
                  }
                  this.setState({ changeValueInfoChangeSub: false })
                  this.closeModal()
                },
                onCancel: () => {
                  this.setState({ changeValueInfoChangeSub: false })
                  this.closeModal()
                }
              })
            } else {
              this.closeModal()
            }
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
)(WS2708001_SetInfoMaintain);
