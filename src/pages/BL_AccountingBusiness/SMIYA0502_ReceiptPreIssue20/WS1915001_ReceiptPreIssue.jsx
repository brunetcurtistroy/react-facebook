import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Select, Button, Table, Row, Col, DatePicker, Modal, Space, Checkbox, Menu, Dropdown, message } from "antd";
import { SearchOutlined, ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import WS0946006_ReceiptIssueOnline from "./WS0946006_ReceiptIssueOnline";
import ReceiptPreIssueService from "services/AccountingBusiness/ReceiptPreIssue20/ReceiptPreIssueService";
import moment from "moment";
import WS0061012_CheckYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061012_CheckYes";
import WS1512001_OptionalInfoMaintain from "pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS1512001_OptionalInfoMaintain";
import WS0061003_ConfirmCheckYesYesNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061003_ConfirmCheckYesYesNo";
import WS0061002_ConfirmCheckYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061002_ConfirmCheckYes";
import WS0061009_CheckYesNoYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1915001_ReceiptPreIssue extends React.Component {
  formRef = React.createRef();
  containerRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '領収書事前発行';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      defaultData: {},
      loading: false,
      selectedRowKeys: [],
      selectedRows: [],
      stsEnd: null,
      tableLoading: false,
    };

    this.setFormFieldValue = this.setFormFieldValue.bind(this)
  }
  componentDidMount() {
    this.formRef.current.setFieldsValue({
      tableData: []
    });
    this.getScreenData();
  }
  getScreenData = () => {
    this.setState({
      loading: true,
    })
    ReceiptPreIssueService.getScreenData().then(res => {
      this.formRef.current.setFieldsValue({
        DateFChar: moment(res.data.DateFChar, 'YYYY/MM/DD'),
        OfficeCode: res.data.OfficeCode,
        BranchStoreCode: res.data.BranchStoreCode,
        CourseCode: res.data.CourseCode,
        course_name_formal: res.data.course_name_formal,
        StatusFlag: res.data.StatusFlag,
        Issue: res.data.Issue ? res.data.Issue : '',
      })
      this.setState({
        defaultData: res.data
      })
    }).catch(error => {
      message.error(error)
    }).finally(() => {
      this.setState({ loading: false })
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
  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      }
    ])
  }
  checkInputField = (e, fieldName) => {
    this.setState({ loading: true })
    if (e.target.value.length > 0) {
    } else {
      fieldName.map(item => {
        this.setFormFieldValue(item, "")
      })
    }
    this.setState({ loading: false })
  }
  rowSelectedChange = (data) => {
    let arr = [];
    let arrTemp = [];
    data.map(item => {
      if (item.W2_issue) {
        arr.push(item.id);
        arrTemp.push(item)
      }
    })

    this.setState({
      selectedRowKeys: arr,
      selectedRows: arrTemp
    })
  }
  onChangeCheckBox = (index, selected, record) => {
    let parram = {}
    if (index || index == 0) {
      parram.id = index
      parram.W2_issue = selected
      parram.W2_date_receipt = record.W2_date_receipt;
      parram.W2_office_name = record.W2_office_name;
      parram.W2_person_name = record.W2_person_name;
      parram.W2_remark = record.W2_remark;
    } else {
      parram.change = selected
    }
    this.setState({
      loading: true,
    })
    ReceiptPreIssueService.changeCheckbox(parram)
      .then(res => {
        this.DisplayList()
      })
      .catch(error => {
        message.error(error)
      })
      .finally(() => {
        this.setState({
          loading: false
        })
      })
  }
  onChangeOfficeCode = (e) => {
    if (this.formRef.current.getFieldValue('OfficeCode').length > 0) {
      this.setState({
        loading: true
      })
      let params = {
        OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
        StsOffice: this.state.defaultData.StsOffice,
        StsOfficeInfo: this.state.defaultData.StsOfficeInfo,
      }
      ReceiptPreIssueService.changeOfficeCode(params)
        .then(res => {
          console.log(res)
          this.setFormFieldValue('OfficeCode', res.data.OfficeCode)
          this.setFormFieldValue('BranchStoreCode', res.data.BranchStoreCode)
          this.setFormFieldValue('office_kanji_name', res.data.office_kanji_name)
        })
        .catch(error => {
          message.error(error)
        }).finally(() => {
          this.setState({
            loading: false
          })
        })
    } else {
      return
    }

  }
  checkMesstoScreen = (mess, data = null) => {
    let screen = mess?.slice(mess.toLowerCase().indexOf('ws'));
    let component = null;
    switch (screen) {
      // @desc: List Screen Event F3
      // @data: W2_reserve_num, W2_identify
      case 'WS0061009':
        return component = (
          <WS0061009_CheckYesNoYes
            Li_Title='欠損'
            Li_Message='領収ﾃﾞｰﾀを欠損しますか?'
            onFinishScreen={(output) => {
              if (output.Lio_StsReturn) {
                let params = { Li_ReserveNum: data?.W2_reserve_num, Li_Idenfity: data?.W2_identify }
                this.onEventF3After(params);
                this.closeModal();
              }
            }}
          />
        );
      case 'WS0061015':
        return component = (
          <WS0061015_CheckYesNoNo
            Li_Title='欠損'
            Li_Message='領収ﾃﾞｰﾀを欠損しますか?'
            onFinishScreen={(output) => {
              if (output.Lio_StsReturn) {
                let params = { Li_ReserveNum: data?.W2_reserve_num, Li_Idenfity: data?.W2_identify }
                this.onEventF3After(params);
                this.closeModal();
              }
            }}
          />
        );
      case 'WS0061012':
        return component = (
          <WS0061012_CheckYes
            Li_Title='欠損'
            Li_Message='領収ﾃﾞｰﾀを欠損しますか?'
            onFinishScreen={(output) => {
              if (output.Lio_StsReturn) {
                let params = { Li_ReserveNum: data?.W2_reserve_num, Li_Idenfity: data?.W2_identify }
                this.onEventF3After(params);
                this.closeModal();
              }
            }}
          />
        );
      case 'WS0061002':
        return component = (
          <WS0061002_ConfirmCheckYes
            Li_Title='欠損'
            Li_Message='領収ﾃﾞｰﾀを欠損しますか?'
            onFinishScreen={(output) => {
              if (output.Lio_StsReturn) {
                let params = { Li_ReserveNum: data?.W2_reserve_num, Li_Idenfity: data?.W2_identify }
                this.onEventF3After(params);
                this.closeModal();
              }
            }}
          />
        );
      case 'WS0061003':
        return component = (
          <WS0061003_ConfirmCheckYesYesNo
            Li_Title='欠損'
            Li_Message='領収ﾃﾞｰﾀを欠損しますか?'
            onFinishScreen={(output) => {
              if (output.Lio_StsReturn) {
                let params = { Li_ReserveNum: data?.W2_reserve_num, Li_Idenfity: data?.W2_identify }
                this.onEventF3After(params);
                this.closeModal();
              }
            }}
          />
        );
      // @desc: Event F12
      case 'WS0946006':
        return component = <WS0946006_ReceiptIssueOnline
          data
          onFinishScreen={(output) => {
            this.DisplayList();
            this.closeModal();
          }} />
      // @desc: Event Ctrl + O
      // @data: Li_TypeCode, Li_OptionCode, Li_Expansion
      case 'WS1512001':
        return component = (
          <WS1512001_OptionalInfoMaintain
            {...data}
            onFinishScreen={(output) => {
            }}
          />)
      default:
        return component;
    }
  }
  onEventF3 = (record) => {
    this.setState({
      loading: true
    })
    if (record.receipt_number >= 0) {
      let component = null;
      let error = null;
      ReceiptPreIssueService.eventF3()
        .then(res => {
          if (res.data.warning) {
            error = res.data.warning;
          } else {
            component = this.checkMesstoScreen(res.data.message, record);
          }
        })
        .catch(error => {
          message.error(error)
        }).finally(() => {
          if (component !== null) {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: true,
                width: '40%',
                component: component
              }
            })
          } else {
            return message.info(error);
          }
        })
    } else {
      Modal.info({
        content: (<p>領収書が未発行です</p>),
        icon: <ExclamationCircleOutlined />,
        okText: 'OK',
      })
    }
    this.setState({
      loading: false,
    })
  }
  onEventF3After = (params) => {
    this.setState({
      loading: true,
    })
    ReceiptPreIssueService.eventF3After(params)
      .then(res => {
        this.DisplayList()
      }).catch(error => {
        message.error(error)
      }).finally(() => {
        this.setState({
          loading: false,
        })
      })
  }
  onEventF12 = () => {
    this.setState({
      loading: true,
    })
    Modal.confirm({
      title: '領収書の事前発行を実行しますか',
      icon: <ExclamationCircleOutlined />,
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        ReceiptPreIssueService.runBtn()
          .then(res => {
            let data = {
              TypeCode: res.data.variables,
              OptionCode: res.data.variables,
              ItemDataPrinter: res.data.variables,
              ReceiptDateScreen: res.data.variables,
              OfficeCodeNew: res.data.variables,
              StsDateReceiptMore: res.data.variables,
              Proviso: res.data.variables,
              InspectIssue: res.data.variables,
              StsPrintPreview: res.data.variables,
              Li_Parameters: res.data.variables.param,
              Li_UsuallyInAdvance: res.data.variables.param,
            }
            let component = this.checkMesstoScreen(res.data.message, data)
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: true,
                width: 500,
                component
              },
            })
          })
          .catch(error => {
            message.error(error)
          })
          .finally(() => {
            this.setState({
              loading: false,
            })
          })
      }
    })
  }
  onEventCtrlO = () => {
    this.setState({
      loading: true
    })
    let component = null;
    ReceiptPreIssueService.eventCtrlo()
      .then(res => {
        let data = {
          Li_TypeCode: res.data.variables.Li_TypeCode,
          Li_OptionCode: res.data.variables.Li_OptionCode,
          Li_Expansion: res.data.variables.Li_Expansion,
        }
        component = this.checkMesstoScreen(res.data.message, data);
      }).catch(error => {
        message.error(error)
      }).finally(() => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            width: '80%',
            visible: true,
            component
          },
          loading: false,
        })
      })
  }
  onEventExit = () => {
    this.setState({
      loading: true,
    })
    ReceiptPreIssueService.exit().then(res => {
      this.setState({
        stsEnd: res.data.variables.StsEnd,
      })
      message.success(res.data.message ? res.data.message : '')
    }).catch(error => {
      message.error(error);
    }).finally(() => {
      this.setState({
        loading: false,
      })
    })
  }
  onSearchBtn = () => {
    this.setState({
      tableLoading: true,
    })
    let params = {
      Li_DateF: moment(this.formRef.current.getFieldValue('DateFChar')).format('YYYY/MM/DD'),
      Li_DateT: moment(this.formRef.current.getFieldValue('DateFChar')).format('YYYY/MM/DD'),
      Li_OfficeCode: this.formRef.current.getFieldValue('OfficeCode'),
      Li_BranchStoreCode: this.formRef.current.getFieldValue('BranchStoreCode'),
      Li_Course: this.formRef.current.getFieldValue('CourseCode'),
      Li_StatusFlag: this.formRef.current.getFieldValue('StatusFlag'),
      Li_Issue: this.formRef.current.getFieldValue('Issue') ? this.formRef.current.getFieldValue('Issue') : "",
      Li_Run: this.state.defaultData.AllPart,
      Li_KanaName: this.state.defaultData.KanaName ? this.state.defaultData.KanaName : "",
      Li_DateBirth: this.state.defaultData.BirthDateDate ? this.state.defaultData.BirthDateDate : "",
      Li_DisplayOrder: this.state.defaultData.DisplayOrder,
    }
    ReceiptPreIssueService.searchBtn(params)
      .then(res => {
        this.DisplayList()
        // this.rowSelectedChange(this.formRef.current?.getFieldValue('tableData') ? this.formRef.current?.getFieldValue('tableData') : []);
      }).catch(error => {
        message.error(error)
      })
  }
  DisplayList() {
    this.setState({ tableLoading: true })
    ReceiptPreIssueService.displayList()
      .then(response => {
        this.formRef.current.setFieldsValue({
          tableData: response.data
        })
        this.rowSelectedChange(response.data)
      }).catch(error => {
        message.error(error)
      }).finally(() => {
        this.setState({ tableLoading: false })
      })
  }
  onFinish(values) {

  }

  render() {
    return (
      <div className="receipt-pre-issue">
        <Card title="領収書事前発行">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row ref={this.containerRef}>
              <Col span={12}>
                <Row>
                  <Col span={3} style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <label style={{
                      fontWeight: 'bold',
                      color: '#14468C'
                    }}>
                      受診日
                    </label>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name="DateFChar"
                      label=""
                      labelCol={{ span: 6 }}
                    >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format={'YYYY/MM/DD'} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row >
                  <Col span={3} style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <label style={{
                      fontWeight: 'bold',
                      color: '#14468C'
                    }}>
                      事業所
                    </label>
                  </Col>
                  <Col span={3}>
                    <Form.Item
                      name="OfficeCode"
                      label=""
                      labelCol={{ span: 12 }}
                    >
                      <Input type="text"
                        style={{ textAlign: 'right' }}
                        onChange={(e) => this.checkInputField(e, ['office_kanji_name', 'BranchStoreCode'])}
                        onBlur={(e) => this.onChangeOfficeCode(e)}
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '70%',
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue('OfficeCode', output.Lio_OfficeCode);
                                    this.setFormFieldValue('BranchStoreCode', output.Lio_BranchStoreCode);
                                    this.setFormFieldValue('office_kanji_name', output.Lo_Kanji_Name)
                                    this.closeModal()
                                  }}
                                />),
                            },
                          })
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ paddingLeft: '5px' }}>
                    <Form.Item
                      name="BranchStoreCode"
                      label=""
                    >
                      <Input type="text"
                        style={{ textAlign: 'right' }}
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '70%',
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue('OfficeCode', output.Lio_OfficeCode);
                                    this.setFormFieldValue('BranchStoreCode', output.Lio_BranchStoreCode);
                                    this.setFormFieldValue('office_kanji_name', output.Lo_Kanji_Name)

                                    this.closeModal()
                                  }}
                                />),
                            },
                          })
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ paddingLeft: '5px' }}>
                    <Form.Item
                      name="office_kanji_name"
                      label=""
                    >
                      <span>{this.formRef.current?.getFieldValue('office_kanji_name')}</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={3} style={{ textAlign: 'right', paddingRight: '8px' }} >
                    <label style={{
                      fontWeight: 'bold',
                      color: '#14468C'
                    }}>
                      コース
                    </label>
                  </Col>
                  <Col span={2}>
                    <Form.Item
                      name="CourseCode"
                      label=""
                      labelCol={{ span: 15 }}
                    >
                      <Input type="text"
                        onChange={(e) => this.checkInputField(e, ['course_name_formal'])}

                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '60%',
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue('CourseCode', output.Lo_CourseCode);
                                    this.setFormFieldValue('course_name_formal', output.Lo_CourseName)
                                    this.closeModal()
                                  }}
                                />),
                            },
                          })
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} style={{ paddingLeft: '5px' }}>
                    <Form.Item
                      name="course_name_formal"
                    >
                      <span>{this.formRef.current?.getFieldValue('course_name_formal')}</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row >
                  <Col span={3} style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <label style={{
                      fontWeight: 'bold',
                      color: '#14468C'
                    }}>
                      状　態
                    </label>
                  </Col>
                  <Col span={3}>
                    <Form.Item
                      name="StatusFlag"
                      label=""
                      labelCol={{ span: 12 }}
                    >
                      <Select> {/** 4:全て,0:予約,1:受付,2:保留,3:待ち */}
                        <Select.Option value={4}>全て</Select.Option>
                        <Select.Option value={0}>予約</Select.Option>
                        <Select.Option value={1}>受付</Select.Option>
                        <Select.Option value={2}>保留</Select.Option>
                        <Select.Option value={3}>待ち</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={3} style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <label style={{
                      fontWeight: 'bold',
                      color: '#14468C'
                    }}>
                      発行
                    </label>
                  </Col>
                  <Col span={3}>
                    <Form.Item
                      name="Issue"
                      label=""
                      labelCol={{ span: 12 }}
                      labelAlign="right"
                    >
                      <Select>
                        {/** 全て,新規,再発行 */}
                        <Select.Option value=''>全て</Select.Option>
                        <Select.Option value={1}>新規</Select.Option>
                        <Select.Option value={2}>再発行</Select.Option>

                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ textAlign: 'right', float: 'right' }}>
                    <Button icon={<SearchOutlined />} onClick={this.onSearchBtn}>　検　　索</Button>
                  </Col>
                </Row>
              </Col>

              <Col span={12} style={{ paddingBottom: '10px', textAlign: 'right', alignSelf: 'flex-end' }}>
                <Button type='primary'
                  onClick={() => {
                    this.onEventF12()
                  }}
                >領収発行</Button>
              </Col>
            </Row>
            <Table
              size="small"
              bordered
              dataSource={this.formRef.current?.getFieldValue('tableData')}
              loading={this.state.tableLoading}
              pagination={false}
              rowKey={(record) => record.id}
              scroll={{ x: '1200px', y: `${(window.innerHeight - (this.containerRef.current?.offsetHeight + this.containerRef.current?.offsetTop + 85)) || 450}px` }}
              sticky={true}
              rowSelection={{
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (record, selected, selectedRows) => {
                  this.onChangeCheckBox(record.id, !record.W2_issue, record)
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                  this.onChangeCheckBox(null, selected, null);
                },
              }}
              rowClassName={record => !record.W2_issue && "disabled-row"}
            >
              <Table.Column title="個人番号" dataIndex="" key="" width={100} render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'personal_number_id']} style={{ textAlign: 'right' }}>
                    <span>{record.personal_number_id}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="氏名" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'W2_destination_name']}>
                    <span>{record.W2_destination_name}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="コース" width={200} dataIndex="" key=""
                render={(value, record, index) => {
                  return (
                    <Row>
                      <Col>
                        <Form.Item name={['tableData', index, 'visit_course']}>
                          <span>{record.visit_course || 'xx xxx'}</span>
                        </Form.Item>
                      </Col>
                      <Col style={{ paddingLeft: '5px' }}>
                        <Form.Item name={['tableData', index, 'W2_target']}>
                          <span>{record.W2_target || 'xx xxx'}</span>
                        </Form.Item>
                      </Col>
                    </Row>
                  )
                }}
              />
              <Table.Column title="事業所" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'office_kanji_name']}>
                    <span>{record.office_kanji_name}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="領収番号" dataIndex="" key="" width={80} render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'receipt_number']} style={{ textAlign: 'right' }}>
                    <span>{record.receipt_number > 0 ? record.receipt_number : ''}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="金額" dataIndex="" key="" width={80} render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'W2_receipt_amount']} style={{ textAlign: 'right' }}>
                    <span>{record.W2_receipt_amount ? (record.W2_receipt_amount).toLocaleString() : ''}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="領収日" dataIndex="" key="" width={60}
                render={(value, record, index) => {
                  return (
                    <Form.Item name={['tableData', index, 'W2_date_receipt']} style={{ textAlign: 'center' }}>
                      <Checkbox checked={record.W2_date_receipt}></Checkbox>
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="事業所" dataIndex="" key="" width={60}
                render={(value, record, index) => {
                  return (
                    <Form.Item name={['tableData', index, 'W2_office_name']} style={{ textAlign: 'center' }}>
                      <Checkbox checked={record.W2_office_name}></Checkbox>
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="個　人" dataIndex="" key="" width={60}
                render={(value, record, index) => {
                  return (
                    <Form.Item name={['tableData', index, 'W2_person_name']} style={{ textAlign: 'center' }}>
                      <Checkbox checked={record.W2_person_name}></Checkbox>
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="備考" dataIndex="" key="" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'W2_remark']}>
                  <Input />
                </Form.Item>
              }} />
              <Table.Column
                key="action"
                fixed="right"
                width={50}
                render={(value, record, index) => {
                  return (
                    <Dropdown.Button
                      icon={<MoreOutlined />}
                      size="small"
                      overlay={() => (
                        <Menu>
                          <Menu.Item key="1" onClick={(e) => { this.onEventF3(record) }} >
                            <label>F3</label>
                          </Menu.Item>
                          {/* <Menu.Item key="2" onClick={(e) => {
                            this.onEventF12()
                          }} >
                            <label>F12</label>
                          </Menu.Item> */}
                        </Menu>
                      )}
                    ></Dropdown.Button>
                  );
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
          maskClosable={false}
          onCancel={() => { 
            this.closeModal()
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1915001_ReceiptPreIssue);
