import React from "react";
import { connect } from "react-redux";

import { Card, Form, Radio } from "antd";

const HeaderCodes = ['年　　齢', '性　　別', '続　　柄', 'コ ー ス', '施　　設', '総合判定', '判定ﾚﾍﾞﾙ']
class WS0487008_HeaderInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ヘッダ入力';

    this.state = {
    };
  }
  componentDidMount() {
    this.setFormFieldValue('Lo_HeaderInfo', 0)
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setFormFieldValue('Lo_HeaderInfo', 0)
    }
  }
  onFinish(values) {

  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  getRawValue = (name) => this.formRef?.current?.getFieldValue(name)

  componentWillUnmount = () => {
    const {onFinishScreen} = this.props;
    if(onFinishScreen) {
      const index = this.getRawValue('Lo_HeaderInfo')
      const Lo_HeaderInfo = HeaderCodes[index]
      onFinishScreen({Lo_HeaderInfo});
    }
    
  };
  render() {
    return (
      <div className="header-input">
        <Card title="ヘッダ入力" >
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item name="Lo_HeaderInfo" >
              <Radio.Group style={{ marginLeft: '20%' }}>
                {HeaderCodes.map((value, index) => {
                  return <div><Radio value={index}>{value}</Radio></div>

                })}
              </Radio.Group>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0487008_HeaderInput);
