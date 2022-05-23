/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Table, Form, Select, Radio, Checkbox, Input, Row, Col, Tabs, Space, Button, message, Upload, Spin, InputNumber } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';

import WS0460008_Copy from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0460008_Copy.jsx';
import WS0460005_ParamInput from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0460005_ParamInput.jsx';
import WS0449001_UserParamMaintain from 'pages/SM_SystemMaintenance/V4MS9900800_UserParamMaintain/WS0449001_UserParamMaintain.jsx';
import WS0451001_UserParamQuery from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0451001_UserParamQuery.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS0495001_ConditionExpressInfoInquiry from 'pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0495001_ConditionExpressInfoInquiry.jsx';
import TextArea from "antd/lib/input/TextArea";
import CsvCreateParamMaintainAction from "redux/ResultOutput/CsvCreateParamMaintain/CsvCreateParamMaintain.action";
import Color from "constants/Color";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import WS0461005_UserParamInput0 from "./WS0461005_UserParamInput0";

const radioStyle = {
  display: 'block',
  lineHeight: 1.5
};

const labelStyle = {
  fontWeight: 'bold',
  color: '#14468c',
  marginTop: 20,
  marginBottom: 5
}
class WS0460001_CsvCreateParamMaintain extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_Format: PropTypes.any,
    Li_Name: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'CSV作成パラメータ保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      showDelimiter: false,

      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,

      screenSwitch: null,
      isLoadingForm: false,

      nameCondition: ''
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }

  componentDidMount() {
    this.getData(true)
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getData(true)
    }
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  getData(reload) {
    this.setState({ isLoadingTable: true })
    CsvCreateParamMaintainAction.getListData()
      .then(async (res) => {
        let data = res ? res : [];
        let index = reload ? 0 : data.findIndex(x => x.id === this.state.dataSource[this.state.indexTable].id)
        await this.setState({
          dataSource: data,
          isLoadingTable: false,

          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,

          screenSwitch: data.length > 0 ? data[0].ScreenSwitch : null
        })
        this.getDataAdvancedSetting()
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  getDataAdvancedSetting() {
    this.setState({ isLoadingForm: true })
    let record = this.state.rowSelected[0];
    let params = {
      Lio_Csvhdr: record?.Csvhdr,
      Lio_Course: record?.Course,
      Lio_Id: record?.Id,
      Lio_AgeCalculate: record?.AgeCalculate,
      Lio_CsvFormat: record?.CsvFormat,
      Lio_Delimiter: record?.Delimiter,
      Lio_OutputCharSet: record?.OutputCharSet,
      Lio_Extract: record?.Extract,
      Lio_Exec: record?.Exec,
      Lio_Type: record?.Type,
      Lio_Run: record?.Run,
      Lio_InsuranceSign: record?.HealthSymbol,
      Lio_Fix: record?.Fix,
      Lio_Sort1: record?.Sort1,
      Lio_Sort2: record?.Sort2,
      Lio_Sort3: record?.Sort3,
      Lio_Sort4: record?.Sort4,
      Lio_Sort5: record?.Sort5,
      Lio_ConditionNum: record?.ConditionNum,
      Lio_OrgsTowards: record?.OrgsTowards,
    }

    CsvCreateParamMaintainAction.advanceSetitng(params)
      .then((res) => {
        let data = {
          ...res,
          ConditionNumCopy: res?.ConditionNum === 0 ? '' : res?.ConditionNum
        }
        this.formRef.current?.setFieldsValue(data)
        this.setState({
          isLoadingForm: false,
          showDelimiter: data.CsvFormat === 2 ? true : false,
          nameCondition: res?.name
        })
      })
      .finally(() => this.setState({ isLoadingForm: false }))
  }

  updateRecordData(index) {
    let params = {
      ...this.state.dataSource[index],
      ...this.formRef.current?.getFieldValue()
    }

    CsvCreateParamMaintainAction.saveData(params)
      .then((res) => {
        this.getData(this.state.dataSource[index].id ? false : true)
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

  deleteData(record) {
    let params = {
      id: record.id,
      Li_Format: record.Format
    }
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 300,
        component:
          <WS0061015_CheckYesNoNo
            Li_Message={'削除を実行しますか ?'}
            onFinishScreen={(ouput) => {
              if (ouput.Lio_StsReturn) {
                CsvCreateParamMaintainAction.deleteData(params)
                  .then(res => {
                    message.success('正常に削除されました!');
                    this.getData(true)
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
            }} />
      },
    });
  }

  btnF12(version) {
    let params = {
      Li_Version: version ? version : this.state.screenSwitch,
      Li_Format: this.state.rowSelected[0].Format
    }

    CsvCreateParamMaintainAction.f12(params)
      .then((res) => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: '90%',
            component: (
              <WS0461005_UserParamInput0
                Li_Format={this.state.rowSelected[0].Format}
                Li_Name={this.state.rowSelected[0].DocumentName}
                onFinishScreen={(output) => {

                  this.closeModal()
                }} />
            ),
          },
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

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.No);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  checkDuplicateNo() {
    let lstData = [...this.state.dataSource];
    const uniqueValues = new Set(lstData.map(v => v.No));

    if (uniqueValues.size < lstData.length) {
      return true;
    } return false;
  }

  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (
        // this.checkAddItem() || 
        this.checkIdTemp(this.state.rowSelected[0].id)) {
        return true;
      } return false;
    } return false;
  }

  // check selected record while add new
  changeRow(index) {
    let data = [...this.state.dataSource];

    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (idTemp) {
      this.setState({
        rowSelected: [data[0]],
        selectedRowKeys: [data[0].id],
        indexTable: 0
      });
    } else {
      this.setState({
        indexTable: index
      });
    }
  }

  // add new record
  async handleAddRowTable() {
    let newRow = {
      No: "",
      PersonalInfo: 0
    };

    let data = [...this.state.dataSource];

    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      rowSelected: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });

    this.getDataAdvancedSetting()
    this.forceUpdate();
  }

  async handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    await data.splice(0, 1);
    await this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : []
    });

    this.getDataAdvancedSetting()
  }


  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  updateCourse(course) {
    let params = {
      IH_Course: this.formRef.current?.getFieldValue('Course'),
      IV_Course: course
    }
    CsvCreateParamMaintainAction.gzoomCource(params)
      .then((res) => {
        this.formRef.current.setFieldsValue({
          Course: res?.Course
        })
      })
  }

  getNameCondition() {
    let params = {
      ConditionNum: this.formRef.current?.getFieldValue('ConditionNum')
    }
    CsvCreateParamMaintainAction.getNameCondition(params)
      .then((res) => {
        this.formRef.current.setFieldsValue({
          name: res?.data?.name
        })

        this.setState({
          nameCondition: res?.data?.name
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

  onFinish(values) { }

  render() {
    return (
      <div className="csv-create-param-maintain">
        <Card title="CSV作成ﾊﾟﾗﾒｰﾀ保守">
          <Space >
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 600,
                    component:
                      <WS0460008_Copy
                        Li_NoF={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].No : ''}
                        Li_FormatF={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].Format : ''}
                        Li_DocumentName={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].DocumentName : ''}
                        onFinishScreen={(output) => {
                          this.getData(true)
                          this.closeModal()
                        }} />
                    ,
                  },
                });
              }}>
              複写
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 500,
                    component:
                      <WS0460005_ParamInput
                        onFinishScreen={(output) => {
                          this.getData(true)
                          this.closeModal()
                        }} />
                    ,
                  },
                });
              }}>
              作成
            </Button>
            <Button
              onClick={() => {
                let format = this.state.rowSelected.length > 0 ? this.state.rowSelected[0]?.format : ''
                switch (format) {
                  case '':
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 600,
                        component:
                          <WS0449001_UserParamMaintain
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />
                        ,
                      },
                    });
                    break;
                  default:
                    this.btnF12();
                    break;
                }
              }}>
              ﾊﾟﾗﾒｰﾀ
            </Button>
            {/* <Button
              onClick={() => {
                switch (this.state.rowSelected[0]?.Format) {
                  case '':
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 600,
                        component:
                          <WS0449001_UserParamMaintain
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />
                        ,
                      },
                    });
                    break;
                  default:
                    this.btnF12(1);
                    break;
                }
              }}>
              ﾊﾟﾗﾒｰﾀ
            </Button> */}
          </Space>
          <hr style={{ margin: '15px 0' }} />

          <Row gutter={24}>
            <Col lg={24} xl={17} style={{ borderRight: '1px solid #d9d9d9', marginBottom: 20 }}>
              <Table
                size='small'
                style={{ cursor: 'pointer' }}
                rowClassName={(record, index) => record.id === this.state.rowSelected[0]?.id ? 'table-row-light' : ''}
                dataSource={this.state.dataSource}
                loading={this.state.isLoadingTable}
                pagination={false}
                bordered
                rowKey={(record) => record.id}
                scroll={{ x: 800, y: 600 }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: async () => {
                      let oldRecord = this.state.rowSelected[0]
                      let index = this.state.dataSource.findIndex(x => x.id === record.id)
                      await this.setState({
                        rowSelected: [record],
                        selectedRowKeys: [record.id],
                        indexTable: index
                      });
                      if (record.id !== oldRecord.id) {
                        this.getDataAdvancedSetting()
                      }
                    }
                  }
                }}
              >
                <Table.Column title="No" dataIndex="No" width={50}
                  render={(value, record, index) => {
                    return (
                      <div>
                        {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                          <div style={{ paddingLeft: '7px' }}>{record.No}</div>
                          :
                          <Input value={record.No} maxLength={2}
                            onChange={(e) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "No", e.target.value)
                            }}
                          />
                        }
                      </div>
                    )
                  }} />
                <Table.Column title="FORMAT" dataIndex="Format" width={100}
                  render={(value, record, index) => {
                    return (
                      <div>
                        {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                          <div style={{ paddingLeft: '7px', color: Color(record.Expression_74)?.Foreground }}>{record.Format}</div>
                          :
                          <Input value={record.Format} maxLength={12}
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 500,
                                  component:
                                    <WS0451001_UserParamQuery
                                      Lio_Format={record.Format}
                                      onFinishScreen={(output) => {
                                        this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Format", output.Lio_Format)
                                        this.closeModal()
                                      }} />
                                  ,
                                },
                              });
                            }}
                            onChange={(e) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Format", e.target.value)
                            }}
                          />
                        }
                      </div>
                    )
                  }}
                />
                <Table.Column title="帳票名" dataIndex="DocumentName" width={220}
                  render={(value, record, index) => {
                    return (
                      <div>
                        {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                          <div style={{ paddingLeft: '7px' }}>{record.DocumentName}</div>
                          :
                          <Input value={record.DocumentName} maxLength={100}
                            onChange={(e) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "DocumentName", e.target.value)
                            }}
                          />
                        }
                      </div>
                    )
                  }} />
                <Table.Column title="個人情報" dataIndex="PersonalInfo" width={70}
                  render={(value, record, index) => {
                    return (
                      <div>
                        {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                          <div style={{ paddingLeft: '7px' }}>{record.PersonalInfo === 0 ? 'あり' : ''}</div>
                          :
                          <Select value={record.PersonalInfo} style={{ width: '100%' }}
                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "PersonalInfo", value)
                            }}>
                            <Select.Option value={1}> </Select.Option>
                            <Select.Option value={0}>あり</Select.Option>
                          </Select>
                        }
                      </div>
                    )
                  }}
                />
                <Table.Column title="出力先" dataIndex="CsvFile"
                  render={(value, record, index) => {
                    return (
                      <div>
                        {(this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)
                          // || (record.id && record.CsvFile)
                        ) ?
                          <div style={{ paddingLeft: '7px' }}>{record.CsvFile}</div>
                          :
                          <div>
                            <Input type="text" value={record.CsvFile}
                              onChange={(e) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "CsvFile", e.target.value)
                              }}

                              addonAfter={<UploadOutlined style={{ color: '#096dd9' }}
                                onClick={() => {
                                  document.getElementById("idUpload").click()
                                }}
                              />}
                            />
                            <Upload id="idUpload"
                              accept=".txt,.csv"
                              beforeUpload={(file) => {
                                return new Promise(resolve => {
                                  const reader = new FileReader();
                                  reader.readAsDataURL(file);
                                  reader.onload = () => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "CsvFile", file.name)
                                  };
                                });
                              }}><span hidden></span>
                            </Upload>
                          </div>
                        }
                      </div>
                    )
                  }} />
                <Table.Column width={70}
                  title={
                    <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        disabled={this.checkDisabledBtnAdd()}
                        onClick={this.handleAddRowTable}
                        type="primary" icon={<PlusOutlined />}>
                      </Button>
                    </div>
                  }
                  render={(text, record, index) => {
                    return <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)
                          || this.checkDuplicateNo()
                          // || (!this.state.dataSource[this.state.indexTable].No)
                        }
                        onClick={() => { this.updateRecordData(this.findIndexByID(this.state.dataSource, record.id)) }}
                        style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                        icon={<SaveOutlined />} >
                      </Button>
                      <Button size='small' style={{ border: 'none' }}
                        hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                        onClick={() => {
                          !record.id ? this.handleDeleteRowTable() : this.deleteData(record)
                        }}
                        danger
                        icon={<DeleteOutlined />}
                      >
                      </Button>
                    </div>;
                  }}
                />
              </Table>
            </Col>

            <Col lg={24} xl={7}>
              <Form
                ref={this.formRef}
                onFinish={this.onFinish}>
                <Spin spinning={this.state.isLoadingForm}>
                  <Tabs type='card'>
                    <Tabs.TabPane tab="内容" key={0}>
                      <div style={{ ...labelStyle, marginTop: 0 }}>フォーマット</div>
                      <Form.Item name="Csvhdr"
                        valuePropName="checked"
                        style={{ marginLeft: '20px', marginBottom: '5px' }}
                      >
                        <Checkbox><span style={{ color: '#14468c', fontWeight: 'bold' }}>タイトルを出力する</span></Checkbox>
                      </Form.Item>
                      <Form.Item name="Fix"
                        valuePropName="checked"
                        style={{ marginLeft: '20px' }}
                      >
                        <Checkbox><span style={{ color: '#14468c', fontWeight: 'bold' }}>固定長で出力する</span></Checkbox>
                      </Form.Item>
                      <div style={labelStyle}>区切</div>
                      <Form.Item name="CsvFormat"
                        style={{ marginLeft: '20px' }}
                      >
                        <Radio.Group onChange={(e) => {
                          if (e.target.value === 2) {
                            this.setState({
                              showDelimiter: true
                            })
                          } else {
                            this.setState({
                              showDelimiter: false
                            })
                            this.formRef.current.setFieldsValue({
                              Delimiter: ''
                            })
                          }
                        }}>
                          <Radio value={0} style={radioStyle}>「，」区切で出力する</Radio>
                          <Radio value={1} style={radioStyle}>各項目を「"」で囲む</Radio>
                          <Row>
                            <Radio value={2} style={{ ...radioStyle, width: 160 }}>区切文字を指定する</Radio>
                            <Form.Item name="Delimiter" style={{ width: 'calc(100% - 168px)' }}>
                              <Input type={this.state.showDelimiter ? "text" : "hidden"}></Input>
                            </Form.Item>
                          </Row>
                        </Radio.Group>
                      </Form.Item>
                      <div style={labelStyle}>個人番号</div>
                      <Form.Item name="Id" style={{ marginLeft: '20px' }}
                      >
                        <Radio.Group>
                          <Radio value={0} style={radioStyle}>健診の番号を出力する</Radio>
                          <Radio value={1} style={radioStyle}>患者番号を出力する</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <div style={labelStyle}>年齢の算出</div>
                      <Form.Item name="AgeCalculate" style={{ marginLeft: '20px' }}
                      >
                        <Radio.Group>
                          <Radio value={0} style={radioStyle}>契約に設定された年齢</Radio>
                          <Radio value={1} style={radioStyle}>年度末の時点の年齢</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <div style={labelStyle}>文字ｾｯﾄ</div>
                      <Form.Item name="CharSet" style={{ marginLeft: '20px' }}
                      >
                        <Radio.Group>
                          <Radio value={0} style={radioStyle}><span style={{ color: '#14468c' }}>ANSI形式で出力する</span></Radio>
                          <Radio value={1} style={radioStyle}><span style={{ color: '#14468c' }}>OEM 形式で出力する</span></Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item name="OrgsTowards" label="団体向"
                        style={{ marginTop: 20 }}
                      >
                        <Select style={{ width: 100 }}>
                          <Select.Option value=""> </Select.Option>
                          <Select.Option value="N">通常</Select.Option>
                          <Select.Option value="Y">団体</Select.Option>

                        </Select>
                      </Form.Item>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="絞込" key={1}>
                      <div style={{ ...labelStyle, marginTop: 0 }}>状態</div>
                      <Space>
                        <Form.Item name="Accepted" valuePropName="checked"
                          style={{ marginLeft: '20px' }}
                        >
                          <Checkbox>受付</Checkbox>
                        </Form.Item>

                        <Form.Item name="Reserve" valuePropName="checked">
                          <Checkbox>予約</Checkbox>
                        </Form.Item>
                        <Form.Item name="Pending" valuePropName="checked">
                          <Checkbox>保留</Checkbox>
                        </Form.Item>
                        <Form.Item name="Waiting" valuePropName="checked">
                          <Checkbox>待ち</Checkbox>
                        </Form.Item>
                      </Space>
                      <br></br>
                      <div style={labelStyle}>コースの一覧</div>
                      <Form.Item name="_0Covered1Target" style={{ marginLeft: '30px' }} >
                        <Radio.Group>
                          <Radio value={0} style={radioStyle}>対象外のコースを設定</Radio>
                          <Radio value={1} style={radioStyle}>対　象のコースを設定</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item name="Course" style={{ marginLeft: '20px', marginTop: 8 }} >
                        <TextArea rows={2}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '70%',
                                component:
                                  <WS0265001_BasicCourseInquiry
                                    onFinishScreen={(output) => {
                                      this.updateCourse(output.Lo_CourseCode)

                                      this.closeModal()
                                    }} />
                                ,
                              },
                            });
                          }}
                        />
                      </Form.Item>
                      <div style={labelStyle}>保険記号の一覧</div>
                      <Form.Item name="InsuranceSign" style={{ marginLeft: '20px' }}>
                        <TextArea rows={2} />
                      </Form.Item>
                      <div style={labelStyle}>条件式</div>
                      <Form.Item name="ConditionNum" hidden><Input /></Form.Item>
                      <Space style={{ marginLeft: '20px' }} >
                        <Form.Item name="ConditionNumCopy" style={{ width: '100px' }}>
                          <Input.Search type='number' maxLength={4} style={{ textAlign: "right" }}
                            onSearch={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 600,
                                  component:
                                    <WS0495001_ConditionExpressInfoInquiry
                                      onFinishScreen={(output) => {
                                        this.formRef.current.setFieldsValue({
                                          ConditionNum: output.Lo_ConditionSerialNum,
                                          name: output.Lo_Name,
                                          ConditionNumCopy: output.Lo_ConditionSerialNum === 0 ? '' : output.Lo_ConditionSerialNum
                                        })

                                        this.setState({
                                          nameCondition: output.Lo_Name,
                                        })
                                        this.closeModal()
                                      }} />
                                  ,
                                },
                              });
                            }}
                            onBlur={(e) => {
                              let val = e.target.value
                              if (val.length > 4) {
                                val = val.substring(0, 4)
                              }
                              if (val !== this.formRef.current?.getFieldValue('ConditionNum')) {
                                this.formRef.current.setFieldsValue({
                                  ConditionNum: parseInt(val),
                                  ConditionNumCopy: parseInt(val) == 0 ? '' : parseInt(val),
                                })

                                this.getNameCondition()
                              }
                            }}
                          />
                        </Form.Item>
                        <Form.Item name="name">
                          <span>{this.state.nameCondition}</span>
                        </Form.Item>
                      </Space>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="出力順" key={2}>
                      <div style={{ ...labelStyle, marginTop: 0, marginBottom: 8 }}>出力する順番</div>
                      <Form.Item name="Sort1" label="No.1"  >
                        <Select>
                          <Select.Option value=""></Select.Option>
                          <Select.Option value="健診コース">健診コース</Select.Option>
                          <Select.Option value="受診日">受診日</Select.Option>
                          <Select.Option value="カナ氏名">カナ氏名</Select.Option>
                          <Select.Option value="事業所コード">事業所コード</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="Sort2" label="No.2" >
                        <Select>
                          <Select.Option value=""></Select.Option>
                          <Select.Option value="健診コース">健診コース</Select.Option>
                          <Select.Option value="受診日">受診日</Select.Option>
                          <Select.Option value="カナ氏名">カナ氏名</Select.Option>
                          <Select.Option value="事業所コード">事業所コード</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="Sort3" label="No.3"  >
                        <Select>
                          <Select.Option value=""></Select.Option>
                          <Select.Option value="健診コース">健診コース</Select.Option>
                          <Select.Option value="受診日">受診日</Select.Option>
                          <Select.Option value="カナ氏名">カナ氏名</Select.Option>
                          <Select.Option value="事業所コード">事業所コード</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="Sort4" label="No.4" >
                        <Select>
                          <Select.Option value=""></Select.Option>
                          <Select.Option value="健診コース">健診コース</Select.Option>
                          <Select.Option value="受診日">受診日</Select.Option>
                          <Select.Option value="カナ氏名">カナ氏名</Select.Option>
                          <Select.Option value="事業所コード">事業所コード</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="Sort5" label="No.5" >
                        <Select>
                          <Select.Option value=""></Select.Option>
                          <Select.Option value="健診コース">健診コース</Select.Option>
                          <Select.Option value="受診日">受診日</Select.Option>
                          <Select.Option value="カナ氏名">カナ氏名</Select.Option>
                          <Select.Option value="事業所コード">事業所コード</Select.Option>
                        </Select>
                      </Form.Item>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="外部" key={3}>
                      <div style={{ ...labelStyle, marginTop: 0 }}>プログラムの場所</div>
                      <Form.Item name="Run" style={{ marginLeft: '20px' }} >
                        <Radio.Group>
                          <Radio value='N' style={radioStyle}>ネットワーク上のEXECフォルダ内</Radio>
                          <Radio value='L' style={radioStyle}>各端末のEXECフォルダ内</Radio>
                          <Radio value='D' style={radioStyle}>直接指定する</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <div style={labelStyle}>起動方法</div>
                      <Form.Item name="Type" style={{ marginLeft: '20px' }}  >
                        <Radio.Group>
                          <Radio value='H' style={radioStyle}>画面を表示しない</Radio>
                          <Radio value='N' style={radioStyle}>通常のサイズで起動する</Radio>
                          <Radio value='X' style={radioStyle}>最大化で起動する</Radio>
                          <Radio value='M' style={radioStyle}>最小化で起動する</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <div style={labelStyle}>プログラムファイル</div>
                      <Form.Item name="Expresstion_67" style={{ marginLeft: '20px' }}  >
                        <TextArea rows={2} readOnly style={{ border: 'none', background: 'transparent' }}></TextArea>
                      </Form.Item>
                      <Form.Item name="Exec" style={{ marginLeft: '20px' }} >
                        <TextArea rows={2}
                          onDoubleClick={() => { document.getElementById("idUploadExec").click() }}
                        ></TextArea>
                      </Form.Item>
                      <Upload id="idUploadExec"
                        accept=".txt,.csv,.xlsx"
                        beforeUpload={(file) => {
                          return new Promise(resolve => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              this.formRef.current?.setFieldsValue({
                                Exec: file.name
                              })
                            };
                          });
                        }}><span hidden></span>
                      </Upload>
                    </Tabs.TabPane>
                  </Tabs>
                  <hr style={{ marhin: '15px 0' }} />
                  <Space style={{ float: 'right' }}>
                    <Button type='primary'
                      // hidden={this.checkAddItem() || (!this.state.dataSource[this.state.indexTable]?.No)}
                      onClick={() => { this.updateRecordData(this.state.indexTable) }}
                      icon={<SaveOutlined />} >
                      保存
                    </Button>
                  </Space>
                </Spin>
              </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0460001_CsvCreateParamMaintain);
