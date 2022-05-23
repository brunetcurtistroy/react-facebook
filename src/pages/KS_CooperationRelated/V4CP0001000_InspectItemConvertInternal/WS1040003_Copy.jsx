import React from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Button, Row, Col } from "antd";

class WS1040003_Copy extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'コピー';

    this.state = {
      CreatingExternalCode: 0
    };
    
  }

  onFinish(values) {

  }
  onChangeInput(e){
    this.setState({
      CreatingExternalCode: e.target.value
    })
  }
  event(){
    let data={
      item_code_external: this.props.item_code_external,
      CreatingExternalCode: this.state.CreatingExternalCode
    }
    this.props.clickParent(data);
  }

  render() {
    return (
      <div className="copy">
        <Card title='コピー'>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={4} >
                <label>外部ｺｰﾄﾞ</label>
              </Col>
              <Col span={6}>
                <label>{this.props.item_code_external}</label>
              </Col>
              <Col span={4}>
                <label>→</label>
              </Col>
              <Col span={10}>
                <Form.Item name="">
                  <Input type="number" onChange={(e) =>this.onChangeInput(e)} />
                </Form.Item>
              </Col>
            </Row>
            <Button onClick={() => this.event()} type="primary" style={{ float: 'right', marginTop: '1em' }}>実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1040003_Copy);
