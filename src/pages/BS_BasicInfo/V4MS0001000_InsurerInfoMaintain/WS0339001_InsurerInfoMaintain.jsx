import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { debounce } from 'lodash';
import ModalDraggable from "components/Commons/ModalDraggable";

import {
  Row, Col, Input, Form, Spin, Card, Table,
  Select, Tabs, Button, Modal, message, InputNumber, Space, Popconfirm, Tag
} from "antd";
import {
  LoadingOutlined, PlusOutlined, WarningOutlined, MoreOutlined,
  InfoCircleOutlined, CloseCircleOutlined, DeleteOutlined,
} from '@ant-design/icons';

import WS0246001_InsurerInfoSearchQuery from "./WS0246001_InsurerInfoSearchQuery.jsx";
import WS0084001_PostCodeSearchEngine from './WS0084001_PostCodeSearchEngine.jsx';
import WS0308017_OrganizationCreateNew from 'pages/BS_BasicInfo/V4KB0201000_ContractInfoMaintain/WS0308017_OrganizationCreateNew.jsx';
import WS0307008_ContractHistorySub from "pages/BS_BasicInfo/V4KB0201000_ContractInfoMaintain/WS0307008_ContractHistorySub.jsx";
import { history } from "constants/BrowserHistory";

import axios from "configs/axios";
import moment from "moment";
import WS0344001_SupplementalInfoSetting from "./WS0344001_SupplementalInfoSetting.jsx";
import Color from "constants/Color.js";
import { Fragment } from "react";
import Menubar from "components/Commons/Menubar.js";
import WS1512001_OptionalInfoMaintain from "pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS1512001_OptionalInfoMaintain.jsx";
import WSFileManager_FileManager from "pages/ZZ_Others/CUSTOMIZE_Custom/WSFileManager_FileManager.jsx";
import MagicXpaFunc from "helpers/MagicXpaFunc.js";
import { getNameZipCodeAction } from "redux/basicInfo/InsurerInfoMaintain/InsurerInfoMaintain.actions.js";
import * as wanakana from 'wanakana';

const grid = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const smGrid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class WS0339001_InsurerInfoMaintain extends React.Component {
  static propTypes = {
    Li_InsurerCode: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "保険者情報保守";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      modifyEnabled: true,
      isLoadingInsurerInfo: false,
      isLoadingScreenData: false,
      isLoadingContractInfo: false,

      InsurerCode: null,
      InsurerCodeBefore: null,

      // Startup Data
      screenData: {},

      insurerData: {},

      FilestatusInsurerInfo: false,
      FilestatusEdit: false,
      KeyEditting: false,
      menuItems: [
        { id: 1, label: 'フォルダ', handleClick: this.eventF7 },
        // { id: 2, label: '削除', handleClick: this.eventF11 },
        // { id: 3, label: '登録', handleClick: this.eventF12 },
      ],
      menus: [{ id: 1, label: '補足設定', handleClick: this.VariousSetting01 }]
    };

    this.onValuesChange = debounce(this.onValuesChange.bind(this), 300);

    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
    this.onBlurInsurerCode = debounce(this.onBlurInsurerCode.bind(this), 200);
    this.controlVerificationInsurerCode = this.controlVerificationInsurerCode.bind(this);
    this.loadScreenData = this.loadScreenData.bind(this);
    this.InitialDisplay = this.InitialDisplay.bind(this);
    this.postDataRegister = this.postDataRegister.bind(this);
    this.loadContractInfo = this.reloadContractInfo.bind(this);
  }

  componentDidMount() {
    this.loadScreenData();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.setState({
        InsurerCode: this.props.Li_InsurerCode || this.props.InsurerCode,
      }, () => {
        this.formRef.current.setFieldsValue({
          insurer_code: this.props.Li_InsurerCode
        });
        this.loadInsurerInfo(this.state.InsurerCode);
      });
    }
  }

  componentWillUnmount = () => {
    this.unblock();
  };

  unblock = history.block((targetLocation) => {
    if (this.state.FilestatusEdit) {
      this.onFinish(this.formRef.current.getFieldsValue(), () => {
        this.setState({
          FilestatusEdit: false,
        }, () => {
          history.push(targetLocation.pathname);
        });
      });
      return false;
    } else {
      return true;
    }
  });

  loadScreenData() {
    this.setState({
      isLoadingScreenData: true,
    })
    axios.get('/api/insurer-info-maintain/insurer-info-maintain/getScreenData')
      .then(res => {
        this.setState({
          screenData: res.data,
          isLoadingScreenData: false,
        });

        if (this.props.Li_InsurerCode) {
          this.setState({
            InsurerCode: this.props.Li_InsurerCode,
          }, () => {
            this.formRef.current.setFieldsValue({
              insurer_code: this.props.Li_InsurerCode
            });
            this.loadInsurerInfo(this.props.Li_InsurerCode);
          });
        }
      })
      .catch(() => {
        // setTimeout(() => {
        //   this.loadScreenData();
        // }, 5000);
        message.error('画面情報の取得にはエラーが発生しました');
      });
  }

  InitialDisplay() {
    const formInstance = this.formRef.current;
    const InsurerCode = formInstance.getFieldValue('insurer_code');

    formInstance.resetFields();
    formInstance.setFieldsValue({
      insurer_code: InsurerCode,
      insurer_number: InsurerCode,

      insurer_specials: [{}],
    });

    this.setState({
      modifyEnabled: true,
      isLoadingInsurerInfo: false,
      insurerData: {},
      InsurerCodeBefore: InsurerCode,
      FilestatusEdit: false,
      FilestatusInsurerInfo: false,
    });
  }

  loadInsurerInfo(id) {
    this.setState({
      isLoadingInsurerInfo: true,
      modifyEnabled: false,
    });
    axios.get('/api/insurer-info-maintain/insurer-info-maintain', {
      params: {
        insurer_code: id,
      }
    })
      .then((res) => {
        const resData = res?.data;
        if (!resData || !resData.insurer_code) {
          this.InitialDisplay();
          return;
        }

        // Reset sort
        resData.insurer_supplements = this.state.screenData.SupplementaryInfo.map((value, index) => {
          const attribute_code = parseInt(value.item_id.substr(6, 4));
          const mustBeHereItem = resData.insurer_supplements.find(
            (elm) => elm.attribute_code === attribute_code
          ) || { attribute_code: attribute_code };

          return mustBeHereItem;
        });

        resData.insurer_specials.push({});

        resData.insurer_number = resData?.insurer_number === 0 ? null : resData.insurer_number

        const formInstance = this.formRef.current;
        formInstance.setFieldsValue(resData);

        this.setState({
          insurerData: resData,
          isLoadingInsurerInfo: false,
          modifyEnabled: true,

          InsurerCodeBefore: resData.insurer_code,
          FilestatusInsurerInfo: true,
          FilestatusEdit: false,
          KeyEditting: false,
        });
      })
      .catch(error => {
        console.log(error);
        message.error('エラーが発生しました');
      });
  }

  reloadContractInfo() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },

      isLoadingContractInfo: true,
    }, () => {
      axios.get('/api/insurer-info-maintain/insurer-info-maintain/getContractInfo', {
        params: {
          insurer_code: this.state.insurerData.insurer_code
        }
      })
        .then(res => {
          this.setState({
            insurerData: {
              ...this.state.insurerData,
              StsContract: res.data && (res.data.length > 0),
            }
          });
        })
        .catch(error => {
          const res = error.response;
          if (!res || !res.data || !res.data.message) {
            message.error('エラーが発生しました');
            return;
          }

          message.error(res.data.message);
        })
        .finally(() => {
          this.setState({
            isLoadingContractInfo: false,
          });
        });
    });
  }

  onValuesChange(changedValues, allValues) {
    // Fix lag
    if (!this.state.FilestatusEdit) {
      if (!changedValues.insurer_code && (changedValues.insurer_code !== 0)) {
        this.setState({
          FilestatusEdit: true,
        });
      }
    }
  }

  onFinish(values, callback) {
    console.log(values);
    if (this.state.FilestatusEdit) {
      Modal.confirm({
        content: this.state.FilestatusInsurerInfo ? '上書き登録します。よろしいですか？' : '新規登録します。よろしいですか？',
        onOk: () => {
          let postData = values;
          setTimeout(() => {
            this.props.onFinishScreen({
              recordData: values,
            });
          }, 2000);
          return this.postDataRegister(postData, callback);

        },
        onCancel: () => {
          if (callback) callback();
        },
      });
    } else {
      message.warning('変更がありません');
    }
  }

  async postDataRegister(postData, callback) {
    try {
      const res = await axios.post('/api/insurer-info-maintain/insurer-info-maintain/DataRegister_F12', postData);
      const resData = res.data;
      if (!resData) {
        message.error('エラーが発生しました');
        return;
      }

      this.loadInsurerInfo(this.state.InsurerCode);

      message.success(resData.message);

      if (callback) {
        callback();
      }
    } catch (error) {
      this.setState({
        isLoadingInsurerInfo: false,
      });

      const res_1 = error.response;
      if (!res_1 || !res_1.data || !res_1.data.message) {
        message.error('エラーが発生しました');
        return;
      }

      message.error(res_1.data.message);
    }
  }

  onFinishFailed({ values, errorFields, outOfDate }) {
    // UX: back to error field
    for (let i in errorFields) {
      const itm = errorFields[i];
      this.formRef.current.getFieldInstance(itm.name).focus();
      break;
    }
  }

  onBlurInsurerCode(event) {
    // Check onChange insurer_code
    const newInsurerCode = parseInt(event.target.value);
    if (newInsurerCode !== this.state.InsurerCode) {
      this.setState({
        KeyEditting: true,
        InsurerCode: newInsurerCode,
      }, () => {
        if (!this.state.childModal.visible && !this.state.isLoadingScreenData) {
          this.controlVerificationInsurerCode();
        }
      });
    }
  }

  controlVerificationInsurerCode() {
    if (this.state.KeyEditting) {
      if (!this.state.InsurerCode) {
        this.setState({
          modifyEnabled: true,
          FilestatusEdit: false,
          InsurerCode: this.state.InsurerCode === 0 ? null : this.state.InsurerCode,
        });
        // const insurerCodeInstance = this.formRef.current.getFieldInstance('insurer_code');
        // insurerCodeInstance.focus();
        return message.error('保険者ｺｰﾄﾞを入力してください');
      }

      if (this.state.FilestatusEdit) {
        Modal.confirm({
          content: '変更があります。登録しますか？',
          onOk: () => {
            const postData = this.formRef.current.getFieldsValue();
            postData.insurer_code = this.state.InsurerCodeBefore;

            return this.postDataRegister(postData)
              .then(() => {
                this.loadInsurerInfo(this.state.InsurerCode);
              });
          },
          onCancel: () => {
            this.loadInsurerInfo(this.state.InsurerCode);
          },
        });
      } else {
        this.loadInsurerInfo(this.state.InsurerCode);
      }
    }
  }

  OptionsDisplay = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS1512001_OptionalInfoMaintain
            Li_TypeCode={'ﾏｽﾀ関連'}
            Li_optioCode={'V4MS000100'}
            Li_Expansion={2}
          />
        ),
      },
    });
  }

  VariousSetting01 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 800,
        component: (
          <WS0344001_SupplementalInfoSetting
            Li_IdentifyChar="MAST3"
            onFinishScreen={() => {
              this.loadScreenData();
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
  }

  eventF7 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 700,
        component: (
          <WSFileManager_FileManager
            Params_2612={{
              Li_Division: '保険者',
              Li_Identify: MagicXpaFunc.Str(MagicXpaFunc.Val((this.formRef?.current?.getFieldValue('insurer_code') || 0), ''), '10P0'),
            }}
          />
        ),
      },
    });
  }

  getNameZipCode = (params) => {
    let location1Temp = this.formRef?.current?.getFieldValue('location_1')
    if (!location1Temp)
      getNameZipCodeAction({ ZipCode: params })
        .then(res => {
          if (res?.data) {
            let Location1 = res.data?.Location1 || '';

            let FilestatusEdit = this.state.FilestatusEdit;
            if (!location1Temp) {
              this.formRef?.current?.setFieldsValue({ location_1: Location1 });
              FilestatusEdit = true;
            }
            this.setState({ FilestatusEdit });
          }
        })
        .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  render() {
    return (
      <div className="insurer-info-maintenance">
        <Card className="mb-3" size="small">
          <Menubar
            items={this.state.menuItems}
            menus={this.state.menus}
            OptionsDisplay={this.OptionsDisplay}
          />
        </Card>

        <Spin spinning={this.state.isLoadingScreenData}>
          <Form {...grid} ref={this.formRef} onFinish={this.onFinish} onValuesChange={this.onValuesChange} onFinishFailed={this.onFinishFailed}>
            <Card className="mb-3" size="small">
              <Row>
                <Col span={12} className="d-flex align-items-center">
                  <Form.Item name="insurer_code">
                    <Input.Search min={0} autoFocus={true}
                      size="small"
                      allowClear
                      onBlur={this.onBlurInsurerCode}
                      onSearch={(value) => {
                        if (value.length) {
                          this.setState({
                            InsurerCode: value,
                          });
                          this.loadInsurerInfo(value);
                          return;
                        }

                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 800,
                            component: (
                              <WS0246001_InsurerInfoSearchQuery
                                onClickedSelect={({ Lo_InsurerCode }) => {
                                  this.formRef.current.setFieldsValue({
                                    insurer_code: Lo_InsurerCode,
                                  });

                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },

                                    InsurerCode: Lo_InsurerCode,
                                  });

                                  this.loadInsurerInfo(Lo_InsurerCode);
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className="text-end">
                  <div>登録日&ensp; {this.state.insurerData.registration_date_on && moment(this.state.insurerData.registration_date_on).isValid() ? moment(this.state.insurerData.registration_date_on).format("YYYY/MM/DD") : <span style={{ opacity: '0' }}>0000/00/00</span>}</div>
                  <div>変更日&ensp; {this.state.insurerData.updated_on && moment(this.state.insurerData.updated_on).isValid() ? moment(this.state.insurerData.updated_on).format("YYYY/MM/DD") : <span style={{ opacity: '0' }}>0000/00/00</span>}</div>
                </Col>
              </Row>
            </Card>

            <Spin spinning={!this.state.modifyEnabled} indicator={this.state.isLoadingInsurerInfo ? <LoadingOutlined /> : null}>
              <Row gutter={16}>
                <Col lg={24} xl={12}>
                  <Card className="mb-3">
                    <Form.Item label="保険者番号" name="insurer_number">
                      <InputNumber style={{ width: "120px" }} size="small" />
                    </Form.Item>
                    <Form.Item label="カナ名称" name="insurer_kana_name">
                      <Input />
                    </Form.Item>
                    <Form.Item label="漢字名称" name="insurer_kanji_name" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Row>
                      <Col span={12}>
                        <Form.Item name="representative" label="代表者" {...smGrid}>
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="office_personnel" label="先方担当" {...smGrid}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item name="sales_representative" label="担当営業" {...smGrid}>
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="status_division" label="状況区分" className="pdLeft-10" {...smGrid}>
                          <Select allowClear>
                            {this.state.screenData.SituationClassify ?
                              this.state.screenData.SituationClassify.map((item, index) => {
                                return (
                                  <Select.Option key={`sts-div-${index}`} value={item.node_code_name}>
                                    {item.name}
                                  </Select.Option>
                                );
                              }) : null}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>

                  <Card className="mb-3">
                    <Row>
                      <Col span={12}>
                        <Form.Item label="〒" name="postal_code" {...smGrid}>
                          <Input.Search
                            style={{ width: '120px' }}
                            maxLength={8}
                            onBlur={(e) => this.getNameZipCode(e.target.value)}
                            // onKeyUp={(e) => this.getNameZipCode(e.target.value)}
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
                                        let FilestatusEdit = this.state.FilestatusEdit;
                                        const zipcode = ZipCode ? ZipCode.trim() : '';
                                        if (zipcode !== '') {
                                          const formInstance = this.formRef.current;
                                          formInstance.setFieldsValue({ postal_code: zipcode });
                                          const address = Address ? Address.trim() : '';
                                          if (address !== '') {
                                            formInstance.setFieldsValue({ location_1: address });
                                          }

                                          FilestatusEdit = true;
                                        }

                                        this.setState({
                                          childModal: {
                                            ...this.state.childModal,
                                            visible: false,
                                          },

                                          FilestatusEdit: FilestatusEdit,
                                        });
                                      }}
                                    />
                                  ),
                                },
                              });
                            }} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="area_code" label="地区" {...smGrid}>
                          <Select allowClear>
                            {this.state.screenData.AreaCode ?
                              this.state.screenData.AreaCode.map((item, index) => {
                                return (
                                  <Select.Option key={`areacode-${index}`} value={item.area_code}>
                                    {item.district_name}
                                  </Select.Option>
                                );
                              }) : null}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item label="住所" name="location_1">
                      <Input />
                    </Form.Item>

                    <Form.Item label=" " name="location_2">
                      <Input />
                    </Form.Item>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="電話" {...smGrid} name="phone_number">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="fax" label="FAX" {...smGrid}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="産業分類" name="industrial_classification">
                      <Select allowClear>
                        {this.state.screenData.IndustrialClassify ?
                          this.state.screenData.IndustrialClassify.map((item, index) => {
                            return (
                              <Select.Option key={`ind-clss-${index}`} value={item.node_code_name}>
                                {item.name}
                              </Select.Option>
                            );
                          }) : null}
                      </Select>
                    </Form.Item>
                    <Form.Item label="産業医" name="industrial_physician">
                      <Input />
                    </Form.Item>
                  </Card>

                  <Card className="mb-3">
                    <Tabs type="card" size="small">
                      <Tabs.TabPane tab="記録" key="RecordedInfo">
                        <Table
                          dataSource={this.formRef.current ? this.formRef.current.getFieldValue('insurer_specials') : []}
                          pagination={false}
                          rowKey={(record) => ('record-' + (record.id || Math.random()) + '-' + (record.insurer_number || Math.random()))}
                          size="small"
                          scroll={{ y: 150 }}
                        >
                          <Table.Column title="重要度" dataIndex="importance" render={(text, record, index) => {
                            return (<>
                              <Form.Item name={['insurer_specials', index, 'id']} hidden={true}>
                                <Input value={record.id || null} />
                              </Form.Item>
                              <Form.Item name={['insurer_specials', index, 'importance']} required={true}>
                                <Select
                                  onChange={() => {
                                    this.forceUpdate();
                                  }}
                                >
                                  <Select.Option value={1}>情報</Select.Option>
                                  <Select.Option value={3}>警告</Select.Option>
                                  <Select.Option value={5}>重要</Select.Option>
                                </Select>
                              </Form.Item>
                            </>);
                          }} />
                          <Table.Column dataIndex="importance" key="icon" width="5%" render={(text) => {
                            let icon = null;
                            switch (text) {
                              case 1:
                                icon = (<InfoCircleOutlined style={{ color: '#1890ff' }} />)
                                break;
                              case 3:
                                icon = (<WarningOutlined style={{ color: '#faad14' }} />)
                                break;
                              case 5:
                                icon = (<CloseCircleOutlined style={{ color: '#ff4d4f' }} />)
                                break;
                              default:
                                icon = <MoreOutlined />;
                            };

                            return (<Form.Item style={{ fontSize: 16 }}>{icon}</Form.Item>)
                          }} />
                          <Table.Column title="内容" dataIndex="content" width="50%" render={(text, record, index) => {
                            return (<Form.Item name={['insurer_specials', index, 'content']}>
                              <Input
                                onBlur={(event) => {
                                  const formInstance = this.formRef.current;
                                  const impNamePath = ['insurer_specials', index, 'importance'];
                                  if ((event.target.value.length > 0) && !formInstance.getFieldValue(impNamePath)) {
                                    formInstance.setFields([
                                      {
                                        name: impNamePath,
                                        value: 1,
                                      },
                                    ]);
                                    this.forceUpdate();
                                  }
                                }}
                              />
                            </Form.Item>);
                          }} />
                          <Table.Column title="記録者" dataIndex="recorder" />
                          <Table.Column
                            align="center"
                            title={() => (
                              <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                                const formIns = this.formRef.current;
                                const insurer_specials_form = formIns.getFieldValue('insurer_specials');

                                console.log(insurer_specials_form);

                                // Check if last record was filled -> can be add new row
                                let willBeAdd = !insurer_specials_form || !insurer_specials_form.length ||
                                  !insurer_specials_form.find((itm, index) => {
                                    if (!itm.content && !itm.importance) {
                                      return true;
                                    }

                                    return false;
                                  });

                                if (willBeAdd) {
                                  formIns.setFieldsValue({
                                    insurer_specials: [
                                      ...insurer_specials_form,
                                      {}
                                    ],
                                  });
                                  this.forceUpdate();
                                }
                              }} />
                            )}
                            key="action"
                            render={(text, record, index) => (
                              <Popconfirm title="削除処理を実行しますか？"
                                onConfirm={() => {
                                  const formInstance = this.formRef.current;
                                  const newLst = Object.assign([], formInstance.getFieldValue('insurer_specials'));
                                  newLst.splice(index, 1);
                                  formInstance.setFieldsValue({
                                    insurer_specials: newLst
                                  });
                                  this.setState({
                                    FilestatusEdit: true,
                                  });
                                }}
                              >
                                <Button
                                  size="small"
                                  style={{ border: "none" }}
                                  danger
                                  icon={<DeleteOutlined />}
                                ></Button>
                              </Popconfirm>
                            )}
                          />
                        </Table>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="事務所" key="OfficeInfo">
                        <Table
                          dataSource={this.state.insurerData.offices} pagination={false} rowKey={(record) => record.office_code}
                          size="small"
                          scroll={{ y: 150 }}
                        >
                          <Table.Column width={100} align="right" title={<div style={{ textAlign: "center" }}>事業所</div>} dataIndex="office_code"
                            render={(text, record, index) => {
                              return text === "0" || text === 0 ? "" : text
                            }} />
                          <Table.Column width={70} align="right" title={<div style={{ textAlign: "center" }}>支店</div>} dataIndex="branch_store_code"
                            render={(text, record, index) => {
                              return text === "0" || text === 0 ? "" : text
                            }}
                          />
                          <Table.Column width={70} title="" key="viewInfo" />
                          <Table.Column title="名称" dataIndex="office_kanji_name" />
                        </Table>
                      </Tabs.TabPane>
                    </Tabs>
                  </Card>
                </Col>

                <Col lg={24} xl={12}>
                  <Card className="mb-3" style={{ height: "calc(100% - 0.5rem)" }}>
                    <Form.List name="insurer_supplements" children={(fields) => {
                      if (!this.state.screenData.SupplementaryInfo) {
                        return null;
                      }
                      return this.state.screenData.SupplementaryInfo.map((value, index) => {
                        return (<Fragment key={index}>
                          <Form.Item name={[index, "attribute_code"]} hidden={true}>
                            <Input />
                          </Form.Item>
                          <Row gutter={5}>
                            <Col span={6}>
                              <Tag color={Color(156).Background} style={{ width: '100%', height: 'calc(100% - 0.3rem)' }}>{value.item}</Tag>
                            </Col>
                            <Col span={18}>
                              {value.StsDirectInput === 0
                                ? (
                                  <Form.Item name={[index, "content"]} labelCol={{ span: 5 }}>
                                    <Input onBlur={(event) => {
                                      let namePath = [
                                        "insurer_supplements",
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
                                    }}/>
                                  </Form.Item>
                                )
                                : (
                                  <Form.Item name={[index, "content"]} labelCol={{ span: 5 }}>
                                    <Select>
                                      {value?.Content.map((item) => (
                                        <Select.Option
                                          key={item.LinkedField + value.DisplayField}
                                          value={item.LinkedField}
                                        >
                                          {item.DisplayField}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                )
                              }
                            </Col>
                          </Row>
                        </Fragment>);
                      });
                    }} />
                  </Card>
                </Col>

                <Col span={24} className="text-end">
                  <Card>
                    <Space>
                      <Button type="primary" icon={<DeleteOutlined />}
                        disabled={
                          !this.state.FilestatusInsurerInfo ||
                          (this.state.FilestatusInsurerInfo && (this.state.insurerData.offices && (this.state.insurerData.offices.length > 0)))
                        }
                        onClick={() => {
                          Modal.confirm({
                            content: '保険者の情報がすべて削除されます。削除しますか？',
                            onOk: () => {
                              return axios.post('/api/insurer-info-maintain/insurer-info-maintain/Delete_F11', {
                                insurer_code: this.state.insurerData.insurer_code
                              })
                                .then(res => {
                                  const formInstance = this.formRef.current;
                                  formInstance.resetFields();

                                  this.setState({
                                    FilestatusEdit: false,

                                    insurerData: {},
                                    modifyEnabled: true,
                                  });
                                })
                                .catch(error => {
                                  const res = error.response;
                                  if (!res || !res.data || !res.data.message) {
                                    message.error('エラーが発生しました');
                                    return;
                                  }

                                  message.error(res.data.message);
                                });
                            },
                          });
                        }}
                      >削除</Button>
                      <Button type="primary" disabled={!this.state.FilestatusInsurerInfo} loading={this.state.isLoadingContractInfo} onClick={() => {
                        this.setState({
                          childModal: this.state.insurerData.StsContract ? {
                            ...this.state.childModal,
                            visible: true,
                            width: 1200,
                            component: (<WS0307008_ContractHistorySub
                              Li_ContractType={1}
                              Li_ContractOrgCode={this.state.insurerData.insurer_code}
                              Li_ContractOrgName={this.state.insurerData.insurer_kanji_name}
                              Li_ContractStartDate={null}
                              onDeleted={(historyDate) => {
                                this.reloadContractInfo();
                              }}
                            />)
                          } : {
                            ...this.state.childModal,
                            visible: true,
                            width: 300,
                            component: (<WS0308017_OrganizationCreateNew
                              Li_ContractType={1}
                              Li_ContractOrgCode={this.state.insurerData.insurer_code}
                              onCreated={() => this.reloadContractInfo()}
                            />)
                          },
                        });
                      }}
                      >{this.state.insurerData.StsContract ? '契約変更' : '契約作成'}</Button>
                      <Button type="primary" htmlType="submit">登録</Button>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </Spin>
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

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0339001_InsurerInfoMaintain);
