import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Radio, Button, Row, Modal, message, } from "antd";

import { ArrowDownOutlined } from "@ant-design/icons";
import PattanCopyAction from "redux/ResultOutput/ResultsTblCollectOutput/PattanCopy.action";
class WS0457010_PattanCopy extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_ItemId: PropTypes.any,
    Li_Item: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'パッターン複写';

    this.state = {
      hiddenRow: false,
      isDuplicatePattern: false,
    };

    this.setValueForm = this.setValueForm.bind(this);
  }

  onFinish(values) {

  }

  componentDidMount() {
    this.setValueForm();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      this.setValueForm();
    }
  }

  setValueForm() {
    this.formRef.current.setFieldsValue({
      CopySourcePatternClassify: this.props.Li_ItemId,
      Li_Item: this.props.Li_Item,
      CopySourceSelect: 0
    });
  }

  onChangeRadio = e => {
    if (e.target.value === 1) {
      this.setState({
        hiddenRow: true
      })
    } else {
      this.setState({
        hiddenRow: false
      })
    }
  };

  checkValuePattern() {
    this.setState({
      isDuplicatePattern: false
    })
    let patternSource = this.formRef.current?.getFieldValue('CopySourcePatternClassify')
    let newPattern = this.formRef.current?.getFieldValue('CopyPatternClassify')

    if (newPattern === patternSource) {
      Modal.error({
        width: 250,
        title: 'すでに存在します。'
      })

      this.setState({
        isDuplicatePattern: true
      })
    }
  }

  copyData() {
    let patternSource = this.formRef.current?.getFieldValue('CopySourcePatternClassify')
    let newPattern = this.formRef.current?.getFieldValue('CopyPatternClassify')
    let newPatternName = this.formRef.current?.getFieldValue('PatternName')

    let params = {
      ...this.formRef.current?.getFieldValue()
    }

    if ((newPattern === patternSource) || !newPattern || !newPatternName) {
      Modal.error({
        width: 250,
        title: 'すでに存在します。'
      })
    } else {
      PattanCopyAction.run_F12(params)
        .then((res) => {
          if (this.props.onFinishScreen()) {
            this.props.onFinishScreen({})
          }
          const key = 'copy';

          message.loading({
            content: '処理終了',
            key,
            style: {
              marginTop: '20vh',
            },
          })
          setTimeout(() => {
            message.success({
              content: '複写 しました。',
              key,
              duration: 2,
              style: {
                marginTop: '20vh',
              },
            });
          }, 1000);
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

  render() {
    return (
      <div className="pattan-copy">
        <Card title="パッターン複写">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item name="CopySourceSelect" style={{ marginBottom: 20 }}>
              <Radio.Group name="CopySourceSelect" onChange={this.onChangeRadio}>
                <Radio value={0}>指定</Radio>
                <Radio value={1}>標準</Radio>
              </Radio.Group>
            </Form.Item>
            <Row gutter={24} hidden={this.state.hiddenRow} style={{ margin: 0 }}>
              <Form.Item name="CopySourcePatternClassify" label="区分" style={{ width: 110, marginRight: 20 }}>
                <Input readOnly />
              </Form.Item>
              <Form.Item name="Li_Item" label="名称" style={{ width: 'calc(100% - 130px' }}>
                <Input readOnly />
              </Form.Item>
            </Row>

            <Row style={{ paddingLeft: 130, margin: 0 }} hidden={this.state.hiddenRow} >
              <span style={{ margin: '12px 0' }}><ArrowDownOutlined /></span>
            </Row>

            <Row gutter={24} style={{ margin: 0 }}>
              <Form.Item name="CopyPatternClassify" label="区分" style={{ width: 110, marginRight: 20 }}>
                <Input maxLength={4}
                  onBlur={(e) => {
                    this.checkValuePattern()
                  }} />
              </Form.Item>
              <Form.Item name="PatternName" label="名称" style={{ width: 'calc(100% - 130px' }}>
                <Input type="text" readOnly={this.state.isDuplicatePattern} />
              </Form.Item>
            </Row>
            <Form.Item style={{ textAlign: 'right', marginTop: 20 }}>
              <Button type="primary"
                onClick={() => {
                  this.copyData()
                }}>実　行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0457010_PattanCopy);
