import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { debounce } from "lodash";
import GetImage from "constants/Images.js";
import Color from "constants/Color.js";
import MagicXpaFunc from "helpers/MagicXpaFunc.js";
import ModalDraggable from "components/Commons/ModalDraggable";
import { Regex } from "helpers/CommonHelpers.js";

import {
  Form,
  Spin,
  Card,
  Row,
  Col,
  Input,
  Button,
  Select,
  Tabs,
  Modal,
  Radio,
  Checkbox,
  Space,
  message,
  InputNumber,
  Tag,
} from "antd";
import {
  MoreOutlined,
  PlusOutlined,
  LeftOutlined,
  RightOutlined,
  WarningOutlined,
} from "@ant-design/icons";

import WS0248001_PersonalInfoSearchQuery from "./WS0248001_PersonalInfoSearchQuery.jsx";
import WS0343006_Extension from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0343006_Extension.jsx";
import WS2537001_PersonalReserveProcess from "../../YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess.jsx";
import WS0341001_OfficeInfoMaintain from "../V4MS0002000_OfficeInfoMaintainDirectly/WS0341001_OfficeInfoMaintain";
import CodeInfo from "./WS0343001_PersonalInfoMaintain/CodeInfo.jsx";
import DestinationInfo from "./WS0343001_PersonalInfoMaintain/DestinationInfo.jsx";
import SpecialInfo from "./WS0343001_PersonalInfoMaintain/SpecialInfo.jsx";
import SupplementtaryInfo from "./WS0343001_PersonalInfoMaintain/SupplementtaryInfo.jsx";
import WS2586020_ConsultHistorySub from "../../IN_InputBusiness/V4DS0212000_ProgressSetting/WS2586020_ConsultHistorySub";
import WS0084001_PostCodeSearchEngine from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0084001_PostCodeSearchEngine.jsx";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS1290001_InsurerNumberInquiry from "pages/TK_SpecificMedicalExamination/V4TK0200003_ConsultTicketInputProcessList/WS1290001_InsurerNumberInquiry.jsx";
import WSFileManager_FileManager from "pages/ZZ_Others/CUSTOMIZE_Custom/WSFileManager_FileManager.jsx";
import WS0344001_SupplementalInfoSetting from "../V4MS0001000_InsurerInfoMaintain/WS0344001_SupplementalInfoSetting.jsx";
import WS0382001_PersonalAttributesReacquire from "./WS0382001_PersonalAttributesReacquire.jsx";
import { WS2727001_PatientInfoQueryStard } from "./WS2727001_PatientInfoQueryStard.jsx";

import {
  getDataGenerationAction,
  registerPersonalAction,
  updatePersonalAction,
  setAddressToDefaultAction,
  getInitialDisplayCreatePersonalAction,
  deleteAffiliationAction,
  specialDeletePersonalInfoMaintainAction,
  getDataScreenPersonalInfoMainAction,
  eventF11PersonalInfoMain,
  eventF11DeleteDataPersonalInfoMain,
  getNameZipCodeAction,
} from "redux/basicInfo/PersonalInfoMaintain/PersonalInfoMaintain.action";

import * as wanakana from "wanakana";
import NumberFormat from "react-number-format";

const grid = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const smGrid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const styleTab = {
  width: "100%",
  height: "calc(30vh - 5px)",
  overflow: "auto",
};

const styleNumberFormat = {
  border: "1px solid #d9d9d9",
  outline: "#d9d9d9",
  width: "100%",
  height: "24px",
  borderRadius: "2px",
  padding: "0 7px",
};

const styleBorder = {
  border: "1px solid #F0F0F0",
  padding: "10px",
  marginBottom: "10px",
};

const styleFormItem = {
  margin: 0,
};

let idx, idx2;
class WS0343001_PersonalInfoMaintain extends React.Component {
  static propTypes = {
    Li_PersonalNum: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.ref_input_email = React.createRef();
    this.ref_input_mobile_mail = React.createRef();

    // document.title = "個人情報保守";

  
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: "",
      },
      isLoadingPage: false,
      statusPage: "", // statusPage: 0 create, statusPage: 1 update
      personal: {},
      infoBasicPage: {
        RegisterDate: "", // api return registration_date_on
        Date: "", // api return  updated_on

        Expression_74: "", // Year of Birth
        AgeOnDay: "",
        AgeYearEnd: "",

        Expression_57: "", // length personal_belongs[]
        office_kanji_name: "",
        insurer_kanji_name: "",
        short_name: "",

        Expression_18: "", // index in personal_addresses[]
        Expression_17: "", // length personal_addresses[]
      },
      objBelong: {},
      objAddress: {},
      objInit: {},
    };

    this.setDataToFields = this.setDataToFields.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.searchPersonalNumberID = debounce(this.searchPersonalNumberID, 1200);
    this.getValueChild = this.getValueChild.bind(this);
    this.createNewPersonal = this.createNewPersonal.bind(this);
    this.handleChangeValue = debounce(this.handleChangeValue, 300);
    this.handleButton = this.handleButton.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.loadInitData();
  };
  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
      
        flg: 1,
	
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadInitData();
    }
  }

  loadInitData = () => {
    this.setState({ isLoadingPage: true });
    getDataScreenPersonalInfoMainAction()
      .then((res) => {
        this.setState({ objInit: res.data });
        this.searchPersonalNumberID(this.props.Li_PersonalNum);
      })
      .catch((err) => {
        this.setState({ isLoadingPage: false });
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  setDataToPersonal = (objData) => {
    let Expression_74 = objData?.Lo_DateBirth
      ? moment(objData?.Lo_DateBirth).format("YYYY")
      : this.state.infoBasicPage.Expression_74;
    this.setState({
      personal: {
        ...this.state.personal,
        kana_name: objData.Lo_KanaName || this.state.personal.kana_name,
        kanji_name: objData.Lo_KanjiName || this.state.personal.kanji_name,
        sex: objData.Lo_Gender || this.state.personal.sex,
        birthday_on: objData.Lo_DateBirth
          ? moment(objData.Lo_DateBirth)
          : moment(this.state.personal.birthday_on),
        old_kana_name:
          objData.Lo_OldKanaName || this.state.personal.old_kana_name,
      },
      objBelong: {
        ...this.state.objBelong,
        insurer_number:
          objData.Lo_InsurerNum || this.state.objBelong.insurer_number,
        insurer_card_symbol:
          objData.Lo_InsuranceCardSymbol ||
          this.state.objBelong.insurer_card_symbol,
        insurer_card_number:
          objData.Lo_InsuranceCardNum ||
          this.state.objBelong.insurer_card_number,
      },
      objAddress: {
        ...this.state.objAddress,
        postal_code: objData.Lo_ZipCode || this.state.objAddress.postal_code,
        address_1: objData.Lo_Address1 || this.state.objAddress.address_1,
        address_2: objData.Lo_Address2 || this.state.objAddress.address_2,
        cell_phone_number:
          objData.Lo_PhoneNum1Fixed || this.state.objAddress.cell_phone_number,
        mobile_mail:
          objData.Lo_PhoneNum2Mobile || this.state.objAddress.mobile_mail,
      },
      infoBasicPage: {
        ...this.state.infoBasicPage,
        Expression_74: Expression_74,
        AgeOnDay: objData?.Lo_DateBirth
          ? parseInt(moment().year() - Expression_74).toString()
          : this.state.infoBasicPage.AgeOnDay,
        AgeYearEnd: objData?.Lo_DateBirth
          ? parseInt(moment().year() - Expression_74 + 1).toString()
          : this.state.infoBasicPage.AgeYearEnd,
      },
    });
  };

  setDataToFields = (personal) => {
    // format obj return from API => field, register, update form
    let objBelongTemp = {},
      objAddressTemp = {};
    let formatPersonal = {};
    let personal_belongs = [];
    let personal_addresses = [];
    let personal_specials = [];
    let personal_supplements = [];
    let personal_individual_addresses = [];
    let personal_codes = [];

    if (personal.personal_belongs?.length > 0) {
      personal_belongs = personal.personal_belongs.map((item) => ({
        ...item,
        W2_affiliation: item.personal_workplaces?.workplace_code || "",
      }));
    } else {
      objBelongTemp = {
        id: Math.round(Math.random() * 1000),
        personal_number_id: personal.personal_number_id,
        office_code: "",
        branch_store_code: "",
        insurer_number: "",
        insurer_card_symbol: "",
        insurer_card_number: "",
        recipient_number: "",
        insurer_start_date_on: "",
        insurer_end_date_on: "",
        relationship: "0",
        employment_status: "",
        occupations: "",
        enabled_disabled: 1,
        W2_affiliation: "",
      };
      personal_belongs.push(objBelongTemp);
    }

    if (personal.personal_addresses?.length > 0) {
      personal_addresses = personal.personal_addresses;
    } else {
      objAddressTemp = {
        id: Math.round(Math.random() * 1000),
        personal_number_id: personal.personal_number_id,
        address_category: "",
        postal_code: "",
        phone_number: "",
        cell_phone_number: "",
        email: "",
        mobile_mail: "",
        address_1: "",
        address_2: "",
        address: "",
        enabled_disabled: 0,
      };
      personal_addresses.push(objAddressTemp);
    }

    if (personal.personal_specials?.length > 0) {
      personal_specials = personal.personal_specials;
    }

    if (personal.SupplementaryInfo?.length > 0) {
      personal_supplements = personal.SupplementaryInfo.map((item) => ({
        ...item,
        personal_number_id: personal.personal_number_id,
      }));
    }

    if (personal.DestinationInfo?.length > 0) {
      personal.DestinationInfo.forEach((element) => {
        if (element.send_document_code !== null) {
          personal_individual_addresses.push({
            ...element,
            personal_number_id: personal.personal_number_id,
          });
        }
      });
    }

    if (personal.CodeInfo?.length > 0) {
      personal_codes = personal.CodeInfo.map((item) => ({
        ...item,
        personal_number_id: personal.personal_number_id,
      }));
    }

    if (personal.personal_number_id) {
      let Expression_74 = moment(personal?.birthday_on).isValid()
        ? moment(personal?.birthday_on).format("YYYY")
        : "";
      let objTemp = {
        RegisterDate: moment(personal.registration_date_on).isValid()
          ? moment(personal.registration_date_on).format("YYYY/MM/DD")
          : "0000/00/00",
        Date: moment(personal.updated_on).isValid()
          ? moment(personal.updated_on).format("YYYY/MM/DD")
          : "0000/00/00",
        Expression_74: Expression_74,
        AgeOnDay: moment().diff(personal.birthday_on, "years").toString(),
        AgeYearEnd: parseInt(moment().year() - Expression_74).toString(),
        Expression_57: personal_belongs.length,
        office_kanji_name: personal_belongs[0]?.office?.office_kanji_name || "",
        insurer_kanji_name:
          personal_belongs[0]?.insurer?.insurer_kanji_name || "",
        Expression_18: 0,
        Expression_17: personal_addresses.length,
      };

      if (personal.personal_belongs?.length > 0)
        objBelongTemp = personal.personal_belongs[0];
      if (personal.personal_addresses?.length > 0)
        objAddressTemp = personal.personal_addresses[0];

      this.setState({
        infoBasicPage: {
          ...this.state.infoBasicPage,
          ...objTemp,
        },
      });
    }

    delete personal.SupplementaryInfo;
    delete personal.DestinationInfo;
    delete personal.CodeInfo;

    formatPersonal = {
      ...personal,
      personal_number_id: personal.personal_number_id,
      kana_name: personal.kana_name,
      kanji_name: personal.kanji_name,
      sex: personal.sex,
      birthday_on: moment(personal.birthday_on).isValid()
        ? moment(personal.birthday_on)
        : null,
      personal_belongs,
      personal_addresses,
      personal_specials,
      personal_supplements,
      personal_individual_addresses,
      personal_codes,
    };

    this.setState({
      personal: formatPersonal,
      objBelong: objBelongTemp,
      objAddress: objAddressTemp,
    });
    this.formRef?.current?.setFieldsValue({
      ...formatPersonal,
      objBelong: objBelongTemp,
      objAddress: objAddressTemp,
    });
  };

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: "",
      },
    });
  };

  // search with personal_number_id
  searchPersonalNumberID = (id) => {
    this.setState({ isLoadingPage: true });
    this.setState({
      infoBasicPage: {},
      personal: {},
      objBelong: {},
      objAddress: {},
    });
    this.formRef.current?.resetFields();
    if (id) {
      getDataGenerationAction(id).then((res) => {
        // res.ProcessDivision === 2 => register
        // res.ProcessDivision === 3 => update
        if (res.personal_number_id && res.ProcessDivision === 3) {
          this.setState({ statusPage: 1 });
        } else if (res.personal_number_id && res.ProcessDivision === 2) {
          this.setState({ statusPage: 0 });
        }
        this.setDataToFields(res);
        this.setState({ isLoadingPage: false });
      });
    } else {
      this.setState({ isLoadingPage: false });
    }
  };

  // get value from child component (WS0248001_PersonalInfoSearchQuery, WS0343006_Extension)
  getValueChild = (objChild, screen) => {
    if (objChild.personal_number_id) {
      this.searchPersonalNumberID(objChild.personal_number_id);
    }
    if (screen === "WS0343006") {
      let arrTemp = [...this.state.personal.personal_belongs];
      let index = arrTemp.findIndex((item) => item.id === objChild.id);
      let objTemp = {
        ...arrTemp[index],
        ...objChild,
      };
      arrTemp[index] = objTemp;
      this.setState({
        personal: {
          ...this.state.personal,
          personal_belongs: arrTemp,
        },
      });
    }
    this.closeModal();
  };

  // use at handleButton
  getIndex = (idx = 0, length, direction) => {
    switch (direction) {
      case "next":
        return (idx + 1) % length;
      case "prev":
        return (idx === 0 && length - 1) || idx - 1;
      default:
        return idx;
    }
  };

  // create
  createNewPersonal = () => {
    this.closeModal();
    this.formRef.current.resetFields();
    getInitialDisplayCreatePersonalAction().then((res) => {
      this.setState({
        statusPage: 0,
        isLoadingPage: false,
        personal: {},
        infoBasicPage: {},
        objAddress: {},
        objBelong: {},
      });
      this.setDataToFields(res);
    });
  };

  // handles...
  handleChangeValue = (value, name, arrName, prevObj) => {
    if (name !== "birthday_on") {
      this.setState({
        personal: {
          ...this.state.personal,
          [name]: value,
        },
      });
    } else if (name === "birthday_on") {
      let Expression_74 = moment(value).isValid()
        ? moment(value).format("YYYY")
        : "";
      let AgeOnDay = parseInt(moment().year() - Expression_74).toString();
      let AgeYearEnd = parseInt(moment().year() - Expression_74 + 1).toString();
      this.setState({
        infoBasicPage: {
          ...this.state.infoBasicPage,
          Expression_74: Expression_74,
          AgeOnDay: AgeOnDay,
          AgeYearEnd: AgeYearEnd,
        },
        personal: {
          ...this.state.personal,
          birthday_on: value ? moment(value) : null,
        },
      });
    }
    let objName = {
      personal_specials: "personal_specials",
      personal_supplements: "personal_supplements",
      personal_individual_addresses: "personal_individual_addresses",
      personal_codes: "personal_codes",
    };
    if (objName[arrName]) {
      let arrTemp = [...this.state.personal[arrName]];
      if (prevObj.id) {
        let index = arrTemp.findIndex((item) => item.id === prevObj.id);
        if (objName[arrName] === "personal_individual_addresses") {
          value = value ? 1 : 0;
        }
        prevObj = {
          ...prevObj,
          [name]: value,
        };
        arrTemp[index] = prevObj;
      } else if (objName[arrName] === "personal_specials") {
        arrTemp.push({
          id: Math.random(),
          personal_number_id: this.state.personal.personal_number_id,
          isNew: true,
          registration_date_on: moment().format("YYYY/MM/DD"),
          milisecond: 0,
        });
      }
      this.setState({
        personal: {
          ...this.state.personal,
          [arrName]: arrTemp,
        },
      });
      this.formRef?.current?.setFieldsValue({ [arrName]: arrTemp });
    }
  };

  // delete personal_specials
  deleteDataSpecials = (record, index) => {
    let arrTemp = [...this.state.personal.personal_specials];
    if (record.id && !record.isNew) {
      specialDeletePersonalInfoMaintainAction({
        id: record.id,
        personal_number_id: record.personal_number_id,
      })
        .then()
        .catch((err) => message.error("エラー"));
    }
    arrTemp.splice(index, 1);
    this.setState({
      personal: {
        ...this.state.personal,
        personal_specials: arrTemp,
      },
    });
    this.formRef?.current?.setFieldsValue({ personal_specials: arrTemp });
  };

  deleteDataPersonalBelong = (obj) => {
    let objTemp = {};
    let arrBelongState = [...this.state.personal.personal_belongs];
    let index = arrBelongState.findIndex((item) => item.id === obj.id);
    if (index !== -1) {
      Modal.confirm({
        content: "削除を行いますか",
        okText: "は　い",
        cancelText: "いいえ",
        onOk: () => {
          if (obj.isNew) {
            arrBelongState.splice(index, 1);
            objTemp = arrBelongState[0];
          } else {
            deleteAffiliationAction(obj.id)
              .then((res) => {
                message.success(res.data.message);
                arrBelongState.splice(index, 1);
                objTemp = arrBelongState[0];
              })
              .catch((err) => message.error(err.response.data.message));
          }
          this.setState({
            infoBasicPage: {
              ...this.state.infoBasicPage,
              Expression_57: arrBelongState.length,
            },
            personal: {
              ...this.state.personal,
              personal_belongs: arrBelongState,
            },
            objBelong: objTemp,
          });
        },
      });
    }
  };

  handleButton = (direction, arrName, prevObj) => {
    let arrTemp = [];
    let objName = {};
    let objTemp = {};

    let arrBelongState = [...this.state.personal.personal_belongs];
    let arrAddressState = [...this.state.personal.personal_addresses];

    let office_kanji_nameTemp = "";
    let insurer_kanji_nameTemp = "";

    switch (direction) {
      case "next":
      case "prev": {
        let length;
        if (arrName === "personal_belongs") {
          length = arrBelongState.length;
          if (length > 1) {
            idx = this.getIndex(idx, length, direction);
            objTemp = arrBelongState[idx];

            let index = arrBelongState.findIndex(
              (item) => item.id === prevObj.id
            );
            if (index !== -1) {
              office_kanji_nameTemp =
                arrBelongState[idx]?.office?.office_kanji_name || "";
              insurer_kanji_nameTemp =
                arrBelongState[idx]?.insurer?.insurer_kanji_name || "";
              this.setState({
                infoBasicPage: {
                  ...this.state.infoBasicPage,
                  office_kanji_name: office_kanji_nameTemp,
                  insurer_kanji_name: insurer_kanji_nameTemp,
                },
              });
            }
          }
        } else {
          length = arrAddressState.length;
          if (length > 1) {
            idx2 = this.getIndex(idx2, length, direction);
            objTemp = arrAddressState[idx2];

            this.setState({
              infoBasicPage: {
                ...this.state.infoBasicPage,
                Expression_18: idx2,
              },
            });
          }
        }

        if (length === 1) {
          arrTemp =
            arrName === "personal_belongs" ? arrBelongState : arrAddressState;
          objTemp = arrTemp?.length > 0 ? arrTemp[0] : {};
        }
        break;
      }
      case "add": {
        if (arrName === "personal_addresses") {
          if (arrAddressState.length < 3) {
            objTemp = {
              ...prevObj,
              id: Math.random(),
              personal_number_id: this.state.personal.personal_number_id,
            };
            arrAddressState.push(objTemp);
          } else {
            message.warning("限界は3件までです");
          }
        } else {
          objTemp = {
            ...prevObj,
            isNew: true,
            id: Math.random(),
            personal_number_id: this.state.personal.personal_number_id,
            relationship: "0",
            enabled_disabled: "1",
          };
          arrBelongState.push(objTemp);
          this.setState({
            infoBasicPage: {
              ...this.state.infoBasicPage,
              office_kanji_name: "",
              insurer_kanji_name: "",
            },
          });
        }
        break;
      }
      default:
        break;
    }

    arrTemp = arrName === "personal_belongs" ? arrBelongState : arrAddressState;
    objName = arrName === "personal_belongs" ? "objBelong" : "objAddress";

    this.setState({
      personal: {
        ...this.state.personal,
        [arrName]: arrTemp,
      },
      [objName]: objTemp,
    });
  };

  // format obj before submit form
  formatPersonal = () => {
    const { personal } = this.state;

    let personal_belongs_submit = [];
    let personal_addresses_submit = [];
    let personal_specials_submit = [];
    let personal_supplements_submit = [];
    let personal_individual_addresses_submit = [];
    let personal_codes_submit = [];

    if (personal.personal_belongs) {
      personal_belongs_submit = personal.personal_belongs;
    }
    if (personal.personal_addresses) {
      personal_addresses_submit = personal.personal_addresses;
    }
    if (personal.personal_specials) {
      personal_specials_submit = personal.personal_specials;
    }
    if (personal.personal_supplements) {
      personal_supplements_submit = personal.personal_supplements;
    }
    if (personal.personal_individual_addresses) {
      personal_individual_addresses_submit =
        personal.personal_individual_addresses;
    }
    if (personal.personal_codes) {
      personal_codes_submit = personal.personal_codes;
    }

    return {
      ...personal,
      birthday_on: moment(personal.birthday_on).isValid()
        ? moment(personal.birthday_on).format("YYYY/MM/DD")
        : null,
      personal_belongs: personal_belongs_submit,
      personal_addresses: personal_addresses_submit,
      personal_specials: personal_specials_submit,
      personal_supplements: personal_supplements_submit,
      personal_individual_addresses: personal_individual_addresses_submit,
      personal_codes: personal_codes_submit,
    };
  };

  // change value input
  handleChange = (prevObj, value, name, arrName) => {
    let arrTempBelong = [...this.state.personal.personal_belongs];
    let arrTempAddress = [...this.state.personal.personal_addresses];

    let indexBelong = arrTempBelong.findIndex((item) => item.id === prevObj.id);
    let indexAddress = arrTempAddress.findIndex(
      (item) => item.id === prevObj.id
    );

    if (name === "office_code" || name === "branch_store_code") {
      this.setState({
        infoBasicPage: {
          ...this.state.infoBasicPage,
          office_kanji_name: "",
        },
      });
    } else if (name === "insurer_number") {
      this.setState({
        infoBasicPage: {
          ...this.state.infoBasicPage,
          insurer_kanji_name: "",
        },
      });
    }

    if (
      name === "address_category" ||
      name === "branch_store_code" ||
      name === "insurer_number"
    ) {
      value = parseInt(value);
    }

    let obj = {
      ...prevObj,
      [name]: value,
    };
    let index = arrName === "personal_belongs" ? indexBelong : indexAddress;
    if (index !== -1) {
      let arrTemp =
        arrName === "personal_belongs" ? arrTempBelong : arrTempAddress;
      arrTemp[index] = obj;
      this.formRef.current.setFieldsValue({ [arrName]: arrTemp });
      this.setState({
        personal: {
          ...this.state.personal,
          [arrName]: arrTemp,
        },
      });
      arrName === "personal_belongs"
        ? this.setState({ objBelong: obj })
        : this.setState({ objAddress: obj });
    }
  };


  ReturnComponent = (component) => {
    let components = {
      WS0247001: WS0247001_OfficeInfoRetrievalQuery,
      WS1290001: WS1290001_InsurerNumberInquiry,
      WS0084001: WS0084001_PostCodeSearchEngine,
    };
    return components[component];
  };

  callbackOpenModal = (modal) => {
    if (this.state.personal.personal_number_id) {
      let Component = this.ReturnComponent(modal);
      const formInstance = this.formRef?.current;

      let arrBelongTemp = [...this.state.personal.personal_belongs];
      let objBelongTemp = this.state.objBelong;
      let indexBelong = arrBelongTemp.findIndex(
        (item) => item.id === objBelongTemp.id
      );

      let arrAddressTemp = [...this.state.personal.personal_addresses];
      let objAddressTemp = this.state.objAddress;
      let indexAddress = arrAddressTemp.findIndex(
        (item) => item.id === objAddressTemp.id
      );

      switch (modal) {
        case "WS1290001": // WS1290001_InsurerNumberInquiry
        case "WS0247001": { // WS0247001_OfficeInfoRetrievalQuery
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 1200,
              component: (
                <Component
                  onFinishScreen={({
                    Lio_OfficeCode,
                    Lio_BranchStoreCode,
                    Lo_InsurerNum,
                    recordData,
                  }) => {
                    if (indexBelong !== -1) {
                      if (modal === "WS1290001") {
                        objBelongTemp = {
                          ...objBelongTemp,
                          insurer_number: parseInt(Lo_InsurerNum),
                        };
                        this.setState({
                          infoBasicPage: {
                            ...this.state.infoBasicPage,
                            insurer_kanji_name:
                              recordData[0].insurer_kanji_name,
                          },
                        });
                      } else if (modal === "WS0247001") {
                        objBelongTemp = {
                          ...objBelongTemp,
                          office_code: Lio_OfficeCode,
                          branch_store_code: parseInt(Lio_BranchStoreCode),
                        };
                        this.setState({
                          infoBasicPage: {
                            ...this.state.infoBasicPage,
                            office_kanji_name: recordData.office_kanji_name,
                          },
                        });
                      }
                      arrBelongTemp[indexBelong] = objBelongTemp;
                      formInstance?.setFieldsValue({
                        personal_belongs: arrBelongTemp,
                        objBelong: objBelongTemp,
                      });
                      this.setState({
                        personal: {
                          ...this.state.personal,
                          personal_belongs: arrBelongTemp,
                        },
                        objBelong: objBelongTemp,
                      });
                    }
                    this.closeModal();
                  }}
                />
              ),
            },
          });
          break;
        }
        case "WS0084001": { // WS0084001_PostCodeSearchEngine
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 600,
              component: (
                <Component
                  Lio_ZipCode={objAddressTemp.postal_code}
                  Lio_Address={objAddressTemp.address_1}
                  onFinishScreen={({ Lio_ZipCode, Lio_Address }) => {
                    if (indexAddress !== -1) {
                      objAddressTemp = {
                        ...objAddressTemp,
                        postal_code: Lio_ZipCode,
                        address_1: Lio_Address,
                      };
                      arrAddressTemp[indexAddress] = objAddressTemp;
                      formInstance?.setFieldsValue({
                        personal_addresses: arrAddressTemp,
                        objAddress: objAddressTemp,
                      });
                      this.setState({
                        personal: {
                          ...this.state.personal,
                          personal_addresses: arrAddressTemp,
                        },
                        objAddress: objAddressTemp,
                      });
                    }
                    this.closeModal();
                  }}
                />
              ),
            },
          });
          break;
        }
        default:
          break;
      }
    }
  };

  // submit form
  onFinish = (formData) => {
    let data = this.formatPersonal(formData);

    switch (this.state.statusPage) {
      case 0:
        Modal.confirm({
          content: "新規登録します。よろしいですか？",
          okText: "は　い",
          cancelText: "いいえ",
          onOk: () =>
            registerPersonalAction(data).then((res) => {
              this.formRef.current.resetFields();
              // this.setState({ statusPage: '', infoBasicPage: {}, personal: {}, objBelong: {}, objAddress: {}, });
              this.loadInitData();
            }),
        });
        break;
      case 1:
        Modal.confirm({
          content: "上書き登録します。よろしいですか？",
          okText: "は　い",
          cancelText: "いいえ",
          onOk: () =>
            updatePersonalAction(data).then((res) => {
              this.formRef.current.resetFields();
              // this.setState({ statusPage: '', infoBasicPage: {}, personal: {}, objBelong: {}, objAddress: {}, });
              this.loadInitData();
            }),
        });
        break;
      default:
        break;
    }
  };

  eventF11() {
    let params = {
      PersonalNum: this.formRef.current?.getFieldValue("personal_number_id"),
      StsConsultHistory: false,
    };

    eventF11PersonalInfoMain(params)
      .then((res) => {
        if (
          res.data?.Warning ===
          "個人の情報がすべて削除されます。\n削除しますか？"
        )
          Modal.confirm({
            width: 360,
            icon: <WarningOutlined />,
            title: res.data?.Warning,
            onOk: () => {
              this.eventF11_Delete();
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
  }

  eventF11_Delete() {
    let params = {
      PersonalNum: this.formRef.current?.getFieldValue("personal_number_id"),
      StsConsultHistory: false,
    };

    eventF11DeleteDataPersonalInfoMain(params)
      .then((res) => {
        this.searchPersonalNumberID("");
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

  getNameZipCode = (params) => {
    let address_1Temp = this.state.objAddress.address_1;
    if (!address_1Temp)
      getNameZipCodeAction({ W5_postal_cd: params })
        .then((res) => {
          if (res?.data) {
            let W5_address_1 = res.data?.W5_address_1 || "";
            this.handleChange(
              this.state.objAddress,
              W5_address_1,
              "address_1",
              "personal_addresses"
            );
          }
        })
        .catch((err) =>
          message.error(err?.response?.data?.message || "エラーが発生しました")
        );
  };

  ValidateEmail = (value, fieldName) => {
    const mailformat =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (Regex(String(value).toLowerCase(), mailformat) === false) {
      message.error("メールアドレスの形式が異なります。");
      this[fieldName]?.current?.focus();
    }
  };

  render() {
    const { childModal, isLoadingPage, personal, infoBasicPage } = this.state;
    return (
      <div className="personal-info-maintain">
        <Card className="mb-3" size="small">
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 500,
                    component: (
                      <WSFileManager_FileManager
                        Params_2612={{
                          Li_Division: "個人",
                          Li_Identify: MagicXpaFunc.Str(
                            MagicXpaFunc.Val(
                              this.formRef.current?.getFieldValue(
                                "personal_number_id"
                              ),
                              "10"
                            ),
                            "10P0"
                          ),
                        }}
                      />
                    ),
                  },
                });
              }}
              disabled={
                !this.formRef.current?.getFieldValue("personal_number_id")
              }
            >
              フォルダ
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 800,
                    component: (
                      <WS0344001_SupplementalInfoSetting
                        Li_IdentifyChar="MAST-"
                        onFinishScreen={() => {
                          // this.getScreenData();

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
              補足設定
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "80%",
                    component: (
                      <WS0382001_PersonalAttributesReacquire
                        Li_User={this.state.objInit.OptionUser}
                        Li_ReAcquireItems={
                          this.state.objInit.OptionDataReAcquireItems
                        }
                        Li_PatientNum={this.state.personal.personal_number_id}
                        onFinishScreen={(data) => {
                          if (data) {
                            this.setDataToPersonal(data);
                          }
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
              再取得
            </Button>
          </Space>
        </Card>
        <Spin spinning={isLoadingPage}>
          <Form
            ref={this.formRef}
            {...grid}
            onFinish={this.onFinish}
            autoComplete="off"
            initialValues={{ sex: 1 }}
          >
            {/* Header */}
            <Card>
              <Row className="mb-3">
                <Col span={6} className="d-flex align-items-center">
                  <Form.Item name="personal_number_id">
                    <Input.Search
                      autoFocus={true}
                      className="floatRight"
                      onChange={(event) =>
                        this.searchPersonalNumberID(
                          Regex(event.target.value, /[1-9]/)
                            ? event.target.value
                            : null
                        )
                      }
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1500,
                            component: (
                              <Tabs
                                defaultActiveKey="1"
                                size="small"
                                style={{ paddingLeft: "12px" }}
                              >
                                <Tabs.TabPane tab="患者情報照会" key="1">
                                  <WS2727001_PatientInfoQueryStard
                                    onFinishScreen={(output) => {
                                      this.searchPersonalNumberID(
                                        output.Lo_PersonalNumId
                                      );
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: false,
                                        },
                                      });
                                    }}
                                    hideTitle={true}
                                  />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="個人情報検索・照会" key="2">
                                  <WS0248001_PersonalInfoSearchQuery
                                    createNewPersonal={this.createNewPersonal}
                                    getValueChild={this.getValueChild}
                                    hideTitle={true}
                                    onFinishScreen={(output) => {
                                      this.searchPersonalNumberID(
                                        output.Lo_PersonalNumId
                                      );
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: false,
                                        },
                                      });
                                    }}
                                  />
                                </Tabs.TabPane>
                              </Tabs>
                            ),
                          },
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Tag color={Color(156).Background}>自動発番</Tag>
                  </Form.Item>
                </Col>
                <Col span={18} className="text-end">
                  <div>
                    登録日{" "}
                    {infoBasicPage.RegisterDate &&
                    infoBasicPage.RegisterDate !== "0000/00/00" ? (
                      infoBasicPage.RegisterDate
                    ) : (
                      <span style={{ opacity: "0" }}>0000/00/00</span>
                    )}
                  </div>
                  <div>
                    変更日{" "}
                    {infoBasicPage.Date &&
                    infoBasicPage.Date !== "0000/00/00" ? (
                      infoBasicPage.Date
                    ) : (
                      <span style={{ opacity: "0" }}>0000/00/00</span>
                    )}
                  </div>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col lg={24} xl={12} span={12}>
                  {/* Personal */}
                  <div style={{ ...styleBorder, position: "relative" }}>
                    <Form.Item label="カナ氏名">
                      <Input
                        style={{ width: "300px" }}
                        readOnly={!personal.personal_number_id}
                        value={personal.kana_name}
                        onChange={(e) =>
                          this.handleChangeValue(e.target.value, "kana_name")
                        }
                        onBlur={(e) => {
                          this.setState({
                            personal: {
                              ...this.state.personal,
                              kana_name: wanakana.toKatakana(e.target.value),
                              kanji_name: this.state.personal.kanji_name
                                ? this.state.personal.kanji_name
                                : e.target.value,
                            },
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="漢字氏名">
                      <Input
                        style={{ width: "300px" }}
                        readOnly={!personal.personal_number_id}
                        value={personal.kanji_name}
                        onChange={(e) =>
                          this.handleChangeValue(e.target.value, "kanji_name")
                        }
                      />
                    </Form.Item>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="性別" {...smGrid}>
                          <Radio.Group
                            onChange={(e) =>
                              this.handleChangeValue(e.target.value, "sex")
                            }
                            disabled={!personal.personal_number_id}
                            value={personal.sex}
                          >
                            <Radio value={1}>男性</Radio>
                            <Radio value={2}>女性</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="受診日"
                          {...smGrid}
                          hidden={!infoBasicPage.AgeOnDay}
                        >
                          <div>{infoBasicPage.AgeOnDay}歳</div>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="生年月日" {...smGrid}>
                          <Space>
                            <Form.Item>
                              <VenusDatePickerCustom
                                formRefDatePicker={this.formRef}
                                format="NNy/MM/DD"
                                disabled={!personal.personal_number_id}
                                value={personal.birthday_on}
                                onChange={(date) =>
                                  this.handleChangeValue(date, "birthday_on")
                                }
                              />
                            </Form.Item>
                            <Form.Item hidden={!infoBasicPage.Expression_74}>
                              <div>{`(${infoBasicPage.Expression_74})`}</div>
                            </Form.Item>
                          </Space>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="年度末"
                          {...smGrid}
                          hidden={!infoBasicPage.AgeYearEnd}
                        >
                          <div>{infoBasicPage.AgeYearEnd}歳</div>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        bottom: "20px",
                        right: "0",
                        position: "absolute",
                      }}
                    >
                      <img
                        src={
                          personal.sex === 1
                            ? GetImage("man")
                            : GetImage("woman")
                        }
                        alt="sex"
                      />
                    </Row>
                  </div>

                  {/* AffiliationInfo */}
                  <div style={styleBorder}>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="有　効" {...smGrid}>
                          <Space style={{ float: "left" }}>
                            <Form.Item>
                              <Checkbox
                                checked={this.state.objBelong.enabled_disabled}
                                disabled={!personal.personal_number_id}
                                onChange={(e) =>
                                  this.handleChange(
                                    this.state.objBelong,
                                    e.target.checked,
                                    "enabled_disabled",
                                    "personal_belongs"
                                  )
                                }
                              />
                            </Form.Item>
                            <Form.Item>
                              <Space>
                                <Button
                                  type="primary"
                                  icon={<LeftOutlined />}
                                  disabled={!personal.personal_number_id}
                                  onClick={() =>
                                    this.handleButton(
                                      "prev",
                                      "personal_belongs",
                                      this.state.objBelong
                                    )
                                  }
                                />
                                <Button
                                  type="primary"
                                  icon={<RightOutlined />}
                                  disabled={!personal.personal_number_id}
                                  onClick={() =>
                                    this.handleButton(
                                      "next",
                                      "personal_belongs",
                                      this.state.objBelong
                                    )
                                  }
                                />
                              </Space>
                            </Form.Item>
                          </Space>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Space style={{ float: "right" }}>
                          <span>
                            {personal?.personal_belongs
                              ? personal?.personal_belongs?.length + "件"
                              : ""}
                          </span>
                          <Form.Item>
                            <Button
                              type="primary"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...childModal,
                                    visible: true,
                                    width: 550,
                                    component: (
                                      <WS0343006_Extension
                                        id={this.state.objBelong.id}
                                        Li_OfficeCode={
                                          this.state.objBelong.office_code
                                        }
                                        Li_BranchStoreCode={
                                          this.state.objBelong.branch_store_code
                                        }
                                        Lio_Employment={
                                          this.state.objBelong.employment_status
                                        }
                                        Lio_Job={
                                          this.state.objBelong.occupations
                                        }
                                        Lio_InsuranceStartDate={
                                          this.state.objBelong
                                            .insurer_start_date_on
                                        }
                                        Lio_InsuranceEndDate={
                                          this.state.objBelong
                                            .insurer_end_date_on
                                        }
                                        Lio_BeneficiariesNum={
                                          this.state.objBelong.recipient_number
                                        }
                                        getValueChild={this.getValueChild}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              拡張
                            </Button>
                          </Form.Item>
                        </Space>
                      </Col>
                    </Row>
                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item label="事業所" {...smGrid}>
                          <Space>
                            <Form.Item>
                              <Input
                                className="floatRight"
                                value={this.state.objBelong.office_code}
                                readOnly={!personal.personal_number_id}
                                maxLength={8}
                                onChange={(e) =>
                                  this.handleChange(
                                    this.state.objBelong,
                                    e.target.value,
                                    "office_code",
                                    "personal_belongs"
                                  )
                                }
                                onDoubleClick={() =>
                                  this.callbackOpenModal("WS0247001")
                                }
                              />
                            </Form.Item>
                            <Form.Item>
                              <InputNumber
                                maxLength={5}
                                min={0}
                                readOnly={!personal.personal_number_id}
                                value={
                                  this.state.objBelong.branch_store_code !== 0
                                    ? this.state.objBelong.branch_store_code
                                    : null
                                }
                                onChange={(value) =>
                                  this.handleChange(
                                    this.state.objBelong,
                                    Regex(value, /[1-9]/) ? value : null,
                                    "branch_store_code",
                                    "personal_belongs"
                                  )
                                }
                                onDoubleClick={() =>
                                  this.callbackOpenModal("WS0247001")
                                }
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                size="small"
                                icon={<MoreOutlined />}
                                disabled={!this.state.objBelong.office_code}
                                onClick={() =>
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: "80%",
                                      component: (
                                        <WS0341001_OfficeInfoMaintain
                                          Li_ExecModeDef_Sdi={""}
                                          Lio_OfficeCode={
                                            this.state.objBelong.office_code
                                          }
                                          Lio_BranchStoreCode={
                                            this.state.objBelong
                                              .branch_store_code
                                          }
                                        />
                                      ),
                                    },
                                  })
                                }
                              />
                            </Form.Item>
                          </Space>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item>
                          <Input
                            value={infoBasicPage?.office_kanji_name}
                            readOnly
                            bordered={false}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item label="保険者" {...smGrid}>
                          <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            maxLength={8}
                            readOnly={!personal.personal_number_id}
                            value={this.state.objBelong.insurer_number}
                            onChange={(value) =>
                              this.handleChange(
                                this.state.objBelong,
                                value,
                                "insurer_number",
                                "personal_belongs"
                              )
                            }
                            onDoubleClick={() =>
                              this.callbackOpenModal("WS1290001")
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item>
                          <Input
                            value={infoBasicPage?.insurer_kanji_name}
                            readOnly
                            bordered={false}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item label="保険証" {...smGrid}>
                          <Space>
                            <Form.Item>
                              <Input
                                readOnly={!personal.personal_number_id}
                                value={this.state.objBelong.insurer_card_symbol}
                                onChange={(e) =>
                                  this.handleChange(
                                    this.state.objBelong,
                                    e.target.value,
                                    "insurer_card_symbol",
                                    "personal_belongs"
                                  )
                                }
                              />
                            </Form.Item>
                            <Form.Item>
                              <span>/</span>
                            </Form.Item>
                            <Form.Item>
                              <Input
                                readOnly={!personal.personal_number_id}
                                value={this.state.objBelong.insurer_card_number}
                                onChange={(e) =>
                                  this.handleChange(
                                    this.state.objBelong,
                                    e.target.value,
                                    "insurer_card_number",
                                    "personal_belongs"
                                  )
                                }
                              />
                            </Form.Item>
                          </Space>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item label="続　柄" style={{ marginBottom: "6px" }}>
                      <Select
                        style={{ width: "100px" }}
                        disabled={!personal.personal_number_id}
                        value={this.state.objBelong.relationship}
                        onChange={(value) =>
                          this.handleChange(
                            this.state.objBelong,
                            value,
                            "relationship",
                            "personal_belongs"
                          )
                        }
                      >
                        <Select.Option value="0">本人</Select.Option>
                        <Select.Option value="1">配偶者</Select.Option>
                        <Select.Option value="2">家族</Select.Option>
                      </Select>
                    </Form.Item>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="所　属" {...smGrid}>
                          <Space>
                            <Form.Item>
                              <InputNumber
                                maxLength={8}
                                style={{ width: "100px" }}
                                min={0}
                                readOnly={!personal.personal_number_id}
                                value={this.state.objBelong.W2_affiliation}
                                onChange={(value) =>
                                  this.handleChange(
                                    this.state.objBelong,
                                    value,
                                    "W2_affiliation",
                                    "personal_belongs"
                                  )
                                }
                              />
                            </Form.Item>
                            <Form.Item>
                              <div>{infoBasicPage.short_name || ""}</div>
                            </Form.Item>
                          </Space>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item style={{ float: "right" }}>
                          <Space>
                            <Button
                              type="primary"
                              disabled={
                                personal.personal_number_id ? false : true
                              }
                              onClick={() =>
                                this.handleButton("add", "personal_belongs", {})
                              }
                            >
                              追加
                            </Button>
                            <Button
                              type="primary"
                              onClick={() =>
                                this.deleteDataPersonalBelong(
                                  this.state.objBelong
                                )
                              }
                              disabled={
                                personal?.personal_belongs?.length > 1
                                  ? false
                                  : true
                              }
                            >
                              削除
                            </Button>
                          </Space>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col lg={24} xl={12} span={12}>
                  {/* 4 tabs */}
                  <div style={styleBorder}>
                    <Tabs defaultActiveKey="1">
                      <Tabs.TabPane
                        tab="特記"
                        key="1"
                        className="scrollbar"
                        style={styleTab}
                      >
                        <SpecialInfo
                          ref={this.formRef.current}
                          personal={personal}
                          handleChangeValue={this.handleChangeValue}
                          deleteDataSpecials={this.deleteDataSpecials}
                        />
                      </Tabs.TabPane>
                      <Tabs.TabPane
                        tab="補足"
                        key="2"
                        className="scrollbar"
                        style={styleTab}
                      >
                        <SupplementtaryInfo
                          ref={this.formRef.current}
                          personal={personal}
                          handleChangeValue={this.handleChangeValue}
                        />
                      </Tabs.TabPane>
                      <Tabs.TabPane
                        tab="送付先"
                        key="3"
                        className="scrollbar"
                        style={styleTab}
                      >
                        <DestinationInfo
                          ref={this.formRef.current}
                          personal={personal}
                          handleChangeValue={this.handleChangeValue}
                        />
                      </Tabs.TabPane>
                      <Tabs.TabPane
                        tab="コード"
                        key="4"
                        className="scrollbar"
                        style={styleTab}
                      >
                        <CodeInfo
                          ref={this.formRef.current}
                          personal={personal}
                          handleChangeValue={this.handleChangeValue}
                        />
                      </Tabs.TabPane>
                    </Tabs>
                  </div>
                </Col>
              </Row>

              <Row gutter={10}>
                <Col lg={24} xl={12} span={12}>
                  {/* StreetAddress */}
                  <div style={styleBorder}>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          {...smGrid}
                          label={
                            <Space>
                              <Button
                                type="primary"
                                size="small"
                                disabled={
                                  personal?.personal_addresses?.length > 0
                                    ? false
                                    : true
                                }
                                hidden={
                                  this.state.objAddress.address_category === 1
                                }
                                onClick={() => {
                                  Modal.confirm({
                                    title: "この住所を既定としますか？",
                                    cancelText: "いいえ",
                                    okText: "はい",
                                    onOk: () => {
                                      let personal_number_id = parseInt(
                                        personal.personal_number_id
                                      );
                                      const params = {
                                        personal_number_id: personal_number_id,
                                        address_category: parseInt(
                                          this.state.objAddress.address_category
                                        ),
                                      };
                                      setAddressToDefaultAction(params)
                                        .then((res) => {
                                          this.searchPersonalNumberID(
                                            personal_number_id
                                          );
                                        })
                                        .catch(() => message.error("エラー"));
                                    },
                                  });
                                }}
                              >
                                既定
                              </Button>
                              <div>〒</div>
                            </Space>
                          }
                        >
                          {/* <Input
                            value={this.state.objAddress.postal_code}
                            readOnly={!personal.personal_number_id}
                            onDoubleClick={() => this.callbackOpenModal('WS0084001')}
                            onBlur={(e) => this.getNameZipCode(e.target.value)}
                            // onKeyUp={(e) => this.getNameZipCode(e.target.value)}
                            onChange={(e) => this.handleChange(this.state.objAddress, e.target.value, 'postal_code', 'personal_addresses')}
                          /> */}
                          <NumberFormat
                            format="###-####"
                            mask="_"
                            type="text"
                            style={styleNumberFormat}
                            value={this.state.objAddress.postal_code}
                            readOnly={!personal.personal_number_id}
                            onDoubleClick={() =>
                              this.callbackOpenModal("WS0084001")
                            }
                            onBlur={(e) => this.getNameZipCode(e.target.value)}
                            onChange={(e) =>
                              this.handleChange(
                                this.state.objAddress,
                                e.target.value,
                                "postal_code",
                                "personal_addresses"
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item style={{ marginBottom: 0, marginLeft: 10 }}>
                          <Space>
                            <Form.Item>
                              <Button
                                type="primary"
                                icon={<LeftOutlined />}
                                disabled={!personal.personal_number_id}
                                onClick={() =>
                                  this.handleButton(
                                    "prev",
                                    "personal_addresses",
                                    this.state.objAddress
                                  )
                                }
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                type="primary"
                                icon={<RightOutlined />}
                                disabled={!personal.personal_number_id}
                                onClick={() =>
                                  this.handleButton(
                                    "next",
                                    "personal_addresses",
                                    this.state.objAddress
                                  )
                                }
                              />
                            </Form.Item>
                            <Form.Item>
                              {personal?.personal_belongs?.length > 0 ? (
                                <Button
                                  type="primary"
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    this.handleButton(
                                      "add",
                                      "personal_addresses",
                                      {}
                                    )
                                  }
                                />
                              ) : (
                                <span></span>
                              )}
                            </Form.Item>
                            <Form.Item
                              hidden={
                                infoBasicPage.Expression_18 === 0 ||
                                infoBasicPage.Expression_18 === "" ||
                                infoBasicPage.Expression_18 === undefined
                              }
                            >
                              <span>{`住所${
                                infoBasicPage.Expression_18 + 1
                              }`}</span>
                            </Form.Item>
                          </Space>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Space style={{ float: "right" }}>
                          <span>
                            {personal?.personal_addresses
                              ? personal?.personal_addresses?.length + "件"
                              : ""}
                          </span>
                        </Space>
                      </Col>
                    </Row>
                    <Form.Item label="住所">
                      <Input
                        value={this.state.objAddress.address_1}
                        readOnly={!personal.personal_number_id}
                        onDoubleClick={() =>
                          this.callbackOpenModal("WS0084001")
                        }
                        onChange={(e) =>
                          this.handleChange(
                            this.state.objAddress,
                            e.target.value,
                            "address_1",
                            "personal_addresses"
                          )
                        }
                      />
                    </Form.Item>
                    <Form.Item label=" ">
                      <Input
                        readOnly={!personal.personal_number_id}
                        value={this.state.objAddress.address_2}
                        onChange={(e) =>
                          this.handleChange(
                            this.state.objAddress,
                            e.target.value,
                            "address_2",
                            "personal_addresses"
                          )
                        }
                      />
                    </Form.Item>
                    <Form.Item label="宛名">
                      <Input
                        readOnly={!personal.personal_number_id}
                        value={this.state.objAddress.address}
                        onChange={(e) =>
                          this.handleChange(
                            this.state.objAddress,
                            e.target.value,
                            "address",
                            "personal_addresses"
                          )
                        }
                      />
                    </Form.Item>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="自宅電話" {...smGrid}>
                          {/* <Input readOnly={!personal.personal_number_id}
                            value={this.state.objAddress.phone_number}
                            onChange={(e) => this.handleChange(this.state.objAddress,
                              e.target.value, 'phone_number', 'personal_addresses')}
                          /> */}
                          <NumberFormat
                            format="###-###-####"
                            mask="_"
                            type="text"
                            style={styleNumberFormat}
                            readOnly={!personal.personal_number_id}
                            value={this.state.objAddress.phone_number}
                            onChange={(e) =>
                              this.handleChange(
                                this.state.objAddress,
                                e.target.value,
                                "phone_number",
                                "personal_addresses"
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="PCメール" {...smGrid}>
                          <Input
                            type="email"
                            ref={this.ref_input_email}
                            readOnly={!personal.personal_number_id}
                            value={this.state.objAddress.email}
                            onBlur={(e) =>
                              this.ValidateEmail(
                                e.target.value,
                                "ref_input_email"
                              )
                            }
                            onChange={(e) =>
                              this.handleChange(
                                this.state.objAddress,
                                e.target.value,
                                "email",
                                "personal_addresses"
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="携帯電話" {...smGrid}>
                          {/* <Input readOnly={!personal.personal_number_id}
                            value={this.state.objAddress.cell_phone_number}
                            onChange={(e) => this.handleChange(this.state.objAddress,
                              e.target.value, 'cell_phone_number', 'personal_addresses')}
                          /> */}
                          <NumberFormat
                            format="###-###-####"
                            mask="_"
                            type="text"
                            style={styleNumberFormat}
                            readOnly={!personal.personal_number_id}
                            value={this.state.objAddress.cell_phone_number}
                            onChange={(e) =>
                              this.handleChange(
                                this.state.objAddress,
                                e.target.value,
                                "cell_phone_number",
                                "personal_addresses"
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="携帯メール" {...smGrid}>
                          <Input
                            type="email"
                            ref={this.ref_input_mobile_mail}
                            readOnly={!personal.personal_number_id}
                            value={this.state.objAddress.mobile_mail}
                            onBlur={(e) =>
                              this.ValidateEmail(
                                e.target.value,
                                "ref_input_mobile_mail"
                              )
                            }
                            onChange={(e) =>
                              this.handleChange(
                                this.state.objAddress,
                                e.target.value,
                                "mobile_mail",
                                "personal_addresses"
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg={24} xl={12} span={12}>
                  <div
                    style={{
                      height: this.state.personal.id ? "" : "195px",
                      border: this.state.personal.id ? "" : "1px solid #F0F0F0",
                    }}
                  >
                    <WS2586020_ConsultHistorySub
                      Li_PersonalNum={this.state.personal?.personal_number_id}
                      pageSize={7}
                    />
                  </div>
                </Col>
              </Row>

              {/* Footer */}
              <Form.Item
                className="mt-3"
                style={{ ...styleFormItem, float: "right" }}
              >
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.eventF11();
                    }}
                  >
                    削除
                  </Button>
                  <Button
                    type="primary"
                    onClick={() =>
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "90%",
                          className: "custom-button-close",
                          component: (
                            <WS2537001_PersonalReserveProcess
                              Li_Child={true}
                              onFinishScreen={() => {
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      })
                    }
                  >
                    予約
                  </Button>
                  <Button type="primary" htmlType="submit">
                    登録
                  </Button>
                </Space>
              </Form.Item>
            </Card>
          </Form>
        </Spin>
        <ModalDraggable
          className={this.state.childModal.className}
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
)(WS0343001_PersonalInfoMaintain);
