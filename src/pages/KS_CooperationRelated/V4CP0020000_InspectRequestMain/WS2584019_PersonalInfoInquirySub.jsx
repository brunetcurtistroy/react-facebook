/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";

import { Row, Col, Input, Form, Table, Tabs, Button, Space, Spin, List, Tag } from "antd";
import { InfoCircleOutlined, WarningOutlined, CloseCircleOutlined } from "@ant-design/icons";

import man from "assets/img/性別-男性.png";
import woman from "assets/img/性別-女性.png";
import ModalDraggable from "components/Commons/ModalDraggable";
import axios from 'configs/axios';
import WS0343001_PersonalInfoMaintain from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0343001_PersonalInfoMaintain";
import WS2537001_PersonalReserveProcess from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess";
import WS2586020_ConsultHistorySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2586020_ConsultHistorySub";
import moment from "moment-timezone";
import Color from "constants/Color.js";
import WSFileManager_FileManager from "pages/ZZ_Others/CUSTOMIZE_Custom/WSFileManager_FileManager";
import MagicXpaFunc from "helpers/MagicXpaFunc";
/**
 * @extends {React.Component<{Li_PersonalNum:any}>}
 */
class WS2584019_PersonalInfoInquirySub extends React.Component {
  static propTypes = {
    Li_PersonalNum: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
  
    super(props);
    

    // document.title = "個人情報照会SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: "",
      },

      isLoading: false,

      personData: {},
    };

    this.loadData = this.loadData.bind(this);
  }
  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        flg: 1,
      });
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props?.Li_PersonalNum !== prevProps?.Li_PersonalNum) {
      this.loadData();
    }
  }

  loadData() {
    this.setState({ isLoading: true });

    axios
      .get("/api/inspect-request-main/personal-info-inquiry-sub", {
        params: {
          Li_PersonalNum: this.props.Li_PersonalNum,
        },
      })
      .then((res) => {
        this.setState({
          personData: res.data,
        });
      })
      .catch((error) => {})
      .finally(() => this.setState({ isLoading: false }));
  }

  onFinish(values) {}

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: "",
      },
    });
  }

  render() {
    return (
      <div className="personal-info-inquiry-sub">
        <Spin spinning={this.state.isLoading}>
          <Row gutter={12}>
            <Col span={12}>
              <div
                className="mb-3"
                style={{ padding: 12, border: "1px solid #5ba3f1" }}
              >
                <Row>
                  <Col span={18}>
                    <Form.Item name="personal_2">
                      <span>{this.state.personData?.kana_name}</span>
                    </Form.Item>
                    <Form.Item name="personal_2">
                      <span>{this.state.personData?.kanji_name}</span>
                    </Form.Item>
                    <Form.Item name="personal_2">
                      <span>
                        {this.state.personData?.birthday_on
                          ? moment(this.state.personData?.birthday_on).format(
                              "NNNNy年/MM月/DD日"
                            )
                          : ""}{" "}
                        {this.state.personData?.birthday_on
                          ? "(" +
                            moment(this.state.personData.birthday_on).format(
                              "YYYY"
                            ) +
                            ")"
                          : ""}
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <img
                      src={
                        this.state.personData?.sex === 1
                          ? man
                          : this.state.personData?.sex === 2
                          ? woman
                          : ""
                      }
                      style={{
                        position: "absolute",
                        bottom: "30px",
                        right: "0",
                      }}
                    />
                  </Col>
                </Row>
                <div style={{ textAlign: "right" }}>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            className: "custom-button-close",
                            component: (
                              <WS2537001_PersonalReserveProcess
                                Li_PersonalNum={this.props.Li_PersonalNum}
                                Li_Child={true}
                                onFinishScreen={() => {
                                  this.closeModal();
                                }}
                              />
                            ),
                            width: "90%",
                          },
                        });
                      }}
                    >
                      予約
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            component: (
                              <WS0343001_PersonalInfoMaintain
                                Li_PersonalNum={this.props.Li_PersonalNum}
                                onFinishScreen={(output) => {
                                  if (output.flg === 1) {
                                    this.loadData();
                                  }
                                }}
                              />
                            ),
                            width: "90vw",
                          },
                        });
                      }}
                    >
                      変更
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            component: (
                              <WSFileManager_FileManager
                                Params_2612={{
                                  Li_Division: "個人",
                                  Li_Identify: MagicXpaFunc.Str(
                                    MagicXpaFunc.Val(
                                      this.props.Li_PersonalNum,
                                      "10"
                                    ),
                                    "10P0"
                                  ),
                                }}
                              />
                            ),
                            width: "500px",
                          },
                        });
                      }}
                    >
                      ﾌｫﾙﾀﾞ
                    </Button>
                  </Space>
                </div>
              </div>

              <div
                className="mb-3"
                style={{ padding: 12, border: "1px solid #5ba3f1" }}
              >
                <List
                  dataSource={this.state.personData?.personal_belongs}
                  itemLayout="vertical"
                  pagination={{
                    pageSize: 1,
                  }}
                  size="small"
                  renderItem={(item) => (
                    <List.Item>
                      <Form.Item label="事業所">
                        <span>{item?.office?.office_kanji_name}</span>
                      </Form.Item>
                      <Form.Item label="保険者">
                        <span>{item?.insurer?.insurer_kanji_name}</span>
                      </Form.Item>
                      <Form.Item label="保険証">
                        <span>{item?.insurer_card_symbol}</span>
                        <span hidden={!item?.insurer_card_number}> / </span>
                        <span>{item?.insurer_card_number}</span>
                      </Form.Item>
                      <Form.Item label="続　柄">
                        <span>{item?.variousname?.name}</span>
                      </Form.Item>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
            <Col span={12}>
              <div
                className="mb-3"
                style={{
                  padding: 12,
                  border: "1px solid #5ba3f1",
                  height: "calc(100% - 0.5rem)",
                }}
              >
                <Form.Item label="　　〒">
                  <Input
                    readOnly
                    value={
                      this.state.personData?.personal_addresses?.postal_code
                    }
                    style={{ border: "0" }}
                  />
                </Form.Item>
                <Form.Item label="住　所">
                  <Input
                    readOnly
                    value={this.state.personData?.personal_addresses?.address_1}
                    style={{ border: "0" }}
                  />
                </Form.Item>
                <Form.Item label="　　　">
                  <Input
                    readOnly
                    value={this.state.personData?.personal_addresses?.address_2}
                    style={{ border: "0" }}
                  />
                </Form.Item>
                <Form.Item label="宛　名">
                  <Input
                    readOnly
                    value={this.state.personData?.personal_addresses?.address}
                    style={{ border: "0" }}
                  />
                </Form.Item>
                <Form.Item label="ＴＥＬ">
                  <Input
                    readOnly
                    value={
                      this.state.personData?.personal_addresses?.phone_number
                    }
                    style={{ border: "0" }}
                  />
                </Form.Item>
                <Form.Item label="　　　">
                  <Input
                    readOnly
                    value={
                      this.state.personData?.personal_addresses
                        ?.cell_phone_number
                    }
                    style={{ border: "0" }}
                  />
                </Form.Item>
                <Form.Item label="メール">
                  <Input
                    readOnly
                    value={this.state.personData?.personal_addresses?.email}
                    style={{ border: "0" }}
                  />
                </Form.Item>
                <Form.Item label="　　　">
                  <Input
                    readOnly
                    value={
                      this.state.personData?.personal_addresses?.mobile_mail
                    }
                    style={{ border: "0" }}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <div
                className="mb-3"
                style={{ padding: 12, border: "1px solid #5ba3f1" }}
              >
                <WS2586020_ConsultHistorySub
                  Li_PersonalNum={this.props.Li_PersonalNum}
                  scrollY={200}
                />
              </div>
            </Col>
            <Col span={12}>
              <div
                className="mb-3"
                style={{ padding: 12, border: "1px solid #5ba3f1" }}
              >
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="特記" key="1">
                    <Table
                      dataSource={this.state.personData?.personal_specials}
                      size="small"
                    >
                      <Table.Column
                        dataIndex="importance"
                        render={(code, record, index) => {
                          let icon = null;
                          switch (code) {
                            case 1:
                              icon = (
                                <InfoCircleOutlined
                                  style={{ color: "#1890ff" }}
                                />
                              );
                              break;
                            case 3:
                              icon = (
                                <WarningOutlined style={{ color: "#faad14" }} />
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
                              icon = (
                                <InfoCircleOutlined
                                  style={{ color: "#1890ff" }}
                                />
                              );
                              // icon = <MoreOutlined />;
                              break;
                          }
                          return (
                            <Form.Item style={{ fontSize: 20 }}>
                              {icon}
                            </Form.Item>
                          );
                        }}
                      />
                      <Table.Column title="特記メモ" dataIndex="content" />
                    </Table>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="補足" key="2" style={{ height: 240, overflowX: 'hidden', overflowY: 'scroll', padding: 5 }}>
                    {this.state.personData?.user_item_settings?.map((value, index) => (
                      <Row className="mb-2" key={`pb-${index}`}>
                        <Col span={8}>
                          <Tag color={Color(156).Background} style={{ display: 'block', height: '100%', padding: '5px' }}>{value.item}</Tag>
                        </Col>
                        <Col span={16}>
                          <Input style={{ height: "100%" }} value={value.personal_supplement?.additional_explanation} readOnly={true} />
                        </Col>
                      </Row>
                    ))}
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Spin>

        <ModalDraggable
          className={this.state.childModal.className}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          destroyOnClose={true}
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

export default WS2584019_PersonalInfoInquirySub;
