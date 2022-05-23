import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, TimePicker, Row, Col, InputNumber } from "antd";
import moment from 'moment';

class WS1492011_EasyBasicDataSet extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_SpecificDate: PropTypes.any,
    Li_FacilityNum: PropTypes.any,
    Li_ManageDivision: PropTypes.any,
    Li_DisplayNum: PropTypes.any,

    onClickedSelect: PropTypes.func,
  }

  constructor(props) {
    super(props);

    // document.title = '簡単基礎データ設定';

    this.state = {
      startTime: '',
      endTime: ''
    };

    this.onFinish = this.onFinish.bind(this);
  }

  onFinish(values) {

  }

  validationTime() {
    const { startTime, endTime } = this.state;

    if (startTime >= endTime) {
      //err
    }
  }

  render() {
    const format = 'HH:mm';
    return (
      <div className="easy-basic-data-set">
        <Card title="簡単基礎データ設定">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24} style={{ marginBottom: '5px' }}>
              <Col span={18}>
                <Row gutter={24}>
                  <Col span={7}>
                    <Input type="text" value='開始' disabled style={{ textAlign: 'center' }} />
                  </Col>

                  <Col span={7}>
                    <Input type="text" value='終了' disabled style={{ textAlign: 'center' }} />
                  </Col>

                  <Col span={7}>
                    <Input type="text" value='刻み' disabled style={{ textAlign: 'center' }} />
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Input type="text" value='人数' disabled style={{ textAlign: 'center' }} />
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={18}>
                <Row gutter={24}>
                  <Col span={7}>
                    <Form.Item name="StartTime" >
                      <TimePicker initialValues={moment('00:00', format)} format={format} style={{ width: '100%' }}
                        onChange={async (value, timeString) => {
                          await this.setState({
                            startTime: value
                          });
                          this.validationTime()
                        }} />
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    <Form.Item name="EndTime" >
                      <TimePicker initialValues={moment('00:00', format)} format={format} style={{ width: '100%' }}
                        onChange={async (value, timeString) => {
                          await this.setState({
                            endTime: value
                          });
                          this.validationTime()
                        }} />
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    <Form.Item name="IncrementsOfTime">
                      <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={1} style={{ marginLeft: '-15px' }}>
                    <label>分</label>
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Form.Item name="PeopleNum">
                  <InputNumber min={0} max={999} style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12} style={{ float: "left" }}>
                <Form.Item>
                  <Button >閉じる</Button>
                </Form.Item>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Form.Item>
                  <Button >作　成</Button>
                </Form.Item>
              </Col>
            </Row>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1492011_EasyBasicDataSet);
