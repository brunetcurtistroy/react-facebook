import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Card, Form, Input, Button, Modal, Row } from "antd";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx";
import WS2553003_PeriodTimeInquiry from "./WS2553003_PeriodTimeInquiry.jsx";
import moment from "moment-timezone";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2528047_DetailsExtract extends React.Component {
  static propTypes = {
    Lio_OfficeCode: PropTypes.any,
    Lio_TimeZone: PropTypes.any,
    Lo_StsEnter: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "詳細抽出";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  componentDidMount = () => {
    const { Lio_OfficeCode, Lio_TimeZone, office_kanji_name } = this.props;
    const formInstance = this.formRef.current;
    formInstance.setFieldsValue({
      OfficeCode: Lio_OfficeCode,
      TimeZone: Lio_TimeZone,
      office_kanji_name: office_kanji_name,
    });
    this.forceUpdate();
  };
  onFinish = (values) => {
    if (this.props.onFinishScreen)
      this.props.onFinishScreen({
        Lio_OfficeCode: values.OfficeCode,
        Lio_TimeZone: values.TimeZone,
        Lo_StsEnter: true,
        office_kanji_name: values.office_kanji_name,
      });
  };

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  getDataOfficeByOfficeCodeAndBranch = (office) => {
    this.setDataField(office);
    this.closeModal();
  };

  setDataField = (officeInfo) => {
    const formInstance = this.formRef.current;
    formInstance.setFieldsValue({
      OfficeCode: officeInfo.office_code,
      // TimeZone: moment("12:45", "HH:mm"),
      office_kanji_name: officeInfo.office_kanji_name,
    });
    this.forceUpdate();
  };

  render() {
    return (
      <div className="details-extract">
        <Card title="詳細抽出">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row>
              <Form.Item label="事業所" name="OfficeCode">
                <Input.Search
                  style={{ width: "200px", textAlign: "right" }}
                  autoComplete="off"
                  type="number"
                  onChange={() => {
                    this.formRef.current.setFieldsValue({
                      office_kanji_name: "",
                    });
                    this.forceUpdate();
                  }}
                  onSearch={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 1200,
                        component: (
                          <WS0247001_OfficeInfoRetrievalQuery
                            getDataOfficeByOfficeCodeAndBranch={
                              this.getDataOfficeByOfficeCodeAndBranch
                            }
                          />
                        ),
                      },
                    });
                  }}
                />
              </Form.Item>
              <span style={{ marginLeft: "10px" }}>
                <Form.Item name="office_kanji_name" hidden={true}>
                  <Input></Input>
                </Form.Item>
                <Form.Item>
                  {this.formRef.current
                    ? this.formRef.current.getFieldValue("office_kanji_name")
                    : ""}
                </Form.Item>
              </span>
            </Row>
            <Form.Item name="TimeZone" label="時間帯">
              <Input
                type="text"
                autoComplete="off"
                style={{ width: "110px" }}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 200,
                      component: (
                        <WS2553003_PeriodTimeInquiry
                          onFinishScreen={(obj) => {
                            this.formRef.current.setFieldsValue({
                              TimeZone: obj.Lio_TimeZone,
                            });
                            this.closeModal();
                            this.forceUpdate();
                          }}
                        />
                      ),
                    },
                  });
                }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              確定
            </Button>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
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
)(WS2528047_DetailsExtract);
