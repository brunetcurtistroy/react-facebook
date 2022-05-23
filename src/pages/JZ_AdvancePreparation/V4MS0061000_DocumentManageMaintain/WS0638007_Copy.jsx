import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { ArrowDownOutlined } from '@ant-design/icons';

import { Card, Form, Input, Button, Modal, message } from "antd";

import Copy0638007Action from "redux/AdvancePreparation/DocumentManageMaintain/WS0638007_Copy.action";
class WS0638007_Copy extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_FormatF: PropTypes.any,
    Lo_FormatT: PropTypes.any,
    StsConfirm: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '複写';

    this.state = {
      format: '',
    };

    this.setFormValue = this.setFormValue.bind(this);
    this.onFinish = this.onFinish.bind(this);
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
      Li_FormatF: this.props.Li_FormatF,
      FormatT: this.props.Li_FormatF,
    })

    this.setState({ format: this.props.Li_FormatF })
  }

  onFinish(values) {
    let params = {
      ...values
    }
    if (values.Li_FormatF === values.FormatT) {
      message.error('複写先と複写元が同一です')
    } else {
      Modal.confirm({
        width: "300px",
        content: "複写先を上書きしますか ?",
        okText: "は　い",
        cancelText: "いいえ",
        onOk: () => {
          Copy0638007Action.copyData(params)
            .then(() => {
              if (this.props.onFinishScreen) {
                this.props.onFinishScreen({
                  Lo_FormatT: values.FormatT,
                  StsConfirm: true
                });
              }
            })
        },
        onCancel: () => {
          if (this.props.onFinishScreen) {
            this.props.onFinishScreen({
              StsConfirm: false
            });
          }
        }
      })
    }
  }
  render() {
    return (
      <div className="copy">
        <Card title="複写">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <Form.Item name="Li_FormatF" label="複写元" style={{ marginBottom: '5px' }}>
              <Input readOnly />
            </Form.Item>
            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
              <ArrowDownOutlined style={{ width: "50px", height: "50px", lineHeight: "50px", fontSize: "20px" }} />
            </div>
            <Form.Item name="FormatT" label="複写先" >
              <Input onChange={(e) => { this.setState({ format: e.target.value }) }} />
            </Form.Item>

            <Button type="primary" style={{ float: 'right', marginTop: '15px' }} htmlType='submit'
              disabled={!this.state.format}
            >
              実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0638007_Copy);
