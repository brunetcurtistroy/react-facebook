import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Row, Col, Modal } from "antd";
import WS0341008_BranchShopInquiry from "./WS0341008_BranchShopInquiry.jsx";
import WS0247001_OfficeInfoRetrievalQuery from "./WS0247001_OfficeInfoRetrievalQuery.jsx";
import OfficeInfoMaintainAction from "redux/basicInfo/OfficeInfoMaintain/OfficeInfoMaintain.action.js";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
const grid = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
class WS0341009_BranchStoreGenerated extends React.Component {
  static propTypes = {
    Li_OfficeCode: PropTypes.any,
    Lo_BranchStoreCode: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);
    // document.title = "支社店生成";
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      OfficeCode: "",
      BranchStoreCode: "",
      office_kana_name: "",
      office_kanji_name: "",
    };
  }
  getDataOfficeByOfficeCodeAndBranch = (OfficeCode) => {
    OfficeInfoMaintainAction.getBranchStoreGeneratedAction(OfficeCode).then(
      (res) => {
        if (res.branch_store_code) {
          this.formRef.current.setFieldsValue({
            branch_store_code_new: res.branch_store_code,
            office_kana_name_new: this.state.office_kana_name,
            office_kanji_name_new: this.state.office_kanji_name,
          });
          this.forceUpdate();
        }
      }
    );
  };
  componentDidMount = () => {
    if (this.props.Li_OfficeCode) {
      this.setState({ OfficeCode: this.props.Li_OfficeCode });
      this.getDataOfficeByOfficeCodeAndBranch(this.props.Li_OfficeCode);
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
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Li_OfficeCode: this.state.OfficeCode,
        Lo_BranchStoreCode: values.branch_store_code_new,
        OfficeCodeParent: this.state.OfficeCode,
        BranchStoreCodeParent: this.state.BranchStoreCode,
        office_kana_name: values.office_kana_name_new,
        office_kanji_name: values.office_kanji_name_new,
      });
    }
  };
  render() {
    return (
      <div className="branch-store-generated">
        <Card title="支社店生成">
          <Form ref={this.formRef} {...grid} onFinish={this.onFinish}>
            <Button style={{ width: "5em" }} type="primary">
              本社
            </Button>
            <Form.Item label="事務所コード">
              <Row>
                <Form.Item>
                  <Input.Search
                    style={{ width: "100px" }}
                    name="OfficeCode"
                    type="number"
                    min={1}
                    value={this.state.OfficeCode}
                    onChange={(event) =>
                      this.setState(
                        {
                          OfficeCode: event.target.value,
                          office_kana_name: "",
                          office_kanji_name: "",
                        },
                        () => {
                          this.getDataOfficeByOfficeCodeAndBranch(
                            this.state.OfficeCode
                          );
                        }
                      )
                    }
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1200,
                          component: (
                            <WS0247001_OfficeInfoRetrievalQuery
                              onFinishScreen={({
                                Lio_OfficeCode,
                                Lio_BranchStoreCode,
                                Lo_Kanji_Name,
                                recordData,
                              }) => {
                                this.setState({
                                  OfficeCode: Lio_OfficeCode,
                                  BranchStoreCode: Lio_BranchStoreCode,
                                  office_kana_name: recordData.office_kana_name,
                                  office_kanji_name: Lo_Kanji_Name,
                                });
                                this.getDataOfficeByOfficeCodeAndBranch(
                                  Lio_OfficeCode
                                );
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}
                    type="number"
                    min={1}
                  />
                </Form.Item>
                <Form.Item>
                  <Input.Search
                    style={{ width: "100px" }}
                    value={this.state.BranchStoreCode}
                    type="number"
                    min={0}
                    onChange={(event) => {
                      this.setState(
                        {
                          BranchStoreCode: event.target.value,
                          office_kana_name: "",
                          office_kanji_name: "",
                        },
                        () => {
                          this.getDataOfficeByOfficeCodeAndBranch(
                            this.state.BranchStoreCode
                          );
                        }
                      );
                    }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1200,
                          component: (
                            <WS0341008_BranchShopInquiry
                              Li_OfficeCode={this.state.OfficeCode}
                              onFinishScreen={({
                                Li_OfficeCode,
                                Lo_BranchStoreCode,
                                recordData,
                              }) => {
                                this.setState({
                                  OfficeCode: Li_OfficeCode,
                                  BranchStoreCode: Lo_BranchStoreCode,
                                  office_kana_name: recordData.office_kana_name,
                                  office_kanji_name:
                                    recordData.office_kanji_name,
                                });
                                this.getDataOfficeByOfficeCodeAndBranch(
                                  Li_OfficeCode
                                );
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  />
                </Form.Item>
              </Row>
              <span>{this.state.office_kana_name}</span>
              <br />
              <span>{this.state.office_kanji_name}</span>
            </Form.Item>
            <Button style={{ width: "5em" }} type="primary">
              支社店
            </Button>
            <Form.Item name="branch_store_code_new" label="支社店コード">
              <Input style={{ width: "30%" }} type="number" min={0} />
            </Form.Item>
            <Form.Item name="office_kana_name_new" label="名称">
              <Input />
            </Form.Item>
            <Form.Item name="office_kanji_name_new" label=" ">
              <Input />
            </Form.Item>
            <Form.Item style={{ float: "right" }}>
              <Button
                disabled={this.state.OfficeCode ? false : true}
                type="primary"
                htmlType="submit"
              >
                生成
              </Button>
            </Form.Item>
          </Form>
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
)(WS0341009_BranchStoreGenerated);
