import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, } from "antd";
import TextArea from "antd/lib/input/TextArea";

class WS0482011_CmtContentModification extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_CommentContent: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = 'コメント内容修正';

    this.state = {
    };
  }

  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      CmtContent: this.props.Lio_CommentContent
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.formRef.current?.setFieldsValue({
        CmtContent: this.props.Lio_CommentContent
      })
    }
  }

  onFinish(values) { }

  render() {
    return (
      <div className="cmt-content-modification">
        <Card title="コメント内容修正">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="CmtContent"
              label="コメント内容"
            >
              <TextArea rows={5} type="text" />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary"
                onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lio_CommentContent: this.formRef.current.getFieldValue('CmtContent'),
                    });
                  }
                }}
              >確定</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0482011_CmtContentModification);
