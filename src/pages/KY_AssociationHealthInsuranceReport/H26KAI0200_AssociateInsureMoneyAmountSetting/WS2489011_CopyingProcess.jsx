/* eslint-disable no-sequences */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Row, Col, Spin, InputNumber, message} from "antd";
import CopyingProcessAction from "redux/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/CopyingProcess.action"; 

const customStyle = {
  styleInput: {
    background: 'transparent',
    border: 'none'
  },

  styleCol: {
    paddingRight: 0,
    paddingLeft: 5
  }
}
class WS2489011_CopyingProcess extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_Format: PropTypes.any,
    Li_YearF: PropTypes.any,
    Li_Remarks: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '複写処理';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingForm: true
    };

    this.getDataScreen = this.getDataScreen.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.getDataScreen();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataScreen();
    }
  }

  getDataScreen() {
    let params = {
      FormatOp: this.props.Li_Format,
      YearOp: this.props.Li_YearF,
      remarks: this.props.Li_Remarks,
    }

    this.setState({
      isLoadingForm: true
    })
    CopyingProcessAction.getScreenData(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue(res);
        this.setState({ isLoadingForm: false })
      })
      .finally(() => {this.setState({ isLoadingForm: false })})
  }

  onFinish(values) {
    let params={
      ...values,
      FormatOp: values.Format,
    }
  //  alert(values.Fy);
   // alert(values.Li_YearF);


    if (parseInt(values.Li_YearF) === parseInt(values.Fy))
    {
        // message.warning('[複写元]と[複写先]の値は、異なる値が必要です!!');
        message.error('[複写元] と [複写先]の値は、異なる値が必要です!!');

    }else
    {      
      
      CopyingProcessAction.copyProcess(params)
      .then((res) => {
        message.success('コピー成功 !')
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
          });
        }
      })
    }
  }

  render() {
    return (
      <div className="copying-process">
        <Card title="複写処理">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Spin spinning={this.state.isLoadingForm}>
              <Row gutter={24}>
                <Col span={3} style={{ paddingRight: 0, textAlign: "center" }}>
                  <Form.Item><label>複　写　元</label></Form.Item>
                </Col>
                <Col span={3} style={customStyle.styleCol}>
                  <Form.Item name="Li_YearF">
                    <Input type="text" readOnly style={customStyle.styleInput} />
                  </Form.Item>
                </Col>
                <Col span={2} style={customStyle.styleCol, { textAlign: "center" }}>
                  <Form.Item><label>年度</label></Form.Item>
                </Col>
                <Col span={3} style={customStyle.styleCol}>
                  <Form.Item name="Li_Format">
                    <Input type="text" readOnly style={customStyle.styleInput} />
                  </Form.Item>
                </Col>
                <Col span={5} style={customStyle.styleCol}>
                  <Form.Item name="Li_Remarks">
                    <Input type="text" readOnly style={customStyle.styleInput} />
                  </Form.Item>
                </Col>
                <Col span={3} style={customStyle.styleCol}>
                  <Form.Item name="Nks200F">
                    <Input type="text" readOnly style={customStyle.styleInput} />
                  </Form.Item>
                </Col>
                <Col span={5} style={{ paddingLeft: 5 }}>
                  <Form.Item name="Nks200RemarksF">
                    <Input type="text" readOnly style={customStyle.styleInput} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={24}>
                <Col span={3} style={{ paddingRight: 0, textAlign: "center" }}>
                  <Form.Item><label>複　写　先</label></Form.Item>
                </Col>
                <Col span={3} style={customStyle.styleCol}>
                  <Form.Item name="Fy" rules={[{ required: true, message: 'を入力してください' }]}>
                    <InputNumber type="text" onChange={(value) => {                      
                      this.formRef.current.setFieldsValue({ 
                        Format: '標準版' + value,
                        Remarks: '標準版'+value +'年度版',
                        Nks200RemarksT: '協会集計'+ value +'年度版' ,
                      })
                    }}/>
                  </Form.Item>
                </Col>
                <Col span={2} style={customStyle.styleCol, { textAlign: "center" }}>
                  <Form.Item><label>年度</label></Form.Item>
                </Col>
                <Col span={3} style={customStyle.styleCol}>
                  <Form.Item name="Format" rules={[{ required: true, message: 'を入力してください' }]}>
                    <Input type="text" maxLength={12} />
                  </Form.Item>
                </Col>
                <Col span={5} style={customStyle.styleCol}>
                  <Form.Item name="Remarks" rules={[{ required: true, message: 'を入力してください' }]}>
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col span={3} style={customStyle.styleCol}>
                  <Form.Item name="Nks200T" rules={[{ required: true, message: 'を入力してください' }]}>
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col span={5} style={{ paddingLeft: 5 }}>        
                  <Form.Item name="Nks200RemarksT" rules={[{ required: true, message: 'を入力してください' }]}>
                    <Input type="text" />
                  </Form.Item>
                </Col>
              </Row>
            </Spin>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ float: "right" }}>複写</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2489011_CopyingProcess);
