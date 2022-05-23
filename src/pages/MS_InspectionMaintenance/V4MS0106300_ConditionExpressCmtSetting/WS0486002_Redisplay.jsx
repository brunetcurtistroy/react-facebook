import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Input, Button, } from "antd";

class WS0486002_Redisplay extends React.Component {

  formRef = React.createRef();
  static propTypes = {
    Li_ConditionalExpression: PropTypes.any,
    onFinishScreen: PropTypes.func
  };

  constructor(props) {
    super(props);

    // document.title = '再表示';

    this.state = {
    };
  }
  componentDidMount() {
    this.setFormFieldValue('Li_ConditionalExpression', this.props.Li_ConditionalExpression)
  }
  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
       this.setFormFieldValue('Li_ConditionalExpression', this.props.Li_ConditionalExpression)
    }
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }

  onFinish(values) {

  }
  onExit() {
    const {onFinishScreen} = this.props;
    if(onFinishScreen) {
      onFinishScreen({})
    }
  }
  render() {
    return (
      <div className="redisplay">
        <Card title="再表示">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="Li_ConditionalExpression"
            >
              <Input.TextArea type="text" rows={10} />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary" onClick={() => this.onExit() }>閉じる</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0486002_Redisplay);
