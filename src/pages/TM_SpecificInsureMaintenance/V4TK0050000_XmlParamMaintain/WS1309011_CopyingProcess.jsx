import { ArrowDownOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Modal, Row, Spin } from "antd";
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx';
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";


import CopyingProcessAction from 'redux/SpecificInsureMaintenance/XmlParamMaintain/CopyingProcess.action'; 
const styDiv = {
  border: '1px solid rgba(0, 0, 0, 0.06)',
  padding: '0.5em'
}
const styFrm = {
  marginBottom: '0px'
}
class WS1309011_CopyingProcess extends React.Component {
  static propTypes = {
    format: PropTypes.any,
    remarks: PropTypes.any ,
    kind: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写処理';

    this.state = {
      isloadding: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  componentDidMount() {
    this.formRef.current.setFieldsValue({
      format: this.props.format,
      remarks: this.props.remarks
    })
    this.forceUpdate()
  }
  OnCopyProcess() {
    let values = this.formRef.current?.getFieldValue()
    if (this.isEmpty(values.format) || this.isEmpty(values.Format) || this.isEmpty(values.remarks) || this.isEmpty(values.Remarks)
      || this.isEmpty(this.props.kind)) {
      message.error("項目を設定してください。");
    } else {
      values.kind = this.props.kind
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 400,
          component: (
            <WS0061009_CheckYesNoYes
              Li_DisplayContent={'登録します力`?'}
              onFinishScreen={(output) => {
                if (output.Lio_StsReturn) {
                  this.CopyProcess(values)
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen()
                  }
                }
                this.closeModal()
              }}
            />),
        },
      })
    }
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  };
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  CopyProcess(values) {
    this.setState({ isloadding: true })
    CopyingProcessAction.Gegister(values).then(res => {
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isloadding: false }))
  } 
  render() {
    return (
      <div className="copying-process">
        <Card title="複写処理" >
          <Spin spinning={this.state.isloadding} >
            <Form
              ref={this.formRef}
              autoComplete="off"
            >
              <Row style={styDiv}>
                <Col span={11}>
                  <Form.Item name="format" label="複写元" style={styFrm}>
                    <Input maxLength={12} />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item name="remarks" style={styFrm}>
                    <Input maxLength={20} />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ padding: '0.5em' }}>
                <Col span={23} style={{ textAlign: 'center' }}>
                  <ArrowDownOutlined style={{ fontSize: '20px', color: '#08c' }} />
                </Col>
              </Row>
              <Row style={styDiv}>
                <Col span={11}>
                  <Form.Item name="Format" label="複写先" style={styFrm}>
                    <Input maxLength={12} />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item name="Remarks" style={styFrm} >
                    <Input maxLength={20} />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" style={{ marginTop: '1em', float: 'right' }} onClick={() => this.OnCopyProcess()} >実行</Button>
            </Form>
          </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1309011_CopyingProcess);
