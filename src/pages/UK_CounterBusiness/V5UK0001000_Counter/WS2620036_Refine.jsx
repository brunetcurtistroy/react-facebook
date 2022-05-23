import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Select, Radio, Row, Col, Button, message } from "antd";
import { getRefineAction, getSrceenDataAction } from "redux/CounterBusiness/Counter/Counter.action";

class WS2620036_Refine extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Lio_KanaSearch: PropTypes.any,
    Lio_State: PropTypes.any,
    Lio_Pay: PropTypes.any,
    Lio_Facility: PropTypes.any,
  }
  constructor(props) {
    super(props);

    // document.title = '絞り込み';

    this.state = {
      FacilityType: [],
      Facility: 1,
      State: 1,
      Pay: 0
    };
  }


  componentDidMount() {
    this.renderDataFromWS2620001()
  }
  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      // getIntroduceCounterAction().then(res => res ? this.setState({ FacilityType: res.data.FacilityType }) : [])
      // this.renderDataFromWS2620001()
      this.renderDataFromWS2620001()
    }
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  renderDataFromWS2620001() {
    const params = {
      Lio_KanaSearch: '',
      FacilityType: !this.isEmpty(this.props.Lio_Facility) ? this.props.Lio_Facility : 1,
      State: !this.isEmpty(this.props.Lio_State) ? this.props.Lio_State : 1,
      Pay: !this.isEmpty(this.props.Lio_Pay) ? this.props.Lio_Pay : 1
    }
    getSrceenDataAction(params).then(res => {
      this.setState({
        FacilityType: res.data.Facility_List,
      })
      this.setFormFieldValue('Facility', res.data.Facility)
      this.setFormFieldValue('State', res.data.State)
      this.setFormFieldValue('Pay', res.data.Pay)
    })

  }
  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }

  onFinish = (values) => {
    const params = {
      Lio_KanaSearch: '',
      Facility: !!values?.Facility ? values.Facility : 1,
      State: !!values.State ? values.State : 1,
      Pay: !!values?.Pay ? values.Pay?.toString() : '1',
      InputChar: !!values?.InputChar ? values.InputChar : '',
      Lio_State: !this.isEmpty(this.props.Lio_State) ? this.props.Lio_State : 1,
      FacilityType: !this.isEmpty(this.props.Lio_Facility) ? this.props.Lio_Facility : 1,
      Lio_Pay: !this.isEmpty(this.props.Lio_Pay) ? this.props.Lio_Pay.toString() : '1'
    }
    getRefineAction(params).then(res => {
      if (res && !!res.data) {
        const item = res.data;
        const output = {
          FacilityType: item.FacilityType,
          State: item.State,
          Pay: item.Pay,
          Lio_KanaSearch: item.Lio_KanaSearch,
        }
        this.props.onFinishScreen({ ...output, StsSend: true });
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    })
  }
  render() {
    const { FacilityType } = this.state;
    return (
      <div className="refine">
        <Card title="絞り込み">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="InputChar"
                      label="入力文字"
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <span>
                      ワ　ラ　ヤ　マ　ハ　ナ　タ　サ　カ　ア
                      リ　　　ミ　ヒ　ニ　チ　シ　キ　イ
                      ヲ　ル　ユ　ム　フ　ヌ　ツ　ス　ク　ウ
                      レ　　　メ　ヘ　ネ　テ　セ　ケ　エ
                      ン　ロ　ヨ　モ　ホ　ノ　ト　ソ　コ　オ
                    </span>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12} style={{ paddingRight: "0" }}>
                    <Button style={{ float: "right", marginRight: "10px", border: "none", fontSize: "28px" }}>← </Button>
                  </Col>
                  <Col span={12} style={{ paddingLeft: "0" }}>
                    <Button style={{ border: "none", fontSize: "28px" }}> →</Button>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="Facility"
                      label="施設"
                    >
                      <Select>
                        {FacilityType?.map((item, index) => (
                          <Select.Option key={index} value={item.facility_type}>{item.facility_name}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="State"
                      label="状態"
                    >
                      <Radio.Group>
                        <Radio value={0}>全　て</Radio>
                        <Radio value={1}>未処理</Radio>

                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="Pay"
                      label="入金"
                    >
                      <Radio.Group>
                        <Radio value={0}>全　て</Radio>
                        <Radio value={1}>未処理</Radio>

                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Form.Item style={{ float: 'right' }}>
              <Button type="primary" htmlType="submit">確定</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2620036_Refine);
