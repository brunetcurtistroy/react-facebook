import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Card, Form, Checkbox, Button } from "antd";

class WS2537084_InfoHeld extends React.Component {
  static propTypes = {
    Lio_InfoRetention: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "情報保持";
  }

  componentDidMount = () => {
    if (this.props.Lio_InfoRetention)
      this.formRef.current.setFieldsValue({
        ...this.props.Lio_InfoRetention,
      });
  };

  onFinish = (values) => {
    console.log("Check ", values);
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_InfoRetention: values,
      });
    }
  };

  render() {
    return (
      <div className="info-held" style={{width:"200px"}}>
        <Card title="情報保持">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="Date" valuePropName="checked">
              <Checkbox>受診日</Checkbox>
            </Form.Item>
            <Form.Item name="TimeZone" valuePropName="checked">
              <Checkbox>時間帯</Checkbox>
            </Form.Item>
            <Form.Item name="VisitsCourses" valuePropName="checked">
              <Checkbox>受診コース</Checkbox>
            </Form.Item>
            <Form.Item name="Facility" valuePropName="checked">
              <Checkbox>施設</Checkbox>
            </Form.Item>
            <Form.Item name="NOrderDivision" valuePropName="checked">
              <Checkbox>N次区分</Checkbox>
            </Form.Item>
            <Form.Item name="OtherCondition" valuePropName="checked">
              <Checkbox>その他条件</Checkbox>
            </Form.Item>
            <Form.Item name="ScreeningLocation" valuePropName="checked">
              <Checkbox>検診場所</Checkbox>
            </Form.Item>
            <Form.Item name="Remarks" valuePropName="checked">
              <Checkbox>備考</Checkbox>
            </Form.Item>
            <Form.Item name="Option" valuePropName="checked">
              <Checkbox>オプション</Checkbox>
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              確定
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WS2537084_InfoHeld);
