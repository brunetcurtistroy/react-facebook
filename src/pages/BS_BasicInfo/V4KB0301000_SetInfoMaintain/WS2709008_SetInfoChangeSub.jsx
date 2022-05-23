/* eslint-disable no-useless-concat */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Form, Row, Col, Input, Select, Button, Checkbox, Space, Table, message, InputNumber, Spin, Modal } from "antd";

import { DoubleRightOutlined, DoubleLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import WS2709068_CopyStartDate from "pages/BS_BasicInfo/V4KB0301000_SetInfoMaintain/WS2709068_CopyStartDate.jsx";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import WS0061012_CheckYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061012_CheckYes";
import { WS0299006_ConfirmScreen } from "./WS0299006_ConfirmScreen";

import SetInfoChangeSubAction from "redux/basicInfo/SetInfoMaintain/SetInfoChangeSub.action";
import ConfirmScreenAction from "redux/basicInfo/SetInfoMaintain/ConfirmScreen.action";

import print from 'assets/img/print.png'
import coppy from 'assets/img/coppy.png'
import csv from 'assets/img/csv.png'
import { debounce } from "lodash";

import './custom-style.scss'
import Color from "constants/Color";

const styleImg = {
  marginBottom: '0.5em',
  width: '50px'
}

const styleLabel = {
  width: '53px',
  height: '32px',
  display: 'inline-flex',
  justifyContent: 'right',
  alignItems: 'center',
  fontWeight: 'bold',
  color: '#14468C',
  paddingRight: 10
}

class WS2709008_SetInfoChangeSub extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_statusModal: PropTypes.any,
    Lio_SetCode: PropTypes.any,
    Li_SetIdentify: PropTypes.any,
    Li_ContextId: PropTypes.any,
    Li_KyokaiAdjustmentsSetClassify: PropTypes.any,
    Lio_start_date_on: PropTypes.any,
    Li_association_adjustments: PropTypes.any,

    Li_SetName: PropTypes.any,
    Li_SetShortName: PropTypes.any,
    Li_checkCode: PropTypes.any,

    Lo_SetIdentify: PropTypes.any,

    Lo_stsChangeValue: PropTypes.any,

    onChangeValue: PropTypes.func,
    onChangeStartDate: PropTypes.func,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "セット情報変更SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      screenData: {},
      checkedCode: true,
      disabledConditionAge: true,
      isLoadingTableLeft: false,
      isLoadingTableRight: false,
      dataSourceLeft: [],
      rowSelectLeft: [],
      selectedRowKeyLeft: [],
      dataSourceRight: [],
      rowSelectRight: [],
      selectedRowKeyRight: [],
      enabledForward: false,
      enabledBackward: false,
      disabledSetCode: false,
      disabledUpdateBtn: true,
      dataSreenConFirm: {},

      isLoadingForm: true,
      selectOption: 0,

      dataForm: {},
      dataRightOld: [],

      changeValue: false
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.formRef.current.setFieldsValue({
      StartDate: this.props.Li_statusModal === 'Create' ? '' : this.props.Lio_start_date_on?.replaceAll('-', '/'),
    });
    this.setState({
      isLoadingForm: true,
      changeValue: false
    })
    this.callApiGetScreenData();
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        isLoadingForm: true,
        changeValue: false
      })
      this.formRef.current?.resetFields()
      this.formRef.current?.setFieldsValue({
        StartDate: this.props.Li_statusModal === 'Create' ? '' : this.props.Lio_start_date_on?.replaceAll('-', '/'),
      });
      this.callApiGetScreenData();
    }
  }

  callApiGetScreenData() {
    let params = {
      Li_SetCode: this.props.Lio_SetCode,
      Li_SetIdentify: this.props.Li_SetIdentify,
      Li_KyokaiAdjustmentsSetClassify: this.props.Li_KyokaiAdjustmentsSetClassify,
    };

    SetInfoChangeSubAction.getScreenData(params)
      .then((res) => {
        this.setState({
          screenData: res ? res : [],
          selectOption: 0
        });

        if (res) {
          this.formRef.current?.setFieldsValue({
            Li_SetCode: this.props.Li_statusModal === 'Create' ? '' : this.props.Lio_SetCode,
            SetCode: this.props.Li_statusModal === 'Create' ? '' : this.props.Lio_SetCode,
            SetName: this.props.Li_statusModal === 'Create' ? '' : res.SetInfo?.set_name,
            SearchShortName: this.props.Li_statusModal === 'Create' ? '' : res.SetInfo?.search_short_name,
            SetAbbreviation: this.props.Li_statusModal === 'Create' ? '' : res.SetInfo?.set_short_name,
            SetIdentify: res.SetInfo?.set_identification,
            KyokaiAdjustmentsSetClassify: this.props.Li_KyokaiAdjustmentsSetClassify,

            Select: 0,
            SearchInspect: ''
          });
        }

        this.getCondition()

        this.callApiGetRetrieval()
      })
  }

  callApiGetComboxStartDate() {
    let params = {
      Li_SetCode: this.props.Lio_SetCode,
    };

    SetInfoChangeSubAction.getComboboxStartDate(params)
      .then((res) => {
        let data = { ...this.state.screenData }
        data['ComboBox_StartDate'] = res?.ComboBox_StartDate
        this.setState({
          screenData: data
        });
        this.formRef.current?.setFieldsValue({
          StartDate: res?.ComboBox_StartDate[0]?.LinkedField
        });
        this.getCondition()
        this.callApiGetRightListData()
      })
  }

  getCondition() {
    this.setState({ isLoadingForm: true })
    let params = {
      Li_SetCode: this.props.Lio_SetCode,
      SetCode: this.props.Lio_SetCode,
      StartDate: this.formRef.current?.getFieldValue('StartDate')
    };
    SetInfoChangeSubAction.getCondition(params)
      .then((res) => {
        let data = {
          ...this.formRef.current?.getFieldValue(),
          ...res,
          ConditionEffective: this.props.Li_statusModal === 'Create' ? false : res?.ConditionEffective === 1 ? true : false,
          W2_add_label_num: this.props.Li_statusModal === 'Create' ? null : res?.W2_add_label_num === 0 ? '' : res?.W2_add_label_num,
          W2_unit_price: this.props.Li_statusModal === 'Create' ? null : res?.W2_unit_price === 0 ? '' : res?.W2_unit_price,
          W2_cost: this.props.Li_statusModal === 'Create' ? null : res?.W2_cost === 0 ? '' : res?.W2_cost,
          W2_target_cd: this.props.Li_statusModal === 'Create' ? '' : res?.W2_target_cd,
          W2_remark: this.props.Li_statusModal === 'Create' ? '' : res?.W2_remark,
          W2_condition_gender: this.props.Li_statusModal === 'Create' ? 0 : res?.W2_condition_gender,
          W2_condition_screening: this.props.Li_statusModal === 'Create' ? 0 : res?.W2_condition_screening,
          W2_condition_relation: this.props.Li_statusModal === 'Create' ? '' : res?.W2_condition_relation,
          W2_condition_hospital_out: this.props.Li_statusModal === 'Create' ? 0 : res?.W2_condition_hospital_out,
          W2_condition_time_segment: this.props.Li_statusModal === 'Create' ? '' : res?.W2_condition_time_segment,
          W2_condition_age_identify_cd: this.props.Li_statusModal === 'Create' ? '' : res?.W2_condition_age_identify_cd,
          W2_condition_age_calc_sect: this.props.Li_statusModal === 'Create' ? ''
            : res?.ConditionEffective ? res?.W2_condition_age_calc_sect : '',
        }

        this.formRef.current?.setFieldsValue(data)

        // this.callApiGetRetrieval()
        this.setState({
          disabledSetCode: this.props.Li_statusModal === 'Create' ? false : true,
          disabledUpdateBtn: this.props.Li_statusModal === 'Create' ? true : false,
          checkedCode: this.props.Li_statusModal === 'Create' ? false : res?.ConditionEffective === 1 ? true : false,
        });

        this.setState({ dataForm: data })
      })
  }

  callApiGetRetrieval() {
    let params = {
      Li_SetCode: this.formRef.current?.getFieldValue('Li_SetCode'),
      SetCode: this.formRef.current?.getFieldValue('SetCode'),
      SearchInspect: this.formRef.current?.getFieldValue('SearchInspect'),
      Select: this.formRef.current?.getFieldValue('Select'),
      StartDate: this.formRef.current?.getFieldValue('StartDate')
    }
    this.setState({ isLoadingForm: true })
    SetInfoChangeSubAction.getLeftListData(params)
      .then((res) => {
        this.callApiGetRightListData()
      })
      .catch((err) => {
        this.setState({
          isLoadingForm: false,
        })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
  };

  getLeftSetListData() {
    let params = {
      Li_SetCode: this.props.Lio_SetCode,
      SetCode: this.props.Lio_SetCode,
      SearchInspect: this.formRef.current?.getFieldValue('SearchInspect'),
      Select: this.formRef.current?.getFieldValue('Select'),
      StartDate: this.formRef.current?.getFieldValue('StartDate')
    }

    this.setState({
      isLoadingTableLeft: true,
    });
    SetInfoChangeSubAction.getLeftSetListData(params)
      .then((res) => {
        let data = res ? res : []
        data.map(x => (
          x.textColor = this.state.dataSourceRight.findIndex(y => y.W2_inspect_cd === x.set_code) === -1 ? '' : '#b9b9b9'
        ))

        this.setState({
          dataSourceLeft: res ? data : [],
          isLoadingTableLeft: false,
          selectedRowKeyLeft: [],
          rowSelectLeft: [],
          enabledForward: false,
          isLoadingForm: false
        });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() =>
        this.setState({
          isLoadingTableLeft: false,
          isLoadingForm: false
        })
      );
  };

  getLeftExamListData() {
    let params = {
      Li_SetCode: this.props.Lio_SetCode,
      SetCode: this.props.Lio_SetCode,
      SearchInspect: this.formRef.current?.getFieldValue('SearchInspect'),
      Select: this.formRef.current?.getFieldValue('Select'),
      StartDate: this.formRef.current?.getFieldValue('StartDate')
    }

    this.setState({
      isLoadingTableLeft: true,
    });
    SetInfoChangeSubAction.getLeftExamListData(params)
      .then((res) => {
        let data = res ? res : []
        data.map(x => (
          x.textColor = this.state.dataSourceRight.findIndex(y => y.W2_inspect_cd === x.W1_inspect_cd) === -1 ? '' : '#b9b9b9'
        ))

        this.setState({
          dataSourceLeft: res ? data : [],
          isLoadingTableLeft: false,
          selectedRowKeyLeft: [],
          rowSelectLeft: [],
          enabledForward: false,
          isLoadingForm: false
        });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() =>
        this.setState({
          isLoadingTableLeft: false,
          isLoadingForm: false
        })
      );
  };

  callApiGetRightListData(change) {
    let params = {
      Li_SetCode: this.formRef.current?.getFieldValue('Li_SetCode'),
      SetCode: this.formRef.current?.getFieldValue('SetCode'),
      SearchInspect: this.formRef.current?.getFieldValue('SearchInspect'),
      Select: this.formRef.current?.getFieldValue('Select'),
      StartDate: this.formRef.current?.getFieldValue('StartDate')
    }

    this.setState({ isLoadingTableRight: true });
    SetInfoChangeSubAction.getRightListData(params)
      .then(async (res) => {
        await this.setState({
          dataSourceRight: res ? res : [],
          isLoadingTableRight: false,
          selectedRowKeyRight: [],
          rowSelectRight: [],
          enabledBackward: false
        });

        if (this.state.selectOption === 0) {
          this.getLeftExamListData()
        } else {
          this.getLeftSetListData()
        }

        if (this.state.changeValue) {
          this.onChange()
        }
      })
      .catch((err) => {
        this.setState({
          isLoadingForm: false,
        })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() =>
        this.setState({
          isLoadingTableRight: false
        })
      );
  };

  onAddItem = (value) => {
    if (this.formRef.current?.getFieldValue('Li_SetCode')) {
      let params = {
        Li_SetCode: this.formRef.current?.getFieldValue('Li_SetCode'),
        SetCode: this.formRef.current?.getFieldValue('SetCode'),
        set_code: this.state.selectOption === 1 ? value[0]?.set_code : '',
        StartDate: this.formRef.current?.getFieldValue('StartDate'),
        W1_inspect_cd: this.state.selectOption === 0 ? value[0]?.W1_inspect_cd : '',
        association_adjustments: this.props.Li_association_adjustments ? this.props.Li_association_adjustments : 0,
        Select: this.formRef.current?.getFieldValue('Select')
      };

      SetInfoChangeSubAction.addInspectItem(params)
        .then(async (res) => {
          await this.setState({ changeValue: true })
          // this.callApiGetRetrieval()
          this.callApiGetRightListData()
        });
    } else {
      message.error('コードを入力カしてください !')
    }
  };

  historyDeleteBtn() {
    if (this.formRef.current?.getFieldValue('StartDate') == '0000/00/00') {
      Modal.error({
        title: '0000/00/00は基礎データのため削除できません。',
        width: 465
      })
    } else {
      let message = '開始日（' + this.formRef.current?.getFieldValue('StartDate') + '）とその検査、条件を削除しますか？'
      this.setState({
        childModal: {
          visible: true,
          width: 400,
          component: (
            <WS0061015_CheckYesNoNo
              Li_Title={'削除確認'}
              Li_Message={message}
              onFinishScreen={({ Lio_StsReturn }) => {
                if (Lio_StsReturn) {
                  this.callApiHistoryDelete()
                }

                this.closeModal()
              }}
            />
          )
        }
      })
    }
  };

  callApiHistoryDelete() {
    let params = {
      SetCode: this.formRef.current?.getFieldValue('SetCode'),
      StartDate: this.formRef.current?.getFieldValue('StartDate'),
      DeleteConfirm: 1,
    };
    SetInfoChangeSubAction.historyDelete(params)
      .then(async (res) => {
        await this.setState({ changeValue: true })
        this.setState({
          childModal: {
            visible: true,
            width: 300,
            component: (
              <WS0061012_CheckYes
                Li_Message={'削除しました。'}
                onFinishScreen={async ({ Lio_StsReturn }) => {
                  await this.callApiGetComboxStartDate();
                  await this.formRef.current?.setFieldsValue({
                    StartDate: this.state.screenData.ComboBox_StartDate[0]?.LinkedField
                  });
                  if (this.props.onChangeStartDate) {
                    this.props.onChangeStartDate({})
                  }
                  this.closeModal()
                }}
              />
            )
          }
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

  onRemoveItem(id) {
    let params = {
      id: id
    };

    SetInfoChangeSubAction.removeInspectItem(params)
      .then(async (res) => {
        await this.setState({ changeValue: true })
        // this.callApiGetRetrieval()

        this.callApiGetRightListData()
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

  updateButton(value) {
    let data = [...this.state.dataSourceRight]
    if (data.length > 0) {
      data.push({ W2_inspect_cd: 0 })
    }

    let params = {
      ...value,
      ConditionEffective: value.ConditionEffective ? 1 : 0,
      RightListData: data,
      Li_KyokaiAdjustmentsSetClassify: this.props.Li_KyokaiAdjustmentsSetClassify,
      StsNotInputValidation: this.state.screenData.StsNotInputValidation,
      SetCode: this.formRef.current?.getFieldValue('Li_SetCode'),
      StartDate: this.formRef.current?.getFieldValue('StartDate'),
      Li_SetCode: this.formRef.current?.getFieldValue('Li_SetCode'),
      SetIdentify: this.formRef.current?.getFieldValue('SetIdentify'),
      SetCodeDuplicateCheck: this.state.screenData.SetCodeDuplicateCheck,
      SetName: this.formRef.current?.getFieldValue('SetName'),
      SetAbbreviation: this.formRef.current?.getFieldValue('SetAbbreviation'),
      SearchShortName: this.formRef.current?.getFieldValue('SearchShortName'),
      KyokaiAdjustmentsSetClassify: this.formRef.current?.getFieldValue('KyokaiAdjustmentsSetClassify'),
      ContractRenewalDate: this.state.screenData.ContractRenewalDate,
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

  createData(value) {
    let data = [...this.state.dataSourceRight]
    if (data.length > 0) {
      data.push({ W2_inspect_cd: 0 })
    }
    let params = {
      ...value,
      ConditionEffective: value.ConditionEffective ? 1 : 0,
      RightListData: data
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
      ConditionEffective: value.ConditionEffective ? 1 : 0,
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

  outputButton = (value) => {
    let params = {
      ...value,
      ConditionEffective: value.ConditionEffective ? 1 : 0
    }
    Modal.confirm({
      width: 300,
      title: '変更があります。適用してから出力しますか？',
      onOk: () => {
        SetInfoChangeSubAction.outputButton(params)
          .then((res) => {
            this.modalOuputSelect();
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
    })
  };

  modalOuputSelect() {
    this.setState({
      childModal: {
        visible: true,
        width: 400,
        component: (
          <Card title="出力選択">
            <div style={{ marginTop: '1em', textAlign: 'center' }}>
              <Space style={{ marginTop: '0.5em' }}>
                <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', width: '105px' }}>
                  <img src={print} style={styleImg} /><br />
                  <Button style={{ background: '#C8DCF5', width: '100%' }} type="text" >印刷</Button>
                </div>
                <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', width: '105px' }}>
                  <img src={coppy} style={styleImg} /><br />
                  <Button style={{ background: '#C8DCF5', width: '100%' }} type="text" >プレビュー</Button>
                </div>
                <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', width: '105px' }}>
                  <img src={csv} style={styleImg} /><br />
                  <Button style={{ background: '#C8DCF5', width: '100%' }} type="text" >CSV</Button>
                </div>
              </Space>
            </div>
          </Card>
        )
      }
    });
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  callApiGetScreenDataConFirmScreen(Li_SetCode, Li_StartDate, values) {
    let params = {
      SetCode: Li_SetCode,
      StartDate: Li_StartDate
    }
    ConfirmScreenAction.GetDataScreen(params)
      .then(async (res) => {
        if (res?.data && res?.data?.ContractInspection.length > 0) {
          await this.setState({
            dataSreenConFirm: res?.data
          })
          this.showModalConFirmScreen(values);
        } else {
          this.updateButton(values);
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

  showModalConFirmScreen(values) {
    let data = [...this.state.dataSourceRight]
    if (data.length > 0) {
      data.push({ W2_inspect_cd: 0 })
    }

    let params = {
      ...values,
      ConditionEffective: values.ConditionEffective ? 1 : 0,
      RightListData: data
    }
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS0299006_ConfirmScreen
            Li_SetCode={values.Li_SetCode}
            Li_StartDate={values.StartDate}
            Li_Values={params}
            Li_DataScreen={this.state.dataSreenConFirm}
            onFinishScreen={() => {
              this.closeModal()
              if (this.props.onFinishScreen) {
                this.props.onFinishScreen({
                  Lo_SetIdentify: values.SetIdentify,
                  Lio_SetCode: values.SetCode,
                  Lio_start_date_on: values.StartDate,
                });
              }
            }}
          />
        ),
      },
    });
  }

  compareObject(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

  async onChange() {
    if (this.formRef.current?.getFieldValue('Li_SetCode')) {
      let data = { ...this.state.dataForm } // data default
      data['Select'] = this.formRef.current?.getFieldValue('Select')
      data['SearchInspect'] = this.formRef.current?.getFieldValue('SearchInspect')

      let dataOutput = [...this.state.dataSourceRight]
      if (dataOutput.length > 0) {
        dataOutput.push({ W2_inspect_cd: 0 })
      }
      let paramsOutput = {
        ...this.formRef.current?.getFieldValue(),
        ConditionEffective: this.formRef.current?.getFieldValue('ConditionEffective') ? 1 : 0,
        RightListData: dataOutput
      }

      await this.setState({ dataForm: data })

      let isChange = this.state.changeValue ? false : this.compareObject(data, this.formRef.current?.getFieldValue()) // compare change data

      if (this.props.onChangeValue) {
        this.props.onChangeValue({
          Lo_stsChangeValue: !isChange,
          data: paramsOutput
        });
      }
    } else {
      message.error('コードを入力カしてください !')
    }
  }

  onFinish(values) {
    Modal.confirm({
      width: 250,
      title: '更新しますか？',
      icon: <QuestionCircleOutlined style={{ fontSize: '25px', color: '#08c' }} />,
      onOk: () => {
        if (this.props.Li_statusModal === 'Create') {
          this.createData(values);
        } else {
          this.callApiGetScreenDataConFirmScreen(values.Li_SetCode, values.StartDate, values);
        }
      }
    })
  }

  render() {
    return (
      <div className="set-info-change-sub">
        <Spin spinning={this.state.isLoadingForm}>
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <div style={{ display: "none" }}>
              <Form.Item name="Li_SetCode">
                <Input type="text" />
              </Form.Item>
            </div>
            <Card title="セット情報変更SUB" className="mb-3">
              <Row gutter={16}>
                <Col span={4}>
                  <Form.Item name="SetCode" label="コード" style={{ marginBottom: '5px' }}>
                    <Input
                      type="text"
                      disabled={this.state.disabledSetCode}
                      onChange={(event) => {
                        this.formRef.current?.setFieldsValue({
                          Li_SetCode: event.target.value
                        })
                        this.setState({
                          disabledUpdateBtn: true
                        })
                        if (event.target.value) {
                          this.setState({
                            disabledUpdateBtn: false
                          })
                        }
                        this.onChange()
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="SetName" label="正　式" style={{ marginBottom: '5px' }}>
                    <Input type="text" onChange={(e) => { this.onChange() }} />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item name="SearchShortName" label="検　索" style={{ marginBottom: '5px' }}>
                    <Input type="text" onChange={(e) => { this.onChange() }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-3">
                <Col span={4}></Col>
                <Col span={6}>
                  <Form.Item name="SetAbbreviation" label="略　名" style={{ marginBottom: '5px' }}>
                    <Input type="text" onChange={(e) => { this.onChange() }} />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item name="SetIdentify" label="セット識別" style={{ marginBottom: '5px' }}>
                    <Select onChange={(e) => { this.onChange() }}>
                      <Select.Option value="Cos">コース</Select.Option>
                      <Select.Option value="Opt">オプション</Select.Option>
                      <Select.Option value="Set">セット(その他）</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item style={{ marginBottom: '5px' }}
                    name="KyokaiAdjustmentsSetClassify"
                    label="セット区分"
                  >
                    <Select onChange={(e) => { this.onChange() }}>
                      <Select.Option value={0}>共有</Select.Option>
                      <Select.Option value={1}>契約</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ margin: "20px 0" }}
              />
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="StartDate" label="開始日" style={{ marginBottom: '5px' }}>
                    <Select disabled={this.props.Li_statusModal === 'Create'}
                      onChange={async (e) => {
                        await this.onChange()
                        this.callApiGetRightListData()
                        this.getCondition()
                      }}
                    >
                      {this.state.screenData.ComboBox_StartDate?.map((value) => (
                        <Select.Option key={'StartDate-' + Math.random()} value={value.LinkedField}>{value.DisplayField}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Space>
                  <Form.Item style={{ marginBottom: '5px' }}>
                    <Button disabled={this.props.Li_statusModal === 'Create'}
                      type="primary"
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 500,
                            component: (
                              <WS2709068_CopyStartDate
                                Li_SetIdentifyCopySource={this.formRef.current?.getFieldValue('SetIdentify')}
                                Li_SetCodeCopySource={this.formRef.current?.getFieldValue('Li_SetCode')}
                                Li_SetNameCopySource={this.formRef.current?.getFieldValue('SetName')}
                                Li_StartDateCopySource={this.formRef.current?.getFieldValue('StartDate')}
                                onFinishScreen={async (output) => {
                                  await this.callApiGetComboxStartDate();
                                  // await this.formRef.current?.setFieldsValue({
                                  //   StartDate: output.Lo_StartDateChar?.format("YYYY/MM/DD")
                                  // });
                                  if (this.props.onChangeStartDate) {
                                    this.props.onChangeStartDate({})
                                  }
                                  this.forceUpdate()
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
                        });
                      }}
                    >
                      新規
                    </Button>
                  </Form.Item>
                  <Form.Item style={{ marginBottom: '5px' }}>
                    <Button type="primary" style={{ width: "100%" }} disabled={this.props.Li_statusModal === 'Create'}
                      onClick={() => {
                        this.historyDeleteBtn()
                      }}>
                      削除
                    </Button>
                  </Form.Item>
                </Space>
              </Row>
              <hr style={{ margin: "20px 0" }}
              />
              <Row gutter={16}>
                <Col span={8} style={{ borderRight: '1px solid #9a9a9a' }}>
                  <Row gutter={16}>
                    <Col span={10}>
                      <div style={{ display: 'inline' }} >
                        <label style={styleLabel}>ラベル</label>
                        <Form.Item name="W2_add_label_num" style={{ width: 'calc(100% - 53px', float: 'right', marginBottom: '5px' }}>
                          <InputNumber maxLength={3} onChange={(e) => { this.onChange() }} />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={10}>
                      <div style={{ display: 'inline' }} >
                        <label style={styleLabel}>単価</label>
                        <Form.Item name="W2_unit_price" style={{ width: 'calc(100% - 53px', float: 'right', marginBottom: '5px' }}>
                          <InputNumber maxLength={10} className="ant-input-number-Right"
                            style={{ width: '100%' }}
                            formatter={value => `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={(e) => { this.onChange() }}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={14}>
                      <Form.Item name="W2_target_cd" label="科目" style={{ marginBottom: '5px' }}>
                        <Select allowClear={true}
                          onChange={(value) => {
                            if (!value) {
                              this.formRef.current?.setFieldsValue({
                                W2_target_cd: ''
                              })
                            }
                            this.onChange()
                          }}
                        >
                          {this.state.screenData.W2_target_cd?.map((value) => (
                            <Select.Option key={'W2_target_cd-' + Math.random()} value={value.node_code_name}>
                              {value.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={10}>
                      <div style={{ display: 'inline' }} >
                        <label style={styleLabel}>原価</label>
                        <Form.Item name="W2_cost" style={{ width: 'calc(100% - 53px', float: 'right', marginBottom: '5px' }}>
                          <InputNumber maxLength={10} className="ant-input-number-Right"
                            style={{ width: '100%' }}
                            formatter={value => `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={(e) => { this.onChange() }}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={14}>
                      <Form.Item name="W2_remark" label="備考" style={{ marginBottom: '5px' }}>
                        <Input type="text" onChange={(e) => { this.onChange() }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={16}>
                  <Row gutter={16}>
                    <Col span={7}>
                      <div style={{ display: 'inline' }} >
                        <label style={styleLabel}>条件</label>
                        <Form.Item name="ConditionEffective" valuePropName="checked" style={{ width: 'calc(100% - 53px', float: 'right', marginBottom: '5px' }}>
                          <Checkbox
                            checked={this.formRef.current?.getFieldValue('ConditionEffective')}
                            style={{ marginRight: "10px" }}
                            onChange={(event) => {
                              this.setState({ checkedCode: event.target.checked });
                              if (!event.target.checked) {
                                this.formRef.current?.setFieldsValue({
                                  W2_condition_gender: 0,
                                  W2_condition_screening: 0,
                                  W2_condition_relation: '',
                                  W2_condition_hospital_out: 0,
                                  W2_condition_time_segment: '',
                                  W2_condition_age_identify_cd: '',
                                  W2_condition_age_calc_sect: ''
                                })
                              }
                              this.formRef.current?.setFieldsValue({
                                ConditionEffective: event.target.checked
                              })

                              this.setState({
                                disabledConditionAge: true
                              })

                              this.onChange()
                            }}
                          ></Checkbox>
                          有効
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={5}>
                      <div style={{ display: 'inline' }} >
                        <label style={styleLabel}>性別</label>
                        <Form.Item name="W2_condition_gender" style={{ width: 'calc(100% - 53px', float: 'right', marginBottom: '5px' }}>
                          <Select disabled={!this.state.checkedCode}
                            onChange={(e) => { this.onChange() }}>
                            <Select.Option value={0}> </Select.Option>
                            <Select.Option value={1}>男</Select.Option>
                            <Select.Option value={2}>女</Select.Option>
                          </Select>
                        </Form.Item>
                      </div>

                    </Col>
                    <Col span={5}>
                      <div style={{ display: 'inline' }} >
                        <label style={styleLabel}>N次</label>
                        <Form.Item name="W2_condition_screening" style={{ width: 'calc(100% - 53px', float: 'right', marginBottom: '5px' }}>
                          <Select disabled={!this.state.checkedCode}
                            onChange={(e) => { this.onChange() }}>
                            <Select.Option value={0}> </Select.Option>
                            <Select.Option value={1}>1次</Select.Option>
                            <Select.Option value={2}>2次</Select.Option>
                            <Select.Option value={3}>3次</Select.Option>
                          </Select>
                        </Form.Item>
                      </div>

                    </Col>
                    <Col span={6}>
                      <Form.Item name="W2_condition_relation" label="続柄" style={{ marginBottom: '5px' }}>
                        <Select disabled={!this.state.checkedCode} allowClear={true}
                          onChange={(value) => {
                            if (!value) {
                              this.formRef.current?.setFieldsValue({
                                W2_condition_relation: ''
                              })
                            }
                            this.onChange()
                          }}
                        >
                          {this.state.screenData.W2_condition_relation?.map(
                            (value) => (
                              <Select.Option key={'W2_condition_relation-' + Math.random()} value={value.node_code_name}>
                                {value.name}
                              </Select.Option>
                            )
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={5}>
                      <Form.Item name="W2_condition_hospital_out" label="院内外" style={{ marginBottom: '5px' }}>
                        <Select disabled={!this.state.checkedCode}
                          onChange={(e) => { this.onChange() }}>
                          <Select.Option value={0}> </Select.Option>
                          <Select.Option value={1}>院内</Select.Option>
                          <Select.Option value={2}>院外</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item name="W2_condition_time_segment" label="AMPM" style={{ marginBottom: '5px' }}>
                        <Select disabled={!this.state.checkedCode}
                          onChange={(e) => { this.onChange() }}>
                          <Select.Option value=""> </Select.Option>
                          <Select.Option value="AM">AM</Select.Option>
                          <Select.Option value="PM">PM</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="W2_condition_age_identify_cd" label="年齢" style={{ marginBottom: '5px' }}>
                        <Select allowClear={true}
                          disabled={!this.state.checkedCode}
                          onChange={(value) => {
                            if (value) {
                              this.setState({ disabledConditionAge: false });
                              this.formRef.current?.setFieldsValue({ W2_condition_age_calc_sect: 0 })
                            } else {
                              this.setState({ disabledConditionAge: true });
                              this.formRef.current?.setFieldsValue({
                                W2_condition_age_calc_sect: '',
                                W2_condition_age_identify_cd: ''
                              })
                            }
                            this.onChange()
                          }}
                        >
                          {this.state.screenData.W2_condition_age_identify_cd?.map(
                            (value) => (
                              <Select.Option key={'W2_condition_age_identify_cd-' + Math.random()} value={value.age_id_code}>
                                {value.age_title}
                              </Select.Option>
                            )
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item style={{ marginBottom: '5px' }}
                        name="W2_condition_age_calc_sect"
                        label="年齢計算"
                      >
                        <Select
                          disabled={
                            !this.state.checkedCode ||
                            this.state.disabledConditionAge
                          }
                          onChange={(e) => { this.onChange() }}
                        >
                          <Select.Option value={0}>受診日</Select.Option>
                          <Select.Option value={1}>年度末</Select.Option>
                          <Select.Option value={2}>学童</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>

            <Card className="mb-3">
              <Row gutter={24}>
                <Col span={11}>
                  <div
                    style={{
                      background: "#1166BB",
                      color: "white",
                      padding: "10px",
                    }}
                  >
                    <Row>
                      <Form.Item name="Select" style={{ margin: "0 10px 0 0" }}>
                        <Select style={{ width: '105px' }}
                          onChange={(value) => {
                            this.setState({ selectOption: value })
                            this.callApiGetRetrieval();
                          }}
                        >
                          <Select.Option value={0}>検査選択</Select.Option>
                          <Select.Option value={1}>セット選択</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item style={{ margin: "0", width: "10%" }}>
                        <label style={{ color: "#fff" }}> 検索</label>
                      </Form.Item>
                      <Form.Item
                        name="SearchInspect"
                        style={{ margin: "0" }}
                      >
                        <Input
                          style={{ width: "100%" }}
                          onChange={debounce(() => { this.callApiGetRetrieval() }, 300)}
                        />
                      </Form.Item>
                    </Row>
                  </div>
                  <div hidden={this.state.selectOption === 1}>
                    <Table
                      size="small"
                      style={{ cursor: 'pointer' }}
                      rowClassName={(record, index) => record.id === this.state.rowSelectLeft[0]?.id ? 'table-row-light' : ''}
                      dataSource={this.state.dataSourceLeft}
                      loading={this.state.isLoadingTableLeft}
                      pagination={true}
                      bordered={true}
                      rowKey={(record) => record.id}
                      scroll={{ y: 350 }}
                      onRow={(record, rowIndex) => {
                        return {
                          onDoubleClick: () => {
                            this.onAddItem([record])
                          },
                          onClick: async () => {
                            await this.setState({
                              rowSelectLeft: [record],
                              selectedRowKeyLeft: [record.id],
                              enabledForward: true,
                              enabledBackward: false,
                              selectedRowKeyRight: []
                            });
                          }
                        };
                      }}
                    >
                      <Table.Column dataIndex="W1_inspect_cd" title="検査ｺｰﾄﾞ"
                        render={(text, record, index) => (
                          <span style={{ color: record.textColor }}>{record.W1_inspect_cd}</span>
                        )}
                      />
                      <Table.Column dataIndex="exam_short_name" title="検査略名"
                        render={(text, record, index) => (
                          <span style={{ color: record.textColor }}>{record.exam_short_name}</span>
                        )} />
                      <Table.Column dataIndex="exam_name" title="名称"
                        render={(text, record, index) => (
                          <span style={{ color: record.textColor }}>{record.exam_name}</span>
                        )} />
                    </Table>
                  </div>
                  <div hidden={this.state.selectOption === 0}>
                    <Table
                      size="small"
                      style={{ cursor: 'pointer' }}
                      rowClassName={(record, index) => record.id === this.state.rowSelectLeft[0]?.id ? 'table-row-light' : ''}
                      dataSource={this.state.dataSourceLeft}
                      loading={this.state.isLoadingTableLeft}
                      pagination={true}
                      bordered={true}
                      rowKey={(record) => record.id}

                      scroll={{ y: 350 }}
                      onRow={(record, rowIndex) => {
                        return {
                          onDoubleClick: () => {
                            this.onAddItem([record])
                          },
                          onClick: async () => {
                            await this.setState({
                              rowSelectLeft: [record],
                              selectedRowKeyLeft: [record.id],
                              enabledForward: true,
                              enabledBackward: false,
                              selectedRowKeyRight: []
                            });
                          }
                        };
                      }}
                    >
                      <Table.Column dataIndex="set_code" title="ｾｯﾄｺｰﾄﾞ"
                        render={(text, record, index) => (
                          <span style={{ color: Color(record.Expression_10)?.Foreground }}>{record.set_code}</span>
                        )}
                      />
                      <Table.Column dataIndex="set_short_name" title="略名"
                        render={(text, record, index) => (
                          <span style={{ color: Color(record.Expression_10)?.Foreground }}>{record.set_short_name}</span>
                        )} />
                      <Table.Column dataIndex="set_name" title="名称"
                        render={(text, record, index) => (
                          <span style={{ color: Color(record.Expression_10)?.Foreground }}>{record.set_name}</span>
                        )} />
                    </Table>
                  </div>
                </Col>

                <Col
                  span={2}
                  style={{ textAlign: "center", alignSelf: "center" }}
                >
                  <div style={{ display: "inline-block" }}>
                    <Button
                      type="primary"
                      disabled={!this.state.enabledForward}
                      size="small"
                      onClick={() => this.onAddItem(this.state.rowSelectLeft)}
                    >
                      追加 <DoubleRightOutlined />
                    </Button>
                    <br />
                    <br />
                    <Button
                      type="primary"
                      disabled={!this.state.enabledBackward}
                      size="small"
                      icon={<DoubleLeftOutlined />}
                      onClick={() => this.onRemoveItem(this.state.rowSelectRight[0].id)}
                    >
                      削除
                    </Button>
                  </div>
                </Col>

                <Col span={11}>
                  <div
                    style={{
                      background: "#1166BB",
                      color: "white",
                      padding: "10px",
                    }}
                  >
                    <Form.Item style={{ margin: "0" }}>
                      <label style={{ color: "#fff" }}> セット内容</label>
                    </Form.Item>
                  </div>
                  <Table
                    size="small"
                    style={{ cursor: 'pointer' }}
                    rowClassName={(record, index) => record.id === this.state.rowSelectRight[0]?.id ? 'table-row-light' : ''}
                    dataSource={this.state.dataSourceRight}
                    loading={this.state.isLoadingTableRight}
                    pagination={true}
                    bordered={true}
                    rowKey={(record) => record.id}
                    scroll={{ y: 350 }}
                    onRow={(record, rowIndex) => {
                      return {
                        onDoubleClick: () => {
                          this.onRemoveItem(record.id)
                        },
                        onClick: async () => {
                          await this.setState({
                            rowSelectRight: [record],
                            selectedRowKeyRight: [record.id],
                            enabledForward: false,
                            enabledBackward: true,
                            selectedRowKeyLeft: []
                          });
                        }
                      };
                    }}
                  >
                    <Table.Column dataIndex="W2_inspect_cd" title="検査ｺｰﾄﾞ" width={80}
                      render={(value, record) => {
                        return (
                          <div style={{ textAlign: 'right' }}>{value}</div>
                        )
                      }}
                    />
                    <Table.Column dataIndex="exam_short_name" title="検査略名" />
                    <Table.Column dataIndex="exam_name" title="検査名称" />
                    <Table.Column dataIndex="Expression_10" title="使用" align='center' width={50} />
                  </Table>
                </Col>
              </Row>
            </Card>

            <Card style={{ textAlign: "right" }}>
              <Button hidden={this.props.Li_statusModal === 'Create'}
                type="primary"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  this.outputButton(this.formRef.current?.getFieldValue());
                }}
              >
                出力
              </Button>
              <Button
                disabled={this.state.disabledUpdateBtn}
                type="primary"
                // htmlType="submit"
                onClick={() => this.onFinish(this.formRef.current?.getFieldValue())}
              >
                更新
              </Button>
            </Card>
          </Form>
        </Spin>
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
)(WS2709008_SetInfoChangeSub);
