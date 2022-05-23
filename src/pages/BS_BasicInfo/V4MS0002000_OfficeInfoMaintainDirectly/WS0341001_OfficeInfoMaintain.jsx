import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";
import {
  Row,
  Col,
  Input,
  Form,
  Card,
  Button,
  Table,
  Select,
  Tabs,
  Modal,
  Spin,
  message,
  Checkbox,
  Space,
  Tag,
} from "antd";
import { debounce } from "lodash";

import WS0084001_PostCodeSearchEngine from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0084001_PostCodeSearchEngine.jsx";
import WS0247001_OfficeInfoRetrievalQuery from "./WS0247001_OfficeInfoRetrievalQuery.jsx";
import WS0341008_BranchShopInquiry from "./WS0341008_BranchShopInquiry.jsx";
import WS0341009_BranchStoreGenerated from "./WS0341009_BranchStoreGenerated.jsx";
import WS0308017_OrganizationCreateNew from "pages/BS_BasicInfo/V4KB0201000_ContractInfoMaintain/WS0308017_OrganizationCreateNew.jsx";
import WS0265001_BasicCourseInquiry from "../V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import WS2584019_PersonalInfoInquirySub from "../../KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import WS0246001_InsurerInfoSearchQuery from "../V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0307008_ContractHistorySub from "pages/BS_BasicInfo/V4KB0201000_ContractInfoMaintain/WS0307008_ContractHistorySub.jsx";
import { history } from "constants/BrowserHistory";
import {
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import moment from "moment-timezone";
import OfficeInfoMaintainService from "services/basicInfo/OfficeInfoMaintain/OfficeInfoMaintainService.js";
import WS0286001_PrintStyleInquiry from "pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0286001_PrintStyleInquiry.jsx";
import PropTypes from "prop-types";
import WS0344001_SupplementalInfoSetting from "../V4MS0001000_InsurerInfoMaintain/WS0344001_SupplementalInfoSetting.jsx";
import Color from "constants/Color.js";
import * as wanakana from "wanakana";

const grid = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const smGrid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class WS0341001_OfficeInfoMaintain extends React.Component {
  static propTypes = {
    Lio_OfficeCode: PropTypes.any,
    Lio_BranchStoreCode: PropTypes.any,
  };
  formRef = React.createRef();
  buttonSubmmitRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "事業所情報保守";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      //New code
      screenData: {},
      statusPage: 1, // statusPage: 1 create auto num, statusPage: 2 create input num, statusPage: 3 update
      isFileEdited: false,
      isLoadingData: false,
      OfficeCode: "",
      BranchStoreCode: "",
      officeInfoDisplay: {},
      count: 0,
      ResultsTable: [],
      AffiliationInfo: [],
      RecordedInfo: [],
      selectedRowsResultsTable: [],
      indexTableResultsTable: 0,
      selectedRowsAffiliationInfo: [],
      indexTableAffiliationInfo: 0,
      selectedRowsRecordedInfo: [],
      indexTableRecordedInfo: 0,
    };
    this.getInitialDisplayCorrespondDataDisplay = debounce(
      this.getInitialDisplayCorrespondDataDisplay,
      500
    );
  }

  componentDidMount = () => {
    this.getScreenData();
    const { Lio_OfficeCode, Lio_BranchStoreCode } = this.props;
    if (Lio_OfficeCode) {
      this.getInitialDisplayCorrespondDataDisplay(
        Lio_OfficeCode,
        Lio_BranchStoreCode
      );
    }
  };

  componentDidUpdate = (prevProps) => {
    const { Lio_OfficeCode, Lio_BranchStoreCode } = this.props;
    if (prevProps != this.props) {
      if (Lio_OfficeCode) {
        this.getInitialDisplayCorrespondDataDisplay(
          Lio_OfficeCode,
          Lio_BranchStoreCode
        );
      }
    }
  };

  getInitialDisplayCorrespondDataDisplay = (OfficeCode, BranchStoreCode) => {
    this.setState({ isLoadingData: true });
    OfficeInfoMaintainService.getInitialDisplayCorrespondDataDisplayService({
      OfficeCode,
      BranchStoreCode,
    })
      .then((res) => {
        const { SupplementaryInfo, DestinationInfo } = this.state.screenData;
        if (res.data.ProcessDivision === 3) {
          this.resetStateToRegister_CaseStatusPage(
            3,
            res.data,
            res.data.OfficeCode,
            res.data.BranchStoreCode
          );
        }
        if (res.data.ProcessDivision === 2) {
          this.resetStateToRegister_CaseStatusPage(
            2,
            { ...res.data, SupplementaryInfo, DestinationInfo },
            res.data.OfficeCode,
            res.data.BranchStoreCode
          );
        }
        if (res.data.ProcessDivision === 1) {
          this.resetStateToRegister_CaseStatusPage(
            1,
            { ...res.data, SupplementaryInfo, DestinationInfo },
            res.data.OfficeCode,
            res.data.BranchStoreCode
          );
        }
        this.getAddAffiliationInfo();
        this.getAddRecordedInfo();
        this.getAddResultsTable();
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingData: false });
      });
  };

  getScreenData = () => {
    OfficeInfoMaintainService.getScreenDataService()
      .then((res) => {
        this.formRef.current.setFieldsValue({
          SupplementaryInfo: res.data.SupplementaryInfo,
          DestinationInfo: res.data.DestinationInfo,
        });
        this.setState({ screenData: res.data });
      })
      .catch((err) => {
        console.log(err);
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  componentWillUnmount = () => {
    this.unblock();
  };
  unblock = history.block((targetLocation) => {
    console.log(this.state.isFileEdited, targetLocation);
    if (this.state.isFileEdited) {
      Modal.confirm({
        content: "変更を保存しますか？",
        onOk: () => {
          this.registerOrUpdateOfficeInfoData();
        },
        onCancel: () => {
          this.setState({ isFileEdited: false }, () => {
            history.push(targetLocation.pathname);
          });
        },
      });
      return false;
    } else {
      return true;
    }
  });

  onChangeOfficeAndBranchCode = (event) => {
    const { name, value } = event.target;
    const onChangeOfficeAndBranchCodefunc = () => {
      this.setState(
        {
          [name]: value,
          isFileEdited: false,
        },
        () => {
          // check office status create or update
          const { SupplementaryInfo, DestinationInfo } = this.state.screenData;
          if (this.state.OfficeCode === "" || this.state.OfficeCode === "0") {
            this.resetStateToRegister_CaseStatusPage(1, {
              SupplementaryInfo,
              DestinationInfo,
            });
            return;
          }
          this.getInitialDisplayCorrespondDataDisplay(
            this.state.OfficeCode,
            this.state.BranchStoreCode
          );
        }
      );
    };
    if (this.state.isFileEdited) {
      Modal.confirm({
        content: "変更を保存しますか？",
        onOk: () => {
          this.registerOrUpdateOfficeInfoData();
        },
        onCancel: () => {
          onChangeOfficeAndBranchCodefunc();
        },
      });
    } else onChangeOfficeAndBranchCodefunc();
  };

  resetStateToRegister_CaseStatusPage = (
    statusPage,
    officeInfoDisplay,
    OfficeCode,
    BranchStoreCode
  ) => {
    switch (statusPage) {
      case 1:
        this.formRef.current.resetFields();
        this.formRef.current.setFieldsValue({
          ...officeInfoDisplay,
        });
        this.setState({
          isFileEdited: false,
          statusPage: statusPage,
          officeInfoDisplay: officeInfoDisplay,
          OfficeCode: "",
          BranchStoreCode: "",
        });
        break;
      case 2:
        this.formRef.current.resetFields();
        this.formRef.current.setFieldsValue({
          ...officeInfoDisplay,
        });
        this.setState({
          isFileEdited: false,
          statusPage: statusPage,
          officeInfoDisplay: officeInfoDisplay,
          OfficeCode: OfficeCode,
          BranchStoreCode: BranchStoreCode,
        });
        break;
      case 3:
        this.formRef.current.resetFields();
        this.formRef.current.setFieldsValue({
          ...officeInfoDisplay,
        });
        this.setState({
          isFileEdited: false,
          statusPage: statusPage,
          officeInfoDisplay: officeInfoDisplay,
          OfficeCode: OfficeCode,
          BranchStoreCode: BranchStoreCode,
        });
        break;
      default:
        break;
    }
  };

  onValuesChange = (changedValues) => {
    if (changedValues.OfficeCode) {
      this.setState({
        isFileEdited: false,
      });
    } else {
      this.setState({
        isFileEdited: true,
      });
    }
  };
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  onFinish = (values) => {
    switch (this.state.statusPage) {
      case 1:
        Modal.confirm({
          content: "新規登録します。よろしいですか？",
          onOk: () => {
            this.registerOrUpdateOfficeInfoData();
            setTimeout(() => {
              this.props.onFinishScreen({
                recordData: values,
              });
            }, 2000);
          },
        });
        break;
      case 2:
        Modal.confirm({
          content: "新規登録します。よろしいですか？",
          onOk: () => {
            this.registerOrUpdateOfficeInfoData();
            setTimeout(() => {
              this.props.onFinishScreen({
                recordData: values,
              });
            }, 2000);
          },
        });
        break;
      case 3:
        if (this.state.isFileEdited) {
          Modal.confirm({
            content: "上書き登録します。よろしいですか？",
            onOk: () => {
              this.registerOrUpdateOfficeInfoData();
              setTimeout(() => {
                this.props.onFinishScreen({
                  recordData: values,
                });
              }, 2000);
            },
          });
        } else message.warning("変更がありません");
        break;
      default:
        break;
    }
  };
  registerOrUpdateOfficeInfoData = () => {
    const values = this.formRef.current?.getFieldsValue(true);
    console.log("values all: ", values);
    switch (this.state.statusPage) {
      case 1:
        this.registerData({
          ...values,
          ProcessDivision: this.state.statusPage,
        });
        break;
      case 2:
        this.registerData({
          ...values,
          OfficeCode: this.state.OfficeCode,
          BranchStoreCode: this.state.BranchStoreCode,
          ProcessDivision: this.state.statusPage,
        });
        break;
      case 3:
        this.registerData({
          ...values,
          OfficeCode: this.state.OfficeCode,
          BranchStoreCode: this.state.BranchStoreCode,
          ProcessDivision: this.state.statusPage,
        });
        break;
      default:
        break;
    }
  };

  registerData = (OfficeInfoData) => {
    OfficeInfoMaintainService.registerDataService(OfficeInfoData)
      .then((res) => {
        message.success("変更成功");
        this.getInitialDisplayCorrespondDataDisplay(
          res.data.OfficeCode,
          res.data.BranchStoreCode
        );
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
  getAddAffiliationInfo() {
    OfficeInfoMaintainService.getAddAffiliationInfoService()
      .then((res) => {
        this.setState({
          AffiliationInfo: res.data,
          selectedRowsAffiliationInfo: [res.data[0]],
          indexTableAffiliationInfo: 0,
        });
        this.formRef.current.setFieldsValue({
          AffiliationInfo: res.data,
        });
      })
      .catch((err) => message.error("エラー"));
  }
  getAddRecordedInfo() {
    const data = {
      OfficeCode: this.formRef.current?.getFieldValue().OfficeCode,
      BranchStoreCode: this.formRef.current?.getFieldValue().BranchStoreCode,
    };
    OfficeInfoMaintainService.getAddRecordedInfoService(data)
      .then((res) => {
        this.setState({
          RecordedInfo: res.data.RecordedInfo,
          selectedRowsRecordedInfo: [res.data.RecordedInfo[0]],
          indexTableRecordedInfo: 0,
        });
        this.formRef.current.setFieldsValue({
          RecordedInfo: res.data.RecordedInfo,
        });
      })
      .catch((err) => message.error("エラー"));
  }
  getAddResultsTable() {
    const data = {
      OfficeCode: this.formRef.current?.getFieldValue().OfficeCode,
      BranchStoreCode: this.formRef.current?.getFieldValue().BranchStoreCode,
    };
    OfficeInfoMaintainService.getAddResultsTableService(data)
      .then((res) => {
        this.setState({
          ResultsTable: res.data.ResultsTable,
          selectedRowsResultsTable: [res.data.ResultsTable[0]],
          indexTableResultsTable: 0,
        });
        this.formRef.current.setFieldsValue({
          ResultsTable: res.data.ResultsTable,
        });
      })
      .catch((err) => message.error("エラー"));
  }

  deleteRecordTable = (record, arrayName) => {
    console.log(record, arrayName);
    if (record.id) {
      console.log(1);
      if (arrayName === "RecordedInfo") {
        OfficeInfoMaintainService.deleteAddRecordedInfoService({
          id: record.id,
        })
          .then((res) => {
            message.success("成功");
            this.getAddRecordedInfo();
            this.setState({
              isFileEdited: true,
            });
          })
          .catch((err) => message.error("エラー"));
      }
      if (arrayName === "ResultsTable") {
        OfficeInfoMaintainService.deleteAddResultsTableService({
          id: record.id,
        })
          .then((res) => {
            message.success("成功");
            this.getAddResultsTable();
            this.setState({
              isFileEdited: true,
            });
          })
          .catch((err) => message.error("エラー"));
      }
      if (arrayName === "AffiliationInfo") {
        OfficeInfoMaintainService.deleteAddAffiliationInfoService({
          id: record.id,
        })
          .then((res) => {
            message.success("成功");
            this.getAddAffiliationInfo();
            this.setState({
              isFileEdited: true,
            });
          })
          .catch((err) => message.error("エラー"));
      }
      let arr = [...this.formRef.current?.getFieldValue([arrayName])];
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1);
          this.formRef.current?.setFieldsValue({
            [arrayName]: arr,
          });
          this.setState({ isFileEdited: true });
        }
      });
    } else {
      let arr = [...this.formRef.current?.getFieldValue([arrayName])];
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1);
          this.formRef.current?.setFieldsValue({
            [arrayName]: arr,
          });
          this.setState({ isFileEdited: true });
        }
      });
    }
  };
  saveData = (record, name) => {
    console.log(record);
    if (name === "RecordedInfo") {
      const data = {
        id: record.id ? record.id : "",
        OfficeCode: this.formRef.current?.getFieldValue().OfficeCode,
        BranchStoreCode: this.formRef.current?.getFieldValue().BranchStoreCode,
        W1_importance: record.WKV40MS0420_importance,
        W1_content: record.WKV40MS0420_content,
        message: "事業所名(ｶﾅ) 必須入力"
      };
      OfficeInfoMaintainService.updateAddRecordedInfoService(data)
        .then((res) => {
          message.success("成功");
          this.getAddRecordedInfo();
        })
        .catch((err) => message.error("エラー"));
    }
    if (name === "ResultsTable") {
      const data = {
        id: record.id ? record.id : "",
        OfficeCode: this.formRef.current?.getFieldValue().OfficeCode,
        BranchStoreCode: this.formRef.current?.getFieldValue().BranchStoreCode,
        medical_exam_course: record.medical_exam_course,
        standard_printing_style: record.standard_printing_style_1,
      };
      OfficeInfoMaintainService.updateAddResultsTableService(data)
        .then((res) => {
          message.success("成功");
          this.getAddResultsTable();
        })
        .catch((err) => message.error("エラー"));
    }
    if (name === "AffiliationInfo") {
      const data = {
        id: record.id ? record.id : "",
        affiliation_cd: record.affiliation_cd,
        short_name_name: record.short_name_name,
        formal_name: record.formal_name,
      };
      OfficeInfoMaintainService.updateAddAffiliationInfoService(data)
        .then((res) => {
          message.success("成功");
          this.getAddAffiliationInfo();
        })
        .catch((err) => message.error("エラー"));
    }
  };
  addNewRowToTable = (arrayName) => {
    let arrayFieldValue = this.formRef.current?.getFieldValue([arrayName]);
    let newData;
    switch (arrayName) {
      case "RecordedInfo":
        newData = {
          id: "",
          WKV40MS0420_importance: "",
          WKV40MS0420_content: "",
        };
        break;
      case "ResultsTable":
        newData = {
          id: "",
          medical_exam_course: "",
          standard_printing_style_1: "",
          format_name_1: "",
          standard_printing_style_2: "",
          format_name_2: "",
        };
        break;
      case "AffiliationInfo":
        newData = {
          id: "",
          affiliation_cd: "",
          short_name_name: "",
          formal_name: "",
          in_force: 1,
        };
        break;

      default:
        break;
    }

    let arrayNew = [];
    if (arrayFieldValue) {
      arrayNew = [...arrayFieldValue];
    }
    arrayNew.push(newData);
    this.formRef.current?.setFieldsValue({ [arrayName]: arrayNew });
    this.forceUpdate();
    this.setState({ count: this.state.count + 1, isFileEdited: true });
  };

  onSearchOfficeCodeOrBranchCode = (statusSearch) => {
    const handleOfficeCodeOrBranchCode = () => {
      switch (statusSearch) {
        case "OfficeCode":
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 1200,
              component: (
                <WS0247001_OfficeInfoRetrievalQuery
                  onFinishScreen={({ Lio_OfficeCode, Lio_BranchStoreCode }) => {
                    this.setState(
                      {
                        OfficeCode: Lio_OfficeCode,
                        BranchStoreCode: Lio_BranchStoreCode,
                      },
                      () => {
                        this.getInitialDisplayCorrespondDataDisplay(
                          Lio_OfficeCode,
                          Lio_BranchStoreCode
                        );
                      }
                    );
                    this.closeModal();
                  }}
                />
              ),
            },
          });
          break;
        case "BranchStoreCode":
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 700,
              component: (
                <WS0341008_BranchShopInquiry
                  Li_OfficeCode={this.state.OfficeCode}
                  onFinishScreen={({ Li_OfficeCode, Lo_BranchStoreCode }) => {
                    this.setState(
                      {
                        OfficeCode: Li_OfficeCode,
                        BranchStoreCode: Lo_BranchStoreCode,
                      },
                      () => {
                        this.getInitialDisplayCorrespondDataDisplay(
                          Li_OfficeCode,
                          Lo_BranchStoreCode
                        );
                      }
                    );
                    this.closeModal();
                  }}
                />
              ),
            },
          });
          break;
        case "CreateBranchCode":
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 700,
              component: (
                <WS0341009_BranchStoreGenerated
                  Li_OfficeCode={this.state.OfficeCode}
                  onFinishScreen={({
                    Li_OfficeCode,
                    Lo_BranchStoreCode,
                    OfficeCodeParent,
                    BranchStoreCodeParent,
                    office_kana_name,
                    office_kanji_name,
                  }) => {
                    this.setState(
                      {
                        OfficeCode: Li_OfficeCode,
                        BranchStoreCode: Lo_BranchStoreCode,
                      },
                      () => {
                        this.cloneOfficeDataDisplayToNewOffice(
                          Li_OfficeCode,
                          Lo_BranchStoreCode,
                          OfficeCodeParent,
                          BranchStoreCodeParent,
                          office_kana_name,
                          office_kanji_name
                        );
                      }
                    );
                    this.closeModal();
                  }}
                />
              ),
            },
          });

        default:
          break;
      }
    };
    if (this.state.isFileEdited) {
      Modal.confirm({
        content: "変更を保存しますか？",
        onOk: () => {
          this.registerOrUpdateOfficeInfoData();
        },
        onCancel: () => {
          handleOfficeCodeOrBranchCode();
        },
      });
    } else handleOfficeCodeOrBranchCode();
  };

  cloneOfficeDataDisplayToNewOffice = (
    OfficeCodeNew,
    BranchStoreCodeNew,
    OfficeCodeParent,
    BranchStoreCodeParent,
    OfficeNameKana,
    OfficeNameKanji
  ) => {
    this.setState({ isLoadingData: true });
    OfficeInfoMaintainService.getInitialDisplayCorrespondDataDisplayService({
      OfficeCode: OfficeCodeParent,
      BranchStoreCode: BranchStoreCodeParent,
    })
      .then((res) => {
        if (res.data.ProcessDivision === 3) {
          this.formRef.current.setFieldsValue({
            ...res.data,
            ProcessDivision: 2,
            OfficeCode: OfficeCodeNew,
            BranchStoreCode: BranchStoreCodeNew,
            OfficeNameKana: OfficeNameKana,
            OfficeNameKanji: OfficeNameKanji,
          });
          this.setState({
            isFileEdited: true,
            statusPage: 2,
            officeInfoDisplay: {
              ...res.data,
              ProcessDivision: 2,
              OfficeCode: OfficeCodeNew,
              BranchStoreCode: BranchStoreCodeNew,
              OfficeNameKana: OfficeNameKana,
              OfficeNameKanji: OfficeNameKanji,
            },
            OfficeCode: OfficeCodeNew,
            BranchStoreCode: BranchStoreCodeNew,
          });
        } else {
          this.getInitialDisplayCorrespondDataDisplay(
            OfficeCodeNew,
            BranchStoreCodeNew
          );
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
      .finally(() => {
        this.setState({ isLoadingData: false });
      });
  };

  deleteOfficeF11_1 = () => {
    OfficeInfoMaintainService.deleteF11API_1_Service({
      OfficeCode: this.state.OfficeCode,
      BranchStoreCode: this.state.BranchStoreCode,
    })
      .then((res) => {
        console.log("res: ", res.data);
        Modal.confirm({
          title: "確認",
          icon: <WarningOutlined />,
          content: (
            <div>
              事業所の情報がすべて削除されます。
              <br />
              削除しますか？
            </div>
          ),
          onOk: () => {
            this.deleteOfficeF11_2();
          },
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
  deleteOfficeF11_2 = () => {
    OfficeInfoMaintainService.deleteF11API_2_Service({
      OfficeCode: this.state.OfficeCode,
      BranchStoreCode: this.state.BranchStoreCode,
    })
      .then((res) => {
        message.success("成功");
        const { SupplementaryInfo, DestinationInfo } = this.state.screenData;
        this.resetStateToRegister_CaseStatusPage(1, {
          SupplementaryInfo,
          DestinationInfo,
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
  findIndexByID = (arrayData, recordID) => {
    if (arrayData && arrayData.length > 0) {
      return arrayData.findIndex((item) => recordID === item.id);
  }
  };
  render() {
    const office_addresses_render = (name, text, record, index) => {
      const namePath = ["DestinationInfo", index, name];
      return (
        <Form.Item name={namePath} valuePropName="checked">
          <Checkbox
            onChange={(e) => {
              const formIns = this.formRef.current;
              formIns.setFields([
                {
                  name: ["DestinationInfo", index, "destination_office_1"],
                  value: 0,
                },
                {
                  name: ["DestinationInfo", index, "destination_office_2"],
                  value: 0,
                },
                {
                  name: ["DestinationInfo", index, "destination_personal_1"],
                  value: 0,
                },
                {
                  name: ["DestinationInfo", index, "destination_personal_2"],
                  value: 0,
                },
                {
                  name: ["DestinationInfo", index, "destination_personal_3"],
                  value: 0,
                },
                // Update current field only
                {
                  name: namePath,
                  value: e.target.checked ? 1 : 0,
                },
              ]);
            }}
          />
        </Form.Item>
      );
    };
    return (
      <div className="office-info-maintain">
        <Card className="mb-3" size="small">
          <Space>
            <Button
              type="default"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 800,
                    component: (
                      <WS0344001_SupplementalInfoSetting
                        Li_IdentifyChar="MAST2"
                        onFinishScreen={() => {
                          this.getScreenData();

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
              補足情報設定
            </Button>
          </Space>
        </Card>

        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          {...grid}
          onValuesChange={this.onValuesChange}
          autoComplete="off"
          size="small"
        >
          <Card className="mb-3">
            <Row>
              <Col span={18} className="d-flex align-items-center">
                <Form.Item>
                  <Input.Search
                    style={{ width: "150px" }}
                    name="OfficeCode"
                    value={this.state.OfficeCode}
                    onChange={(event) =>
                      this.onChangeOfficeAndBranchCode(event)
                    }
                    onSearch={() => {
                      this.onSearchOfficeCodeOrBranchCode("OfficeCode");
                    }}
                    type="number"
                    min={1}
                  />
                </Form.Item>

                <Form.Item>
                  <Input.Search
                    style={{ width: "100px", margin: "0 10px 0 20px" }}
                    name="BranchStoreCode"
                    value={this.state.BranchStoreCode}
                    onChange={(event) => {
                      this.onChangeOfficeAndBranchCode(event);
                    }}
                    onSearch={() => {
                      this.onSearchOfficeCodeOrBranchCode("BranchStoreCode");
                    }}
                    type="number"
                    min={0}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.onSearchOfficeCodeOrBranchCode("CreateBranchCode");
                    }}
                  >
                    支店作成
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    style={{ marginLeft: "10px" }}
                    disabled
                  >
                    自動発番
                  </Button>
                </Form.Item>
              </Col>
              <Col span={6} className="text-end">
                <div>
                  登録日&ensp;
                  {this.state.officeInfoDisplay.RegisterDate &&
                  moment(
                    this.state.officeInfoDisplay.RegisterDate
                  ).isValid() ? (
                    moment(this.state.officeInfoDisplay.RegisterDate).format(
                      "YYYY/MM/DD"
                    )
                  ) : (
                    <span style={{ opacity: "0" }}>0000/00/00</span>
                  )}
                </div>
                <div>
                  変更日&ensp;
                  {this.state.officeInfoDisplay.Date &&
                  moment(this.state.officeInfoDisplay.Date).isValid() ? (
                    moment(this.state.officeInfoDisplay.Date).format(
                      "YYYY/MM/DD"
                    )
                  ) : (
                    <span style={{ opacity: "0" }}>0000/00/00</span>
                  )}
                </div>
              </Col>
            </Row>
          </Card>
          <Spin spinning={this.state.isLoadingData}>
            <Row gutter={16}>
              <Col lg={24} md={24} xl={12}>
                <Card className="mb-3">
                  <Form.Item
                    label="カナ名称"
                    name="OfficeNameKana"
                    // rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="漢字名称"
                    name="OfficeNameKanji"
                    // rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label="代表者"
                        name="Representative"
                        {...smGrid}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="先方担当"
                        name="OtherPartyInCharge"
                        {...smGrid}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label="担当営業"
                        name="SalesRepresentative"
                        {...smGrid}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="状態区分"
                        name="SituationClassify"
                        {...smGrid}
                      >
                        <Select allowClear>
                          {this.state.screenData.SituationClassify
                            ? this.state.screenData.SituationClassify.map(
                                (item, index) => {
                                  return (
                                    <Select.Option
                                      value={item.LinkedField}
                                      key={index}
                                    >
                                      {item.DisplayedField}
                                    </Select.Option>
                                  );
                                }
                              )
                            : null}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item label="保険者" name="InsurerCode" {...smGrid}>
                        <Input.Search
                          style={{ width: "150px" }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1200,
                                component: (
                                  <WS0246001_InsurerInfoSearchQuery
                                    onFinishScreen={({
                                      Lo_InsurerCode,
                                      Lo_Name,
                                    }) => {
                                      if (
                                        this.formRef.current.getFieldValue(
                                          "InsurerCode"
                                        ) !== Lo_InsurerCode
                                      ) {
                                        this.formRef.current.setFieldsValue({
                                          InsurerCode: Lo_InsurerCode,
                                          Expression_188: Lo_Name,
                                        });
                                        this.setState({
                                          isFileEdited: true,
                                        });
                                      }
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        />

                        {/* <span>123456</span> */}
                      </Form.Item>
                      <Form.Item {...smGrid} label=" ">
                        <span>
                          {this.formRef.current
                            ? this.formRef.current.getFieldValue(
                                "Expression_188"
                              )
                            : ""}
                        </span>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="保険証"
                        name="InsuranceCardSymbol"
                        {...smGrid}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card className="mb-3">
                  <Row>
                    <Col span={12}>
                      <Form.Item label="〒" name="ZipCode" {...smGrid}>
                        <Input.Search
                          onSearch={() => {
                            // gZoom GL0_郵便番号
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 600,
                                component: (
                                  <WS0084001_PostCodeSearchEngine
                                    onOk={(ZipCode, Address) => {
                                      const zipcode = ZipCode
                                        ? ZipCode.trim()
                                        : "";
                                      if (
                                        zipcode !== "" &&
                                        this.formRef.current.getFieldValue(
                                          "ZipCode"
                                        ) !== zipcode
                                      ) {
                                        const formInstance =
                                          this.formRef.current;
                                        formInstance.setFieldsValue({
                                          ZipCode: zipcode,
                                        });
                                        const address = Address
                                          ? Address.trim()
                                          : "";
                                        if (address !== "") {
                                          formInstance.setFieldsValue({
                                            Location1: address,
                                          });
                                        }
                                        this.setState({ isFileEdited: true });
                                      }
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="AreaCode" label="地区" {...smGrid}>
                        <Select allowClear>
                          {this.state.screenData.AreaCode
                            ? this.state.screenData.AreaCode.map(
                                (item, index) => {
                                  return (
                                    <Select.Option
                                      value={item.LinkedField}
                                      key={index}
                                    >
                                      {item.DisplayedField}
                                    </Select.Option>
                                  );
                                }
                              )
                            : null}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="住所" name="Location1">
                    <Input />
                  </Form.Item>

                  <Form.Item label=" " name="Location2">
                    <Input />
                  </Form.Item>
                  <Row>
                    <Col span={12}>
                      <Form.Item label="電話" name="PhoneNum" {...smGrid}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="ＦＡＸ" name="FaxNum" {...smGrid}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="IndustrialClassify" label="産業分類">
                    <Select allowClear>
                      {this.state.screenData.IndustrialClassify
                        ? this.state.screenData.IndustrialClassify.map(
                            (item, index) => {
                              return (
                                <Select.Option
                                  value={item.LinkedField}
                                  key={index}
                                >
                                  {item.DisplayedField}
                                </Select.Option>
                              );
                            }
                          )
                        : null}
                    </Select>
                  </Form.Item>
                  <Form.Item label="産業医" name="IndustrialPhysician">
                    <Input />
                  </Form.Item>
                </Card>
                <Card className="mb-3">
                  <Tabs type="card">
                    <Tabs.TabPane tab="特記" key="RecordedInfo">
                      <Table
                        dataSource={
                          this.formRef.current
                            ? this.formRef.current.getFieldValue("RecordedInfo")
                            : []
                        }
                        rowKey={(record) => record.id}
                        rowClassName={(record, index) =>
                          record.id ===
                          this.state.selectedRowsRecordedInfo[0]?.id
                            ? "table-row-light"
                            : ""
                        }
                        onRow={(record, index) => ({
                          onClick: (e) => {
                            console.log(index);
                            this.setState({
                              rowSelectRecordedInfo: record,
                              indexTableRecordedInfo: index,
                              selectedRowsRecordedInfo: [record],
                            });
                          },
                        })}
                        pagination={false}
                        size="small"
                      >
                        <Table.Column
                          width={120}
                          title="重要度"
                          dataIndex="WKV40MS0420_importance"
                          render={(text, record, index) => (
                            <>
                              <Form.Item
                                name={["RecordedInfo", index, "id"]}
                                hidden={true}
                              >
                                <Input value={record.id || null} />
                              </Form.Item>
                              <Form.Item
                                name={[
                                  "RecordedInfo",
                                  index,
                                  "WKV40MS0420_importance",
                                ]}
                                required={true}
                                style={{ marginBottom: "0px" }}
                              >
                                <Select onChange={() => this.forceUpdate()}>
                                  <Select.Option value={0}>　　</Select.Option>
                                  <Select.Option value={1}>情報</Select.Option>
                                  <Select.Option value={3}>警告</Select.Option>
                                  <Select.Option value={5}>重要</Select.Option>
                                </Select>
                              </Form.Item>
                            </>
                          )}
                        />
                        <Table.Column
                          dataIndex="WKV40MS0420_importance"
                          key="icon"
                          render={(code) => {
                            let icon = "";
                            switch (code) {
                              case 1:
                                icon = (
                                  <InfoCircleOutlined
                                    style={{
                                      color: "#1890ff",
                                    }}
                                  />
                                );
                                break;
                              case 3:
                                icon = (
                                  <WarningOutlined
                                    style={{ color: "#faad14" }}
                                  />
                                );
                                break;
                              case 5:
                                icon = (
                                  <CloseCircleOutlined
                                    style={{ color: "#ff4d4f" }}
                                  />
                                );
                                break;
                              default:
                                icon = <MoreOutlined />;
                            }
                            return (
                              <Form.Item
                                style={{ fontSize: 18, marginBottom: "0px" }}
                              >
                                {icon}
                              </Form.Item>
                            );
                          }}
                        />
                        <Table.Column
                          title="内容"
                          dataIndex="content"
                          render={(text, record, index) => (
                            <Form.Item
                              name={[
                                "RecordedInfo",
                                index,
                                "WKV40MS0420_content",
                              ]}
                              style={{ marginBottom: "0px" }}
                            >
                              <Input />
                            </Form.Item>
                          )}
                        />
                        <Table.Column
                          title="ユーザー"
                          dataIndex="recorder"
                          render={(text, record, index) => (
                            <Form.Item
                              name={["RecordedInfo", index, "user_name"]}
                              style={{ marginBottom: "0px" }}
                            >
                              <Input disabled />
                            </Form.Item>
                          )}
                        />
                        <Table.Column
                          width={120}
                          key="action"
                          align="center"
                          title={() => (
                            <Button
                              style={{ width: "35px" }}
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={() => {
                                this.addNewRowToTable("RecordedInfo");
                              }}
                            />
                          )}
                          render={(text, record, index) => {
                            return (
                              <div>
                                <Button
                                 hidden={this.state.indexTableRecordedInfo !== this.findIndexByID(this.formRef.current
                            ? this.formRef.current.getFieldValue("RecordedInfo")
                            : [], record.id)}
                                  style={{
                                    border: "none",
                                    marginRight: "5px",
                                    color: "green",
                                  }}
                                  size="small"
                                  icon={<SaveOutlined />}
                                  onClick={() =>
                                    this.saveData(record, "RecordedInfo")
                                  }
                                ></Button>
                                <Button
                                 hidden={this.state.indexTableRecordedInfo !== this.findIndexByID(this.formRef.current
                            ? this.formRef.current.getFieldValue("RecordedInfo")
                            : [], record.id)}
                                  size="small"
                                  style={{ border: "none", color: "red" }}
                                  danger
                                  icon={<DeleteOutlined />}
                                  shape="circle"
                                  onClick={() => {
                                    Modal.confirm({
                                      title: "確認",
                                      icon: (
                                        <QuestionCircleOutlined
                                          style={{ color: "#1890ff" }}
                                        />
                                      ),
                                      content: "削除しますか",
                                      okText: "削除",
                                      cancelText: "キャンセル",
                                      onOk: () => {
                                        this.deleteRecordTable(
                                          record,
                                          "RecordedInfo"
                                        );
                                      },
                                    });
                                  }}
                                ></Button>
                              </div>
                            );
                          }}
                        />
                      </Table>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="送付先" key="DestinationInfo">
                      <Table
                        dataSource={
                          this.formRef.current
                            ? this.formRef.current.getFieldValue(
                                "DestinationInfo"
                              )
                            : []
                        }
                        rowKey={(record) => record.id}
                        pagination={false}
                        size="small"
                      >
                        <Table.Column
                          title="書類"
                          dataIndex="document_title"
                          render={(text, record, index) => {
                            return (
                              <>
                                <Form.Item
                                  name={["DestinationInfo", index, "id"]}
                                  hidden={true}
                                >
                                  <Input value={record.id || null} />
                                </Form.Item>
                                {text}
                              </>
                            );
                          }}
                        />
                        <Table.Column
                          title="事業所"
                          align="center"
                          dataIndex="destination_office_1"
                          render={(text, record, index) =>
                            office_addresses_render(
                              "destination_office_1",
                              text,
                              record,
                              index
                            )
                          }
                        />
                        <Table.Column
                          title="本店"
                          align="center"
                          dataIndex="destination_office_2"
                          render={(text, record, index) =>
                            office_addresses_render(
                              "destination_office_2",
                              text,
                              record,
                              index
                            )
                          }
                        />
                        <Table.Column
                          title="個人1"
                          align="center"
                          dataIndex="destination_personal_1"
                          render={(text, record, index) =>
                            office_addresses_render(
                              "destination_personal_1",
                              text,
                              record,
                              index
                            )
                          }
                        />
                        <Table.Column
                          title="個人2"
                          align="center"
                          dataIndex="destination_personal_2"
                          render={(text, record, index) =>
                            office_addresses_render(
                              "destination_personal_2",
                              text,
                              record,
                              index
                            )
                          }
                        />
                        <Table.Column
                          title="個人3"
                          align="center"
                          dataIndex="destination_personal_3"
                          render={(text, record, index) =>
                            office_addresses_render(
                              "destination_personal_3",
                              text,
                              record,
                              index
                            )
                          }
                        />
                      </Table>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="結果表" key="ResultsTable">
                      <Table
                        dataSource={
                          this.formRef.current
                            ? this.formRef.current.getFieldValue("ResultsTable")
                            : []
                        }
                        rowKey={(record) => record.id}
                        pagination={false}
                        size="small"
                        rowClassName={(record, index) =>
                          record.id ===
                          this.state.selectedRowsResultsTable[0]?.id
                            ? "table-row-light"
                            : ""
                        }
                        onRow={(record, index) => ({
                          onClick: (e) => {
                            console.log(index);
                            this.setState({
                              rowSelectResultsTable: record,
                              indexTableResultsTable: index,
                              selectedRowsResultsTable: [record],
                            });
                          },
                        })}
                      >
                        <Table.Column
                          title="コース"
                          dataIndex="medical_exam_course"
                          width={150}
                          render={(text, record, index) => (
                            <>
                              <Form.Item
                                name={["ResultsTable", index, "id"]}
                                hidden={true}
                              >
                                <Input value={record.id || null} />
                              </Form.Item>
                              <Form.Item
                                name={[
                                  "ResultsTable",
                                  index,
                                  "medical_exam_course",
                                ]}
                              >
                                <Input.Search
                                  onSearch={() =>
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: 600,
                                        component: (
                                          <WS0265001_BasicCourseInquiry
                                            onFinishScreen={({
                                              Lo_CourseCode,
                                            }) => {
                                              record.medical_exam_course =
                                                Lo_CourseCode;
                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    })
                                  }
                                />
                              </Form.Item>
                            </>
                          )}
                        />
                        <Table.Column
                          title="独自様式"
                          dataIndex="standard_printing_style_1"
                          render={(text, record, index) => (
                            <Row>
                              <Form.Item
                                name={[
                                  "ResultsTable",
                                  index,
                                  "standard_printing_style_1",
                                ]}
                                style={{ width: "100px" }}
                              >
                                <Input.Search
                                  onSearch={() =>
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: 600,
                                        component: (
                                          <WS0286001_PrintStyleInquiry
                                            onFinishScreen={({
                                              Lio_StyleCode,
                                              Lo_FormatName,
                                            }) => {
                                              record.standard_printing_style_1 =
                                                Lio_StyleCode;
                                              record.format_name_1 =
                                                Lo_FormatName;
                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    })
                                  }
                                />
                              </Form.Item>
                              <span>{record.format_name_1}</span>
                            </Row>
                          )}
                        />
                        <Table.Column
                          title="標準様式"
                          dataIndex="standard_printing_style_2"
                          render={(text, record, index) => (
                            <>
                              <span>{text}</span>
                              <span style={{ marginLeft: "5px" }}>
                                {record.format_name_2}
                              </span>
                            </>
                          )}
                        />
                        <Table.Column
                          width={120}
                          key="action"
                          align="center"
                          title={() => (
                            <Button
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={() => {
                                this.addNewRowToTable("ResultsTable");
                              }}
                            />
                          )}
                          render={(text, record, index) => {
                            return (
                              <div>
                                <Button
                                  style={{
                                    border: "none",
                                    marginRight: "5px",
                                    color: "green",
                                  }}
                                  size="small"
                                  icon={<SaveOutlined />}
                                  onClick={() =>
                                    this.saveData(record, "ResultsTable")
                                  }
                                  hidden={this.state.indexTableResultsTable !== this.findIndexByID(this.formRef.current
                                    ? this.formRef.current.getFieldValue("ResultsTable")
                                    : [], record.id)}
                                ></Button>
                                <Button
                                   hidden={this.state.indexTableResultsTable !== this.findIndexByID(this.formRef.current
                                    ? this.formRef.current.getFieldValue("ResultsTable")
                                    : [], record.id)}
                                  size="small"
                                  style={{ border: "none", color: "red" }}
                                  danger
                                  icon={<DeleteOutlined />}
                                  shape="circle"
                                  onClick={() => {
                                    Modal.confirm({
                                      title: "確認",
                                      icon: (
                                        <QuestionCircleOutlined
                                          style={{ color: "#1890ff" }}
                                        />
                                      ),
                                      content: "削除しますか",
                                      okText: "削除",
                                      cancelText: "キャンセル",
                                      onOk: () => {
                                        this.deleteRecordTable(
                                          record,
                                          "ResultsTable"
                                        );
                                      },
                                    });
                                  }}
                                ></Button>
                              </div>
                            );
                          }}
                        />
                      </Table>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="所属" key="AffiliationInfo">
                      <Table
                        dataSource={
                          this.formRef.current
                            ? this.formRef.current.getFieldValue(
                                "AffiliationInfo"
                              )
                            : []
                        }
                        rowKey={(record) => record.id}
                        pagination={false}
                        size="small"
                        rowClassName={(record, index) =>
                          record.id ===
                          this.state.selectedRowsAffiliationInfo[0]?.id
                            ? "table-row-light"
                            : ""
                        }
                        onRow={(record, index) => ({
                          onClick: (e) => {
                            console.log(index);
                            this.setState({
                              rowSelectAffiliationInfo: record,
                              indexTableAffiliationInfo: index,
                              selectedRowsAffiliationInfo: [record],
                            });
                          },
                        })}
                      >
                        <Table.Column
                          title="有効"
                          width={80}
                          dataIndex="in_force"
                          render={(text, record, index) => (
                            <>
                              <Form.Item
                                name={["AffiliationInfo", index, "id"]}
                                hidden={true}
                              >
                                <Input value={record.id || null} />
                              </Form.Item>
                              <Form.Item
                                name={["AffiliationInfo", index, "in_force"]}
                                valuePropName="checked"
                              >
                                <Checkbox
                                  onChange={(e) => {
                                    const formIns = this.formRef.current;
                                    formIns.setFields([
                                      {
                                        name: [
                                          "AffiliationInfo",
                                          index,
                                          "in_force",
                                        ],
                                        value: e.target.checked ? 1 : 0,
                                      },
                                    ]);
                                    this.forceUpdate();
                                  }}
                                />
                              </Form.Item>
                            </>
                          )}
                        />
                        <Table.Column
                          title="コード"
                          dataIndex="affiliation_cd"
                          render={(text, record, index) => (
                            <Form.Item
                              name={[
                                "AffiliationInfo",
                                index,
                                "affiliation_cd",
                              ]}
                            >
                              <Input
                                type="number"
                                disabled={record.in_force === 1 ? false : true}
                                onChange={(event) => {
                                  const formInstance = this.formRef.current;
                                  const impNamePath = [
                                    "AffiliationInfo",
                                    index,
                                    "affiliation_cd",
                                  ];
                                  if (
                                    event.target.value.length > 0 &&
                                    !formInstance.getFieldValue(impNamePath)
                                  ) {
                                    formInstance.setFields([
                                      {
                                        name: impNamePath,
                                        value: event.target.value,
                                      },
                                    ]);
                                  }
                                }}
                              />
                            </Form.Item>
                          )}
                        />
                        <Table.Column
                          title="略式名称"
                          dataIndex="short_name_name"
                          render={(text, record, index) => (
                            <Form.Item
                              name={[
                                "AffiliationInfo",
                                index,
                                "short_name_name",
                              ]}
                            >
                              <Input
                                disabled={record.in_force === 1 ? false : true}
                                onChange={(event) => {
                                  const formInstance = this.formRef.current;
                                  const impNamePath = [
                                    "AffiliationInfo",
                                    index,
                                    "short_name_name",
                                  ];
                                  if (
                                    event.target.value.length > 0 &&
                                    !formInstance.getFieldValue(impNamePath)
                                  ) {
                                    formInstance.setFields([
                                      {
                                        name: impNamePath,
                                        value: event.target.value,
                                      },
                                    ]);
                                  }
                                }}
                              />
                            </Form.Item>
                          )}
                        />
                        <Table.Column
                          title="正式名称"
                          dataIndex="formal_name"
                          render={(text, record, index) => (
                            <Form.Item
                              name={["AffiliationInfo", index, "formal_name"]}
                            >
                              <Input
                                disabled={record.in_force === 1 ? false : true}
                                onChange={(event) => {
                                  const formInstance = this.formRef.current;
                                  const impNamePath = [
                                    "AffiliationInfo",
                                    index,
                                    "formal_name",
                                  ];
                                  if (
                                    event.target.value.length > 0 &&
                                    !formInstance.getFieldValue(impNamePath)
                                  ) {
                                    formInstance.setFields([
                                      {
                                        name: impNamePath,
                                        value: event.target.value,
                                      },
                                    ]);
                                  }
                                }}
                              />
                            </Form.Item>
                          )}
                        />
                        <Table.Column
                          width={120}
                          key="action"
                          align="center"
                          title={() => (
                            <Button
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={() => {
                                this.addNewRowToTable("AffiliationInfo");
                              }}
                            />
                          )}
                          render={(text, record, index) => {
                            return (
                              <div>
                                <Button
                                 hidden={this.state.indexTableAffiliationInfo !== this.findIndexByID(this.formRef.current
                                  ? this.formRef.current.getFieldValue("AffiliationInfo")
                                  : [], record.id)}
                                  style={{
                                    border: "none",
                                    marginRight: "5px",
                                    color: "green",
                                  }}
                                  size="small"
                                  icon={<SaveOutlined />}
                                  onClick={() =>
                                    this.saveData(record, "AffiliationInfo")
                                  }
                                ></Button>
                                <Button
                                 hidden={this.state.indexTableAffiliationInfo !== this.findIndexByID(this.formRef.current
                                  ? this.formRef.current.getFieldValue("AffiliationInfo")
                                  : [], record.id)}
                                  size="small"
                                  style={{ border: "none", color: "red" }}
                                  danger
                                  icon={<DeleteOutlined />}
                                  shape="circle"
                                  onClick={() => {
                                    Modal.confirm({
                                      title: "確認",
                                      icon: (
                                        <QuestionCircleOutlined
                                          style={{ color: "#1890ff" }}
                                        />
                                      ),
                                      content: "削除しますか",
                                      okText: "削除",
                                      cancelText: "キャンセル",
                                      onOk: () => {
                                        this.deleteRecordTable(
                                          record,
                                          "AffiliationInfo"
                                        );
                                      },
                                    });
                                  }}
                                ></Button>
                              </div>
                            );
                          }}
                        />
                      </Table>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="個人" key="PersonalInfo">
                      <Table
                        dataSource={
                          this.formRef.current
                            ? this.formRef.current.getFieldValue("PersonalInfo")
                            : []
                        }
                        rowKey={(record) => record.id}
                      >
                        <Table.Column
                          title="個人番号"
                          dataIndex="personal_number_id"
                        />
                        <Table.Column
                          title=""
                          dataIndex="importance"
                          render={(text, record, index) => (
                            <Button
                              icon={<MoreOutlined />}
                              onClick={() =>
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 1200,
                                    component: (
                                      <Card title={"個人情報照会SUB"}>
                                        <WS2584019_PersonalInfoInquirySub
                                          Li_PersonalNum={
                                            record.personal_number_id
                                          }
                                          onClick={() => {
                                            this.setState({
                                              childModal: {
                                                ...this.state.childModal,
                                                visible: false,
                                              },
                                            });
                                          }}
                                        />
                                      </Card>
                                    ),
                                  },
                                })
                              }
                            ></Button>
                          )}
                        />
                        <Table.Column title="カナ氏名" dataIndex="kana_name" />
                        <Table.Column title="漢字氏名" dataIndex="kanji_name" />
                        <Table.Column
                          title="性別"
                          dataIndex="Expression_4"
                          render={(text, record, index) =>
                            text === "男性" ? (
                              <div style={{ color: "blue" }}>{text}</div>
                            ) : (
                              <div style={{ color: "red" }}>{text}</div>
                            )
                          }
                        />
                        <Table.Column
                          title="生年月日"
                          dataIndex="birthday_on"
                          render={(text) => (
                            <>{moment(text).format("NNy/MM/DD")}</>
                          )}
                        />
                      </Table>
                    </Tabs.TabPane>
                  </Tabs>
                </Card>
              </Col>
              <Col sm={24} lg={24} xl={12}>
                <Card style={{ height: "calc(100% - 0.5rem)" }}>
                  <Form.List
                    name="SupplementaryInfo"
                    children={(fields) => {
                      if (!this.state.screenData.SupplementaryInfo) {
                        return null;
                      }
                      return this.state.screenData.SupplementaryInfo.map(
                        (value, index) => {
                          return (
                            <Row gutter={5}>
                              <Col span={4}>
                                <Tag
                                  color={Color(156).Background}
                                  style={{
                                    width: "100%",
                                    height: "calc(100% - 0.3rem)",
                                  }}
                                >
                                  {value.Expression_22}
                                </Tag>
                              </Col>
                              <Col span={20}>
                                <Form.Item
                                  name={[index, "content"]}
                                  labelCol={{ span: 5 }}
                                >
                                  <Input
                                    onBlur={(event) => {
                                      let namePath = [
                                        "SupplementaryInfo",
                                        index,
                                        "content",
                                      ];
                                      let inputValueJP = "";
                                      if (value.condition_1 === "X") {
                                        inputValueJP = wanakana.toRomaji(
                                          event.target.value
                                        );
                                      }
                                      if (value.condition_1 === "J") {
                                        inputValueJP = wanakana.toKatakana(
                                          event.target.value
                                        );
                                      }
                                      if (value.condition_1 === "K") {
                                        inputValueJP = wanakana.toHiragana(
                                          event.target.value
                                        );
                                      }
                                      this.formRef?.current?.setFields([
                                        {
                                          name: namePath,
                                          value: inputValueJP,
                                        },
                                      ]);
                                      this.forceUpdate();
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          );
                        }
                      );
                    }}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24} className="text-end">
                <Card>
                  <Button
                    type="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      console.log("Delete: ");
                      this.deleteOfficeF11_1();
                    }}
                  >
                    削除
                  </Button>
                  <Button
                    disabled={
                      this.state.statusPage === 1 || this.state.statusPage === 2
                        ? true
                        : false
                    }
                    type="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: this.state.officeInfoDisplay
                            ?.StsContractCreated
                            ? 1200
                            : 700,
                          component: this.state.officeInfoDisplay
                            ?.StsContractCreated ? (
                            <WS0307008_ContractHistorySub
                              Li_ContractType={""}
                              Li_ContractOrgCode={this.state.OfficeCode}
                              Li_ContractStartDate={""}
                              onFinishScreen={() => {
                                this.closeModal();
                              }}
                            />
                          ) : (
                            <WS0308017_OrganizationCreateNew
                              Li_ContractType={""}
                              Li_ContractOrgCode={this.state.OfficeCode}
                              onFinishScreen={() => {
                                this.setState({
                                  officeInfoDisplay: {
                                    ...this.state.officeInfoDisplay,
                                    StsContractCreated: true,
                                  },
                                });
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  >
                    契約作成
                  </Button>
                  <Button type="primary" htmlType="submit">
                    登録
                  </Button>
                </Card>
              </Col>
            </Row>
          </Spin>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0341001_OfficeInfoMaintain);
