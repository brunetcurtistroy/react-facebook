import React from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Button, } from "antd";

class WS2641030_PreviousGuideMatterInquiry extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '前回指導事項照会';

    this.state = {
    };
  }
  componentDidMount() {
   
    const PreviousGuidanceMatters = this.props?.Li_PreviousGuideMatters;
    this.setFormFieldValue('Li_PreviousGuideMatters', PreviousGuidanceMatters)
  }
  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      const PreviousGuidanceMatters = this.props?.Li_PreviousGuideMatters
      this.setFormFieldValue('Li_PreviousGuideMatters', PreviousGuidanceMatters)

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
  onFinish = (values) => {
    const Lo_StsPreviousGuide = 1;
    const params = {
      ReserveNumOnceBefore: this.props.Li_ReserveNum,
      Lo_StsPreviousGuide: Lo_StsPreviousGuide
    } 
    this.props.onFinishScreen(params);

  }



  render() {
    return (
      <div className="previous-guide-matter-inquiry">
        <Card title="前回指導事項照会">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="Li_PreviousGuideMatters"
            >
              <Input.TextArea type="text" rows={20} />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary" htmlType="submit" style={{ float: "right" }}>前回DO</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2641030_PreviousGuideMatterInquiry);
