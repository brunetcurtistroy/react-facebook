import React from "react";
import { connect } from "react-redux";

import { Card, Form, Select, Button } from "antd";

class WS1872005_SiteFindingsMigration extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "部位所見移行";

    this.state = {};
  }

  onFinish(values) {}

  render() {
    return (
      <div className="site-findings-migration">
        <Card title="部位所見移行">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Form.Item style={{width: '160px'}} name="" label="">
              <Select>
                <Select.Option value="">所見１</Select.Option>
                <Select.Option value="">所見２</Select.Option>
              </Select>
            </Form.Item>
            <label> {'->'} </label>
            <Form.Item style={{width: '160px', marginRight: '54px'}} name="" label="">
              <Select>
                <Select.Option value="">所見１</Select.Option>
                <Select.Option value="">所見２</Select.Option>
              </Select>
            </Form.Item>
            </div>
            <Form.Item style={{textAlign: 'end'}}>
              <Button  type="primary">実行</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS1872005_SiteFindingsMigration);
