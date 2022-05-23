import React from "react";
import PropTypes from 'prop-types';
import DispensingProcessSubAction from "redux/CounterBusiness/Counter/DispensingProcessSub.action";
import { Card, Form, Checkbox, Row, Col, Button, } from "antd";

class WS2623007_SplitPayment extends React.Component {
  static propTypes = {
    Personal1Claim: PropTypes.any,
    Person2Claim: PropTypes.any,
    Person3Claim: PropTypes.any,
    Personal1PayAlready: PropTypes.any,
    Person2PayAlready: PropTypes.any,
    Personal3PayAlready: PropTypes.any,

    Lio_StsPerson1: PropTypes.any,
    Lio_StsPerson2: PropTypes.any,
    Lio_StsPersonal3: PropTypes.any,

    onOk: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '分割入金';

    this.state = {
      initValue: true
    };
    this.onFinish = this.onFinish.bind();

  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setFormFieldValue('Lio_StsPerson1', this.props.Lio_StsPerson1)
      this.forceUpdate();
    }
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
    const {
      Personal1Claim,
      PersonClaim3,
      Personal1PayAlready,
      Person2PayAlready, Personal3PayAlready,
      Person2Claim, AmountBilled, DepositAmount,
    } = this.props;

    const params = {
      Personal1Claim, Personal1PayAlready, PersonClaim3
      , Person2Claim, AmountBilled, DepositAmount, Person2PayAlready, Personal3PayAlready
      , StsAnotherDay1: this.formRef.current.getFieldValue('Lio_StsPerson1') ? 1 : 0,
      StsAnotherDate2: this.formRef.current.getFieldValue('Lio_StsPerson2') ? 1:0,
      StsAnotherDate3: this.formRef.current.getFieldValue('Lio_StsPersonal3') ?1 : 0
    };
    DispensingProcessSubAction.split(params).then(result => {
      this.props.onOk({ ...result });
    })
  }

  render() {
    return (
      <div className="split-payment">
        <Card title="分割入金">
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{
            Lio_StsPerson1: this.props.Lio_StsPerson1,
            Lio_StsPerson2: this.props.Lio_StsPerson2,
            Lio_StsPersonal3: this.props.Lio_StsPersonal3
          }}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="Lio_StsPerson1" valuePropName="checked">
                  <Checkbox>{this.props.Personal1Claim}</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <span>{((this.props.Personal1Claim > 0) && (this.props.Personal1Claim === this.props.Personal1PayAlready)) ? '入金済' : ''}</span>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="Lio_StsPerson2" valuePropName="checked">
                  <Checkbox >{this.props.Person2Claim}</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <span>{((this.props.Person2Claim > 0) && (this.props.Person2Claim === this.props.Person2PayAlready)) ? '入金済' : ''}</span>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="Lio_StsPersonal3" valuePropName="checked">
                  <Checkbox>{this.props.PersonClaim3}</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <span>{((this.props.PersonClaim3 > 0) && (this.props.PersonClaim3 === this.props.Personal3PayAlready)) ? '入金済' : ''}</span>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">確認</Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default WS2623007_SplitPayment;
