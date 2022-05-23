/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Row, Space, Col, Modal } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import WS0268001_SiteClassifySearchQuery from "../V4MS0102000_CategoryMasterMaintain/WS0268001_SiteClassifySearchQuery";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import WS0061009_CheckYesNoYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes";

class WS0351001_SiteFindingsCopySub extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Lio_SiteClassify: PropTypes.any,
    Lio_SiteClassifyName: PropTypes.any,

    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);

    // document.title = '部位所見複写SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      DataSiteClassify: [
        { id: 1, site_classification_code: 123, site_classification_name: '部位分類検索・照会1' },
        { id: 2, site_classification_code: 1234, site_classification_name: '部位分類検索・照会2' },
        { id: 3, site_classification_code: 12345, site_classification_name: '部位分類検索・照会3' },
      ],
      site_classification_name: ''
    };
  }

  componentDidMount() {
    this.setFormValue()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.setFormValue()
    }
  }

  setFormValue() {
    this.formRef.current?.setFieldsValue({
      SiteClassifyF: this.props.Lio_SiteClassify,
      site_classification_name: this.props.Lio_SiteClassifyName,
      SiteClassifyT: this.props.Lio_SiteClassify,
      SiteClassifyNameF: this.props.Lio_SiteClassifyName,
    })

    this.setState({
      site_classification_name: this.props.Lio_SiteClassifyName
    })
  }

  getSiteClassifyName(SiteClassifyCode, fieldName) {
    let data = this.state.DataSiteClassify.filter(x => x.site_classification_code == SiteClassifyCode)
    console.log(data, SiteClassifyCode)
    this.formRef.current?.setFieldsValue({
      [fieldName]: data.length > 0 ? data[0].site_classification_name : ''
    })
    this.setState({
      [fieldName]: data.length > 0 ? data[0].site_classification_name : ''
    })
  }

  eventCopy_F12() {
    let params = { ...this.formRef.current?.getFieldValue() }

    let checkValue = true

    if (!params.SiteClassifyF && checkValue) {
      checkValue = false
      this.showModalErr('複写元を指定してください')
    }

    if (!params.SiteClassifyT && checkValue) {
      checkValue = false
      this.showModalErr('複写先を指定してください')
    }

    if (params.SiteClassifyF === params.SiteClassifyT && checkValue) {
      checkValue = false
      this.showModalErr('複写元と複写先が同一です')
    }

    if (checkValue) {
      let sts = true
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 300,
          component: sts ?
            (<WS0061015_CheckYesNoNo
              Li_Title='複写'
              Li_Message={"上書しますがよろしいですか？"}
              onFinishScreen={(output) => {
                if (output.Lio_StsReturn) {
                  this.callApiCopy(params)
                }
                this.closeModal()
              }}
            />) :
            (< WS0061009_CheckYesNoYes
              Li_Title='複写'
              Li_DisplayContent={"複写を実行しますか？"}
              onFinishScreen={(output) => {
                if (output.Lio_StsReturn) {
                  this.callApiCopy(params)
                }
                this.closeModal()
              }}
            />),
        },
      })
    }
  }

  callApiCopy(params) {
    //call api success
    this.returnValue()
  }

  showModalErr(message) {
    Modal.error({
      width: 300,
      title: message
    })
  }

  returnValue() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_SiteClassify: this.formRef.current?.getFieldValue('SiteClassifyT'),
        Lio_SiteClassifyName: this.formRef.current?.getFieldValue('SiteClassifyNameF')
      })
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="site-findings-copy-sub">
        <Card title="部位所見複写SUB">
          <Form ref={this.formRef} >
            <Form.Item label="部位分類" labelCol={{ span: 4 }}>
              <Row>
                <Form.Item name="SiteClassifyF" style={{ width: 110, marginRight: 8 }} >
                  <Input.Search type='number' maxLength={5}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 500,
                          component: (
                            <WS0268001_SiteClassifySearchQuery
                              Lo_SiteClassifyCode={this.formRef.current?.getFieldValue('SiteClassifyF')}
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  SiteClassifyF: output.recordData.site_classification_code,
                                  site_classification_name: output.recordData.site_classification_name
                                })
                                this.setState({
                                  site_classification_name: output.recordData.site_classification_name,
                                })
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}

                    onBlur={(e) => {
                      let value = e.target.value.slice(0, 5)
                      this.formRef.current?.setFieldsValue({
                        SiteClassifyF: value
                      })
                      this.getSiteClassifyName(value, 'site_classification_name')
                    }}
                  />
                </Form.Item>
                <Form.Item name="site_classification_name" style={{ width: 'calc(100% - 118px)' }}>
                  <span>{this.state.site_classification_name}</span>
                </Form.Item>
              </Row>
            </Form.Item>

            <Row gutter={24}>
              <Col span={24} style={{ textAlign: 'center' }}>
                <ArrowDownOutlined style={{ lineHeight: "40px", fontSize: "20px" }} />
              </Col>
            </Row>

            <Form.Item label="部位分類" labelCol={{ span: 4 }} >
              <Row>
                <Form.Item name="SiteClassifyT" style={{ width: 110, marginRight: 8 }} >
                  <Input.Search type='number' maxLength={5}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 500,
                          component: (
                            <WS0268001_SiteClassifySearchQuery
                              Lo_SiteClassifyCode={this.formRef.current?.getFieldValue('SiteClassifyT')}
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  SiteClassifyT: output.recordData.site_classification_code,
                                  SiteClassifyNameF: output.recordData.site_classification_name
                                })
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}

                    onBlur={(e) => {
                      let value = e.target.value.slice(0, 5)
                      this.formRef.current?.setFieldsValue({
                        SiteClassifyT: value
                      })
                      this.getSiteClassifyName(value, 'SiteClassifyNameF')
                    }}
                  />
                </Form.Item>
                <Form.Item name="SiteClassifyNameF" style={{ width: 'calc(100% - 118px)' }}>
                  <Input type="text" />
                </Form.Item>
              </Row>
            </Form.Item>

            <Space style={{ float: 'right', marginTop: 20 }} >
              <Button type="primary" onClick={() => this.eventCopy_F12()} >
                複写
              </Button>
            </Space>

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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0351001_SiteFindingsCopySub);
