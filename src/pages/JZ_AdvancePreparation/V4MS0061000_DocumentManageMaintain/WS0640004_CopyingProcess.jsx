import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Button, Card, Form, Input, message, Row } from "antd";
import CopyingProcessAction from "redux/AdvancePreparation/DocumentManageMaintain/CopyingProcess.action";


const styleLabel = {
  background: '#1890ff',
  color: '#fff',
  height: 24,
  width: 65,
  textAlign: 'center',
  marginRight: 10,
  alignSelf: 'center'
}
class WS0640004_CopyingProcess extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_CopySourceCode: PropTypes.any,
    Li_CopyName: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '複写処理';

    this.state = {
    };

    this.onFinish = this.onFinish.bind(this)
  }

  componentDidMount() {
    this.setFormValue();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setFormValue();
    }
  }

  setFormValue() {
    this.formRef.current?.setFieldsValue({
      Li_CopySourceCode: this.props.Li_CopySourceCode,
      escort_name: this.props.Li_CopyName,
      CopyCode: ''
    })
  }

  onFinish(values) {

    let params = {
      ...values,
      escort_code: values.Li_CopySourceCode
    }

    if (!params.CopyCode) {
      message.error('複写先が無効です')
    } else {
      if (params.CopyCode === params.escort_code) {
        message.error('複写先が同一です')
      } else {
        CopyingProcessAction.copyData(params)
          .then((res) => {
            if (this.props.onFinishScreen) {
              this.props.onFinishScreen({
              });
            }
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
            <Row style={{ marginBottom: 10 }}>
              <label style={styleLabel}>複写元</label>
              <Form.Item name="Li_CopySourceCode" style={{ marginBottom: 0, marginRight: 5, alignItems: "center", width: 70 }}>
                <Input type="text" maxLength={3} />
              </Form.Item>
              <Form.Item name="escort_name" style={{ marginBottom: 0, alignItems: "center", width: 'calc(100% - 150px)' }}>
                <Input type="text" readOnly maxLength={80} style={{ border: 'none', background: 'transparent' }} />
              </Form.Item>
            </Row>
            <Row>
              <label style={styleLabel}>複写先</label>
              <Form.Item name="CopyCode" style={{ marginBottom: 0, alignItems: "center", width: 70 }}>
                <Input type="text" maxLength={3} />
              </Form.Item>
            </Row>

            <Button htmlType="submit" type='primary' style={{ float: 'right' }}>複写</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0640004_CopyingProcess);
