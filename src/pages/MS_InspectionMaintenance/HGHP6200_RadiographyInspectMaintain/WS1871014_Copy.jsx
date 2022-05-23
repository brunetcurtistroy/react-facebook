import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Space } from "antd";

class WS1871014_Copy extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "複写";

    this.state = {};
  }

  onFinish(values) {}

  render() {
    return (
      <div className="copy">
        <Card title="複写">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <div>
          <div style={{display:'flex', justifyContent: "space-between"}}>
            <Form.Item name="Li_CopySource" label="複写元">
              <span>30</span>
              {/* <Input value='303333' readOnly style={{border: 'none'}} type="text" /> */}
            </Form.Item>
            <Form.Item style={{marginRight: '70px'}} name="Li_CopySourceName" label="">
            <span>30</span>
              {/* <Input value='303333' readOnly style={{border: 'none'}} type="text" /> */}
            </Form.Item>
            </div>


            <div style={{display:'flex', justifyContent: "space-between"}} >
            <Form.Item name="Copy" label="複写先">
              <Input type="text" />
            </Form.Item>
            <Form.Item style={{marginRight: '70px'}} name="interpretation_exam_name" label="">
            <span>30</span>
              {/* <Input value='303333' readOnly style={{border: 'none'}} type="text" /> */}
            </Form.Item>
            </div>
            </div>
            <Form.Item style={{ textAlign: "end", marginTop: "20px" }}>
              <Button type="primary">複写</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WS1871014_Copy);
