import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Button, Card, Form, Input, InputNumber, Select, Space, Modal, message } from "antd";
import coppy from 'assets/img/coppy.png'
import print from 'assets/img/print.png'
import PrinterDesignScreenResultTblAction from 'redux/ResultOutput/PrintParamMaintain/PrinterDesignScreenResultTbl.action'
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import PrinterDesignReserveRelatedService from "services/ResultOutput/ResultOutput/PrintParamMaintain/PrinterDesignScreenReserveRelatedService";
import ModalDraggable from "components/Commons/ModalDraggable";
import { download_file } from "helpers/CommonHelpers";

const styleImg = {
  marginBottom: '0.5em', background: '#C8DCF5', width: '50px'
}

class WS0434022_PrinterDesignScreenReserveRelated extends React.Component {
  static propTypes = {
    Li_TextFile: PropTypes.string,
    Li_PreviewSpecifiedValue: PropTypes.any,
    Li_PrinterNoSpecifiedValue: PropTypes.number,
    Lo_Preview: PropTypes.any,
    Lo_PrinterNo: PropTypes.number,
    Lo_NumOfCopies: PropTypes.number,
    Lo_StsOutput: PropTypes.any,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ﾌﾟﾘﾝﾀｰ指定画面[予約関連]';

    this.state = {
      loading: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      screenData: {
        NumCopies: "",
        Preview: "",
        PrinterNo: "",
        PrinterNo_GB: []
      },
      isLoadingPrint: false,
    };
  }
  componentDidMount() {
    this.getScreenData();
  }

  getScreenData = () => {
    this.setState({
      loading: true
    })
    const { Li_PreviewSpecifiedValue, Li_PrinterNoSpecifiedValue } = this.props;
    PrinterDesignReserveRelatedService.onScreenData({
      Li_PreviewSpecifiedValue,
      Li_PrinterNoSpecifiedValue
    })
      .then(res => {
        let data = res ? res.data : [];
        data.PrinterNo = data.PrinterNo > 0 ? data.PrinterNo : ""
        this.setState({
          screenData: data
        })
        this.formRef.current?.setFieldsValue(this.state.screenData = data)
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }
  onRun_F12 = () => {
    this.setState({
      isLoadingPrint: true
    })
    let params = {
      Li_FormatList: this.props.Li_FormatList,
      TextFile: this.props.Li_TextFile,
      Preview: this.state.screenData.Preview ? 1 : 0,
      Printer: this.formRef.current?.getFieldValue('PrinterNo'),
      NumCopies: this.formRef.current.getFieldValue('NumCopies') || this.state.screenData.NumCopies
    }
    PrinterDesignReserveRelatedService.onPrint(params)
      .then(res => {
        if (res.data.message) {
          return Modal.warning({
            title: res.data.message,
            width: 300,
          });
        } else {
          download_file(res);
          message.success("完了！");
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      }).finally(() => {
        this.setState({
          isLoadingPrint: false
        })
      })
  }
  onSelectCBB(value) {
    this.state.screenData.PrinterNo = value
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
    console.log(this.props)
    return (
      <div className="printer-design-screen-result-tbl">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Card title="ﾌﾟﾘﾝﾀｰ指定画面[予約関連]">
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '0.5em' }}>
              <Form.Item name="PrinterNo" label="プリンタ－" >
                <Select
                  defaultValue={this.state.screenData?.PrinterNo}
                  onChange={(value) => this.onSelectCBB(value)}
                >
                  {this.state.screenData.PrinterNo_GB?.map(value => (
                    <Select.Option key={value.Linked} value={value.Linked}>
                      {value.Display}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="NumCopies" label="&emsp;&emsp;部　数" >
                <InputNumber style={{ width: '20%' }} />
              </Form.Item>
              <Space>
                <Form.Item name="Office" label="&emsp;&emsp;事業所" >
                  <Input
                    onDoubleClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '70%',
                          component: (
                            <WS0247001_OfficeInfoRetrievalQuery
                              Lio_OfficeCode={""}
                              Lio_BranchStoreCode={""}
                              onFinishScreen={(output) => {
                                this.closeModal()
                              }}
                            />),
                        },
                      })
                    }} />
                </Form.Item>
                <Form.Item name="BranchShop" >
                  <Input style={{ width: '50%' }}
                    onDoubleClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '70%',
                          component: (
                            <WS0247001_OfficeInfoRetrievalQuery
                              Lio_OfficeCode={""}
                              Lio_BranchStoreCode={""}
                              onFinishScreen={(output) => {
                                this.closeModal()
                              }}
                            />),
                        },
                      })
                    }} />
                </Form.Item>
              </Space>
            </div>
            <Space style={{ float: 'right', marginTop: '0.5em' }}>
              <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em' }}>
                <img src={print} style={styleImg} /><br />
                <Button style={{ background: '#C8DCF5' }} type="text" onClick={this.onRun_F12} >&emsp;&ensp;印刷&emsp;&ensp;</Button>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em' }}>
                <img src={coppy} style={styleImg} /><br />
                <Button style={{ background: '#C8DCF5' }} type="text" onClick={this.onRun_F12} >プレビュー</Button>
              </div>
            </Space>
          </Card>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0434022_PrinterDesignScreenReserveRelated);
