import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Row, Modal, Spin, } from "antd";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import CopyAction from "redux/ResultOutput/CsvCreateParamMaintain/Copy.action";
import CsvCreateParamMaintainAction from "redux/ResultOutput/CsvCreateParamMaintain/CsvCreateParamMaintain.action";

class WS0460008_Copy extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_NoF: PropTypes.any,
    Li_FormatF: PropTypes.any,
    Li_DocumentName: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '複写';

    this.state = {
      isLoadingPage: false,
      dataCsv: []
    };
  }

  componentDidMount() {
    this.getDataScreen()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getDataScreen()
    }
  }

  getDataScreen() {
    let params = {
      Li_NoF: this.props.Li_NoF,
      Li_FormatF: this.props.Li_FormatF,
      Li_DocumentName: this.props.Li_DocumentName,
    }

    this.setState({ isLoadingPage: true })
    CopyAction.getScreenData(params)
      .then((res) => {
        let data = {
          ...res,
          NoT:  parseInt(res?.NoT) > 99 ? '**' : res?.NoT
        }

        this.formRef.current?.setFieldsValue(data)
        this.getListDataCSV()
      })
      .finally(() => this.setState({ isLoadingPage: false }))
  }

  getListDataCSV() {
    CsvCreateParamMaintainAction.getListData()
      .then(async (res) => {
        let data = res ? res : [];
        await this.setState({
          dataCsv: data,
          isLoadingPage: false
        })
      })
      .finally(() => this.setState({ isLoadingPage: false }))
  }

  copyInspect() {
    let params = {
      ...this.formRef.current?.getFieldValue()
    }
    CopyAction.copyData(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({})
        }
      })
  }

  checkSameFormat() {
    let data = [...this.state.dataCsv]
    let index = data.findIndex(x => x.Format === this.formRef.current?.getFieldValue('FormatT'))
    if (index === -1) {
      return false
    } else {
      return true
    }
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="copy">
        <Card title="複写">
          <Spin spinning={this.state.isLoadingPage}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <Row>
                <Form.Item name="NoT" label="No" style={{ marginRight: '10px' }}>
                  <Input type="text" style={{ width: 60 }} maxLength={2} />
                </Form.Item>

                <Form.Item name="FormatT" label="FORMAT" style={{ marginRight: '10px' }}>
                  <Input type="text" maxLength={12} />
                </Form.Item>

                <Form.Item name="remarks" label="" >
                  <Input type="text" style={{ border: 'none' }} maxLength={20} />
                </Form.Item>
              </Row>
              <br></br>
              <Form.Item style={{ float: 'right' }}>
                <Button type="primary"
                  onClick={() => {
                    let No = this.formRef.current?.getFieldValue('NoT')
                    let Format = this.formRef.current?.getFieldValue('FormatT')
                    if (!No && !Format) {
                      Modal.error({
                        width: 260,
                        title: 'Noが重複しています'
                      })
                    } else {
                      if (this.checkSameFormat()) {
                        Modal.warning({
                          width: 380,
                          title: 'FORMATは既存のものを使用します',
                          onOk: () => {
                            Modal.confirm({
                              title: 'この内容で複写を実行しますか',
                              icon: <QuestionCircleTwoTone />,
                              onOk: () => {
                                if (No === '**') {
                                  if (this.props.onFinishScreen) {
                                    this.props.onFinishScreen({})
                                  }
                                } else {
                                  this.copyInspect()
                                }
                              }
                            })
                          }
                        })
                      } else {
                        Modal.confirm({
                          title: 'この内容で複写を実行しますか',
                          icon: <QuestionCircleTwoTone />,
                          onOk: () => {
                            this.copyInspect()
                          }
                        })
                      }
                    }
                  }}
                >実行</Button>
              </Form.Item>

            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0460008_Copy);
